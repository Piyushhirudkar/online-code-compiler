import express from "express";
import Submission from "../models/Submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * SUBMIT CODE
 */
router.post("/submit", auth, async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const submission = await Submission.create({
      userId: req.user.id,
      language,
      code,
    });

    res.status(201).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET SUBMISSIONS
 */
router.get("/submissions", auth, async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
