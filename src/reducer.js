import { nanoid } from 'nanoid';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_HOME,
  OPEN_CURRENT_OWNER,
  OPEN_CURRENT_JOB,
  ADD_OWNER,
  REMOVE_OWNER,
  EDIT_OWNER,
  EDIT_JOB,
  DELETE_JOB,
  CHANGE_NEW_OWNER_INFO,
  SET_CURRENT_OWNER,
  ADD_JOB_TO_CURRENT_OWNER,
  OPEN_CURRENT_OWNER_FORM,
  CLOSE_CURRENT_OWNER_FORM,
  OPEN_ADD_OWNER_FORM,
  CLOSE_ADD_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
  OPEN_SEARCH_JOBS,
  MARK_JOB_AS_COMPLETED,
  SEARCH_JOB,
} from './actions';

import {
  convertDateOneDayForward,
  fixName,
  getCurrentOwner,
  setLocalStorage,
  turnMapIntoArray,
} from './utils';

import { toast } from 'react-toastify';

const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }

  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }

  if (action.type === OPEN_CURRENT_OWNER_FORM) {
    return { ...state, isCurrentOwnerFormOpen: true };
  }

  if (action.type === CLOSE_CURRENT_OWNER_FORM) {
    return { ...state, isCurrentOwnerFormOpen: false };
  }

  if (action.type === OPEN_ADD_OWNER_FORM) {
    return { ...state, isAddOwnerFormOpen: true };
  }

  if (action.type === CLOSE_ADD_OWNER_FORM) {
    return { ...state, isAddOwnerFormOpen: false };
  }

  if (action.type === OPEN_HOME) {
    return {
      ...state,
      isHomeOpen: true,
      isCurrentOwnerOpen: false,
      isCurrentJobOpen: false,
      isSearchJobsOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_OWNER) {
    return {
      ...state,
      isCurrentOwnerOpen: true,
      isHomeOpen: false,
      isCurrentJobOpen: false,
      isSearchJobsOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_JOB) {
    return {
      ...state,
      isCurrentJobOpen: true,
      isHomeOpen: false,
      isCurrentOwnerOpen: false,
      isSearchJobsOpen: false,
    };
  }

  if (action.type === OPEN_SEARCH_JOBS) {
    return {
      ...state,
      isSearchJobsOpen: true,
      isCurrentJobOpen: false,
      isHomeOpen: false,
      isCurrentOwnerOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === REMOVE_OWNER) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this owner?`
    );
    if (confirmed) {
      // USE THIS ID TO DELETE THE OWNER NOT THE ACTION.PAYLOAD.ID

      const newOwners = new Map(state.owners);
      newOwners.delete(action.payload.id);

      // Set Local Storage
      const ownersArray = turnMapIntoArray(newOwners);
      setLocalStorage(ownersArray);

      toast.error(`"${fixName(action.payload.name)}" removed`);

      return { ...state, owners: newOwners };
    }
    return { ...state };
  }

  if (action.type === ADD_OWNER) {
    action.payload.e.preventDefault();
    const { newOwnerName, newOwnerPrice, newOwnerAmount } = state;
    const newOwners = new Map(state.owners);
    const newId = nanoid();
    newOwners.set(newId, {
      id: newId,
      name: newOwnerName,
      price: newOwnerPrice,
      amount: newOwnerAmount,
      jobs: [],
    });

    // Set Local Storage
    const ownersArray = turnMapIntoArray(newOwners);
    setLocalStorage(ownersArray);

    return { ...state, owners: newOwners, isModalOpen: false };
  }

  if (action.type === CHANGE_NEW_OWNER_INFO) {
    return {
      ...state,
      newOwnerName: action.payload.name.trimEnd(),
      newOwnerPrice: action.payload.price,
      newOwnerAmount: action.payload.amount,
    };
  }

  if (action.type === SET_CURRENT_OWNER) {
    const id = action.payload.id;
    return {
      ...state,
      currentOwnerId: id,
      currentOwner: state.owners.get(id),
      isHomeOpen: false,
      isCurrentOwnerOpen: true,
    };
  }

  if (action.type === EDIT_OWNER) {
    const { currentOwnerId, currentOwner, owners } = state;
    const { name, amount, price } = action.payload;
    const newOwners = new Map(owners);

    newOwners.set(currentOwnerId, {
      ...currentOwner,
      name: name.trimEnd(),
      amount,
      price,
    });

    newOwners.get(currentOwnerId).jobs.forEach(job => {
      job.owner = name;
    });

    // Set Local Storage
    const ownersArray = turnMapIntoArray(newOwners);
    setLocalStorage(ownersArray);

    return { ...state, owners: newOwners };
  }

  if (action.type === ADD_JOB_TO_CURRENT_OWNER) {
    const { storeNumber, address, price, e, date, number } = action.payload;
    e.preventDefault();
    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(state.currentOwnerId);
    const newId = nanoid();

    currentOwner.jobs.push({
      id: newId,
      owner: currentOwner.name,
      storeNumber,
      address,
      price,
      date,
      completed: false,
      lobbyAcid: 0,
      kitchenAcid: 0,
      phoneNumber: number,
      notes: '',
    });

    // Set Local Storage
    const ownersArray = turnMapIntoArray(newOwners);
    setLocalStorage(ownersArray);

    return {
      ...state,
      owners: newOwners,
      isCurrentOwnerFormOpen: !state.isCurrentOwnerFormOpen,
    };
  }

  if (action.type === CHANGE_CURRENT_SINGLE_JOB) {
    return { ...state, currentSingleJob: action.payload.id };
  }

  if (action.type === EDIT_JOB) {
    const {
      id,
      date,
      price,
      address,
      storeNumber,
      owner,
      lobbyAcid,
      kitchenAcid,
      phoneNumber,
      notes,
    } = action.payload;

    const currentOwnerFromArray = getCurrentOwner(state.owners, owner);

    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(currentOwnerFromArray.id);

    const currentJob = currentOwner.jobs.find(job => job.id === id);

    currentJob.date = date;
    currentJob.price = price;
    currentJob.address = address;
    currentJob.storeNumber = storeNumber;
    currentJob.lobbyAcid = +lobbyAcid;
    currentJob.kitchenAcid = +kitchenAcid;
    currentJob.phoneNumber = phoneNumber;
    currentJob.notes = notes;

    // Set Local Storage
    const ownersArray = turnMapIntoArray(newOwners);
    setLocalStorage(ownersArray);

    return { ...state, owners: newOwners };
  }

  if (action.type === DELETE_JOB) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this job?`
    );

    if (confirmed) {
      const currentOwnerFromArray = getCurrentOwner(
        state.owners,
        action.payload.owner
      );

      const newOwners = new Map(state.owners);
      const currentOwner = newOwners.get(currentOwnerFromArray.id);

      const newJobs = currentOwner.jobs.filter(
        job => job.id !== action.payload.id
      );

      currentOwner.jobs = newJobs;

      // Set Local Storage
      const ownersArray = turnMapIntoArray(newOwners);
      setLocalStorage(ownersArray);

      toast.error(`Job deleted`);

      return { ...state, owners: newOwners, currentSingleJob: null };
    }

    return { ...state };
  }

  if (action.type === MARK_JOB_AS_COMPLETED) {
    const currentOwnerFromArray = getCurrentOwner(
      state.owners,
      action.payload.owner
    );

    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(currentOwnerFromArray.id);

    const currentJob = currentOwner.jobs.find(
      job => job.id === action.payload.id
    );

    currentJob.completed = !currentJob.completed;

    // Set Local Storage
    const ownersArray = turnMapIntoArray(newOwners);
    setLocalStorage(ownersArray);

    return { ...state, owners: newOwners };
  }

  if (action.type === SEARCH_JOB) {
    const searchInput = action.payload.searchInput;

    const newOwners = new Map(state.owners);

    const ownersArray = turnMapIntoArray(newOwners);
    const allJobsArray = ownersArray.flatMap(owner => owner.jobs);
    const currentJobs = allJobsArray.filter(job => {
      return (
        job.owner === searchInput ||
        new Date(convertDateOneDayForward(job.date)).setHours(0, 0, 0, 0) ===
          new Date(searchInput).setHours(0, 0, 0, 0) ||
        job.address === searchInput ||
        job.storeNumber == searchInput ||
        job.phoneNumber === searchInput ||
        job.price === +searchInput
      );
    });

    return { ...state, jobsFound: currentJobs, searchInputValue: searchInput };
  }

  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
