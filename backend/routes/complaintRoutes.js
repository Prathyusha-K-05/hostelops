const express = require("express");
const router = express.Router();

const { protect, adminOnly } =
  require("../middleware/authMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintStats,
} = require("../controllers/complaintController");

// ---------- STUDENT ----------
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// ---------- ADMIN ----------
router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.get("/stats", protect, adminOnly, getComplaintStats);

module.exports = router;