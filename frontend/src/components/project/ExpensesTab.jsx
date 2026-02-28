export default function ExpensesTab({ expenses }) {

 return (

  <div className="bg-gray-800 border border-gray-700 rounded-xl">

   <table className="w-full">

    <thead className="bg-gray-700">

     <tr className="text-gray-300 text-sm">

      <th className="p-3">Expense</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Date</th>
      <th className="p-3">Notes</th>
      <th className="p-3">Created</th>

     </tr>

    </thead>

    <tbody>

     {expenses.map(e => (

      <tr
       key={e.id}
       className="border-t border-gray-700 hover:bg-gray-700"
      >

       <td className="p-3">{e.name}</td>
       <td className="p-3">₹{e.amount}</td>
       <td className="p-3">{e.date}</td>
       <td className="p-3">{e.notes}</td>
       <td className="p-3">{e.created}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 );
}