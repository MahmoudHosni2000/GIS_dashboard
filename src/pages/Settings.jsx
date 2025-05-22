import { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Settings = () => {
  const [language, setLanguage] = useState("ar");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.toggle("dark", isDark);
      html.classList.toggle("light", !isDark);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  console.log(language);

  return (
    <>
      <Helmet>
        <title>الإعدادات | لوحة معلومات نظم المعلومات الجغرافية</title>
      </Helmet>
      <div className="max-w-2xl space-y-8 text-right" dir="rtl">
        <h2 className="text-2xl font-bold">تسجيل الدخول أو إنشاء حساب جديد</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <FaFacebook className="text-blue-600" />
            <span>Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <FaTwitter className="text-sky-500" />
            <span>Twitter</span>
          </button>

          <div className="text-center mt-4">
            <span>أو </span>
            <a href="/register" className="text-blue-600 hover:underline">
              أنشئ حساب جديد يدويًا
            </a>
          </div>
        </div>
        <hr />

        <h2 className="text-2xl font-bold">اللغات</h2>
        <div className="space-y-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          >
            <option value="en">الإنجليزية</option>
            <option value="ar">العربية</option>
            <option value="fr">الفرنسية</option>
          </select>
          <label className="flex items-center space-x-2 justify-end flex-row-reverse">
            <span>تفعيل الإشعارات عبر البريد الإلكتروني</span>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </label>
        </div>

        <hr />

        <h2 className="text-2xl font-bold">المظهر</h2>
        <div className="space-y-4">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          >
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
            <option value="system">النظام التلقائي</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Settings;
