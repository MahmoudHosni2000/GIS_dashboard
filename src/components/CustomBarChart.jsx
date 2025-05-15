import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({
  data,
  xKey = "name",
  barKey = "value",
  title = "Waste Trends",
  barColor = "#8884d8",
  colors = [],
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 👇 check if HTML has class "dark" (Tailwind default)
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDark(); // أول مرة

    // لو فيه تغيير في الثيم
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const processedData = data.map((entry) => ({
    ...entry,
    [barKey]: Number(entry[barKey]),
  }));

  const axisColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <div className="dark:bg-gray-600 dark:text-white bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition">
      <h2 className="font-bold mb-2">{title}</h2>
      <div dir="ltr" className="w-full h-[10rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: axisColor }}
            />
            <YAxis
              tick={{ fill: axisColor }}
            />
            <Tooltip />
            <Bar
              dataKey={barKey}
              fill={colors.length === data.length ? undefined : barColor}
            >
              {colors.length === data.length &&
                colors.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
