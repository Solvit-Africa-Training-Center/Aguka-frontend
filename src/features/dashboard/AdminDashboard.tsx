import DashboardNavbar from "@components/dashboard/member/DashboardNavbar";

const AdminDashboard = () => {
  return (
    <div className = "font-poppons bg-[#003B42] min-h-screen ">
      <div>
        <DashboardNavbar />

      </div>
      <div className="pt-50 pl-10 text-white">
        <h1 className="text-4xl capitalize font-bold">Admin dashboard </h1>
        <span className="capitalize text-sm">system administration and security monitoring</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
