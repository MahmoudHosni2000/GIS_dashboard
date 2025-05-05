import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const BiodiversityForm = () => {
  const [formData, setFormData] = useState({
    coralChange: "",
    trainedCrew: "",
    trainedGuides: "",
    ecoFriendlySports: "",
    sustainabilityIncentives: "",
    reefSpeciesChange: "",
    paTrainedPersonnel: "",
    enforcementPatrols: "",
    marineCleanups: "",
  });
  const [category, setCategory] = useState("tourism");
  const navigate = useNavigate();  // استخدام useNavigate بدلاً من useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add an API call to submit the data here
    navigate.push("/thank-you"); // Redirect to a thank you page after submission
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Biodiversity Form | GIS Dashboard</title>
      </Helmet>

      <div className="mb-6">
        {/* Category Filter Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleCategoryChange("tourism")}
            className={`px-4 py-2 rounded ${
              category === "tourism" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Tourism
          </button>
          <button
            onClick={() => handleCategoryChange("training")}
            className={`px-4 py-2 rounded ${
              category === "training"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Training & Eco
          </button>
          <button
            onClick={() => handleCategoryChange("reef")}
            className={`px-4 py-2 rounded ${
              category === "reef" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Reef & Marine
          </button>
          <button
            onClick={() => handleCategoryChange("conservation")}
            className={`px-4 py-2 rounded ${
              category === "conservation"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Conservation
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fields based on selected category */}
        {category === "tourism" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="coralChange">Coral Change Percentage</label>
              <input
                type="number"
                name="coralChange"
                id="coralChange"
                value={formData.coralChange}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Coral Change Percentage"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sustainabilityIncentives">
                Sustainability Incentives
              </label>
              <input
                type="number"
                name="sustainabilityIncentives"
                id="sustainabilityIncentives"
                value={formData.sustainabilityIncentives}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Sustainability Incentives"
              />
            </div>
          </>
        )}

        {category === "training" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="trainedCrew">Trained Crew Percentage</label>
              <input
                type="number"
                name="trainedCrew"
                id="trainedCrew"
                value={formData.trainedCrew}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Trained Crew Percentage"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="trainedGuides">Trained Guides Percentage</label>
              <input
                type="number"
                name="trainedGuides"
                id="trainedGuides"
                value={formData.trainedGuides}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Trained Guides Percentage"
              />
            </div>
          </>
        )}

        {category === "reef" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="reefSpeciesChange">
                Reef Species Change Percentage
              </label>
              <input
                type="number"
                name="reefSpeciesChange"
                id="reefSpeciesChange"
                value={formData.reefSpeciesChange}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Reef Species Change Percentage"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="enforcementPatrols">Enforcement Patrols</label>
              <input
                type="number"
                name="enforcementPatrols"
                id="enforcementPatrols"
                value={formData.enforcementPatrols}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Enforcement Patrols"
              />
            </div>
          </>
        )}

        {category === "conservation" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="marineCleanups">Marine Cleanups</label>
              <input
                type="number"
                name="marineCleanups"
                id="marineCleanups"
                value={formData.marineCleanups}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                placeholder="Enter Marine Cleanups"
              />
            </div>
          </>
        )}

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
