import { Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import Header from "./components/Header";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "@fortawesome/react-fontawesome";
import Users from "./Users";

export default function App() {
  return (
    <body>
      <Header />
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </body>
  );
}
