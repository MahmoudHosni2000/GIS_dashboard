const StatCard = ({ title, value, className = "" }) => (
  <div
    className={`dark:bg-dark dark:text-white bg-white h-auto rounded-lg shadow p-4 text-center ${className}`}
  >
    <h4 className="text-xs sm:text-xs md:text-sm text-gray-500 dark:text-[#9ca3af]">
      {title}
    </h4>
    <p className="text-xs sm:text-sm md:text-base font-bold text-indigo-600 dark:text-white">
      {value}
    </p>
  </div>
);

export default StatCard;
