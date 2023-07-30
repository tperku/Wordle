import { Routes, Route } from "react-router-dom";

import "./App.css";
import Wordle from "./components/Wordle";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Home from "./components/Home";
import { RequireAuth } from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import User from "./components/User";
import { PersistLogin } from "./components/PersistLogin";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route path="/user" element={<User />} />
          <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
            <Route path="/wordle" element={<Wordle />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
