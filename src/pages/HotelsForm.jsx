import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHotelsData } from "../api/indicatorsAPI";
import { Helmet } from "react-helmet";

const HotelsForm = () => {
  const [data, setData] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [name, setName] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [solarWaterHeater, setSolarWaterHeater] = useState(false);
  const [desalinationPlant, setDesalinationPlant] = useState(false);
  const [treatmentPlant, setTreatmentPlant] = useState(false);
  const [wasteSeparation, setWasteSeparation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getHotelsData()
      .then((res) => {
        setData(res);
        setSelectedHotel(res.hotels[0]); // Set first hotel by default
        setName(res.hotels[0].name);
        setNumberOfRooms(res.hotels[0].number_of_rooms);
        setSolarWaterHeater(res.hotels[0].solar_water_heater);
        setDesalinationPlant(res.hotels[0].has_desalination_plant);
        setTreatmentPlant(res.hotels[0].has_treatment_plant);
        setWasteSeparation(res.hotels[0].separates_waste);
      })
      .catch((err) => {
        console.error("Failed to load hotel data:", err);
      });
  }, []);

  const handleSave = () => {
    // Save form data logic (e.g., API call to update hotel data)
    console.log("Form data saved", { name, numberOfRooms, solarWaterHeater, desalinationPlant, treatmentPlant, wasteSeparation });
    navigate("/Hotels"); // Redirect to Hotels page after saving
  };

  return (
    <>
      <Helmet>
        <title>Hotels Form | GIS Dashboard</title>
      </Helmet>

      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Edit Hotel Data</h1>
        <form className="space-y-6">
          {/* Hotel Name */}
          <div className="flex flex-col">
            <label htmlFor="hotelName" className="font-semibold">Hotel Name</label>
            <input
              type="text"
              id="hotelName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded mt-2"
              required
            />
          </div>

          {/* Number of Rooms */}
          <div className="flex flex-col">
            <label htmlFor="numberOfRooms" className="font-semibold">Number of Rooms</label>
            <input
              type="number"
              id="numberOfRooms"
              value={numberOfRooms}
              onChange={(e) => setNumberOfRooms(e.target.value)}
              className="border border-gray-300 p-2 rounded mt-2"
              required
            />
          </div>

          {/* Solar Water Heater */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="solarWaterHeater"
              checked={solarWaterHeater}
              onChange={() => setSolarWaterHeater(!solarWaterHeater)}
              className="h-5 w-5"
            />
            <label htmlFor="solarWaterHeater" className="font-semibold">Solar Water Heater</label>
          </div>

          {/* Desalination Plant */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="desalinationPlant"
              checked={desalinationPlant}
              onChange={() => setDesalinationPlant(!desalinationPlant)}
              className="h-5 w-5"
            />
            <label htmlFor="desalinationPlant" className="font-semibold">Desalination Plant</label>
          </div>

          {/* Treatment Plant */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="treatmentPlant"
              checked={treatmentPlant}
              onChange={() => setTreatmentPlant(!treatmentPlant)}
              className="h-5 w-5"
            />
            <label htmlFor="treatmentPlant" className="font-semibold">Treatment Plant</label>
          </div>

          {/* Waste Separation */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="wasteSeparation"
              checked={wasteSeparation}
              onChange={() => setWasteSeparation(!wasteSeparation)}
              className="h-5 w-5"
            />
            <label htmlFor="wasteSeparation" className="font-semibold">Waste Separation</label>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Data
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HotelsForm;
