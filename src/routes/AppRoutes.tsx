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
import ContributionForm from "@components/ContributionForm";
import SuccessContribution from "@components/SuccessContribution";
import SecretaryDashboard from "@features/dashboard/SecretaryDashboard";
import SecretaryDashboardLayout from "@components/dashboardLayout/SecretaryDashboardLayout";
import MemberDashboardLayout from "@components/dashboardLayout/MemberDashboardLayout";
import PresidentLayout from "@components/dashboardLayout/PresidentLayout";
import Notifications from "@components/dashboard/PresidentComponents/Notifications";
import MembersList from "@components/dashboard/secretary/MembersList"
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
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/president" element={<PresidentLayout />}>
          <Route index element={<PresidentDashboard />} /> {/* /president */}
          <Route path="dashboard" element={<PresidentDashboard />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="approvals" element={<ApprovalList />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payment" element={<LoanPayment />} />
          <Route path="loanform" element={<LoanForm />} />
          <Route path="success" element={<SuccessContribution />} />
        </Route>

        <Route path="/memberdashboard" element={<MemberDashboardLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="contribution" element={<ContributionForm />} />
          <Route path="payment" element={<LoanPayment />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="loanform" element={<LoanForm />} />
          <Route path="successcontribution" element={<SuccessContribution />} />
        </Route>

        <Route
          path="/secretarydashboard"
          element={<SecretaryDashboardLayout />}>
          <Route index element={<SecretaryDashboard />} />
          <Route path="members" element={<MembersList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
