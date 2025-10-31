// server/routes/search.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Unsplash API error:", error.message);
    res.status(500).json({ error: "Failed to fetch images from Unsplash" });
  }
});

export default router;
