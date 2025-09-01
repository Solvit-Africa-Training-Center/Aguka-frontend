import { Routes, Route } from "react-router-dom";
import RegisterMember from "@features/auth/RegisterMember";
import Login from "@features/auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/registermember" element={<RegisterMember />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
}
