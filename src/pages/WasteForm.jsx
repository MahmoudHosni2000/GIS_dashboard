import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

export default function WasteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    generation_collection: {
      total_generated_tpd: { MSW: "", "C&D": "", other: "" },
      recyclable_generated_tpd: {
        Paper: "",
        Plastic: "",
        Glass: "",
        Metal: "",
      },
      collection_efficiency_percent: "",
      overflow_rate_percent: "",
      collected_uco_liters: { January: "", February: "", March: "" },
      collection_efficiency_percent_actual: "",
      open_container_overflow_rate_percent: "",
      collected_uco_liters_month: { April: "", May: "", June: "" },
    },
    processing_diversion: {
      overall_diversion_rate_percent: "",
      biodiesel_from_uco_liters: "",
      overall_recycling_rate_percent: "",
      source_segregation: { participation_rate_percent: "" },
      organic_waste_composting_percent: "",
    },
    hazardous_waste: {
      medical_waste_tpm: "",
      weee_collected_tpm: "",
      weee_processing: {
        recycled_refurbished_percent: "",
        hazardous_material_removed_percent: "",
      },
    },
    circular_engagement: {
      local_initiatives: "",
      stakeholder_engagement_events: "",
      estimated_participants: "",
    },
    circular_economy_community_engagement: {
      number_of_active_local_initiatives: "",
      stakeholder_engagement: {
        events_count: "",
        estimated_participants: "",
      },
    },
    latitude: "",
    longitude: "",
    city: "",
  });

  useEffect(() => {
    const fetchCityName = async () => {
      if (formData.latitude && formData.longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${formData.latitude}&lon=${formData.longitude}`;
        try {
          const response = await fetch(url);
          const result = await response.json();
          if (result && result.address) {
            const cityName =
              result.address.city ||
              result.address.town ||
              result.address.village ||
              "";

            // فقط حدّث city لو اختلفت فعلاً
            if (formData.city !== cityName) {
              setFormData((prev) => ({
                ...prev,
                city: cityName,
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      }
    };

    fetchCityName();
  }, [formData.latitude, formData.longitude]);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      let updated = { ...prev };
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      console.log("Updated formData:", updated); // ✅ طباعة هنا مهمة

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // استرجاع البيانات القديمة
    const existingDataRaw = localStorage.getItem("wasteFormData");
    let existingData = [];

    try {
      const parsed = JSON.parse(existingDataRaw);
      if (Array.isArray(parsed)) {
        existingData = parsed;
      } else if (parsed !== null && typeof parsed === "object") {
        existingData = [parsed]; // لو كان object واحد بس
      }
    } catch {
      existingData = [];
    }

    // إضافة البيانات الجديدة في بداية المصفوفة (stack behavior)
    const updatedData = [formData, ...existingData];

    // تخزين البيانات في localStorage
    localStorage.setItem("wasteFormData", JSON.stringify(updatedData));

    console.log("تم حفظ البيانات:", formData);
    navigate("/waste");
  };

  const handleLocationSelect = (coords) => {
    setFormData((prev) => {
      const newLat = coords.latitude.toFixed(6);
      const newLng = coords.longitude.toFixed(6);

      if (prev.latitude === newLat && prev.longitude === newLng) {
        return prev; // مفيش تغيير
      }

      return {
        ...prev,
        latitude: newLat,
        longitude: newLng,
      };
    });
  };

  return (
    <div className="space-y-8 p-5 h-screen" dir="rtl">
      <Helmet>
        <title>نموذج النفايات | لوحة المعلومات الجغرافية</title>
      </Helmet>
      <div className="mx-auto flex flex-col h-[-webkit-fill-available]">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=XnbI8TA0Z0ug&format=png&color=000000"
          alt="Logo"
        />
        <h2 className="text-2xl font-bold text-center mb-5 form-title">
          نموذج إضافة وتحديث بيانات النفايات
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 h-0 md:flex-row form"
        >
          <div className="w-full md:w-1/3 p-2 overflow-auto">
            {/* إجمالي النفايات المُولدة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                إجمالي النفايات المُولدة (طن/يوم)
              </h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                <InputField
                  label="النفايات الصلبة:"
                  name="MSW"
                  type="number"
                  value={
                    formData.generation_collection?.total_generated_tpd?.MSW ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.total_generated_tpd.MSW",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="مخلفات هدم وبناء (C&D):"
                  name="C&D"
                  type="number"
                  value={
                    formData.generation_collection?.total_generated_tpd?.[
                      "C&D"
                    ] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.total_generated_tpd.C&D",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="أخرى:"
                  name="other"
                  type="number"
                  value={
                    formData.generation_collection?.total_generated_tpd
                      ?.other || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.total_generated_tpd.other",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* النفايات القابلة لإعادة التدوير */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                النفايات القابلة لإعادة التدوير (طن/يوم)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["Paper", "Plastic", "Glass", "Metal"].map((item) => {
                  const labelMap = {
                    Paper: "ورق",
                    Plastic: "بلاستيك",
                    Glass: "زجاج",
                    Metal: "معادن",
                  };

                  return (
                    <InputField
                      key={item}
                      label={`${labelMap[item]}:`}
                      name={item}
                      type="number"
                      value={
                        formData.generation_collection
                          ?.recyclable_generated_tpd[item]
                      }
                      onChange={(e) =>
                        handleChange(
                          `generation_collection.recyclable_generated_tpd.${item}`,
                          e.target.value
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* مؤشرات الجمع */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">مؤشرات الجمع</h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="كفاءة الجمع (%):"
                  name="collection_efficiency_percent"
                  type="number"
                  value={
                    formData.generation_collection
                      ?.collection_efficiency_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.collection_efficiency_percent",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="معدل الفائض (%):"
                  name="overflow_rate_percent"
                  type="number"
                  value={formData.generation_collection?.overflow_rate_percent}
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.overflow_rate_percent",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="كفاءة الجمع الفعلية (%):"
                  name="collection_efficiency_percent_actual"
                  type="number"
                  value={
                    formData.generation_collection
                      ?.collection_efficiency_percent_actual
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.collection_efficiency_percent_actual",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="معدل الفائض للحاويات المفتوحة (%):"
                  name="open_container_overflow_rate_percent"
                  type="number"
                  value={
                    formData.generation_collection
                      ?.open_container_overflow_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.open_container_overflow_rate_percent",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* الزيوت المُجمعة - الشهور الأولى */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                حجم الديزل الحيوي المنتج من UCO (لتر)
              </h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                {["January", "February", "March"].map((month) => {
                  const monthMap = {
                    January: "يناير",
                    February: "فبراير",
                    March: "مارس",
                  };

                  return (
                    <InputField
                      key={month}
                      label={`${monthMap[month]}:`}
                      name={month}
                      type="number"
                      value={
                        formData.generation_collection?.collected_uco_liters[
                          month
                        ]
                      }
                      onChange={(e) =>
                        handleChange(
                          `generation_collection.collected_uco_liters.${month}`,
                          e.target.value
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* الزيوت المُجمعة - الشهور اللاحقة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                كمية الزيوت المُجمعة (أشهر لاحقة)
              </h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                {["April", "May", "June"].map((month) => (
                  <InputField
                    key={month}
                    label={
                      month === "April"
                        ? "أبريل"
                        : month === "May"
                        ? "مايو"
                        : "يونيو"
                    }
                    value={
                      formData.generation_collection
                        ?.collected_uco_liters_month[month]
                    }
                    onChange={(e) =>
                      handleChange(
                        `generation_collection.collected_uco_liters_month.${month}`,
                        e.target.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم: المعالجة والتحويل */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                المعالجة والتحويل
              </h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                <InputField
                  label="معدل التحويل الكلي (%)"
                  value={
                    formData.processing_diversion
                      ?.overall_diversion_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.overall_diversion_rate_percent",
                      e.target.value
                    )
                  }
                />
                <InputField
                  label="كمية الديزل الحيوي من الزيوت المستعملة (لتر)"
                  value={
                    formData.processing_diversion?.biodiesel_from_uco_liters
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.biodiesel_from_uco_liters",
                      e.target.value
                    )
                  }
                />
                <InputField
                  label="معدل إعادة التدوير الكلي (%)"
                  value={
                    formData.processing_diversion
                      ?.overall_recycling_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.overall_recycling_rate_percent",
                      e.target.value
                    )
                  }
                />
                <InputField
                  label="معدل المشاركة في الفرز من المصدر (%)"
                  value={
                    formData.processing_diversion?.source_segregation
                      .participation_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.source_segregation.participation_rate_percent",
                      e.target.value
                    )
                  }
                />
                <InputField
                  label="معدل تحويل النفايات العضوية إلى سماد (%)"
                  value={
                    formData.processing_diversion
                      ?.organic_waste_composting_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.organic_waste_composting_percent",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم: النفايات الخطرة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">النفايات الخطرة</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="number"
                  label="كمية النفايات الطبية المُعالجة (طن/شهر):"
                  value={formData.hazardous_waste?.medical_waste_tpm}
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.medical_waste_tpm",
                      e.target.value
                    )
                  }
                />

                <InputField
                  type="number"
                  label="كمية المخلفات الإلكترونية المُجمعة (طن/شهر):"
                  value={formData.hazardous_waste?.weee_collected_tpm}
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.weee_collected_tpm",
                      e.target.value
                    )
                  }
                />
              </div>

              <h2 className="font-medium mt-6 text-gray-700">
                معالجة المخلفات الإلكترونية:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <InputField
                  type="number"
                  label="نسبة المعالجة (تدوير/إعادة تأهيل) (%):"
                  value={
                    formData.hazardous_waste?.weee_processing
                      ?.recycled_refurbished_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.weee_processing.recycled_refurbished_percent",
                      e.target.value
                    )
                  }
                />

                <InputField
                  type="number"
                  label="نسبة المواد الخطرة التي تم التخلص منها بأمان (%):"
                  value={
                    formData.hazardous_waste?.weee_processing
                      ?.hazardous_material_removed_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.weee_processing.hazardous_material_removed_percent",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم: المشاركة المجتمعية في الاقتصاد الدائري */}
            <div className="col-span-3 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                المشاركة المجتمعية في الاقتصاد الدائري
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* عدد المبادرات المحلية النشطة */}
                <InputField
                  label="عدد المبادرات المحلية النشطة:"
                  type="number"
                  value={
                    formData.circular_economy_community_engagement
                      ?.number_of_active_local_initiatives
                  }
                  onChange={(e) =>
                    handleChange(
                      "circular_economy_community_engagement.number_of_active_local_initiatives",
                      e.target.value
                    )
                  }
                />
              </div>

              <h2 className="font-medium mt-6 text-gray-700">
                فعاليات التوعية والتواصل:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* عدد الفعاليات */}
                <InputField
                  label="عدد الفعاليات:"
                  type="number"
                  value={
                    formData.circular_economy_community_engagement
                      ?.stakeholder_engagement.events_count
                  }
                  onChange={(e) =>
                    handleChange(
                      "circular_economy_community_engagement.stakeholder_engagement.events_count",
                      e.target.value
                    )
                  }
                />

                {/* عدد المشاركين التقديري */}
                <InputField
                  label="عدد المشاركين التقديري:"
                  type="number"
                  value={
                    formData.circular_economy_community_engagement
                      ?.stakeholder_engagement.estimated_participants
                  }
                  onChange={(e) =>
                    handleChange(
                      "circular_economy_community_engagement.stakeholder_engagement.estimated_participants",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم الموقع الجغرافي */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                قسم الموقع الجغرافي
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* خط العرض */}
                <InputField
                  label="خط العرض (Latitude)"
                  type="number"
                  value={formData.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                />

                {/* خط الطول */}
                <InputField
                  label="خط الطول (Longitude)"
                  type="number"
                  value={formData.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
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
          <div className="w-full md:w-2/3">
            <MapView onLocationSelect={handleLocationSelect} />
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => (
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-normal text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-1 border rounded text-right text-xs"
      />
    </div>
  </div>
);
