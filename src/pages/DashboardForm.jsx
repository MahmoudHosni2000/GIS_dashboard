import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const DashboardForm = () => {
  const [formData, setFormData] = useState({
    male: "",
    female: "",
    children: "",
    elderly: "",
    hospitals: "",
    hotelsGreen: "",
    hotelsNotGreen: "",
    divingCentersGreen: "",
    divingCentersNotGreen: "",
  });

  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "dark";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("dashboardFormData", JSON.stringify(formData));
    navigate("/");
  };

  const inputProps = {
    type: "text",
    inputMode: "numeric",
    pattern: "\\d*",
    min: "0",
    className: "px-4 py-2 border rounded",
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>
      <div className="container mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=B2JaJQNuWADR&format=png&color=000000"
          alt="Logo"
        />

        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات الأداء العام للإجماليات
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* القسم الأول */}
          <div className="space-y-4 form">
            <h2 className="text-lg font-semibold">بيانات السكان</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col w-auto">
                <label htmlFor="male">عدد الذكور</label>
                <input
                  {...inputProps}
                  name="male"
                  id="male"
                  value={formData.male}
                  onChange={handleChange}
                  placeholder="أدخل عدد الذكور"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="female">عدد الإناث</label>
                <input
                  {...inputProps}
                  name="female"
                  id="female"
                  value={formData.female}
                  onChange={handleChange}
                  placeholder="أدخل عدد الإناث"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="children">عدد الأطفال</label>
                <input
                  {...inputProps}
                  name="children"
                  id="children"
                  value={formData.children}
                  onChange={handleChange}
                  placeholder="أدخل عدد الأطفال"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="elderly">عدد كبار السن</label>
                <input
                  {...inputProps}
                  name="elderly"
                  id="elderly"
                  value={formData.elderly}
                  onChange={handleChange}
                  placeholder="أدخل عدد كبار السن"
                />
              </div>
            </div>
          </div>

          {/* القسم الثاني */}
          <div className="space-y-4 form">
            <h2 className="text-lg font-semibold">
              بيانات الفنادق والمستشفيات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col w-auto">
                <label htmlFor="hotelsGreen">
                  عدد الفنادق الحاصلة على النجمة الخضراء
                </label>
                <input
                  {...inputProps}
                  name="hotelsGreen"
                  id="hotelsGreen"
                  value={formData.hotelsGreen}
                  onChange={handleChange}
                  placeholder="أدخل العدد"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="hospitals">عدد المستشفيات</label>
                <input
                  {...inputProps}
                  name="hospitals"
                  id="hospitals"
                  value={formData.hospitals}
                  onChange={handleChange}
                  placeholder="أدخل عدد المستشفيات"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="hotelsNotGreen">
                  عدد الفنادق غير الحاصلة على النجمة الخضراء
                </label>
                <input
                  {...inputProps}
                  name="hotelsNotGreen"
                  id="hotelsNotGreen"
                  value={formData.hotelsNotGreen}
                  onChange={handleChange}
                  placeholder="أدخل العدد"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="divingCentersGreen">
                  عدد مراكز الغوص (Green Fins)
                </label>
                <input
                  {...inputProps}
                  name="divingCentersGreen"
                  id="divingCentersGreen"
                  value={formData.divingCentersGreen}
                  onChange={handleChange}
                  placeholder="أدخل العدد"
                />
              </div>

              <div className="flex flex-col w-auto">
                <label htmlFor="divingCentersNotGreen">
                  عدد مراكز الغوص (غير Green Fins)
                </label>
                <input
                  {...inputProps}
                  name="divingCentersNotGreen"
                  id="divingCentersNotGreen"
                  value={formData.divingCentersNotGreen}
                  onChange={handleChange}
                  placeholder="أدخل العدد"
                />
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
              onClick={() => navigate("/")}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-r-lg transition duration-200"
            >
              حفظ
            </button>

            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-l-lg transition duration-200"
            >
              إرسال البيانات (Excel)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardForm;
