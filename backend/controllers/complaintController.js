const Complaint = require("../models/Complaint");

// STUDENT: Create complaint

exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, priority } = req.body;

    const complaint = await Complaint.create({
      title,
      category,
      description,
      priority,
      user: req.user.id,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: View own complaints
exports.getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });
  res.json(complaints);
};

// ADMIN: View all complaints
exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("user", "name email");
  res.json(complaints);
};

// ADMIN: Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try{
    const { status } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint)
    return res.status(404).json({ message: "Complaint not found" });

  complaint.status = status;
  complaint.updatedAt = Date.now();
  await complaint.save();

  res.json({message:"Complaint status updated successfully",complaint});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}; 

exports.getComplaintStats = async (req, res) => {
  const total = await Complaint.countDocuments();

  const pending = await Complaint.countDocuments({ status: "pending" });

  const inProgress = await Complaint.countDocuments({
    status: "in-progress",
  });

  const resolved = await Complaint.countDocuments({
    status: "resolved",
  });

  res.json({
    total,
    pending,
    inProgress,
    resolved,
  });
};