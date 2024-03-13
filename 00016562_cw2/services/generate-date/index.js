export const generateCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
