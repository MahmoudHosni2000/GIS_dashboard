import { useState } from "react";
import { Helmet } from "react-helmet";

const WaterForm = () => {
  const [formData, setFormData] = useState({
    city: "all",
    year: "all",
    waterConsumption: "",
    leakagePercent: "",
    sewageVolume: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إرسال البيانات إلى API أو معالجة البيانات كما تريد
    console.log(formData);
  };

  return (
    <>
      <Helmet>
        <title>Water Form | GIS Dashboard</title>
      </Helmet>

      <div className="max-w-4xl rounded-lg mt-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Edit Water Data
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City Filter */}
          <div className="flex gap-4">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full sm:w-3/4"
            >
              <option value="all">Select City</option>
              <option value="cityA">City A</option>
              <option value="cityB">City B</option>
            </select>

            {/* Year Filter */}
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border p-2 rounded w-full sm:w-1/4"
            >
              <option value="all">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Water Consumption */}
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="waterConsumption"
                className="block text-sm font-medium text-gray-600"
              >
                Water Consumption per Capita (m³/yr)
              </label>
              <input
                type="number"
                id="waterConsumption"
                name="waterConsumption"
                value={formData.waterConsumption}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Enter water consumption"
              />
            </div>
          </div>

          {/* Leakage Percentage */}
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="leakagePercent"
                className="block text-sm font-medium text-gray-600"
              >
                Leakage Percentage
              </label>
              <input
                type="number"
                id="leakagePercent"
                name="leakagePercent"
                value={formData.leakagePercent}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Enter leakage percentage"
              />
            </div>
          </div>

          {/* Sewage Volume */}
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="sewageVolume"
                className="block text-sm font-medium text-gray-600"
              >
                Sewage Volume
              </label>
              <input
                type="number"
                id="sewageVolume"
                name="sewageVolume"
                value={formData.sewageVolume}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Enter sewage volume"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
            >
              Submit Data
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WaterForm;
