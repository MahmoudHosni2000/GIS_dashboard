import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const TransportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eBuses: "",
    electricVehicles: "",
    chargingPoints: "",
    touristVehiclesCars: "",
    touristVehiclesMinibuses: "",
    touristVehiclesBuses: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا سيكون الكود عند إرسال البيانات
    console.log(formData);
    // إعادة التوجيه إلى صفحة الـ Transport بعد حفظ البيانات
    navigate("/Transport");
  };

  return (
    <>
      <Helmet>
        <title>Edit Transport Data | GIS Dashboard</title>
      </Helmet>
      <div className="container">
        <h1 className="text-3xl font-semibold mb-6">Edit Transport Data</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* e-Buses */}
          <div className="flex flex-col">
            <label htmlFor="eBuses" className="text-lg mb-2">
              e-Buses
            </label>
            <input
              type="text"
              id="eBuses"
              name="eBuses"
              value={formData.eBuses}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter e-Buses data"
            />
          </div>

          {/* Electric Vehicles */}
          <div className="flex flex-col">
            <label htmlFor="electricVehicles" className="text-lg mb-2">
              Electric Vehicles
            </label>
            <input
              type="text"
              id="electricVehicles"
              name="electricVehicles"
              value={formData.electricVehicles}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter Electric Vehicles data"
            />
          </div>

          {/* Charging Points */}
          <div className="flex flex-col">
            <label htmlFor="chargingPoints" className="text-lg mb-2">
              Charging Points
            </label>
            <input
              type="text"
              id="chargingPoints"
              name="chargingPoints"
              value={formData.chargingPoints}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter Charging Points data"
            />
          </div>

          {/* Tourist Vehicles (Cars) */}
          <div className="flex flex-col">
            <label htmlFor="touristVehiclesCars" className="text-lg mb-2">
              Tourist Vehicles (Cars)
            </label>
            <input
              type="text"
              id="touristVehiclesCars"
              name="touristVehiclesCars"
              value={formData.touristVehiclesCars}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter Tourist Vehicles (Cars) data"
            />
          </div>

          {/* Tourist Vehicles (Minibuses) */}
          <div className="flex flex-col">
            <label htmlFor="touristVehiclesMinibuses" className="text-lg mb-2">
              Tourist Vehicles (Minibuses)
            </label>
            <input
              type="text"
              id="touristVehiclesMinibuses"
              name="touristVehiclesMinibuses"
              value={formData.touristVehiclesMinibuses}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter Tourist Vehicles (Minibuses) data"
            />
          </div>

          {/* Tourist Vehicles (Buses) */}
          <div className="flex flex-col">
            <label htmlFor="touristVehiclesBuses" className="text-lg mb-2">
              Tourist Vehicles (Buses)
            </label>
            <input
              type="text"
              id="touristVehiclesBuses"
              name="touristVehiclesBuses"
              value={formData.touristVehiclesBuses}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter Tourist Vehicles (Buses) data"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          >
            Save Data
          </button>
        </form>
      </div>
    </>
  );
};

export default TransportForm;
