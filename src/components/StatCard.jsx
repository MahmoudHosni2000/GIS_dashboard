const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <h4 className="text-gray-500 text-sm">{title}</h4>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);

export default StatCard;
