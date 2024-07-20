import { useEffect } from 'react';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_OWNER,
  REMOVE_OWNER,
  EDIT_OWNER,
} from './actions';

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
  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
