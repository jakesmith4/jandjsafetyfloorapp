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
  CHANGE_NEW_OWNER_INFO,
  SET_CURRENT_OWNER,
  CHANGE_CURRENT_OWNER_NAME,
  ADD_JOB_TO_CURRENT_OWNER,
  TOGGLE_CURRENT_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
} from './actions';
import { owners } from './data';

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
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_OWNER) {
    return {
      ...state,
      isCurrentOwnerOpen: true,
      isHomeOpen: false,
      isCurrentJobOpen: false,
      currentSingleJob: null,
    };
  }

  if (action.type === OPEN_CURRENT_JOB) {
    return {
      ...state,
      isCurrentJobOpen: true,
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

  if (action.type === CHANGE_CURRENT_OWNER_NAME) {
    const { currentOwnerId, currentOwner, owners } = state;
    const newOwners = new Map(owners);
    newOwners.set(currentOwnerId, {
      ...currentOwner,
      name: action.payload.name,
    });
    return { ...state, owners: newOwners };
  }

  if (action.type === ADD_JOB_TO_CURRENT_OWNER) {
    const { storeNumber, address, price, e, date } = action.payload;
    if (!storeNumber || !address || !price) {
      e.preventDefault();
      return { ...state };
    }
    e.preventDefault();
    const newOwners = new Map(state.owners);
    const currentOwner = newOwners.get(state.currentOwnerId);
    const newId = nanoid();

    // Convert Date One Day Forward Because Of Time Zone Issues
    const dateArray = date.split('-');
    const year = dateArray[0];
    const month = parseInt(dateArray[1], 10) - 1;
    const date1 = dateArray[2];
    const dateObject = new Date(year, month, date1);

    currentOwner.jobs.push({
      id: newId,
      storeNumber,
      address,
      price,
      date,
      dateObject,
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

  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
