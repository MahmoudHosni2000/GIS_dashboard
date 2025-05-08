import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DEFAULT_COLORS = ['#4ade80', '#f87171', '#60a5fa'];

const renderCustomLabel = ({ percent, name }) =>
  percent > 0.03 ? `${(percent * 100).toFixed(1)}%` : ''; // إخفاء القيم الأقل من 3%

const CustomPieChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  colors = DEFAULT_COLORS,
  title = "Pie Chart"
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold mb-2 text-center">{title}</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
          label={renderCustomLabel}
          dataKey={dataKey}
          nameKey={nameKey}
          minAngle={10}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} وحدة`} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
