import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-100 to-red-100  dark:bg-gray-900 dark:text-white">
      <main  dir="rtl" className="flex-1 overflow-y-auto p-6 bg-[#EEF1F5] dark:bg-gray-900 dark:text-white">
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
