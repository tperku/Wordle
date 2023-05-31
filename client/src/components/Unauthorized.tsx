import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <div className="mainBody">
        <h1>UNAUTHORIZED</h1>
        <p>You don't have access to this page</p>
        <button className="submitButton" onClick={goBack}>
          Go back
        </button>
      </div>
    </>
  );
}

export default Unauthorized;
