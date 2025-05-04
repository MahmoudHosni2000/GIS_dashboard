import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomPieChart = ({ data, dataKey = "value", nameKey = "name", colors = [], title = "Pie Chart" }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">{title}</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
