import { useState } from 'react';
import { useGlobalContext } from '../context';

const AddJob = () => {
  const {
    addJobToCurrentOwner,
    closeCurrentOwnerForm,
    closeModal,
    currentOwner,
  } = useGlobalContext();

  const [date, setDate] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(currentOwner.price);

  return (
    <form
      className="form"
      onSubmit={e => {
        if (!storeNumber || !address || !price || !date) {
          e.preventDefault();
          return;
        }
        addJobToCurrentOwner(e, storeNumber, address, price, date);
        closeCurrentOwnerForm();
        closeModal();
        setStoreNumber('');
        setAddress('');
        setPrice('');
      }}
    >
      <h3>add job</h3>
      <div className="form-row">
        <label htmlFor="date" className="form-label">
          date
        </label>
        <input
          type="date"
          id="date"
          className="form-input"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="store-number" className="form-label">
          store number
        </label>
        <input
          type="text"
          id="store-number"
          className="form-input"
          value={storeNumber}
          onChange={e => setStoreNumber(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="address" className="form-label">
          address
        </label>
        <textarea
          id="address"
          className="form-textarea"
          value={address}
          onChange={e => setAddress(e.target.value)}
        ></textarea>
      </div>
      <div className="form-row">
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input
          type="number"
          id="price"
          className="form-input"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <button className="btn">add job</button>
    </form>
  );
};
export default AddJob;
