# Chatbot Admin Panel

Multi-client chatbot configuration management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on port 3001)
npm run dev

# Build for production
npm run build
```

## 🔑 Login Credentials

```
Username: admin
Password: admin123
```

## 📋 Features

### App Management
- Create new client apps with unique app_id
- View all apps in grid layout
- Delete apps with confirmation
- Configure per-app settings

### Configuration Management
- **UI Settings**: Toggle topbar, sidebar, theme switcher, etc.
- **Features**: Enable/disable modules (weather, schemes, plant protection, chat)
- **Appearance**: Theme (light/dark/system) and language selection
- **Colors**: Primary and secondary color customization
- **Branding**: App name and logo settings

### API Integration Ready
All functions have TODO comments for API integration:
- `POST /api/v1/admin/login` - Admin authentication
- `GET /api/v1/admin/apps` - Fetch all apps
- `POST /api/v1/admin/apps` - Create new app
- `DELETE /api/v1/admin/apps/:appId` - Delete app
- `GET /api/v1/admin/apps/:appId/config` - Get app config
- `PUT /api/v1/admin/apps/:appId/config` - Update app config

## 📁 Project Structure

```
adminpanel/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── routes/
│   │   ├── Login.jsx
│   │   ├── Apps.jsx
│   │   └── AppConfig.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Usage Flow

1. **Admin Login** → `/login` with admin credentials
2. **View Apps** → `/apps` shows all client apps
3. **Create App** → Click "Create App" button, generates unique app_id (e.g., `app_1234567890`)
4. **Configure** → Click "Configure" on any app card
5. **Edit Settings** → Toggle/modify settings per app
6. **Save** → Changes saved per app_id in localStorage as `app_config_{appId}`

## 🔗 Integration with Main Chatbot

### How It Works:

1. **Admin creates app** in admin panel → Gets `app_id` (e.g., `app_1234567890`)
2. **Admin configures** app settings (colors, features, branding, etc.)
3. **User logs into chatbot** with their `app_id` + mobile number
4. **Chatbot loads** configuration for that specific `app_id`
5. **User sees** customized chatbot with their app's settings

### User Login Flow:
```
Main Chatbot Login Screen:
- App ID: app_1234567890
- Mobile: 9876543210
↓
Chatbot loads config from localStorage: app_config_app_1234567890
↓
User sees chatbot with custom colors, branding, enabled features
```

## 💾 Data Storage (Mock)

- `admin_auth` - Admin authentication status
- `admin_user` - Admin username
- `admin_apps` - Array of all apps
- `app_config_{appId}` - Configuration per app (shared with main chatbot)

## 🔌 Main Chatbot Integration

The main chatbot now:
1. Asks for `app_id` on login screen
2. Loads config using `configService.loadConfig(appId)`
3. Applies app-specific settings (colors, branding, features)
4. Uses `useAppConfig()` hook to access current config

## 🎨 Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- React Hot Toast
- Boxicons

## 📝 Testing

1. Start admin panel: `cd adminpanel && npm run dev` (port 3001)
2. Login with admin/admin123
3. Create a new app → Copy the `app_id`
4. Configure the app (change colors, branding, etc.)
5. Start main chatbot: `cd .. && npm run dev` (port 3000)
6. Login with the `app_id` you created
7. See your customized chatbot!

## 📝 Notes

- Admin panel runs on port 3001
- Main chatbot runs on port 3000
- Both share localStorage for config storage
- Fully responsive design
- Dark mode support
- Toast notifications for all actions
