const Card = ({ icon, value, label }) => {
  return (
    <div className="bg-white w-auto rounded-xl shadow-lg flex items-center justify-between p-4 hover:shadow-xl transition">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
        {icon}
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">{value}</h1>
        <span className="text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default Card;
