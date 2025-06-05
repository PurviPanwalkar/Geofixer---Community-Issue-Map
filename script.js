// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-VBUCN7m-bCqNtHJe2lp1S2NYMZ6Tbc4",
  authDomain: "geofixer-dd5d9.firebaseapp.com",
  projectId: "geofixer-dd5d9",
  storageBucket: "geofixer-dd5d9.appspot.com",
  messagingSenderId: "624119267365",
  appId: "1:624119267365:web:94d148e8eed04961c63fcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminPanel = document.getElementById("admin-panel");
const issueList = document.getElementById("issue-list");

// Admin email
const adminEmail = "admin@example.com";

// Auth state listener
onAuthStateChanged(auth, async (user) => {
  const isAdmin = user && (user.email === adminEmail);
  emailField.style.display = user ? "none" : "inline-block";
  passwordField.style.display = user ? "none" : "inline-block";
  loginBtn.style.display = user ? "none" : "inline-block";
  signupBtn.style.display = user ? "none" : "inline-block";
  logoutBtn.style.display = user ? "inline-block" : "none";
  adminPanel.style.display = isAdmin ? "block" : "none";

  if (isAdmin) await populateAdminPanel();
});

// Sign Up
signupBtn.addEventListener("click", () => {
  const email = emailField.value;
  const password = passwordField.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("User signed up successfully!"))
    .catch((error) => alert(`Error: ${error.message}`));
});

// Login
loginBtn.addEventListener("click", () => {
  const email = emailField.value;
  const password = passwordField.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("User logged in successfully!"))
    .catch((error) => alert(error.message));
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => alert("User logged out successfully!"))
    .catch((error) => alert(error.message));
});

// Initialize Leaflet map
const map = L.map('map').setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.whenReady(() => {
  loadIssues();
});

map.on('click', async function (e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const description = prompt("Describe the issue:");
  if (!description) return;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>Issue:</b> ${description}`)
    .openPopup();

  try {
    await addDoc(collection(db, "issues"), {
      lat,
      lng,
      description,
      createdAt: new Date(),
      resolved: false,
      user: auth.currentUser ? auth.currentUser.email : "anonymous",
      status: "unresolved"
    });
  } catch (err) {
    console.error("Error saving issue:", err);
  }
});

const unresolvedIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const resolvedIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

async function loadIssues() {
  try {
    const querySnapshot = await getDocs(collection(db, "issues"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { lat, lng, description, user, resolved, status } = data;
      if (lat && lng && description) {
        const icon = resolved ? resolvedIcon : unresolvedIcon;
        const issueStatus = resolved ? "✅ Resolved" : "⛔ Unresolved";
        const judgment = status === "right" ? "✅" : status === "wrong" ? "❌" : "❓";
        const popup = `
          <b>Issue:</b> ${description}<br>
          <b>Reported by:</b> ${user || "anonymous"}<br>
          <b>Status:</b> ${issueStatus}<br>
          <b>Judgement:</b> ${judgment}
        `;
        L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
      }
    });
  } catch (err) {
    console.error("Error loading issues:", err);
  }
}

window.editIssue = async function (id, currentDescription) {
  const newDescription = prompt("Edit issue description:", currentDescription);
  if (newDescription && newDescription.trim() !== "") {
    await updateDoc(doc(db, "issues", id), { description: newDescription });
    alert("Issue updated.");
    populateAdminPanel();
  }
};

window.deleteIssue = async function (id) {
  if (confirm("Are you sure you want to delete this issue?")) {
    await deleteDoc(doc(db, "issues", id));
    alert("Issue deleted.");
    populateAdminPanel();
  }
};

window.resolveIssue = async function (id) {
  await updateDoc(doc(db, "issues", id), { resolved: true });
  alert("Issue marked as resolved.");
  populateAdminPanel();
};

window.unresolveIssue = async function (id) {
  await updateDoc(doc(db, "issues", id), { resolved: false });
  alert("Issue marked as unresolved.");
  populateAdminPanel();
};

window.setStatus = async function (id, status) {
  await updateDoc(doc(db, "issues", id), { status });
  alert(`Status marked as ${status}.`);
  populateAdminPanel();
};

async function populateAdminPanel() {
  issueList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "issues"));
  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const isResolved = data.resolved === true;
    const status = data.status === "right" ? "✅" : data.status === "wrong" ? "❌" : "❓";

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Issue:</strong> ${data.description} |
      <strong>User:</strong> ${data.user} |
      <strong>Status:</strong> ${status}
      <br>
      <button onclick="editIssue('${docSnapshot.id}', '${data.description.replace(/'/g, "\\'")}')">Edit</button>
      <button onclick="deleteIssue('${docSnapshot.id}')">Delete</button>
      ${isResolved 
        ? `<button onclick="unresolveIssue('${docSnapshot.id}')">Unresolve</button>` 
        : `<button onclick="resolveIssue('${docSnapshot.id}')">Resolve</button>`}
      <button onclick="setStatus('${docSnapshot.id}', 'Resolved')">✅ Mark Right</button>
      <button onclick="setStatus('${docSnapshot.id}', 'Invalid')">❌ Mark Wrong</button>
    `;
    issueList.appendChild(li);
  });
}

