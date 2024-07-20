import { createContext, useState, useContext, useReducer } from 'react';
import reducer from './reducer';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_OWNER,
  REMOVE_OWNER,
  EDIT_OWNER,
} from './actions';
import { owners } from './data';

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  owners: new Map(owners.map(owner => [owner.id, owner])),
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

  function removeOwner(id) {
    dispatch({ type: REMOVE_OWNER, payload: { id } });
  }

  function addOwner() {
    dispatch({ type: ADD_OWNER });
  }

  return (
    <AppContext.Provider
      value={{ ...state, openModal, closeModal, removeOwner, addOwner }}
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
