import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_COLORS = ["#4ade80", "#f87171", "#60a5fa"];

const renderCustomLabel = ({ percent }) =>
  percent > 0.03 ? `${(percent * 100).toFixed(1)}%` : ""; // إخفاء القيم الأقل من 3%

const CustomPieChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  colors = DEFAULT_COLORS,
  title = "Pie Chart",
}) => {
  const processedData = data.map((entry) => ({
    ...entry,
    [dataKey]: Number(entry[dataKey]),
  }));
  console.log(data);

  return (
    <div className="dark:bg-dark dark:text-white bg-white p-2 rounded-xl shadow h-full w-full max-w-[500px] mx-auto">
      <h2 className="font-bold mb-2 text-center text-sm">{title}</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              labelLine={false}
              label={renderCustomLabel}
              dataKey={dataKey}
              nameKey={nameKey}
              minAngle={10}
            >
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} وحدة`} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px", // ✅ قللت الخط هنا
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;
