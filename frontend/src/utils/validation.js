//Validation for project form
export const validateAddProject = (data) => {
  if (!data.project_name) return "Project name is required";
  if (!data.location) return "Location is required";
  if (!data.start_date) return "Start date is required";

  if (data.status === "Hold" && !data.hold_reason) {
    return "Hold reason is required when status is Hold";
  }

  return null;
};

//Validation for worker form
export const validateWorker = (formData) => {
  const errors = {};

  // Worker Name
  if (!formData.worker_name?.trim()) {
    errors.worker_name = "Worker name is required";
  } else if (formData.worker_name.length < 3) {
    errors.worker_name = "Minimum 3 characters required";
  } else if (formData.worker_name.length > 100) {
    errors.worker_name = "Maximum 100 characters allowed";
  }

  // Contact
  if (!formData.contact?.trim()) {
    errors.contact = "Contact number is required";
  } else if (!/^\d{10}$/.test(formData.contact)) {
    errors.contact = "Contact must be exactly 10 digits";
  }

  // Address
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.length < 5) {
    errors.address = "Minimum 5 characters required";
  } else if (formData.address.length > 255) {
    errors.address = "Maximum 255 characters allowed";
  }

  // Base Rate
  if (!formData.base_rate) {
    errors.base_rate = "Base rate is required";
  } else if (Number(formData.base_rate) <= 0) {
    errors.base_rate = "Base rate must be greater than 0";
  } else if (String(formData.base_rate).length > 4) {
    errors.base_rate = "Maximum 4 digits allowed";
  }

  if (formData.expertise === "Other" && !formData.custom_expertise?.trim()) {
    errors.custom_expertise = "Custom expertise is required";
  }

  return errors;
};

// Name (letters + spaces only)
export const handleNameChange = (e, setFormData) => {
  const value = e.target.value;

  if (/^[A-Za-z\s]*$/.test(value)) {
    setFormData(prev => ({
      ...prev,
      worker_name: value,
    }));
  }
};

// Mobile (10 digits only)
export const handleContactChange = (e, setFormData) => {
  const value = e.target.value.replace(/\D/g, "");

  if (value.length <= 10) {
    setFormData(prev => ({
      ...prev,
      contact: value,
    }));
  }
};

// Base Rate (numbers only)
export const handleRateChange = (e, setFormData) => {
  const value = e.target.value.replace(/\D/g, "");
  if (value.length <= 4) {
    setFormData(prev => ({
      ...prev,
      base_rate: value,
    }));
  }
};
