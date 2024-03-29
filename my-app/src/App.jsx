import { Route, Routes } from "react-router-dom";
import { Signup } from "./Home/Auth/Signup";
import Header from "./components/Header";
import Login from "./Home/Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import "@fortawesome/react-fontawesome";
import Users from "./Dashboard/Users";
import UpdateUser from "./Dashboard/UpdateUser";
import CreateUser from "./Dashboard/CreateUser";
import UserAuth from "./Home/Auth/context/UserContext";
import RequireAuth from "./Home/Auth/RequireAuth";
import PersistLogin from "./Home/Auth/PersistLogin";
export default function App() {
  return (
    <UserAuth>
      <Header />
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="user/create" element={<CreateUser />}></Route>
              <Route path="users/:id" element={<UpdateUser />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </UserAuth>
  );
}
