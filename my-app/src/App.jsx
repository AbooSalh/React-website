import { Route, Routes } from "react-router-dom";
import { Signup } from "./Home/Signup";
import Header from "./components/Header";
import Login from "./Home/Login";
import Dashboard from "./Dashboard/Dashboard";
import "@fortawesome/react-fontawesome";
import Users from "./Dashboard/Users";
import UpdateUser from "./Dashboard/UpdateUser";
import CreateUser from "./Dashboard/CreateUser";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />}></Route>
          <Route path="user/create" element={<CreateUser />}></Route>
          <Route path="users/:id" element={<UpdateUser />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
