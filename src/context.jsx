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
  OPEN_CURRENT_OWNER_FORM,
  CLOSE_CURRENT_OWNER_FORM,
  OPEN_ADD_OWNER_FORM,
  CLOSE_ADD_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
  EDIT_JOB,
  DELETE_JOB,
  OPEN_COMPLETED_JOBS,
  MARK_JOB_AS_COMPLETED,
  SEARCH_JOB,
} from './actions';
// import { owners } from './data';
import { getLocalStorage } from './utils';

const AppContext = createContext();

const owners = getLocalStorage();

const initialState = {
  isModalOpen: false,
  isHomeOpen: true,
  isCurrentOwnerOpen: false,
  isCurrentOwnerFormOpen: false,
  isAddOwnerFormOpen: false,
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
  jobsFound: null,
  searchInputValue: '',
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openModal() {
    dispatch({ type: OPEN_MODAL });
  }

  function closeModal() {
    dispatch({ type: CLOSE_MODAL });
  }

  function openCurrentOwnerForm() {
    dispatch({ type: OPEN_CURRENT_OWNER_FORM });
  }

  function closeCurrentOwnerForm() {
    dispatch({ type: CLOSE_CURRENT_OWNER_FORM });
  }

  function openAddOwnerForm() {
    dispatch({ type: OPEN_ADD_OWNER_FORM });
  }

  function closeAddOwnerForm() {
    dispatch({ type: CLOSE_ADD_OWNER_FORM });
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

  function removeOwner(id, name) {
    dispatch({ type: REMOVE_OWNER, payload: { id, name } });
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

  function addJobToCurrentOwner(e, storeNumber, address, price, date, number) {
    dispatch({
      type: ADD_JOB_TO_CURRENT_OWNER,
      payload: { e, storeNumber, address, price, date, number },
    });
  }

  function changeCurrentSingleJob(id) {
    dispatch({ type: CHANGE_CURRENT_SINGLE_JOB, payload: { id } });
  }

  function editJob(
    id,
    date,
    storeNumber,
    address,
    price,
    owner,
    lobbyAcid,
    kitchenAcid,
    phoneNumber,
    notes
  ) {
    dispatch({
      type: EDIT_JOB,
      payload: {
        id,
        date,
        storeNumber,
        address,
        price,
        owner,
        lobbyAcid,
        kitchenAcid,
        phoneNumber,
        notes,
      },
    });
  }

  function deleteJob(id, owner) {
    dispatch({ type: DELETE_JOB, payload: { id, owner } });
  }

  function markJobAsCompleted(id, owner) {
    dispatch({ type: MARK_JOB_AS_COMPLETED, payload: { id, owner } });
  }

  function searchJob(searchInput) {
    dispatch({ type: SEARCH_JOB, payload: { searchInput } });
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
        openCurrentOwnerForm,
        closeCurrentOwnerForm,
        openAddOwnerForm,
        closeAddOwnerForm,
        changeCurrentSingleJob,
        editJob,
        deleteJob,
        markJobAsCompleted,
        searchJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
