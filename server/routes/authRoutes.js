// server/routes/authRoutes.js
import express from "express";
import passport from "passport";

const router = express.Router();

// Step 1️⃣: Start Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2️⃣: Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    // ✅ Redirect to frontend after successful login
    res.redirect("http://localhost:3000/home");
  }
);

// Step 3️⃣: Login success
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      user: req.user,
    });
  } else {
    res.status(400).json({ success: false, message: "No user found" });
  }
});

// Step 4️⃣: Login failed
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to authenticate",
  });
});

// Step 5️⃣: Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

export default router;
