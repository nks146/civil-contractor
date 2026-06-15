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