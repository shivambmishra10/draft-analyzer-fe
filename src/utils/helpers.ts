// Utility function to remove empty string or undefined fields
export const removeEmptyFields = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '' && v !== undefined && v !== null)
  );
};
