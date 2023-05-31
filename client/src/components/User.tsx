import { useContext } from "react";
import NavBar from "./NavBar";
import AuthContext from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const LOGOUT_URL = "/user/logout";

function User() {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  function loginClick() {
    navigate("/login", { state: { from: location } });
  }

  async function logoutClick() {
    const username = auth.username;
    try {
      const response = await axiosPrivate.put(
        LOGOUT_URL,
        JSON.stringify({ username }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.message);

      setAuth({});
      navigate("/", { state: { from: location } });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <NavBar />
      <div className="mainBody">
        <h1>USER DATA</h1>
        <p>Username: {auth.username}</p>
        <p>Role: {auth.role}</p>
        {auth.username !== undefined ? (
          <button className="submitButton" onClick={logoutClick}>
            Logout
          </button>
        ) : (
          <button className="submitButton" onClick={loginClick}>
            Login
          </button>
        )}
      </div>
    </>
  );
}

export default User;
