import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const register = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input className="form-control mb-2"
        placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input className="form-control mb-2"
        placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <input className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      <button className="btn btn-success" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;