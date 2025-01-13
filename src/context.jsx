import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

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
  ADD_JOB_TO_CURRENT_OWNER,
  TOGGLE_CURRENT_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
  EDIT_JOB,
  DELETE_JOB,
  OPEN_COMPLETED_JOBS,
} from './actions';
import { owners } from './data';

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  isHomeOpen: true,
  isCurrentOwnerOpen: false,
  isCurrentOwnerFormOpen: false,
  isCurrentJobOpen: false,
  isCompletedJobsOpen: false,
  owners: new Map(owners.map(owner => [owner.id, owner])),
  newOwnerName: '',
  newOwnerPrice: '',
  newOwnerAmount: '',
  currentOwnerId: '',
  currentOwner: null,
  currentJob: null,
  currentSingleJob: null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openModal() {
    dispatch({ type: OPEN_MODAL });
  }

  function closeModal() {
    dispatch({ type: CLOSE_MODAL });
  }

  function toggleCurrentOwnerForm() {
    dispatch({ type: TOGGLE_CURRENT_OWNER_FORM });
  }

  function openHome() {
    dispatch({ type: OPEN_HOME });
  }

  function openCurrentOwner() {
    dispatch({ type: OPEN_CURRENT_OWNER });
  }

  function openCurrentJob() {
    dispatch({ type: OPEN_CURRENT_JOB });
  }

  function openCompletedJobs() {
    dispatch({ type: OPEN_COMPLETED_JOBS });
  }

  function removeOwner(id) {
    dispatch({ type: REMOVE_OWNER, payload: { id } });
  }

  function addOwner(e) {
    dispatch({ type: ADD_OWNER, payload: { e } });
  }

  function changeNewOwnerInfo(name, price, amount) {
    dispatch({
      type: CHANGE_NEW_OWNER_INFO,
      payload: { name, price, amount },
    });
  }

  function setCurrentOwner(id) {
    dispatch({ type: SET_CURRENT_OWNER, payload: { id } });
  }

  function editOwner(name, amount, price) {
    dispatch({ type: EDIT_OWNER, payload: { name, amount, price } });
  }

  function addJobToCurrentOwner(e, storeNumber, address, price, date) {
    dispatch({
      type: ADD_JOB_TO_CURRENT_OWNER,
      payload: { e, storeNumber, address, price, date },
    });
  }

  function changeCurrentSingleJob(id) {
    dispatch({ type: CHANGE_CURRENT_SINGLE_JOB, payload: { id } });
  }

  function editJob(id, date, storeNumber, address, price, owner, e) {
    dispatch({
      type: EDIT_JOB,
      payload: { id, date, storeNumber, address, price, owner, e },
    });
  }

  function deleteJob(id, owner) {
    dispatch({ type: DELETE_JOB, payload: { id, owner } });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        openHome,
        openCurrentOwner,
        openCurrentJob,
        openCompletedJobs,
        removeOwner,
        addOwner,
        changeNewOwnerInfo,
        setCurrentOwner,
        editOwner,
        addJobToCurrentOwner,
        toggleCurrentOwnerForm,
        changeCurrentSingleJob,
        editJob,
        deleteJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
