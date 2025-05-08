import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getSustainabilityIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";

const SustainabilityForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("sustainabilityData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
      setLoading(false);
    } else {
      getSustainabilityIndicators()
        .then((res) => {
          setFormData(res);
          localStorage.setItem("sustainabilityData", JSON.stringify(res));
          setLoading(false);
        })
        .catch((err) => {
          console.error("فشل في تحميل المؤشرات:", err);
          setLoading(false);
        });
    }
  }, []);

  const handleChange = (fieldPath, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const path = fieldPath.split(".");
      let target = newData;
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      localStorage.setItem("sustainabilityData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("sustainabilityData", JSON.stringify(formData));
    console.log("تم إرسال البيانات:", formData);
    alert("تم حفظ البيانات بنجاح!");
  };

  if (loading || !formData) return <SplashScreen />;

  return (
    <>
      <Helmet>
        <title>تعديل بيانات الاستدامة | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8" dir="rtl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          تعديل مؤشرات الاستدامة
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* القسم الأول: الطاقة والبيئة */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              الطاقة والبيئة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="القدرة الشمسية (ميغاواط)"
                value={formData.solar_capacity_mw}
                onChange={(e) =>
                  handleChange("solar_capacity_mw", e.target.value)
                }
              />
              <InputField
                label="تحويل النفايات إلى طاقة (ميغاواط/سنة)"
                value={formData.waste_to_energy_mwh_per_year}
                onChange={(e) =>
                  handleChange("waste_to_energy_mwh_per_year", e.target.value)
                }
              />
              <InputField
                label="مؤشر مخاطر المناخ"
                value={formData.climate_risk_index}
                onChange={(e) =>
                  handleChange("climate_risk_index", e.target.value)
                }
              />
              <InputField
                label="مؤشر الاقتصاد الدائري (%)"
                value={formData.circular_economy_score_percent}
                onChange={(e) =>
                  handleChange("circular_economy_score_percent", e.target.value)
                }
              />
              <InputField
                label="نسبة التقدم نحو الحياد الكربوني (%)"
                value={formData.carbon_neutrality_progress_percent}
                onChange={(e) =>
                  handleChange(
                    "carbon_neutrality_progress_percent",
                    e.target.value
                  )
                }
              />
              <InputField
                label="كفاءة المياه والطاقة (كيلوواط.ساعة/م³)"
                value={
                  formData.water_energy_nexus_efficiency
                    .energy_per_m3_water_kwh
                }
                onChange={(e) =>
                  handleChange(
                    "water_energy_nexus_efficiency.energy_per_m3_water_kwh",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* القسم الثاني: النقل المستدام */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              النقل المستدام
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="نسبة استخدام النقل العام (%)"
                value={
                  formData.sustainable_transport_index
                    .public_transport_share_percent
                }
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.public_transport_share_percent",
                    e.target.value
                  )
                }
              />
              <InputField
                label="أطوال مسارات الدراجات (كم)"
                value={formData.sustainable_transport_index.bike_lanes_km}
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.bike_lanes_km",
                    e.target.value
                  )
                }
              />
              <InputField
                label="أطوال مناطق المشاة (كم)"
                value={formData.sustainable_transport_index.pedestrian_zones_km}
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.pedestrian_zones_km",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* القسم الثالث: تغطية البنية التحتية الخضراء */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              تغطية البنية التحتية الخضراء
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <InputField
                label="نسبة تغطية البنية التحتية الخضراء من مساحة المدينة (%)"
                value={formData.green_infrastructure_coverage_percent}
                onChange={(e) =>
                  handleChange(
                    "green_infrastructure_coverage_percent",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* زر الإرسال */}
          <div className="text-center">
            <button
              onClick={() => navigate("/sustainability")}

              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// مكون حقل الإدخال القابل لإعادة الاستخدام
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
);

export default SustainabilityForm;
