export default function ProjectSummaryCards({ summary }) {

  const cards = [
    { label: "Workers", value: summary.workers },
    { label: "Labour Cost", value: `₹${summary.labourCost}` },
    { label: "Materials Cost", value: `₹${summary.materialCost}` },
    { label: "Other Expenses", value: `₹${summary.otherExpenses}` },
    { label: "Total Expenses", value: `₹${summary.totalExpenses}` }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

      {cards.map(card => (

        <div
          key={card.label}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4"
        >
          <p className="text-gray-400 text-sm">
            {card.label}
          </p>

          <h3 className="text-xl text-white mt-1 font-semibold">
            {card.value}
          </h3>

        </div>

      ))}

    </div>
  );
}