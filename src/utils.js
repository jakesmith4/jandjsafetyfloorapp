export function convertDateOneDayForward(date) {
  // Convert Date One Day Forward Because Of Time Zone Issues
  const dateArray = date.split('-');
  const year = dateArray[0];
  const month = parseInt(dateArray[1], 10) - 1;
  const date1 = dateArray[2];
  const dateObject = new Date(year, month, date1);

  return dateObject;
}
