import React, { useState } from "react";
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
          label: "Population",
          value:
            data.population.male +
            data.population.female +
            data.population.children +
            data.population.elderly,
          icon: <Users className="w-6 h-6 text-orange-950" />,
        },
        {
          label: "Hospitals",
          value: data.hospitals,
          icon: <Hospital className="w-6 h-6 text-red-500" />,
        },
        {
          label: "Hotels",
          value: data.hotels.green_star + data.hotels.non_green_star,
          icon: <Hotel className="w-6 h-6 text-green-500" />,
        },
        {
          label: "Diving centers",
          value: data.Diving_centres,
          icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
        },
      ];
    }

    switch (filter.section) {
      case "population":
        if (filter.population === "all") {
          return [
            {
              label: "Population",
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
              label: `${filter.population.charAt(0).toUpperCase() +
                filter.population.slice(1)
                } Population`,
              value: data.population[filter.population],
              icon: <Users className="w-6 h-6 text-orange-950" />,
            },
          ];
        }

      case "hospitals":
        return [
          {
            label: "Hospitals",
            value: data.hospitals,
            icon: <Hospital className="w-6 h-6 text-red-500" />,
          },
        ];

      case "hotels":
        return [
          {
            label: "Hotels",
            value: data.hotels.green_star + data.hotels.non_green_star,
            icon: <Hotel className="w-6 h-6 text-green-500" />,
          },
        ];

      case "Diving centres":
        return [
          {
            label: "Diving centres",
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
          <option value="all">All</option>
          <option value="population">Population</option>
          <option value="hospitals">Hospitals</option>
          <option value="hotels">Hotels</option>
          <option value="Diving centres">Diving centers</option>
        </select>

        {filter.section === "population" && (
          <select
            name="population"
            value={filter.population}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="children">Children</option>
            <option value="elderly">Elderly</option>
          </select>
        )}
        {/* زر التعديل */}
        <button
          onClick={() => navigate("/DashboardForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
        >
          Edit Sustainability Data
        </button>
      </form>

      {/* Cards and Bar Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
        {getCardData().map((item, index) => {
          const isPopulationCard = item.label
            .toLowerCase()
            .includes("population");
          return (
            <Card
              key={index}
              icon={item.icon}
              value={item.value}
              label={item.label}
            />
          );
        })}

        {/* Population Bar Chart */}
        {(filter.section === "population" || filter.section === "all") && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4">
            <CustomBarChart
              data={Object.entries(data.population).map(([key, value]) => ({
                group: key,
                count: value,
              }))}
              xKey="group"
              barKey="count"
              barColor="#60a5fa"
              title="Population Distribution"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardFilter;
