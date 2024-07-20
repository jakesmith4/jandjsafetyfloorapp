import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const Modal = () => {
  const { isModalOpen, closeModal, addOwner } = useGlobalContext();
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        <form className="form">
          <h3>add owner</h3>
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name:
            </label>
            <input type="text" id="name" className="form-input" />
          </div>
          <div className="form-row">
            <label htmlFor="price" className="form-label">
              price:
            </label>
            <input type="number" id="price" className="form-input" />
          </div>
          <div className="form-row">
            <label htmlFor="amount" className="form-label">
              amount of stores:
            </label>
            <input type="number" id="amount" className="form-input" />
          </div>
          <button onClick={addOwner}>add owner</button>
        </form>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
export default Modal;
