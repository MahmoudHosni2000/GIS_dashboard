import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomLineChart = ({ data, xKey = "month", yKeys = [], title = "الرسم البياني" }) => {
  return (
    <div className="dark:bg-gray-600 dark:text-white bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="w-full h-[10rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Line key={index} type="monotone" dataKey={key.name} stroke={key.color} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomLineChart;
