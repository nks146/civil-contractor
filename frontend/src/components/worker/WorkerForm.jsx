export default function WorkerForm({
  formData={},
  handleChange,
  handleSubmit
}) {

  return(

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        type="text"
        name="name"
        placeholder="Worker Name"
        value={formData.name || ""}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile || ""}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address || ""}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />

      <input
        type="number"
        name="daily_rate"
        placeholder="Daily Rate"
        value={formData.daily_rate || ""}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white"
      >
        Save Worker
      </button>

    </form>

  );

}