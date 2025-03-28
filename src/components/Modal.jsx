import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import AddJob from './AddJob';
import AddOwner from './AddOwner';
import OpenMaps from './OpenMaps';
import OpenRescheduleJob from './OpenRescheduleJob';

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
    isRescheduleJobFormOpen,
    closeRescheduleJobForm,
  } = useGlobalContext();

  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        {isAddOwnerFormOpen && <AddOwner />}

        {isCurrentOwnerFormOpen && <AddJob />}

        {isMapsFormOpen && <OpenMaps />}

        {isRescheduleJobFormOpen && <OpenRescheduleJob />}

        <button
          className="close-modal-btn"
          onClick={() => {
            closeModal();
            closeAddOwnerForm();
            closeMapsForm();
            closeCurrentOwnerForm();
            closeRescheduleJobForm();
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default Modal;
