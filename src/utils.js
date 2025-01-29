import Fraction from 'fraction.js';

export const toFraction = num => new Fraction(num).toFraction(true);

export function convertDateOneDayForward(date) {
  // Convert Date One Day Forward Because Of Time Zone Issues
  const dateArray = date.split('-');
  const year = dateArray[0];
  const month = parseInt(dateArray[1], 10) - 1;
  const date1 = dateArray[2];
  const dateObject = new Date(year, month, date1);

  // dateObject.setHours(4, 0, 0, 0);

  // console.log(dateObject);

  return dateObject;
}

export function formatDate(date) {
  return Intl.DateTimeFormat('en-US').format(
    new Date(convertDateOneDayForward(date))
  );
}

export function turnMapIntoArray(stateOwners) {
  const ownersArray = Array.from(stateOwners.entries());

  const singleOwnersArray = ownersArray.map(owner => {
    const [id, item] = owner;
    return item;
  });

  return singleOwnersArray;
}

export function getCurrentOwner(stateOwners, owner) {
  const ownersArray = turnMapIntoArray(stateOwners);

  const currentOwnerFromArray = ownersArray.find(item => item.name === owner);

  return currentOwnerFromArray;
}

export function setLocalStorage(items) {
  localStorage.setItem('owners', JSON.stringify(items));
}

export function getLocalStorage() {
  const defaultList = JSON.parse(localStorage.getItem('owners') || '[]');
  return defaultList;
}

export const fixName = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
    .join(' ');
