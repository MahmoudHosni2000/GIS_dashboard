import { useState } from "react";
import { Helmet } from "react-helmet";

const WasteForm = () => {
  const [formData, setFormData] = useState({
    msw: "",
    cndWaste: "",
    otherWaste: "",
    diversionRate: "",
    biodiesel: "",
    recyclingRate: "",
    sourceSegregation: "",
    compostingRate: "",
    medicalWaste: "",
    weeeCollected: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // التعامل مع البيانات المرسلة من الفرم
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Helmet>
        <title>Waste Management Form | GIS Dashboard</title>
      </Helmet>

      <div className="max-w-4xl rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6">Waste Management Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="msw" className="block text-lg font-semibold mb-2">
                MSW (tons/day)
              </label>
              <input
                type="number"
                id="msw"
                name="msw"
                value={formData.msw}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cndWaste"
                className="block text-lg font-semibold mb-2"
              >
                C&D Waste (tons/day)
              </label>
              <input
                type="number"
                id="cndWaste"
                name="cndWaste"
                value={formData.cndWaste}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="otherWaste"
                className="block text-lg font-semibold mb-2"
              >
                Other Waste (tons/day)
              </label>
              <input
                type="number"
                id="otherWaste"
                name="otherWaste"
                value={formData.otherWaste}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="diversionRate"
                className="block text-lg font-semibold mb-2"
              >
                Diversion Rate (%)
              </label>
              <input
                type="number"
                id="diversionRate"
                name="diversionRate"
                value={formData.diversionRate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="biodiesel"
                className="block text-lg font-semibold mb-2"
              >
                Biodiesel from UCO (L)
              </label>
              <input
                type="number"
                id="biodiesel"
                name="biodiesel"
                value={formData.biodiesel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="recyclingRate"
                className="block text-lg font-semibold mb-2"
              >
                Recycling Rate (%)
              </label>
              <input
                type="number"
                id="recyclingRate"
                name="recyclingRate"
                value={formData.recyclingRate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sourceSegregation"
                className="block text-lg font-semibold mb-2"
              >
                Source Segregation Participation (%)
              </label>
              <input
                type="number"
                id="sourceSegregation"
                name="sourceSegregation"
                value={formData.sourceSegregation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="compostingRate"
                className="block text-lg font-semibold mb-2"
              >
                Composting Rate (%)
              </label>
              <input
                type="number"
                id="compostingRate"
                name="compostingRate"
                value={formData.compostingRate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="medicalWaste"
                className="block text-lg font-semibold mb-2"
              >
                Medical Waste (tons/month)
              </label>
              <input
                type="number"
                id="medicalWaste"
                name="medicalWaste"
                value={formData.medicalWaste}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weeeCollected"
                className="block text-lg font-semibold mb-2"
              >
                WEEE Collected (tons/month)
              </label>
              <input
                type="number"
                id="weeeCollected"
                name="weeeCollected"
                value={formData.weeeCollected}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WasteForm;
