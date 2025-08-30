import { Route, Routes } from "react-router-dom";
import LandingPage from "@pages/LandingPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
