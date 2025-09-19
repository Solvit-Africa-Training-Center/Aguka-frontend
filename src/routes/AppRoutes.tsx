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
import RegisterGroup from "@features/auth/RegisterGroup";
import LoanProfile from "@components/LoanProfile";
import PresidentDashboard from "@features/dashboard/PresidentDashboard";
import MemberDashboard from "@features/dashboard/MemberDashboard";
import AdminDashboard from "@features/dashboard/AdminDashboard";
import ApprovalList from "@components/dashboard/PresidentComponents/ApprovalList";
import LoanPayment from "@components/LoanPayment";
import LoanForm from "@components/LoanForm";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/faq" element={<Faqs />} />
        </Route>
        <Route path="/registermember" element={<RegisterMember />} />
        <Route path="/checkemail" element={<CheckEmail />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/fillbeforeregister" element={<FillBeforeRegister />} />
        <Route path="/registergroup" element={<RegisterGroup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />}></Route>
        <Route path="/loan" element={<LoanProfile />} />
        <Route path="/approvals" element={<ApprovalList />} />
<<<<<<< HEAD
        <Route path="/loanpayment" element={<LoanPayment />} />
        <Route path="/loanform" element={<LoanForm />} />
=======
>>>>>>> d560c63c1bf4c75c9bd21af28c178c649bfc5179
        <Route path="/memberdashboard" element={<MemberDashboard />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/presidentdashboard" element={<PresidentDashboard />} />
      </Routes>
    </div>
  );
};
export default AppRoutes;
