# API Integration Guide

## Overview
The application supports both mock data and real API integration. Switch between them using the config file.

## Configuration

### Enable Real API
In `src/config/app.config.json`:
```json
{
  "api": {
    "use_mock_data": false,
    "timeout": 5000
  }
}
```

### Set API Base URL
Create `.env` file (copy from `.env.example`):
```bash
VITE_API_URL=http://localhost:3001/api
```

Or use your production URL:
```bash
VITE_API_URL=https://api.yourdomain.com/v1
```

## API Endpoints

### Weather API
- **GET** `/weather/current?location={location}` - Get current weather
- **GET** `/weather/forecast?location={location}` - Get 7-day forecast

**Response Format:**
```json
{
  "current": {
    "temperature": 28,
    "condition": "Sunny",
    "humidity": 65,
    "windSpeed": 12
  },
  "forecast": [...]
}
```

### Schemes API
- **GET** `/schemes` - Get all schemes
- **GET** `/schemes/{id}` - Get scheme by ID
- **GET** `/schemes/search?query={query}&category={category}&cropType={cropType}` - Search schemes

**Response Format:**
```json
[
  {
    "id": "pm-kisan",
    "title": "PM-KISAN Samman Nidhi",
    "shortDescription": "Direct income support",
    "benefits": "₹6,000 per year",
    "eligibility": "All landholding farmers",
    "applicationLink": "https://pmkisan.gov.in"
  }
]
```

### Plant Protection API
- **GET** `/plant-protection` - Get all data
- **GET** `/plant-protection/crops` - Get crop list
- **GET** `/plant-protection/symptoms` - Get symptom list
- **POST** `/plant-protection/diagnose` - Diagnose crop disease

**Diagnose Request:**
```json
{
  "crop": "Rice",
  "symptoms": ["yellowing", "wilting"]
}
```

**Diagnose Response:**
```json
{
  "id": "rice-blast",
  "crop": "Rice",
  "disease": "Rice Blast",
  "cause": "Fungal infection",
  "severity": "High",
  "treatment": ["Apply fungicide", "Remove infected plants"],
  "prevention": ["Use resistant varieties", "Proper spacing"]
}
```

## Authentication

### Token-Based Auth
The API service automatically includes JWT tokens in requests:

```javascript
// Token is stored in localStorage after login
localStorage.setItem('auth_token', 'your_jwt_token');

// Automatically added to all requests
headers: {
  'Authorization': 'Bearer your_jwt_token'
}
```

### Login Flow
1. User enters mobile number → `/login` endpoint
2. OTP sent to mobile
3. User verifies OTP → `/verify-otp` endpoint
4. Receive JWT token
5. Store token in localStorage

## Error Handling

The API service includes automatic error handling:
- **401 Unauthorized**: Redirects to login
- **Network errors**: Falls back to mock data
- **Timeout**: Returns cached data if available

## Caching

Responses are cached for 1 hour (configurable):
```json
{
  "performance": {
    "cache_enabled": true
  }
}
```

## Testing

### Test with Mock Data
```json
{ "api": { "use_mock_data": true } }
```

### Test with Real API
1. Start your backend server
2. Set `use_mock_data: false`
3. Configure `VITE_API_URL`
4. Test each endpoint

## Backend Requirements

Your backend should implement these endpoints with the response formats shown above. The frontend will:
- Send requests with proper headers
- Handle authentication tokens
- Cache responses
- Fall back to mock data on errors

## Example Backend (Node.js/Express)

```javascript
// Weather endpoint
app.get('/api/weather/current', async (req, res) => {
  const { location } = req.query;
  const weather = await getWeatherData(location);
  res.json(weather);
});

// Schemes endpoint
app.get('/api/schemes', async (req, res) => {
  const schemes = await getSchemesFromDB();
  res.json(schemes);
});

// Plant protection diagnosis
app.post('/api/plant-protection/diagnose', async (req, res) => {
  const { crop, symptoms } = req.body;
  const diagnosis = await diagnoseCrop(crop, symptoms);
  res.json(diagnosis);
});
```

## CORS Configuration

Ensure your backend allows requests from your frontend:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```
