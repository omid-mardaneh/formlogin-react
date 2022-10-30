import { Route, Routes, Navigate } from "react-router-dom";
import SingUp from "./components/SingUp";
import Login from "./components/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </>
  );
}

export default App;
