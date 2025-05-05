import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const BiodiversityForm = () => {
  const [formData, setFormData] = useState({
    male: "",
    female: "",
    children: "",
    elderly: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // يمكنك هنا إرسال البيانات لـ API مثلاً
    navigate("/thank-you"); // إعادة التوجيه لصفحة الشكر بعد الإرسال
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Biodiversity Form | GIS Dashboard</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="male">Male</label>
          <input
            type="number"
            name="male"
            id="male"
            value={formData.male}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Enter number of males"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="female">Female</label>
          <input
            type="number"
            name="female"
            id="female"
            value={formData.female}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Enter number of females"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="children">Children</label>
          <input
            type="number"
            name="children"
            id="children"
            value={formData.children}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Enter number of children"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="elderly">Elderly</label>
          <input
            type="number"
            name="elderly"
            id="elderly"
            value={formData.elderly}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            placeholder="Enter number of elderly"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BiodiversityForm;
