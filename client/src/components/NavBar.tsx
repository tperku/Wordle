import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <div>
        <Link to="/wordle">Wordle</Link>
      </div>
      <div>
        <Link to="/user">Profile</Link>
      </div>
      <div>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}
export default NavBar;
