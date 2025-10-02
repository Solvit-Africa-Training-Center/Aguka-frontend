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
// import ApprovalList from "@components/dashboard/PresidentComponents/ApprovalPage";
import LoanPayment from "@components/LoanPayment";
import LoanForm from "@components/LoanForm";
import ContributionForm from "@components/ContributionForm";
import SecretaryDashboard from "@features/dashboard/SecretaryDashboard";
import SecretaryDashboardLayout from "@components/dashboardLayout/SecretaryDashboardLayout";
import MemberDashboardLayout from "@components/dashboardLayout/MemberDashboardLayout";
import PresidentLayout from "@components/dashboardLayout/PresidentLayout";

import Notifications from "@components/dashboard/PresidentComponents/Notifications";
import MembersPage from "@components/dashboard/PresidentComponents/MembersPage";
import ApprovalPage from "@components/dashboard/PresidentComponents/ApprovalPage";
import UserProfile from "@components/dashboard/PresidentComponents/UserProfile";
import MembersList from "@components/dashboard/secretary/MembersList";
import AnnouncementNotice from "@features/dashboard/AnnouncementNotice";
import AttendanceReport from "@components/dashboard/secretary/AttendenceReport";
import ScheduleMeetingForm from "@components/dashboard/secretary/ScheduleMeetingForm";
import PolicyForm from "@components/dashboard/TreasurerComponents/PolicyForm";
import TreasurerDashboard from "@features/dashboard/TreasurerDashboard";
import TreasurerDashboardLayout from "@components/dashboardLayout/TreasurerDashboardLayout";

import ReportsPage from "@pages/ReportsPage";

import AllowContributionPage from "@pages/AllowContributePage";
import LoanApprovalPage from "@pages/LoanApproalPage";

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
        <Route path="/admindashboard/userprofile" element={<UserProfile />} />
        <Route path="/presidentdashboard" element={<PresidentLayout />}>
          <Route index element={<PresidentDashboard />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="approvals" element={<ApprovalPage />} />
          <Route path="contribution" element={<ContributionForm />} />
          <Route path="managemembers" element={<MembersPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="payment" element={<LoanPayment />} />
          <Route path="loanform" element={<LoanForm />} />
          <Route path="memberdashboard" element={<MemberDashboard />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/memberdashboard" element={<MemberDashboardLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="memberdashboard" element={<MemberDashboard />} />
          <Route path="contribution" element={<ContributionForm />} />
          <Route path="/memberdashboard/payment" element={<LoanPayment />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="/memberdashboard/loanform" element={<LoanForm />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route
          path="/secretarydashboard"
          element={<SecretaryDashboardLayout />}>
          {/* <Route path="loanprofile" element={<LoanProfile />} /> */}
          <Route index element={<SecretaryDashboard />} />
          <Route path="members" element={<MembersList />} />
          <Route path="AnnouncementNotice" element={<AnnouncementNotice />} />
          <Route path="contribution" element={<ContributionForm />} />
          <Route path="AttendanceReport" element={<AttendanceReport />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="ScheduleMeetingForm" element={<ScheduleMeetingForm />} />
          <Route path="memberaccount" element={<MemberDashboard />} />
          <Route path="payment" element={<LoanPayment />} />
          <Route path="loanform" element={<LoanForm />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="member" element={<MemberDashboard />} />
        </Route>

        <Route
          path="/treasurerdashboard"
          element={<TreasurerDashboardLayout />}>
          <Route index element={<TreasurerDashboard />} />
          <Route path="report" element={<ReportsPage />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="loanapproval" element={<LoanApprovalPage />} />
          <Route path="allowcontribution" element={<AllowContributionPage />} />
          <Route path="policyform" element={<PolicyForm />} />
          <Route path="contribution" element={<ContributionForm />} />
          <Route path="myaccount" element={<MemberDashboard />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="payment" element={<LoanPayment />} />
          <Route path="loanform" element={<LoanForm />} />
          <Route path="loanprofile" element={<LoanProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
