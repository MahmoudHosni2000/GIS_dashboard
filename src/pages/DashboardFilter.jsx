import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Users, Hospital, Hotel, WavesLadder } from "lucide-react";
import CustomBarChart from "../components/CustomBarChart";

const DashboardFilter = ({ data, filter, setFilter }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getCardData = () => {
    if (!data) return [];

    if (filter.section === "all") {
      return [
        {
          label: "عدد السكان",
          value:
            data.population?.ذكور +
            data.population?.إناث +
            data.population?.أطفال +
            data.population?.مُسنين,
          icon: <Users className="w-6 h-6 text-orange-900" />,
        },
        {
          label: "المستشفيات",
          value: data.hospitals,
          icon: <Hospital className="w-6 h-6 text-red-500" />,
        },
        {
          label: "الفنادق",
          value: data.hotels.green_star + data.hotels.non_green_star,
          icon: <Hotel className="w-6 h-6 text-green-500" />,
        },
        {
          label: "مراكز الغوص",
          value:
            data.Diving_centres.divingCentersGreen +
            data.Diving_centres.divingCentersNotGreen,
          icon: <WavesLadder className="w-6 h-6 text-green-600" />,
        },
      ];
    }

    switch (filter.section) {
      case "population": {
        const populationLabels = {
          ذكور: "عدد الذكور",
          إناث: "عدد الإناث",
          أطفال: "عدد الأطفال",
          مُسنين: "عدد كبار السن",
        };

        if (filter.population === "all") {
          return [
            {
              label: "عدد السكان",
              value:
                data.population?.إناث +
                data.population?.ذكور +
                data.population?.أطفال +
                data.population?.مُسنين,
              icon: <Users className="w-6 h-6 text-orange-900" />,
            },
          ];
        }

        return [
          {
            label: populationLabels[filter.population] || "عدد السكان",
            value: data.population?.[filter.population] ?? 0,
            icon: <Users className="w-6 h-6 text-orange-900" />,
          },
        ];
      }

      case "hospitals":
        return [
          {
            label: "المستشفيات",
            value: data.hospitals ?? 0,
            icon: <Hospital className="w-6 h-6 text-red-500" />,
          },
        ];

      case "hotels":
        return [
          {
            label: "الفنادق",
            value:
              (data.hotels?.green_star || 0) +
              (data.hotels?.non_green_star || 0),
            icon: <Hotel className="w-6 h-6 text-green-500" />,
          },
        ];

      case "diving_centres": {
        const green = data.Diving_centres?.divingCentersGreen || 0;
        const notGreen = data.Diving_centres?.divingCentersNotGreen || 0;

        if (filter.diving_centres === "green") {
          return [
            {
              label: "زعانف خضراء",
              value: green,
              icon: <WavesLadder className="w-6 h-6 text-green-600" />,
            },
          ];
        } else if (filter.diving_centres === "notGreen") {
          return [
            {
              label: "زعانف غير خضراء",
              value: notGreen,
              icon: <WavesLadder className="w-6 h-6 text-green-600" />,
            },
          ];
        }

        return [
          {
            label: "مراكز الغوص",
            value: green + notGreen,
            icon: <WavesLadder className="w-6 h-6 text-green-600" />,
          },
        ];
      }

      default:
        return [];
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-right" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
          <span>لوحة مؤشرات الأداء العام للإجماليات</span>
        </h1>
        {/* Filters */}
        <div className="flex flex-col gap-2 text-right rtl">
          <select
            name="section"
            value={filter.section}
            onChange={handleChange}
            className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
          >
            <option value="all">الكل</option>
            <option value="population">عدد السكان</option>
            <option value="hospitals">المستشفيات</option>
            <option value="hotels">الفنادق</option>
            <option value="diving_centres">مراكز الغوص</option>
          </select>

          {filter.section === "population" && (
            <select
              name="population"
              value={filter.population}
              onChange={handleChange}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
            >
              <option value="all">الكل</option>
              <option value="ذكور">ذكور</option>
              <option value="إناث">إناث</option>
              <option value="أطفال">أطفال</option>
              <option value="مُسنين">كبار السن</option>
            </select>
          )}
          {/*  */}
          {filter.section === "diving_centres" && (
            <select
              name="diving_centres"
              value={filter.diving_centres}
              onChange={handleChange}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
            >
              <option value="all">الكل</option>
              <option value="green">زعانف خضراء</option>
              <option value="notGreen">زعانف غير خضراء</option>
            </select>
          )}
          {/*  */}
          <button
            onClick={() => navigate("/DashboardForm")}
            className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
          >
            تعديل البيانات
          </button>
        </div>
      </div>
      {/* Cards and Bar Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {getCardData().map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}

        {data &&
          (filter.section === "population" || filter.section === "all") && (
            <div className="col-span-full">
              <CustomBarChart
                data={
                  filter.section === "population" && filter.population !== "all"
                    ? [
                        {
                          group: filter.population,
                          count: data.population[filter.population],
                        },
                      ]
                    : Object.entries(data.population).map(([key, value]) => ({
                        group: key,
                        count: value,
                      }))
                }
                xKey="group"
                barKey="count"
                barColor="#60a5fa"
                title="توزيع السكان"
              />
            </div>
          )}
      </div>
    </>
  );
};

export default DashboardFilter;