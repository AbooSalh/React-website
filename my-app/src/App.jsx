import { Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import Header from "./components/Header";
import Login from "./Login";
export default function App() {
  return (
    <body>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/register" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </div>
    </body>
  );
}
