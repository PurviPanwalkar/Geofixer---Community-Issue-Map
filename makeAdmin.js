const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// ✅ Replace this UID with your admin user's UID
admin.auth().getUserByEmail("admin@example.com")
  .then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log("✅ Admin role set for email user");
  })
  .catch(error => {
    console.error("❌ Error:", error.message);
  });


