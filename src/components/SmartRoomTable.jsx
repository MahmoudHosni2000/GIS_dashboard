const SmartRoomTable = ({ data }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg w-full hover:shadow-xl transition">
    <h2 className="text-lg font-semibold mb-2">Smart Room Energy</h2>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th>Room</th>
          <th>Energy Usage</th>
          <th>Status</th>
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
