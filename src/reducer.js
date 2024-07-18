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
  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
