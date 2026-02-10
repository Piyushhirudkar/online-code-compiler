import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// Fetch all submissions for a user
router.get("/history/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const submissions = await Submission.find({ email });
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
