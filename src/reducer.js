import { nanoid } from 'nanoid';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_HOME,
  OPEN_CURRENT_OWNER,
  ADD_OWNER,
  REMOVE_OWNER,
  EDIT_OWNER,
  CHANGE_NEW_OWNER_INFO,
  SET_CURRENT_OWNER,
} from './actions';
import CurrentOwner from './components/CurrentOwner';

const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }
  if (action.type === OPEN_HOME) {
    return { ...state, isHomeOpen: true, isCurrentOwnerOpen: false };
  }
  if (action.type === OPEN_CURRENT_OWNER) {
    return { ...state, isCurrentOwnerOpen: true, isHomeOpen: false };
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
  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
