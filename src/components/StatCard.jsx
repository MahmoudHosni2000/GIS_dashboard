const StatCard = ({ title, value }) => (
  <div className="dark:bg-gray-600 dark:text-white bg-white h-auto rounded-lg shadow p-4 text-center">
    <h4 className="text-gray-500 text-sm dark:text-[#9ca3af]">{title}</h4>
    <p className="text-2xl font-bold text-indigo-600 dark:text-white">{value}</p>
  </div>
);

export default StatCard;
