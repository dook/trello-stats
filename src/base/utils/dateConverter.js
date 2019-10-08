export const convertDate = (date) => {
  const currDay = date.getDate();
  const currMonth = date.getMonth() + 1;
  const day = currDay > 9 ? currDay : `0${currDay}`;
  const month = currMonth > 9 ? currMonth : `0${currMonth}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
