const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback.", error: error.message });
  }
});

// POST new feedback
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newFeedback = new Feedback({
      name,
      message,
      rating
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to save feedback.", error: error.message });
  }
});

// DELETE feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feedback.", error: error.message });
  }
});

module.exports = router;
