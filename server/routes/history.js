import express from "express";
const router = express.Router();

// Example history route
router.get("/", (req, res) => {
  res.json({ message: "User history API working ✅" });
});

export default router;  // ✅ Important: default export
