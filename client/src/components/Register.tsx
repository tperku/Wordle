import { useState, useContext } from "react";

import AuthContext from "../context/AuthProvider";
import NavBar from "./NavBar";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const REGISTER_URL = "/user/user";

function Register() {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password, role: "USER" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      setAuth({ username, password, role, accessToken });
      setUsername("");
      setPassword("");
      setTerms(false);
      navigate(from, { replace: true });
    } catch (err) {
      prompt("Wrong register data");
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Your name"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="inputForm">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={terms}
            onChange={() => setTerms(!terms)}
            required
          />
          <label htmlFor="checkbox">Accept condition terms</label>
        </div>
        <button className="submitButton">REGISTER</button>
      </form>
    </>
  );
}

export default Register;
