import { useState } from 'react';
import { useGlobalContext } from '../context';

const CurrentOwner = () => {
  const {
    currentOwner,
    changeCurrentOwnerName,
    addJobToCurrentOwner,
    toggleCurrentOwnerForm,
    isCurrentOwnerFormOpen,
  } = useGlobalContext();
  const [name, setName] = useState(currentOwner?.name);
  const [storeNumber, setStoreNumber] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const jobsArray = Array.from(currentOwner ? currentOwner.jobs.entries() : []);

  if (!currentOwner) {
    return (
      <section className="current-owner">
        <header>
          <h2>Please select an owner</h2>
        </header>
      </section>
    );
  }
  return (
    <section className="current-owner">
      <header>
        <input
          className="current-owner-name"
          type="text"
          id="name"
          value={name}
          onChange={e => {
            setName(e.target.value);
            changeCurrentOwnerName(e.target.value);
          }}
        />
      </header>

      <button className="btn" onClick={toggleCurrentOwnerForm}>
        {isCurrentOwnerFormOpen ? 'close form' : 'add job'}
      </button>

      {isCurrentOwnerFormOpen && (
        <form
          className="form"
          onSubmit={e => {
            if (!storeNumber || !address || !price) {
              addJobToCurrentOwner(e, storeNumber, address, price);
              return;
            }
            addJobToCurrentOwner(e, storeNumber, address, price);
            setStoreNumber('');
            setAddress('');
            setPrice('');
          }}
        >
          <h3>add job</h3>
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
      )}

      {jobsArray.map(job => {
        const [id, item] = job;
        return <div key={id}>{item.storeNumber}</div>;
      })}

      <footer>
        <hr />
      </footer>
    </section>
  );
};
export default CurrentOwner;
