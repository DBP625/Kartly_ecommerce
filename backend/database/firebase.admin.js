import admin from "firebase-admin";
import { readFileSync } from "fs";

console.log("🔥 Attempting to initialize Firebase Admin...");

try {
  const serviceAccount = JSON.parse(
    readFileSync("./servicekeyfirebase.json", "utf8"),
  );

  console.log("✅ Service account file loaded successfully");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("✅ Firebase Admin initialized successfully");
} catch (error) {
  console.error("❌ Firebase Admin initialization FAILED:");
  console.error("Error message:", error.message);
  console.error("Error code:", error.code);
  console.error("Full error:", error);
}

export default admin;
