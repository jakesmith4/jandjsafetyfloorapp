import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import { useState } from 'react';
import AddJob from './AddJob';

const Modal = () => {
  const {
    isModalOpen,
    closeModal,
    addOwner,
    changeNewOwnerInfo,
    isAddOwnerFormOpen,
    closeAddOwnerForm,
    closeCurrentOwnerForm,
    isCurrentOwnerFormOpen,
  } = useGlobalContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        {isAddOwnerFormOpen && (
          <form className="form">
            <h3>add owner</h3>
            <div className="form-row">
              <label htmlFor="name" className="form-label">
                name:
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="price" className="form-label">
                price:
              </label>
              <input
                type="number"
                id="price"
                className="form-input"
                value={price}
                onChange={e => setPrice(+e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="amount" className="form-label">
                amount of stores:
              </label>
              <input
                type="number"
                id="amount"
                className="form-input"
                value={amount}
                onChange={e => setAmount(+e.target.value)}
              />
            </div>
            <button
              onClick={e => {
                if (name && price && amount) {
                  changeNewOwnerInfo(name, price, amount);
                  addOwner(e);
                  closeAddOwnerForm();
                  setName('');
                  setPrice('');
                  setAmount('');
                }
                e.preventDefault();
              }}
            >
              add owner
            </button>
          </form>
        )}

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
