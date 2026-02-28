export default function WorkersTab({ workers }) {

 return (

  <div className="bg-gray-800 border border-gray-700 rounded-xl">

   <table className="w-full">

    <thead className="bg-gray-700">

     <tr className="text-left text-gray-300 text-sm">

      <th className="p-3">Worker</th>
      <th className="p-3">Rate</th>
      <th className="p-3">Days</th>
      <th className="p-3">Total Cost</th>

     </tr>

    </thead>

    <tbody>

     {workers.map(w=> (

      <tr
       key={w.id}
       className="border-t border-gray-700 hover:bg-gray-700"
      >

       <td className="p-3 text-blue-400">

        <a href={`/attendance/${w.id}`}>
         {w.name}
        </a>

       </td>

       <td className="p-3">₹{w.rate}</td>
       <td className="p-3">{w.days}</td>
       <td className="p-3">₹{w.total}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 );
}