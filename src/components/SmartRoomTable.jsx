const SmartRoomTable = ({ data }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition" dir="rtl">
    <h2 className="text-lg font-semibold mb-2 text-right">استهلاك الطاقة في الغرف الذكية</h2>
    <table className="w-full text-sm text-right">
      <thead>
        <tr className="border-b">
          <th>الغرفة</th>
          <th>استهلاك الطاقة</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        {data.map((room, i) => (
          <tr key={i} className="border-b">
            <td>{room.room}</td>
            <td>{room.energy_usage}</td>
            <td>{room.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SmartRoomTable;
