import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") navigate("/admin");
      else navigate("/student");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input className="form-control mb-2"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={login}>
        Login
      </button>

      <p className="mt-3">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;