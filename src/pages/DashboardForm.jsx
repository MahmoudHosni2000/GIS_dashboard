import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
console.log(formData);

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
    <div className="space-y-8" dir="rtl">
      <Helmet>
        <title>نموذج التنوع الحيوي | لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="male">عدد الذكور</label>
          <input {...inputProps} name="male" id="male" value={formData.male} onChange={handleChange} placeholder="أدخل عدد الذكور" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="female">عدد الإناث</label>
          <input {...inputProps} name="female" id="female" value={formData.female} onChange={handleChange} placeholder="أدخل عدد الإناث" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="children">عدد الأطفال</label>
          <input {...inputProps} name="children" id="children" value={formData.children} onChange={handleChange} placeholder="أدخل عدد الأطفال" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="elderly">عدد كبار السن</label>
          <input {...inputProps} name="elderly" id="elderly" value={formData.elderly} onChange={handleChange} placeholder="أدخل عدد كبار السن" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hospitals">عدد المستشفيات</label>
          <input {...inputProps} name="hospitals" id="hospitals" value={formData.hospitals} onChange={handleChange} placeholder="أدخل عدد المستشفيات" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hotelsGreen">عدد الفنادق الحاصلة على النجمة الخضراء</label>
          <input {...inputProps} name="hotelsGreen" id="hotelsGreen" value={formData.hotelsGreen} onChange={handleChange} placeholder="أدخل العدد" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hotelsNotGreen">عدد الفنادق غير الحاصلة على النجمة الخضراء</label>
          <input {...inputProps} name="hotelsNotGreen" id="hotelsNotGreen" value={formData.hotelsNotGreen} onChange={handleChange} placeholder="أدخل العدد" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="divingCentersGreen">عدد مراكز الغوص (Green Fins)</label>
          <input {...inputProps} name="divingCentersGreen" id="divingCentersGreen" value={formData.divingCentersGreen} onChange={handleChange} placeholder="أدخل العدد" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="divingCentersNotGreen">عدد مراكز الغوص (غير Green Fins)</label>
          <input {...inputProps} name="divingCentersNotGreen" id="divingCentersNotGreen" value={formData.divingCentersNotGreen} onChange={handleChange} placeholder="أدخل العدد" />
        </div>

        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded">
          إرسال
        </button>
      </form>
    </div>
  );
};

export default DashboardForm;
