export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
