import { useState } from "react";
import { validateWorker } from "../../utils/validation";
import { handleNameChange, handleContactChange, handleRateChange } from "../../utils/inputValidation";

export default function WorkerForm({ onSubmit, initialData = {} }) {
  const [errors, setError] = useState("");
  const [formData, setFormData] = useState({
    worker_name: "",
    address: "",
    contact: "",
    status: "Active",
    base_rate: "",
    expertise: "Labour",
    custom_expertise: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors =
    validateWorker(formData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const expertise =
      formData.expertise === "Other"
        ? formData.custom_expertise.trim()
        : formData.expertise;

    setError("");
    onSubmit({
      worker_name: formData.worker_name.trim(),
      address: formData.address,
      contact: formData.contact,
      status: formData.status,
      base_rate: formData.base_rate,
      expertise,
    });
  };

  return(
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="worker_name"
        placeholder="Worker Name"
        value={formData.worker_name || ""}
        onChange={(e) => handleNameChange(e, setFormData)}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />
      {errors.worker_name && (
        <p className="text-red-400 text-sm mt-1">
          {errors.worker_name}
        </p>
      )}
      <textarea 
        name="address"
        placeholder="Address"
        value={formData.address || ""}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />
      {errors.address && (
        <p className="text-red-400 text-sm mt-1">
          {errors.address}
        </p>
      )}
      <input
        type="text"
        name="contact"
        placeholder="Mobile Number"
        value={formData.contact || ""}
        onChange={(e) => handleContactChange(e, setFormData)}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />
      {errors.contact && (
        <p className="text-red-400 text-sm mt-1">
          {errors.contact}
        </p>
      )}
      <div>
        <label className="block text-gray-300 mb-2">
          Status
        </label>

        <select
          name="status"
          value={formData.status || "Active"}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
        >
          <option value="Active">Active</option>
          <option value="Engaged">Engaged</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>  
      <input
        type="number"
        name="base_rate"
        placeholder="Daily Rate"
        value={formData.base_rate || ""}
        onChange={(e) => handleRateChange(e, setFormData)}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
      />
      {errors.base_rate && (
        <p className="text-red-400 text-sm mt-1">
          {errors.base_rate}
        </p>
      )}
      <div>
        <label className="block text-gray-300 mb-2">
          Expertise
        </label>

        <select
          name="expertise"
          value={formData.expertise || ""}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
        >
          <option value="">Select Expertise</option>
          <option value="Labour">Labour</option>
          <option value="Mason">Mason</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Welder">Welder</option>
          <option value="Helper">Helper</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {formData.expertise === "Other" && (
        <input
          type="text"
          name="custom_expertise"
          placeholder="Enter Expertise"
          value={formData.custom_expertise || ""}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white mt-3"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white"
      >
        Save Worker
      </button>

    </form>

  );

}
