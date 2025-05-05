import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const EnergyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pv_capacity_mwp: "",
    smart_rooms: "",
    dimmable_area_percent: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // هنا تقدر تبعت البيانات لـ API لو حابب
    navigate("/Energy"); // رجوع للصفحة السابقة
  };

  return (
    <>
      <Helmet>
        <title>Edit Energy Data | GIS Dashboard</title>
      </Helmet>

      <div className="max-w-2xl mt-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Energy Data</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* PV Capacity */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">PV Capacity (MWp)</label>
            <input
              type="number"
              name="pv_capacity_mwp"
              value={formData.pv_capacity_mwp}
              onChange={handleChange}
              placeholder="مثال: 45"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Smart Rooms */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Smart Rooms</label>
            <input
              type="number"
              name="smart_rooms"
              value={formData.smart_rooms}
              onChange={handleChange}
              placeholder="مثال: 120"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Dimmable Area Percent */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Dimmable Area (%)</label>
            <input
              type="number"
              name="dimmable_area_percent"
              value={formData.dimmable_area_percent}
              onChange={handleChange}
              placeholder="مثال: 75"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/Energy")}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EnergyForm;
