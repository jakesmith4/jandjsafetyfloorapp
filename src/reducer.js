import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_OWNER,
  REMOVE_OWNER,
  EDIT_OWNER,
  CHANGE_CURRENT_OWNER_INFO,
} from './actions';
import { owners } from './data';
import { useGlobalContext } from './context';

const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }
  if (action.type === REMOVE_OWNER) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this owner?`
    );
    if (confirmed) {
      const newOwners = new Map(state.owners);
      newOwners.delete(action.payload.id);
      return { ...state, owners: newOwners };
    }
    return { ...state };
  }
  if (action.type === ADD_OWNER) {
    action.payload.e.preventDefault();
    const newOwners = new Map(state.owners);
    const newId = nanoid();
    newOwners.set(newId, {
      id: newId,
      name: state.newOwnerName,
      price: state.newOwnerPrice,
      amount: state.newOwnerAmount,
    });
    return { ...state, owners: newOwners };
  }
  if (action.type === CHANGE_CURRENT_OWNER_INFO) {
    console.log('hello world');
    console.log(action.payload.name);
    return {
      ...state,
      newOwnerName: action.payload.name,
      newOwnerPrice: action.payload.price,
      newOwnerAmount: action.payload.amount,
    };
  }
  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
