import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import TopBar from "../components/TopBar";
export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="d-flex">
        <Aside />
        {/* Users outlet */}
        <Outlet />
      </div>
    </div>
  );
}
