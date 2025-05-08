import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Users, Hospital, Hotel, BatteryCharging } from "lucide-react";
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
            data.population.male +
            data.population.female +
            data.population.children +
            data.population.elderly,
          icon: <Users className="w-6 h-6 text-orange-950" />,
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
          value: data.Diving_centres,
          icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
        },
      ];
    }

    switch (filter.section) {
      case "population":
        const populationLabels = {
          male: "عدد الذكور",
          female: "عدد الإناث",
          children: "عدد الأطفال",
          elderly: "عدد كبار السن",
        };

        if (filter.population === "all") {
          return [
            {
              label: "عدد السكان",
              value:
                data.population.male +
                data.population.female +
                data.population.children +
                data.population.elderly,
              icon: <Users className="w-6 h-6 text-orange-950" />,
            },
          ];
        } else {
          return [
            {
              label: populationLabels[filter.population] || "عدد السكان",
              value: data.population[filter.population],
              icon: <Users className="w-6 h-6 text-orange-950" />,
            },
          ];
        }

      case "hospitals":
        return [
          {
            label: "المستشفيات",
            value: data.hospitals,
            icon: <Hospital className="w-6 h-6 text-red-500" />,
          },
        ];

      case "hotels":
        return [
          {
            label: "الفنادق",
            value: data.hotels.green_star + data.hotels.non_green_star,
            icon: <Hotel className="w-6 h-6 text-green-500" />,
          },
        ];

      case "Diving centres":
        return [
          {
            label: "مراكز الغوص",
            value: data.Diving_centres,
            icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
          },
        ];

      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <select
          name="section"
          value={filter.section}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">الكل</option>
          <option value="population">عدد السكان</option>
          <option value="hospitals">المستشفيات</option>
          <option value="hotels">الفنادق</option>
          <option value="Diving centres">مراكز الغوص</option>
        </select>

        {filter.section === "population" && (
          <select
            name="population"
            value={filter.population}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">الكل</option>
            <option value="male">ذكور</option>
            <option value="female">إناث</option>
            <option value="children">أطفال</option>
            <option value="elderly">كبار السن</option>
          </select>
        )}

        <button
          onClick={() => navigate("/DashboardForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
        >
          تعديل البيانات
        </button>
      </form>

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

        {data && (filter.section === "population" || filter.section === "all") && (
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

    </div>
  );
};

export default DashboardFilter;
