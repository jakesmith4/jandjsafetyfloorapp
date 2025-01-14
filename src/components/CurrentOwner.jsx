import { useState } from 'react';
import { useGlobalContext } from '../context';

const CurrentOwner = () => {
  const {
    currentOwner,
    editOwner,
    addJobToCurrentOwner,
    toggleCurrentOwnerForm,
    isCurrentOwnerFormOpen,
    openCurrentJob,
    changeCurrentSingleJob,
  } = useGlobalContext();
  const [name, setName] = useState(currentOwner?.name);
  const [numberOfStores, setNumberOfStores] = useState(currentOwner?.amount);
  const [ownerPrice, setOwnerPrice] = useState(currentOwner?.price);
  const [date, setDate] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [showCompletedJobs, setShowCompletedJobs] = useState(false);

  const jobsArray = currentOwner ? currentOwner.jobs : [];

  const completedJobs = currentOwner?.jobs.filter(
    job => job.completed === true
  );

  const unCompletedJobs = currentOwner?.jobs.filter(
    job => job.completed === false
  );

  let currentJobs;

  showCompletedJobs === false
    ? (currentJobs = unCompletedJobs)
    : (currentJobs = completedJobs);

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
            editOwner(e.target.value, numberOfStores, ownerPrice);
          }}
        />
      </header>

      <div className="owner-inputs">
        <div className="form-row">
          <label htmlFor="number-of-stores">number of stores</label>
          <input
            type="number"
            name="number-of-stores"
            id="number-of-stores"
            value={numberOfStores}
            onChange={e => {
              setNumberOfStores(+e.target.value);
              editOwner(name, +e.target.value, ownerPrice);
            }}
          />
        </div>
        <div className="form-row">
          <label htmlFor="owner-price">owner price</label>
          <input
            type="number"
            name="owner-price"
            id="owner-price"
            value={ownerPrice}
            onChange={e => {
              setOwnerPrice(+e.target.value);
              editOwner(name, numberOfStores, +e.target.value);
            }}
          />
        </div>
      </div>

      <button className="btn" onClick={toggleCurrentOwnerForm}>
        {isCurrentOwnerFormOpen ? 'close form' : 'add job'}
      </button>

      {isCurrentOwnerFormOpen && (
        <form
          className="form"
          onSubmit={e => {
            if (!storeNumber || !address || !price || !date) {
              e.preventDefault();
              return;
            }
            addJobToCurrentOwner(e, storeNumber, address, price, date);
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
      )}

      <h2>Jobs</h2>

      <div className="btn-container">
        <button
          style={!showCompletedJobs ? { background: 'green' } : {}}
          onClick={() => setShowCompletedJobs(false)}
        >
          upcoming jobs
        </button>
        <button
          style={showCompletedJobs ? { background: 'green' } : {}}
          onClick={() => setShowCompletedJobs(true)}
        >
          completed jobs
        </button>
      </div>

      <ul>
        {currentJobs.map(job => {
          const { id } = job;

          return (
            <li
              key={id}
              className="jobs-item"
              onClick={() => {
                openCurrentJob();
                changeCurrentSingleJob(job);
              }}
            >
              <h3>store number:</h3>
              <span className="jobs-item-info">#{job.storeNumber}</span>

              <h3>date:</h3>
              <span className="jobs-item-info">
                {Intl.DateTimeFormat('en-US').format(new Date(job.dateObject))}
              </span>

              <input type="date" defaultValue={job.date} />

              <h3>address:</h3>
              <span className="jobs-item-info">{job.address}</span>

              <h3>price</h3>
              <span className="jobs-item-info">${job.price}</span>
            </li>
          );
        })}
      </ul>

      <footer>
        <hr />
      </footer>
    </section>
  );
};
export default CurrentOwner;
