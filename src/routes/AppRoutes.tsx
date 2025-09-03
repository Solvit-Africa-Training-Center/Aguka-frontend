import { Route, Routes } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
import ServicePage from "@pages/ServicePage";
import NavBar from "@components/NavBar";
import ErrorPage from "@pages/ErrorPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route path="service" element={<ServicePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
