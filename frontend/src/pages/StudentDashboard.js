import { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {
 const [complaints, setComplaints] = useState([]);

const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("medium");

  const fetchComplaints=async()=>{
    const {data}=await API.get("/complaints/my");
    setComplaints(data);
  };

  useEffect(()=>{ fetchComplaints(); },[]);

  const submitComplaint = async () => {
  try {
    await API.post("/complaints", {
      title,
      category,
      description,
      priority,
    });

    // clear form
    setTitle("");
    setCategory("");
    setDescription("");
    setPriority("Medium");

    fetchComplaints();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Failed to submit complaint");
  }
};

  return (
    <div className="container mt-4">
      <h2>Student Dashboard</h2>

    <input
    className="form-control mb-2"
    placeholder="Complaint Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />

    <input
    className="form-control mb-2"
    placeholder="Category (Electrical, Water, WiFi...)"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    />

    <textarea
    className="form-control mb-2"
    placeholder="Describe your issue"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    />

    <select
    className="form-control mb-2"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    >
    <option value="Low">Low Priority</option>
    <option value="Medium">Medium Priority</option>
    <option value="High">High Priority</option>
    </select>

      <button className="btn btn-primary mt-2"
        onClick={submitComplaint}>
        Submit
      </button>

      <hr/>

      {complaints.map(c=>(
        <div key={c._id} className="card p-3 mb-2">
          <p>{c.description}</p>
          <b>Status: {c.status}</b>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;