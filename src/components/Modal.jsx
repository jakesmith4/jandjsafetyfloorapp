import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import AddJob from './AddJob';
import AddOwner from './AddOwner';

const Modal = () => {
  const {
    isModalOpen,
    closeModal,
    isAddOwnerFormOpen,
    closeAddOwnerForm,
    closeCurrentOwnerForm,
    isCurrentOwnerFormOpen,
  } = useGlobalContext();

  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        {isAddOwnerFormOpen && <AddOwner />}

        {isCurrentOwnerFormOpen && <AddJob />}

        <button
          className="close-modal-btn"
          onClick={() => {
            closeModal();
            closeAddOwnerForm();
            closeCurrentOwnerForm();
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default Modal;
