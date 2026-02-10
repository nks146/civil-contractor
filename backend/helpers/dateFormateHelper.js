// Format dates to 'YYYY-MM-DD'
    const formatDate = (date) => {
      if (!date) return null;
      return new Date(date).toISOString().slice(0, 10);
    };

// Helper to format date to 'DD-MM-YYYY'
function toDDMMYYYY(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

module.exports = {
    formatDate,
    toDDMMYYYY
};