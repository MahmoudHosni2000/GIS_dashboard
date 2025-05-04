import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Energy from '../pages/Energy';
import Water from '../pages/Water';
import Transport from '../pages/Transport';
import Waste from '../pages/Waste';
import Hotels from '../pages/Hotels';
import Biodiversity from '../pages/Biodiversity';
import Sustainability from '../pages/Sustainability';
import MainLayout from '../layouts/MainLayout';
import Settings from '../components/Settings';

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
    </Routes>
  </Router>
);

export default AppRouter;
