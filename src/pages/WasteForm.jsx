import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const WasteForm = () => {
  const navigate = useNavigate();
  // تحميل البيانات من localStorage إذا كانت موجودة
  const getStoredData = () => {
    const storedData = localStorage.getItem("wasteFormData");
    return storedData ? JSON.parse(storedData) : {};
  };

  const [formData, setFormData] = useState(getStoredData);

  // تحديث البيانات في localStorage عند تغيرها
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem("wasteFormData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("بيانات النموذج تم إرسالها:", formData);
    // يمكن هنا إرسال البيانات إلى السيرفر أو أي مكان آخر
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>نموذج إدارة النفايات | لوحة معلومات GIS</title>
      </Helmet>

      <div className="max-w-4xl rounded-lg">
      <img
          class="form-logo"
          src="https://img.icons8.com/?size=100&id=XnbI8TA0Z0ug&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5">
          تطبيق إضافة وتحديث بيانات النفايات
        </h1>{" "}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="msw" className="block text-lg font-semibold mb-2">
                إجمالي النفايات المنتجة (طن/يوم)
              </label>
              <input
                type="number"
                id="msw"
                name="msw"
                value={formData.msw || ""}
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
                نفايات الإنشاء (طن/يوم)
              </label>
              <input
                type="number"
                id="cndWaste"
                name="cndWaste"
                value={formData.cndWaste || ""}
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
                نفايات أخرى (طن/يوم)
              </label>
              <input
                type="number"
                id="otherWaste"
                name="otherWaste"
                value={formData.otherWaste || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="recyclableWaste"
                className="block text-lg font-semibold mb-2"
              >
                النفايات القابلة لإعادة التدوير المنتجة (طن/يوم)
              </label>
              <input
                type="number"
                id="recyclableWaste"
                name="recyclableWaste"
                value={formData.recyclableWaste || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="collectionEfficiency"
                className="block text-lg font-semibold mb-2"
              >
                كفاءة الجمع (%)
              </label>
              <input
                type="number"
                id="collectionEfficiency"
                name="collectionEfficiency"
                value={formData.collectionEfficiency || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="overflowRate"
                className="block text-lg font-semibold mb-2"
              >
                معدل فيضان الحاويات المفتوحة (%)
              </label>
              <input
                type="number"
                id="overflowRate"
                name="overflowRate"
                value={formData.overflowRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="diversionRate"
                className="block text-lg font-semibold mb-2"
              >
                معدل التحويل الكلي (%)
              </label>
              <input
                type="number"
                id="diversionRate"
                name="diversionRate"
                value={formData.diversionRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="biodiesel"
                className="block text-lg font-semibold mb-2"
              >
                إنتاج البيوديزل من زيت الطهي المستخدم (لتر/شهر)
              </label>
              <input
                type="number"
                id="biodiesel"
                name="biodiesel"
                value={formData.biodiesel || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="recyclingRate"
                className="block text-lg font-semibold mb-2"
              >
                معدل إعادة التدوير الكلي (%)
              </label>
              <input
                type="number"
                id="recyclingRate"
                name="recyclingRate"
                value={formData.recyclingRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sourceSegregation"
                className="block text-lg font-semibold mb-2"
              >
                أداء الفرز من المصدر - معدل المشاركة (%)
              </label>
              <input
                type="number"
                id="sourceSegregation"
                name="sourceSegregation"
                value={formData.sourceSegregation || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="compostingRate"
                className="block text-lg font-semibold mb-2"
              >
                معدل تسميد النفايات العضوية (%)
              </label>
              <input
                type="number"
                id="compostingRate"
                name="compostingRate"
                value={formData.compostingRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="medicalWaste"
                className="block text-lg font-semibold mb-2"
              >
                النفايات الطبية المجموعة (طن/شهر)
              </label>
              <input
                type="number"
                id="medicalWaste"
                name="medicalWaste"
                value={formData.medicalWaste || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weeeCollected"
                className="block text-lg font-semibold mb-2"
              >
                النفايات الإلكترونية (WEEE) المجموعة (طن/شهر)
              </label>
              <input
                type="number"
                id="weeeCollected"
                name="weeeCollected"
                value={formData.weeeCollected || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hazardousWasteRecyclingRate"
                className="block text-lg font-semibold mb-2"
              >
                معدل إعادة تدوير النفايات الخطرة (%)
              </label>
              <input
                type="number"
                id="hazardousWasteRecyclingRate"
                name="hazardousWasteRecyclingRate"
                value={formData.hazardousWasteRecyclingRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hazardousWasteRemovalRate"
                className="block text-lg font-semibold mb-2"
              >
                نسبة المواد الخطرة التي تمت إزالتها (%)
              </label>
              <input
                type="number"
                id="hazardousWasteRemovalRate"
                name="hazardousWasteRemovalRate"
                value={formData.hazardousWasteRemovalRate || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="localInitiatives"
                className="block text-lg font-semibold mb-2"
              >
                عدد المبادرات المحلية النشطة
              </label>
              <input
                type="number"
                id="localInitiatives"
                name="localInitiatives"
                value={formData.localInitiatives || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700"
                required
              />
            </div>
            <div>
              <label
                htmlFor="communityEvents"
                className="block text-lg font-semibold mb-2"
              >
                عدد فعاليات المشاركة المجتمعية
              </label>
              <input
                type="number"
                id="communityEvents"
                name="communityEvents"
                value={formData.communityEvents || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
                required
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/waste")}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg  focus:outline-none focus:ring-2"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WasteForm;
