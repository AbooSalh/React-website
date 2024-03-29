import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "./context/UserContext";
import Loading from "../../components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const context = useContext(User);
  const [loading, setLoading] = useState(true);
  const token = context.auth.token;
  useEffect(() => {
    // cookie
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");

    async function refresh() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/refresh",
          null,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        console.log("Refreshed token:", response.data.token);
        cookie.set("Bearer", response.data.token);
        context.setAuth((prev) => ({ ...prev, token: response.data.token }));
      } catch (err) {
        console.error("Refresh failed:", err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
