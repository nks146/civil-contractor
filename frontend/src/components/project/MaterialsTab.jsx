export default function MaterialsTab({ materials }) {

 return (

  <div className="bg-gray-800 border border-gray-700 rounded-xl">

   <table className="w-full">

    <thead className="bg-gray-700">

     <tr className="text-gray-300 text-sm">

      <th className="p-3">Material</th>
      <th className="p-3">Qty</th>
      <th className="p-3">Unit</th>
      <th className="p-3">Rate</th>
      <th className="p-3">Total</th>

     </tr>

    </thead>

    <tbody>

     {materials.map(m => (

      <tr
       key={m.id}
       className="border-t border-gray-700 hover:bg-gray-700"
      >

       <td className="p-3">{m.name}</td>
       <td className="p-3">{m.qty}</td>
       <td className="p-3">{m.unit}</td>
       <td className="p-3">₹{m.rate}</td>
       <td className="p-3">₹{m.total}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 );
}