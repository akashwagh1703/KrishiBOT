# Color Customization Guide

All colors in the application are managed from a single configuration file. Change colors once and they update everywhere.

## Configuration File
**Location**: `src/config/app.config.json`

## Color Settings

```json
"colors": {
  "primary": "green",              // Main color (e.g., "blue", "purple", "red")
  "primary_shade": "500",          // Main shade (100-900)
  "primary_dark_shade": "600",     // Darker shade for hover states
  "secondary": "emerald",          // Secondary color
  "secondary_shade": "600",        // Secondary shade
  "accent_shade": "400",           // Accent/highlight shade
  "light_shade": "50",             // Light background shade
  "border_shade": "200"            // Border shade
}
```

## Examples

### Change to Blue Theme
```json
"colors": {
  "primary": "blue",
  "primary_shade": "500",
  "primary_dark_shade": "600",
  "secondary": "cyan",
  "secondary_shade": "600",
  "accent_shade": "400",
  "light_shade": "50",
  "border_shade": "200"
}
```

### Change to Purple Theme
```json
"colors": {
  "primary": "purple",
  "primary_shade": "500",
  "primary_dark_shade": "600",
  "secondary": "pink",
  "secondary_shade": "600",
  "accent_shade": "400",
  "light_shade": "50",
  "border_shade": "200"
}
```

### Change to Orange Theme
```json
"colors": {
  "primary": "orange",
  "primary_shade": "500",
  "primary_dark_shade": "600",
  "secondary": "amber",
  "secondary_shade": "600",
  "accent_shade": "400",
  "light_shade": "50",
  "border_shade": "200"
}
```

## Available Tailwind Colors
- red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

## Available Shades
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

## Components Using Config Colors
- FloatingChatbot header
- SuggestionChips
- CropGrid
- LoginScreen
- OTPScreen
- Profile page
- All buttons and gradients

## How It Works
The `src/utils/colors.js` file reads the config and generates Tailwind classes that are used throughout the application.
