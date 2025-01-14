export function convertDateOneDayForward(date) {
  // Convert Date One Day Forward Because Of Time Zone Issues
  const dateArray = date.split('-');
  const year = dateArray[0];
  const month = parseInt(dateArray[1], 10) - 1;
  const date1 = dateArray[2];
  const dateObject = new Date(year, month, date1);

  return dateObject;
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
