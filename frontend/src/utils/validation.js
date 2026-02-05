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
