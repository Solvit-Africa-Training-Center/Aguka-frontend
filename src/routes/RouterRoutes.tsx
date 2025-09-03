import { Routes, Route } from "react-router-dom";
import RegisterMember from "@features/auth/RegisterMember";
import Login from "@features/auth/Login";
import Faqs from "@pages/Faqs";
import CheckEmail from "@features/auth/CheckEmail";
import ResetPassword from "@features/auth/ResetPassword";
import ForgotPassword from "@features/auth/ForgotPassword";


export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/registermember" element={<RegisterMember />} />
      <Route path="/login" element={<Login />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/checkemail" element={<CheckEmail/>} /> 
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
    </Routes>
  );
}
