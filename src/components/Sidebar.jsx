import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const Menus = [
    { title: "المعلومات العامة", src: "dashboard", path: "/" },
    { title: "الطاقة", src: "energy", path: "/energy" },
    { title: "المياة", src: "water", gap: true, path: "/water" },
    { title: "النقل", src: "transport", path: "/transport" },
    { title: "النفايات", src: "waste", path: "/waste" },
    { title: "الفنادق", src: "hotels", path: "/hotels" },
    {
      title: "التنوع البيولوجي",
      src: "biodiversity",
      gap: true,
      path: "/biodiversity",
    },
    {
      title: "الاستدامة والمرونة المناخية",
      src: "sustainability",
      path: "/sustainability",
    },
    { title: "الإعدادات", src: "settings", path: "/settings" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-black h-screen p-4 pt-8 relative duration-300`}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -left-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open ? "rotate-180" : ""
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex flex-row-reverse gap-x-4 items-center">
          <img
            src="/assets/sinai.png"
            className={`h-[4rem] cursor-pointer duration-500 ${
              open ? "rotate-[360deg]" : ""
            }`}
          />
          <h1
            className={`text-white text-right text-lg font-bold duration-200 ${
              !open ? "scale-0" : ""
            }`}
          >
            مؤشرات الأداء العام
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              onClick={() => navigate(Menu.path)}
              className={`flex flex-row-reverse rounded-md p-1 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 
                ${Menu.title == "الإعدادات" ? "mt-9" : "mt-2"}
                ${location.pathname === Menu.path ? "bg-gray-700" : ""}
              `}
            >
              <img
                src={`/assets/${Menu.src}.svg`}
                className={`${!open ? "mx-auto" : ""}`}
              />
              <span
                className={`${!open ? "hidden" : ""} origin-left duration-200`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
