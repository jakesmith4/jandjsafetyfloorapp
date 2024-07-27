import { createContext, useState, useContext, useReducer } from 'react';
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
  CHANGE_CURRENT_OWNER_NAME,
  ADD_JOB_TO_CURRENT_OWNER,
  TOGGLE_CURRENT_OWNER_FORM,
  CHANGE_CURRENT_SINGLE_JOB,
} from './actions';
import { owners } from './data';

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  isHomeOpen: true,
  isCurrentOwnerOpen: false,
  isCurrentOwnerFormOpen: false,
  isCurrentJobOpen: false,
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

  function changeCurrentOwnerName(name) {
    dispatch({ type: CHANGE_CURRENT_OWNER_NAME, payload: { name } });
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        openHome,
        openCurrentOwner,
        openCurrentJob,
        removeOwner,
        addOwner,
        changeNewOwnerInfo,
        setCurrentOwner,
        changeCurrentOwnerName,
        addJobToCurrentOwner,
        toggleCurrentOwnerForm,
        changeCurrentSingleJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// Then you can use the it in any component, just import the useGlobalContext like shown below:
// import { useGlobalContext } from '../context';
// Then you can you it like show below:
// const { isSidebarOpen, openSidebar } = useGlobalContext();
