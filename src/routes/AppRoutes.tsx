import { Route, Routes } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
import ServicePage from "@pages/ServicePage";
import NavBar from "@components/NavBar";
import ErrorPage from "@pages/ErrorPage";
import RegisterMember from "@features/auth/RegisterMember";
import Login from "@features/auth/Login";
import Faqs from "@pages/Faqs";
import CheckEmail from "@features/auth/CheckEmail";
import ResetPassword from "@features/auth/ResetPassword";
import ForgotPassword from "@features/auth/ForgotPassword";
import FillBeforeRegister from "@features/auth/FillBeforeRegister";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="faq" element={<Faqs />} />
        </Route>
        <Route path="/registermember" element={<RegisterMember />} />
        <Route path="/checkemail" element={<CheckEmail />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/fillbeforeregister" element={<FillBeforeRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
