export const formatDate = (isoDate: Date) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois sont indexés de 0 à 11
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
