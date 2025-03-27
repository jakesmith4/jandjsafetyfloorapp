import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import AddJob from './AddJob';
import AddOwner from './AddOwner';
import OpenMaps from './OpenMaps';

const Modal = () => {
  const {
    isModalOpen,
    closeModal,
    isAddOwnerFormOpen,
    closeAddOwnerForm,
    closeCurrentOwnerForm,
    isCurrentOwnerFormOpen,
    isMapsFormOpen,
    closeMapsForm,
  } = useGlobalContext();

  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        {isAddOwnerFormOpen && <AddOwner />}

        {isCurrentOwnerFormOpen && <AddJob />}

        {isMapsFormOpen && <OpenMaps />}

        <button
          className="close-modal-btn"
          onClick={() => {
            closeModal();
            closeAddOwnerForm();
            closeMapsForm();
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
