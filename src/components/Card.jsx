import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Card = ({ icon, value, label, onClick, percentage }) => {
  const percentNumber = parseFloat(percentage); // تحويل النسبة إلى رقم

  const isPositive = percentNumber >= 0;

  return (
    <div
      onClick={onClick}
      className=" dark:bg-gray-600 dark:text-white bg-white h-auto rounded-xl shadow-lg flex items-center justify-between p-4 hover:shadow-xl transition"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-900">
        {icon}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h1>

        {percentage != null && (
          <p
            className={`text-sm flex items-center justify-center gap-1 font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(percentNumber).toFixed(2)}%  {/* عرض أول 2 أرقام عشرية فقط */}
          </p>
        )}

        <span className="text-gray-500 dark:text-[#9ca3af]">{label}</span>
      </div>
    </div>
  );
};

export default Card;
