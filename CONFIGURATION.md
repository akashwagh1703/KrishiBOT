# Configuration Guide

All application settings are managed from `src/config/app.config.json`.

## API Configuration

### Use Mock Data (Default)
```json
{
  "api": {
    "use_mock_data": true,
    "timeout": 5000
  }
}
```

### Use Real API
```json
{
  "api": {
    "use_mock_data": false,
    "timeout": 5000
  }
}
```

Then set your API URL in `.env`:
```bash
VITE_API_URL=https://your-api-domain.com/api
```

## Color Customization

Change the entire app color scheme:
```json
{
  "colors": {
    "primary": "blue",        // Main color
    "primary_shade": "500",   // Shade (100-900)
    "secondary": "cyan",      // Secondary color
    ...
  }
}
```

Available colors: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

## Language Management

Add or remove languages:
```json
{
  "languages": [
    { "code": "en", "name": "English", "flag": "🇺🇸" },
    { "code": "hi", "name": "हिंदी", "flag": "🇮🇳" },
    { "code": "ta", "name": "தமிழ்", "flag": "🇮🇳" }
  ]
}
```

## Feature Toggles

Enable/disable modules:
```json
{
  "features": {
    "weather_module": true,
    "schemes_module": true,
    "plant_protection_module": true,
    "chat_module": true
  }
}
```

## UI Customization

Control UI elements:
```json
{
  "ui": {
    "theme_toggle_enabled": true,
    "language_switcher_enabled": true,
    "profile_enabled": true
  }
}
```

## Branding

Customize app branding:
```json
{
  "branding": {
    "app_name": "YourAppName",
    "logo_icon": "/your-logo.png",
    "show_logo": true,
    "show_name": true,
    "client_logos": ["/logo1.png", "/logo2.png"],
    "show_client_logos": true
  }
}
```

## Quick Reference

| Setting | Location | Purpose |
|---------|----------|---------|
| Mock/Real API | `api.use_mock_data` | Switch between mock and real API |
| Colors | `colors` | Change app color theme |
| Languages | `languages` | Add/remove languages |
| Features | `features` | Enable/disable modules |
| Branding | `branding` | Customize app name and logos |

## No Restart Required

Changes to `app.config.json` are applied immediately (except for some build-time settings).
