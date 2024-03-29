import { createContext, useState } from "react";

export const User = createContext({});

export default function UserAuth({ children }) {
  const [auth, setAuth] = useState({});
  return <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>;
}
