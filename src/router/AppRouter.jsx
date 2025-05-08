import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Energy from "../pages/Energy";
import Water from "../pages/Water";
import Transport from "../pages/Transport";
import Waste from "../pages/Waste";
import Hotels from "../pages/Hotels";
import Biodiversity from "../pages/Biodiversity";
import Sustainability from "../pages/Sustainability";
import Settings from "../pages/Settings";
import MainLayout from "../layouts/MainLayout";
import DashboardForm from "../pages/DashboardForm";
import SustainabilityForm from "../pages/SustainabilityForm";
import BiodiversityForm from "../pages/BiodiversityForm";
import HotelsForm from "../pages/HotelsForm";
import WasteForm from "../pages/WasteForm";
import TransportForm from "../pages/TransportForm";
import WaterForm from "../pages/WaterForm";
import EnergyForm from "../pages/EnergyForm";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/water" element={<Water />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/waste" element={<Waste />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/biodiversity" element={<Biodiversity />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/Settings" element={<Settings />} />
      </Route>
      <Route path="/DashboardForm" element={<DashboardForm />} />
      <Route path="/SustainabilityForm" element={<SustainabilityForm />} />
      <Route path="/BiodiversityForm" element={<BiodiversityForm />} />
      <Route path="/HotelsForm" element={<HotelsForm />} />{" "}
      <Route path="/WasteForm" element={<WasteForm />} />{" "}
      <Route path="/TransportForm" element={<TransportForm />} />
      <Route path="/WaterForm" element={<WaterForm />} />
      <Route path="/EnergyForm" element={<EnergyForm />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRouter;
