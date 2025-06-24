# **App Name**: ACCU Map

## Core Features:

- Map Display: Display an interactive map with markers corresponding to data entries fetched from the public CSV file at 'https://raw.githubusercontent.com/sve0/accu/refs/heads/main/datasource.csv'. Geolocation is based on the 'Localización' column. API Key must be configured via environment variable.
- Filter System: Implement a filtering system with buttons to display different data point categories: 'TODOS', 'ADAPTADO' (filters 'Tipo' as 'Adaptado'), 'Establecimiento' (filters 'Tipo' as 'Establecimiento'), and 'Centro Público' (filters 'Tipo' as 'CentroPublico').
- Location Detail Overlay: When a map marker is selected, a panel slides in to display details of the location, including its name, address, type, and hours.
- Sidebar Controls: Floating card provides access to centering on the user's location and showing a list of the 5 nearest locations and app information panels.
- Custom Branding: Displays the app's logo ('/logo.jpg') in the top-left corner of the map and within the information panel.

## Style Guidelines:

- Primary color: A desaturated azure (#64B5F6) for evoking clarity and trust.
- Background color: Light grey (#F0F4F7) for a clean, uncluttered presentation.
- Accent color: Vivid orange (#FFB74D) for drawing attention to interactive elements and selections.
- Headline font: 'Inter', sans-serif, for headlines.
- Body font: 'Inter', sans-serif, for all text.
- Mix of 'lucide-react' icons for UI controls and custom SVG icons for filter categories.
- Clean, intuitive layout with the map as the central focus.
- Filter buttons grouped in a card at the bottom center.
- Sidebar controls are grouped in a vertically-oriented card on the left.
- Smooth, animated transitions for opening and closing panels and overlays.