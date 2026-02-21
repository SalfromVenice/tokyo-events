# Tokyo Events Finder

Tokyo Events Finder is a fullstack web application that allows users to discover events in Tokyo using an interactive map and a list view.

The application combines geolocation-based search with dynamic filtering and a clean user interface.

---

## 🚀 Tech Stack

### Backend

- Ruby on Rails (API-only)
- RESTful JSON API

### Frontend

- React
- TypeScript
- Leaflet (interactive maps)

---

## ✨ Features

### 🗺️ Map View

- Interactive map powered by Leaflet
- Draggable search location
- Adjustable search radius
- Event markers displayed within selected radius
- Toggle filter: All events / Free events only
- Dynamic API fetching based on map position and filters

### 📋 List View

- Card-based layout for events
- Displays event details (title, date, price, etc.)
- Synced with active filters and search parameters
- Alternative browsing experience to the map view

---

## 🔎 How It Works

1. The user selects a location by dragging the map.
2. The search radius can be adjusted dynamically.
3. The frontend sends the selected coordinates and radius to the Rails API.
4. The backend filters events within the selected area.
5. Results are displayed as map markers or list cards.

---

## 🎯 Key Concepts Demonstrated

- Fullstack architecture (Rails API + React frontend)
- Geolocation-based filtering
- Dynamic state management in React
- Map integration with Leaflet
- RESTful API design
- Interactive UI/UX patterns

---

## 🧠 Future Improvements

- URL state synchronization (shareable search links)
- Marker clustering for performance optimization
- Pagination or infinite scroll in list view
- Caching with React Query
- Improved animations and UX enhancements

---

## 📌 Project Purpose

This project was built to demonstrate:

- Fullstack development skills
- Clean separation between frontend and backend
- Type-safe React development
- Real-world UI interaction patterns
