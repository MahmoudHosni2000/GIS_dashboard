import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

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

            setFormData((prev) => ({
              ...prev,
              city: cityName,
            }));
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
    const updatedFormData = { ...formData };

    let current = updatedFormData;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current = current[key];
      }
    });

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // استرجاع البيانات القديمة
    const existingDataRaw = localStorage.getItem("wasteFormData");
    let existingData = [];

    try {
      const parsed = JSON.parse(existingDataRaw);
      existingData = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      existingData = [];
    }

    // إضافة البيانات الجديدة في بداية المصفوفة (stack behavior)
    const updatedData = [formData, ...existingData];

    // تخزين البيانات في localStorage
    localStorage.setItem("wasteFormData", JSON.stringify(updatedData));

    console.log("تم حفظ البيانات:", formData);
    navigate("/water"); // تأكد من التنقل بعد الحفظ إذا ده هو المطلوب
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>نموذج النفايات | لوحة المعلومات الجغرافية</title>
      </Helmet>
      <div className="container mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=XnbI8TA0Z0ug&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          نموذج إضافة وتحديث بيانات النفايات
        </h1>
        <div className="max-w-6xl mx-auto"></div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* إجمالي النفايات المُولدة */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              إجمالي النفايات المُولدة (طن/يوم)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">النفايات الصلبة:</label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={formData.generation_collection.total_generated_tpd.MSW}
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.total_generated_tpd.MSW",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">مخلفات هدم وبناء (C&D):</label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={
                    formData.generation_collection.total_generated_tpd["C&D"]
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.total_generated_tpd.C&D",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">أخرى:</label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={
                    formData.generation_collection.total_generated_tpd.other
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
          </div>

          {/* النفايات القابلة لإعادة التدوير */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              النفايات القابلة لإعادة التدوير (طن/يوم)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["Paper", "Plastic", "Glass", "Metal"].map((item) => (
                <div className="flex flex-col" key={item}>
                  <label className="font-semibold">
                    {item === "Paper"
                      ? "ورق"
                      : item === "Plastic"
                      ? "بلاستيك"
                      : item === "Glass"
                      ? "زجاج"
                      : "معادن"}
                    :
                  </label>
                  <input
                    type="number"
                    className="border p-2 rounded mt-1"
                    value={
                      formData.generation_collection.recyclable_generated_tpd[
                        item
                      ]
                    }
                    onChange={(e) =>
                      handleChange(
                        `generation_collection.recyclable_generated_tpd.${item}`,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* مؤشرات الجمع */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              مؤشرات الجمع
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">كفاءة الجمع (%):</label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={
                    formData.generation_collection.collection_efficiency_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.collection_efficiency_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">معدل الفائض (%):</label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={formData.generation_collection.overflow_rate_percent}
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.overflow_rate_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">
                  كفاءة الجمع الفعلية (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={
                    formData.generation_collection
                      .collection_efficiency_percent_actual
                  }
                  onChange={(e) =>
                    handleChange(
                      "generation_collection.collection_efficiency_percent_actual",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">
                  معدل الفائض للحاويات المفتوحة (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded mt-1"
                  value={
                    formData.generation_collection
                      .open_container_overflow_rate_percent
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
          </div>

          {/* الزيوت المُجمعة - الشهور الأولى */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              حجم الديزل الحيوي المنتج من UCO (لتر)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["January", "February", "March"].map((month) => (
                <div className="flex flex-col" key={month}>
                  <label className="font-semibold">
                    {month === "January"
                      ? "يناير"
                      : month === "February"
                      ? "فبراير"
                      : "مارس"}
                    :
                  </label>
                  <input
                    type="number"
                    className="border p-2 rounded mt-1"
                    value={
                      formData.generation_collection.collected_uco_liters[month]
                    }
                    onChange={(e) =>
                      handleChange(
                        `generation_collection.collected_uco_liters.${month}`,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* الزيوت المُجمعة - الشهور اللاحقة */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              كمية الزيوت المُجمعة (أشهر لاحقة)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["April", "May", "June"].map((month) => (
                <div className="flex flex-col" key={month}>
                  <label className="font-semibold">
                    {month === "April"
                      ? "أبريل"
                      : month === "May"
                      ? "مايو"
                      : "يونيو"}
                    :
                  </label>
                  <input
                    type="number"
                    className="border p-2 rounded mt-1"
                    value={
                      formData.generation_collection.collected_uco_liters_month[
                        month
                      ]
                    }
                    onChange={(e) =>
                      handleChange(
                        `generation_collection.collected_uco_liters_month.${month}`,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* قسم: المعالجة والتحويل */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              المعالجة والتحويل
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* العنصر الأول */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  معدل التحويل الكلي (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.processing_diversion.overall_diversion_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.overall_diversion_rate_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* العنصر الثاني */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  كمية الديزل الحيوي من الزيوت المستعملة (لتر):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.processing_diversion.biodiesel_from_uco_liters
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.biodiesel_from_uco_liters",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* العنصر الثالث */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  معدل إعادة التدوير الكلي (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.processing_diversion.overall_recycling_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.overall_recycling_rate_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* العنصر الرابع */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  معدل المشاركة في الفرز من المصدر (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.processing_diversion.source_segregation
                      .participation_rate_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "processing_diversion.source_segregation.participation_rate_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* العنصر الخامس */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  معدل تحويل النفايات العضوية إلى سماد (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.processing_diversion
                      .organic_waste_composting_percent
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
          </div>

          {/* قسم: النفايات الخطرة */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              النفايات الخطرة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* كمية النفايات الطبية المُعالجة */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  كمية النفايات الطبية المُعالجة (طن/شهر):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={formData.hazardous_waste.medical_waste_tpm}
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.medical_waste_tpm",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* كمية المخلفات الإلكترونية المُجمعة */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  كمية المخلفات الإلكترونية المُجمعة (طن/شهر):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={formData.hazardous_waste.weee_collected_tpm}
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.weee_collected_tpm",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <h3 className="font-medium mt-6 text-gray-700">
              معالجة المخلفات الإلكترونية:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* نسبة المعالجة (تدوير/إعادة تأهيل) */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  نسبة المعالجة (تدوير/إعادة تأهيل) (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.hazardous_waste.weee_processing
                      .recycled_refurbished_percent
                  }
                  onChange={(e) =>
                    handleChange(
                      "hazardous_waste.weee_processing.recycled_refurbished_percent",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* نسبة المواد الخطرة التي تم التخلص منها بأمان */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  نسبة المواد الخطرة التي تم التخلص منها بأمان (%):
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.hazardous_waste.weee_processing
                      .hazardous_material_removed_percent
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
          </div>

          {/* قسم: المشاركة المجتمعية في الاقتصاد الدائري */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              المشاركة المجتمعية في الاقتصاد الدائري
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* عدد المبادرات المحلية النشطة */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  عدد المبادرات المحلية النشطة:
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.circular_economy_community_engagement
                      .number_of_active_local_initiatives
                  }
                  onChange={(e) =>
                    handleChange(
                      "circular_economy_community_engagement.number_of_active_local_initiatives",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <h3 className="font-medium mt-6 text-gray-700">
              فعاليات التوعية والتواصل:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* عدد الفعاليات */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">عدد الفعاليات:</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.circular_economy_community_engagement
                      .stakeholder_engagement.events_count
                  }
                  onChange={(e) =>
                    handleChange(
                      "circular_economy_community_engagement.stakeholder_engagement.events_count",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* عدد المشاركين التقديري */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  عدد المشاركين التقديري:
                </label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={
                    formData.circular_economy_community_engagement
                      .stakeholder_engagement.estimated_participants
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
          </div>
          {/* قسم الموقع الجغرافي */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h1 className="font-semibold mt-4 mb-2 text-xl">
              قسم الموقع الجغرافي{" "}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {/* خط العرض */}
              <div className="flex flex-col">
                <label className="font-semibold"> خط العرض (Latitude)</label>
                <input
                  type="number"
                  value={formData.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                  className="border p-2 rounded mt-1"
                />
              </div>

              {/* خط الطول */}
              <div className="flex flex-col">
                <label className="font-semibold">خط الطول (Longitude)</label>
                <input
                  type="number"
                  value={formData.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                  className="border p-2 rounded mt-1"
                />
              </div>
            </div>
          </div>
          <div></div>
          {/* زر الحفظ */}
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-r-lg transition duration-200"
            >
              حفظ
            </button>

            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-l-lg transition duration-200"
            >
              إرسال البيانات (Excel)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
