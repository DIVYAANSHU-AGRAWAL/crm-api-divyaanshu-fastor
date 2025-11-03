import express from "express";

import Enquiry from "../models/Enquiry.js";
import protect from "../authMiddleware.js";

const router = express.Router();
// Create Enquiry
router.post("/enquiry", async (req, res) => {
  const { name, email, courseInterest, message } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "name and email required" });
  const e = await Enquiry.create({ name, email, courseInterest, message });
  res.status(201).json({ message: "Enquiry submitted", enquiry: e });
});

// Get all unclaimed enquiries
router.get("/enquiries/unclaimed", protect, async (req, res) => {
  const leads = await Enquiry.find({ claimedBy: null }).sort({ createdAt: -1 });
  res.json(leads);
});

// Get MY leads
router.get("/enquiries/my", protect, async (req, res) => {
  const leads = await Enquiry.find({ claimedBy: req.userId }).populate(
    "claimedBy",
    "name email"
  );
  res.json(leads);
});

// Claim lead
router.post("/enquiries/claim/:id", protect, async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  const updated = await Enquiry.findOneAndUpdate(
    { _id: id, claimedBy: null },
    { $set: { claimedBy: userId } },
    { new: true }
  );
  if (!updated)
    return res
      .status(400)
      .json({ message: "Lead already claimed or not found" });
  res.json({ message: "Lead claimed", enquiry: updated });
});

export default router;
