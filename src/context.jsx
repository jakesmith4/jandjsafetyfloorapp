import { createContext, useState, useContext, useReducer } from 'react';
import reducer from './reducer';

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
import { owners } from './data';

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  isHomeOpen: true,
  isCurrentOwnerOpen: false,
  owners: new Map(owners.map(owner => [owner.id, owner])),
  newOwnerName: '',
  newOwnerPrice: '',
  newOwnerAmount: '',
  currentOwnerId: '',
  currentOwner: null,
};

export const AppProvider = ({ children }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function openModal() {
    // setIsModalOpen(true);
    dispatch({ type: OPEN_MODAL });
  }

  function closeModal() {
    // setIsModalOpen(false);
    dispatch({ type: CLOSE_MODAL });
  }

  function openHome() {
    dispatch({ type: OPEN_HOME });
  }

  function closeHome() {}

  function openCurrentOwner() {
    dispatch({ type: OPEN_CURRENT_OWNER });
  }

  function closeCurrentOwner() {}

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

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        openHome,
        openCurrentOwner,
        removeOwner,
        addOwner,
        changeNewOwnerInfo,
        setCurrentOwner,
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
