![image](https://github.com/user-attachments/assets/7868aae6-66f5-408a-b8a9-ef794f601626) Geofixer---Community-Issue-Map
GeoFixer is a community issue mapping platform that lets users report local problems by clicking on a map. Built with Leaflet.js and Firebase, it features real-time issue tracking, search, authentication, dark mode, and an admin panel for editing, deleting, and resolving reports.

# GeoFixer 🌍

GeoFixer is a web-based community issue reporting system that allows users to mark local issues on an interactive map. Built using Leaflet.js for mapping and Firebase for authentication and real-time data storage, it empowers users and admins to collaboratively manage civic problems.

---

## 🚀 Features

- 📍 **Map-based Issue Reporting**  
  Click anywhere on the map to report an issue with a description.

- 🔍 **Search Functionality**  
  Filter reported issues by keywords in real-time.

- ✅ **Issue Status Management**  
  Mark issues as **Resolved ✅**, **Unresolved ❓**, or **Wrong ❌** using admin controls.

- 🔐 **User Authentication**  
  Sign up, login, and logout securely with Firebase Authentication.

- 🛠️ **Admin Panel**  
  View, edit, delete, and manage reported issues with ease.

- 🌙 **Dark Mode Toggle**  
  Clean and modern UI that supports both light and dark themes.

---

## 🧑‍💻 Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Frontend     | HTML, CSS, JavaScript |
| Mapping      | Leaflet.js         |
| Auth/Backend | Firebase (Auth, Realtime DB) |
| Geocoding    | Leaflet Control Geocoder |

---

## 🗂️ Project Structure

COMMUNITY-ISSUE-MAP/
├── index.html # Main interface
├── script.js # Core functionality and map logic
├── makeAdmin.js # Firebase admin role management
├── serviceAccountKey.json # Firebase credentials (secured)
└── style.css # Custom styles

## 🔧 Setup Instructions

> 💡 This project is already connected to Firebase.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/community-issue-map.git
   cd community-issue-map

2. Replace Firebase configuration in script.js:
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  databaseURL: "...",
  ...
};

3. Open index.html in your browser.
Make sure you’re online to load Leaflet and Firebase from CDNs.

🖼️ Screenshots/Video
![image](https://github.com/user-attachments/assets/3faba322-9bed-4408-9946-b90992db7b9f)
![image](https://github.com/user-attachments/assets/650c4bbc-74c6-4d01-a9d3-6e289df0a98b)
![image](https://github.com/user-attachments/assets/e3efed82-9aa8-47fd-aa61-a7d3a01cd0d2)
https://drive.google.com/file/d/1JywUznWiiOWtG4hT3ojH_ZZ5fEqOCANt/view?usp=sharing


📜 License
Licensed under the MIT License. Feel free to use and modify this project.

👩‍💻 Author
Purvi Panvalkar
B.Tech IT @ Usha Mittal Institute of Technology
📫 LinkedIn https://www.linkedin.com/in/purvi-panwalkar-950b66258/


