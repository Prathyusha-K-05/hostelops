import { useEffect,useState } from "react";
import API from "../services/api";

function AdminDashboard(){
  const [stats,setStats]=useState({});
  const [complaints,setComplaints]=useState([]);

  const loadData=async()=>{
    const s=await API.get("/complaints/stats");
    const c=await API.get("/complaints");

    setStats(s.data);
    setComplaints(c.data);
  };

  useEffect(()=>{ loadData(); },[]);

  const updateStatus=async(id,status)=>{
    await API.put(`/complaints/${id}/status`,{status});
    loadData();
  };

  return(
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col">Total: {stats.total}</div>
        <div className="col">Pending: {stats.pending}</div>
        <div className="col">In Progress: {stats.inProgress}</div>
        <div className="col">Resolved: {stats.resolved}</div>
      </div>

      {complaints.map(c=>(
        <div key={c._id} className="card p-3 mb-2">
          <p>{c.description}</p>
          <p>Status: {c.status}</p>

          <button className="btn btn-warning me-2"
            onClick={()=>updateStatus(c._id,"in-progress")}>
            In Progress
          </button>

          <button className="btn btn-success"
            onClick={()=>updateStatus(c._id,"resolved")}>
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;