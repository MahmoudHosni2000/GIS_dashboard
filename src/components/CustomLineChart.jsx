import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomLineChart = ({
  data,
  xKey = "month",
  yKeys = [],
  title = "الرسم البياني",
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

  const axisColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <div className="dark:bg-dark dark:text-white bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="w-full h-[10rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis
              dataKey={xKey}
              tick={{
                fill: axisColor,
              }}
            />
            <YAxis
              tick={{
                fill: axisColor,
              }}
            />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={key.name}
                stroke={key.color}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomLineChart;
