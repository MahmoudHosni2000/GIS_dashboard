import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SplashScreen from "../components/SplashScreen";
import MapView from "../components/MapView";

const SustainabilityForm = () => {
const [formData, setFormData] = useState({
  solar_capacity_mw: 0,
  waste_to_energy_mwh_per_year: 0,
  climate_risk_index: 0,
  circular_economy_score_percent: 0,
  carbon_neutrality_progress_percent: 0,
  water_energy_nexus_efficiency: {
    energy_per_m3_water_kwh: 0,
  },
  sustainable_transport_index: {
    public_transport_share_percent: 0,
    bike_lanes_km: 0,
    pedestrian_zones_km: 0,
  },
  green_infrastructure_coverage_percent: 0,
  latitude: "",
  longitude: "",
});

const [allData, setAllData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedArray = localStorage.getItem("sustainabilityData");
  if (storedArray) {
    setAllData(JSON.parse(storedArray));
  }
  setLoading(false);
}, []);

const transformData = (data) => ({
  ...data,
  solar_capacity_mw: parseFloat(data.solar_capacity_mw) || 0,
  waste_to_energy_mwh_per_year: parseFloat(data.waste_to_energy_mwh_per_year) || 0,
  climate_risk_index: parseFloat(data.climate_risk_index) || 0,
  circular_economy_score_percent: parseFloat(data.circular_economy_score_percent) || 0,
  carbon_neutrality_progress_percent: parseFloat(data.carbon_neutrality_progress_percent) || 0,
  green_infrastructure_coverage_percent: parseFloat(data.green_infrastructure_coverage_percent) || 0,
  water_energy_nexus_efficiency: {
    energy_per_m3_water_kwh: parseFloat(data.water_energy_nexus_efficiency.energy_per_m3_water_kwh) || 0,
  },
  sustainable_transport_index: {
    public_transport_share_percent: parseFloat(data.sustainable_transport_index.public_transport_share_percent) || 0,
    bike_lanes_km: parseFloat(data.sustainable_transport_index.bike_lanes_km) || 0,
    pedestrian_zones_km: parseFloat(data.sustainable_transport_index.pedestrian_zones_km) || 0,
  },
  latitude: parseFloat(data.latitude) || "",
  longitude: parseFloat(data.longitude) || "",
});

const handleChange = (fieldPath, value) => {
  setFormData((prev) => {
    const newData = { ...prev };
    const path = fieldPath.split(".");
    let target = newData;

    for (let i = 0; i < path.length - 1; i++) {
      target[path[i]] = target[path[i]] || {};
      target = target[path[i]];
    }

    target[path[path.length - 1]] = value;
    return newData;
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newEntry = transformData(formData);

  const updatedArray = [...allData, newEntry];
  localStorage.setItem("sustainabilityData", JSON.stringify(updatedArray));
  alert("تم حفظ البيانات بنجاح!");

  // Refresh للصفحة
  window.location.reload();
};

const handleLocationSelect = (coords) => {
  const newLat = coords.latitude.toFixed(6);
  const newLng = coords.longitude.toFixed(6);

  setFormData((prev) => {
    if (prev.latitude === newLat && prev.longitude === newLng) return prev;

    return {
      ...prev,
      latitude: newLat,
      longitude: newLng,
    };
  });
};

if (loading) return <SplashScreen />;

  return (
    <div className="space-y-8 p-1" dir="rtl">
      <Helmet>
        <title>تعديل بيانات الاستدامة | لوحة المؤشرات الجغرافية</title>
      </Helmet>
      <div className="mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=dRYbxdpM5Q5E&format=png&color=000000"
          alt="Logo"
        />

        <div className="mx-auto" dir="rtl">
          <h1 className="text-2xl font-bold text-center mb-5 form-title">
            تطبيق إضافة وتحديث بيانات الاستدامة والمرونة المناخية
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* القسم الأول: الطاقة والبيئة */}
            <div className="flex col-span-2 space-y-4 form !pt-0">
              <div className="w-full md:w-1/3 p-5 pb-2">
                <h3 className="text-base font-bold mb-3 mt-1">
                  الطاقة والبيئة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <InputField
                    label="القدرة الشمسية (ميغاواط)"
                    value={formData?.solar_capacity_mw || 0}
                    onChange={(e) =>
                      handleChange("solar_capacity_mw", e.target.value || 0)
                    }
                  />
                  <InputField
                    label="تحويل النفايات إلى طاقة (ميغاواط/سنة)"
                    value={formData?.waste_to_energy_mwh_per_year || 0}
                    onChange={(e) =>
                      handleChange(
                        "waste_to_energy_mwh_per_year",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="مؤشر مخاطر المناخ"
                    value={formData?.climate_risk_index || 0}
                    onChange={(e) =>
                      handleChange("climate_risk_index", e.target.value)
                    }
                  />
                  <InputField
                    label="مؤشر الاقتصاد الدائري (%)"
                    value={formData?.circular_economy_score_percent || 0}
                    onChange={(e) =>
                      handleChange(
                        "circular_economy_score_percent",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="نسبة التقدم نحو الحياد الكربوني (%)"
                    value={formData?.carbon_neutrality_progress_percent || 0}
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
                      formData?.water_energy_nexus_efficiency
                        ?.energy_per_m3_water_kwh || 0
                    }
                    onChange={(e) =>
                      handleChange(
                        "water_energy_nexus_efficiency.energy_per_m3_water_kwh",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
                {/* القسم الثاني: النقل المستدام */}
                <div className="col-span-2 space-y-4 !pt-0">
                  <h3 className="text-base font-bold mb-3 mt-1">
                    النقل المستدام
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="نسبة استخدام النقل العام (%)"
                      value={
                        formData?.sustainable_transport_index
                          ?.public_transport_share_percent || 0
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
                      value={
                        formData?.sustainable_transport_index?.bike_lanes_km ||
                        0
                      }
                      onChange={(e) =>
                        handleChange(
                          "sustainable_transport_index.bike_lanes_km",
                          e.target.value
                        )
                      }
                    />
                    <InputField
                      label="أطوال مناطق المشاة (كم)"
                      value={
                        formData?.sustainable_transport_index
                          ?.pedestrian_zones_km || 0
                      }
                      onChange={(e) =>
                        handleChange(
                          "sustainable_transport_index.pedestrian_zones_km",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

                {/* القسم الثالث: تغطية البنية التحتية الخضراء */}
                <div className="col-span-2 space-y-4 !pt-0">
                  <h3 className="text-base font-bold mb-3 mt-1">
                    تغطية البنية التحتية الخضراء
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <InputField
                      label="نسبة تغطية البنية التحتية الخضراء من مساحة المدينة (%)"
                      value={
                        formData?.green_infrastructure_coverage_percent || 0
                      }
                      onChange={(e) =>
                        handleChange(
                          "green_infrastructure_coverage_percent",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

                {/* إحداثيات الموقع */}
                <div className="col-span-2 space-y-4 !pt-0">
                  <h3 className="text-base font-bold mb-3 mt-1">
                    إحداثيات الموقع
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="خط العرض (Latitude)"
                      value={formData?.latitude || ""}
                      onChange={(e) => handleChange("latitude", e.target.value)}
                    />
                    <InputField
                      label="خط الطول (Longitude)"
                      value={formData?.longitude || ""}
                      onChange={(e) =>
                        handleChange("longitude", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
                {/* زر الإرسال */}
                <div className="text-center flex flex-col sm:flex-row justify-end !mt-2 !mb-0">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-6 rounded-r-lg transition duration-200 text-sm"
                  >
                    حفظ
                  </button>

                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-6 rounded-l-lg transition duration-200 text-sm"
                  >
                    إرسال البيانات (Excel)
                  </button>
                </div>
              </div>
              <div className="w-full md:w-2/3 !m-0">
                <MapView onLocationSelect={handleLocationSelect} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// مكون حقل الإدخال القابل لإعادة الاستخدام
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-right mb-2 text-xs">{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-1 border rounded text-right text-xs"
    />
  </div>
);

export default SustainabilityForm;
