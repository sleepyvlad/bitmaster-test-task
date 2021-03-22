export default (date: Date): string => {
  const formattedDate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return formattedDate;
};
