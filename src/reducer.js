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
  TOGGLE_CURRENT_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
  OPEN_COMPLETED_JOBS,
  MARK_JOB_AS_COMPLETED,
  SET_LOCAL_STORAGE,
} from './actions';
import {
  convertDateOneDayForward,
  getCurrentOwner,
  setLocalStorage,
} from './utils';

const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }

  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }

  if (action.type === TOGGLE_CURRENT_OWNER_FORM) {
    return { ...state, isCurrentOwnerFormOpen: !state.isCurrentOwnerFormOpen };
  }

  if (action.type === OPEN_HOME) {
    return {
      ...state,
      isHomeOpen: true,
      isCurrentOwnerOpen: false,
      isCurrentJobOpen: false,
      isCompletedJobsOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_OWNER) {
    return {
      ...state,
      isCurrentOwnerOpen: true,
      isHomeOpen: false,
      isCurrentJobOpen: false,
      isCompletedJobsOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_JOB) {
    return {
      ...state,
      isCurrentJobOpen: true,
      isHomeOpen: false,
      isCurrentOwnerOpen: false,
      isCompletedJobsOpen: false,
    };
  }

  if (action.type === OPEN_COMPLETED_JOBS) {
    return {
      ...state,
      isCompletedJobsOpen: true,
      isCurrentJobOpen: false,
      isHomeOpen: false,
      isCurrentOwnerOpen: false,
    };
  }

  if (action.type === REMOVE_OWNER) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this owner?`
    );
    if (confirmed) {
      // USE THIS ID TO DELETE THE OWNER NOT THE ACTION.PAYLOAD.ID
      console.log(state.currentOwnerId);
      const newOwners = new Map(state.owners);
      newOwners.delete(action.payload.id);
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

    const ownersArray = Array.from(newOwners.entries());
    const singleOwnersArray = ownersArray.map(owner => {
      const [id, item] = owner;
      return item;
    });

    console.log(singleOwnersArray);

    setLocalStorage(singleOwnersArray);

    return { ...state, owners: newOwners, isModalOpen: false };
  }

  if (action.type === CHANGE_NEW_OWNER_INFO) {
    return {
      ...state,
      newOwnerName: action.payload.name,
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
      name,
      amount,
      price,
    });

    newOwners.get(currentOwnerId).jobs.forEach(job => {
      job.owner = name;
    });

    return { ...state, owners: newOwners };
  }

  if (action.type === ADD_JOB_TO_CURRENT_OWNER) {
    const { storeNumber, address, price, e, date } = action.payload;
    e.preventDefault();
    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(state.currentOwnerId);
    const newId = nanoid();

    // Convert Date One Day Forward Because Of Time Zone Issues
    const dateObject = convertDateOneDayForward(date);

    currentOwner.jobs.push({
      id: newId,
      owner: currentOwner.name,
      storeNumber,
      address,
      price,
      date,
      dateObject,
      completed: false,
    });

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
    const { e, id, date, price, address, storeNumber, owner } = action.payload;
    e.preventDefault();

    const currentOwnerFromArray = getCurrentOwner(state.owners, owner);

    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(currentOwnerFromArray.id);

    const currentJob = currentOwner.jobs.find(job => job.id === id);

    // Convert Date One Day Forward Because Of Time Zone Issues
    const dateObject = convertDateOneDayForward(date);

    currentJob.date = date;
    currentJob.dateObject = dateObject;
    currentJob.price = price;
    currentJob.address = address;
    currentJob.storeNumber = storeNumber;

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

    return { ...state, owners: newOwners };
  }

  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
