import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import MapDash from "../components/MapDash";

const Biodiversity = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all");
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("biodiversityFormData");
    setMapData(storedData ? JSON.parse(storedData) : []);
    const parsedArray = storedData ? JSON.parse(storedData) : [];

    // دالة تجمع قيمة مفتاح معين عبر كل العناصر
    const sumKey = (arr, key) =>
      arr.reduce((sum, item) => sum + Number(item[key] || 0), 0);

    const transformed = {
      tourism_boats_daily: { siteA: sumKey(parsedArray, "dailyTouristBoats") },
      operational_moorings: { siteA: sumKey(parsedArray, "mooringPoints") },
      visitors_per_site: { siteA: sumKey(parsedArray, "visitorsPerSite") },

      coral_change_percent: sumKey(parsedArray, "coralChange"),
      trained_crew_percent: sumKey(parsedArray, "trainedCrew"),
      trained_guides_percent: sumKey(parsedArray, "trainedGuides"),
      eco_friendly_sports_percent: sumKey(parsedArray, "ecoWaterSports"),
      sustainability_incentives: sumKey(
        parsedArray,
        "sustainabilityIncentives"
      ),
      green_fins_growth_percent: sumKey(parsedArray, "greenFinsMembers"),
      green_fins_operator_incentives: sumKey(
        parsedArray,
        "greenFinsIncentives"
      ),
      reef_species_change_percent: sumKey(parsedArray, "reefSpeciesChange"),
      pa_trained_personnel_percent: sumKey(parsedArray, "paTrainedPersonnel"),
      pa_budget_growth_percent: sumKey(parsedArray, "paBudgetIncrease"),
      enforcement_patrols: sumKey(parsedArray, "enforcementPatrols"),
      enforcement_actions: sumKey(parsedArray, "patrolActions"),
      boats_with_holding_tanks: sumKey(parsedArray, "boatsWithSewageTanks"),
      nutrient_level_reduction_percent: sumKey(
        parsedArray,
        "seaNutrientDecrease"
      ),
      pump_out_facility_boats: sumKey(parsedArray, "boatsUsingLandFacilities"),
      effluent_quality_improvement_percent: sumKey(
        parsedArray,
        "dischargeSalinityDecrease"
      ),
      grey_water_reduction_percent: sumKey(
        parsedArray,
        "greyWaterUseReduction"
      ),
      reef_safe_product_operators: sumKey(
        parsedArray,
        "operatorsPromotingSafeProducts"
      ),
      marine_cleanups: sumKey(parsedArray, "marineCleanups"),
      coastal_damage_reports: sumKey(parsedArray, "coastalDamageReports"),
      illegal_fishing_reports: sumKey(parsedArray, "illegalFishingReports"),
      bird_mortality_decrease_percent: sumKey(
        parsedArray,
        "birdMortalityDecrease"
      ),
      bird_rehab_actions: sumKey(parsedArray, "birdRehabilitationCases"),
      protected_turtle_sites: sumKey(parsedArray, "turtleNestingSites"),
      rescued_turtles: sumKey(parsedArray, "turtlesRescued"),
    };

    setData(transformed);
    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const boatsData = Object.entries(data.tourism_boats_daily).map(
    ([site, value]) => ({ site, value })
  );
  const mooringsData = Object.entries(data.operational_moorings).map(
    ([site, value]) => ({ site, value })
  );
  const visitorsData = Object.entries(data.visitors_per_site).map(
    ([site, value]) => ({ site, value })
  );
  console.log(data);

  return (
    <>
      <Helmet>
        <title>التنوع البيولوجي | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]">
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للتنوع البيولوجي
          </h1>
          {/* أزرار الفلترة */}
          <div className="flex flex-col gap-2 text-right rtl" dir="rtl">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
            >
              <option value="all">الكل</option>
              <option value="tourism">السياحة</option>
              <option value="training">التدريب والممارسات البيئية</option>
              <option value="reef">الشعاب البحرية</option>
              <option value="conservation">جهود الحماية</option>
            </select>

            {/* زر التعديل */}
            <button
              onClick={() => navigate("/BiodiversityForm")}
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات التنوع البيولوجي
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          {/* باقي الصفحة - 1/3 */}
          <div
            className="col-span-1 space-y-6 overflow-y-auto max-h-screen pr-2"
            dir="ltr"
          >
            {/* المواقع السياحية */}
            {(filter === "all" || filter === "tourism") && (
              <>
                <h2 className="text-lg font-bold mb-2">المواقع السياحية</h2>
                <div className="grid grid-cols-1 gap-4">
                  <CustomBarChart
                    data={boatsData}
                    xKey="site"
                    barKey="value"
                    title="عدد القوارب السياحية اليومية"
                    barColor="#3b82f6"
                  />
                  <CustomBarChart
                    data={mooringsData}
                    xKey="site"
                    barKey="value"
                    title="مراسي صالحة للتشغيل"
                    barColor="#22c55e"
                  />
                  <CustomBarChart
                    data={visitorsData}
                    xKey="site"
                    barKey="value"
                    title="الزوار لكل موقع"
                    barColor="#facc15"
                  />
                </div>
              </>
            )}
            {/* التدريب والممارسات البيئية */}
            {(filter === "all" || filter === "training") && (
              <>
                <h2 className="text-lg font-bold mb-2">
                  التدريب والممارسات البيئية
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    title="تغير في الشعاب المرجانية"
                    value={data.coral_change_percent + "%"}
                  />
                  <StatCard
                    title="الطاقم المدرب"
                    value={data.trained_crew_percent + "%"}
                  />
                  <StatCard
                    title="المرشدون المدربون"
                    value={data.trained_guides_percent + "%"}
                  />
                  <StatCard
                    title="الرياضات المائية الصديقة للبيئة"
                    value={data.eco_friendly_sports_percent + "%"}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    title="حوافز الاستدامة"
                    value={data.sustainability_incentives}
                  />
                  <StatCard
                    title="نمو عضوية الزعانف الخضراء"
                    value={data.green_fins_growth_percent + "%"}
                  />
                  <StatCard
                    title="حوافز مشغلي الزعانف الخضراء"
                    value={data.green_fins_operator_incentives}
                  />
                </div>
              </>
            )}
            {/* تأثير الشعاب والبيئة البحرية */}
            {(filter === "all" || filter === "reef") && (
              <>
                <h2 className="text-lg font-bold mb-2">
                  تأثير الشعاب والبيئة البحرية
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    title="تغير أنواع الشعاب"
                    value={data.reef_species_change_percent + "%"}
                  />
                  <StatCard
                    title="الموظفون المدربون في المحميات"
                    value={data.pa_trained_personnel_percent + "%"}
                  />
                  <StatCard
                    title="نمو ميزانية المحميات"
                    value={data.pa_budget_growth_percent + "%"}
                  />
                  <StatCard
                    title="الدوريات الرقابية"
                    value={data.enforcement_patrols}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    title="قوارب بها خزانات صرف"
                    value={data.boats_with_holding_tanks}
                  />
                  <StatCard
                    title="خفض المغذيات"
                    value={data.nutrient_level_reduction_percent + "%"}
                  />
                  <StatCard
                    title="قوارب بها مرافق تفريغ"
                    value={data.pump_out_facility_boats}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    title="تحسين جودة مياه الصرف"
                    value={data.effluent_quality_improvement_percent + "%"}
                  />
                  <StatCard
                    title="خفض المياه الرمادية"
                    value={data.grey_water_reduction_percent + "%"}
                  />
                  <StatCard
                    title="مشغلو المنتجات الآمنة للشعاب"
                    value={data.reef_safe_product_operators}
                  />
                </div>
              </>
            )}
            {/* إجراءات الحماية */}
            {(filter === "all" || filter === "conservation") && (
              <>
                <h2 className="text-lg font-bold mb-2">إجراءات الحماية</h2>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    title="تنظيفات ساحلية وبحرية تطوعية"
                    value={data.marine_cleanups}
                  />
                  <StatCard
                    title="بلاغات الأضرار الساحلية"
                    value={data.coastal_damage_reports}
                  />
                  <StatCard
                    title="بلاغات الصيد غير القانوني"
                    value={data.illegal_fishing_reports}
                  />
                  <StatCard
                    title="إجراءات وإنفاذ الدوريات"
                    value={data.enforcement_actions}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    title="انخفاض وفيات الطيور"
                    value={data.bird_mortality_decrease_percent + "%"}
                  />
                  <StatCard
                    title="إجراءات إعادة تأهيل الطيور"
                    value={data.bird_rehab_actions}
                  />
                  <StatCard
                    title="مواقع تعشيش السلاحف المحمية"
                    value={data.protected_turtle_sites}
                  />
                  <StatCard
                    title="السلاحف المُنقذة"
                    value={data.rescued_turtles}
                  />
                </div>
              </>
            )}
          </div>

          {/* العمود الخاص بالخريطة - 2/3 */}
          <div className="col-span-2 h-full rounded-xl leaflet-container !bg-transparent">
            <MapDash initialData={mapData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Biodiversity;
