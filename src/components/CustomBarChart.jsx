import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomBarChart = ({ data, xKey = "day", barKey = "waste", barColor = "#8884d8", title = "Waste Trends" }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="w-full h-[10rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={barKey} fill={barColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
