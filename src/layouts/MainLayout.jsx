import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const bgImage = isDark ? "/assets/Dark.png" : "/assets/light.jpg";

  return (
    <div
      dir="rtl"
      className="relative flex h-screen overflow-hidden dark:text-white"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* المحتوى */}
      <div className="relative z-10 w-full h-full flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-2 flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
