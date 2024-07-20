import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const Modal = () => {
  const { isModalOpen, closeModal, addOwner } = useGlobalContext();
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        <h3>add owner</h3>
        <button onClick={addOwner}>add owner</button>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default Modal;
