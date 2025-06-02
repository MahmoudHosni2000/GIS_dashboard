import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Card = ({ icon, value, label, onClick, percentage }) => {
  const percentNumber = parseFloat(percentage);
  const isPositive = percentNumber >= 0;

  return (
    <div
      onClick={onClick}
      className="dark:bg-dark dark:text-white bg-white rounded-xl shadow-md hover:shadow-xl transition p-2 flex flex-col sm:flex-row items-center sm:justify-between gap-3 w-full h-auto"
    >
      <div className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-900 text-base sm:text-sm shrink-0">
        {icon}
      </div>

      <div className="text-center flex flex-col items-center flex-grow">
        <h1 className="text-sm sm:text-base md:text-base font-bold text-gray-800 dark:text-white">
          {value}
        </h1>

        {percentage != null && (
          <p
            className={`flex items-center gap-1 font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            } text-[10px] sm:text-xs md:text-sm`}
          >
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(percentNumber).toFixed(2)}%
          </p>
        )}

        <span className="text-gray-500 dark:text-[#9ca3af] text-[8px] sm:text-[10px] md:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
};

export default Card;
