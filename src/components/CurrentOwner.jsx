import { useState } from 'react';
import { useGlobalContext } from '../context';
import { convertDateOneDayForward } from '../utils';
import { FaPlus, FaCheck } from 'react-icons/fa';

const CurrentOwner = () => {
  const {
    currentOwner,
    editOwner,
    openCurrentOwnerForm,
    openCurrentJob,
    openModal,
    changeCurrentSingleJob,
  } = useGlobalContext();

  const [name, setName] = useState(currentOwner?.name);
  const [numberOfStores, setNumberOfStores] = useState(currentOwner?.amount);
  const [ownerPrice, setOwnerPrice] = useState(currentOwner?.price);

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

  const currentDate = new Date();

  const date4MonthsAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 4)
  ).getTime();

  const thisTimeJobs = currentOwner?.jobs.filter(
    job => new Date(job.date).getTime() >= date4MonthsAgo
  );

  let thisTimesPrice = 0;
  let johnsCut = 0;
  let jakesCut = 0;

  thisTimeJobs?.forEach(job => {
    thisTimesPrice += +job.price;
    if (+job.price >= 795) {
      jakesCut += +job.price - 250;
      johnsCut += 250;
    } else {
      jakesCut += +job.price - 200;
      johnsCut += 200;
    }
  });

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
          className="current-owner-name form-input"
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
          <label htmlFor="number-of-stores">number of stores:</label>
          <input
            className="form-input"
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
          <label htmlFor="owner-price">owner price:</label>
          <input
            className="form-input"
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

      <button
        className="btn add-job-btn"
        onClick={() => {
          openCurrentOwnerForm();
          openModal();
        }}
      >
        <FaPlus className="plus-icon" title="Add Owner" />
      </button>

      <h2 className="jobs-item-heading">Jobs</h2>

      <div className="jobs-item-btn-container">
        <button
          className="jobs-item-btn"
          style={!showCompletedJobs ? { background: '#ff4500' } : {}}
          onClick={() => setShowCompletedJobs(false)}
        >
          upcoming jobs
        </button>
        <button
          className="jobs-item-btn"
          style={showCompletedJobs ? { background: '#ff4500' } : {}}
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
              style={showCompletedJobs ? { paddingBottom: '0px' } : {}}
              onClick={() => {
                openCurrentJob();
                changeCurrentSingleJob(job);
              }}
            >
              <h3>store number:</h3>
              <span className="jobs-item-info">#{job.storeNumber}</span>

              <h3>date:</h3>
              <span className="jobs-item-info">
                {Intl.DateTimeFormat('en-US').format(
                  convertDateOneDayForward(job.date)
                )}
              </span>

              <input type="date" defaultValue={job.date} />

              <h3>address:</h3>
              <span className="jobs-item-info">{job.address}</span>

              <h3>price</h3>
              <span className="jobs-item-info">${job.price}</span>

              {showCompletedJobs && (
                <span className="completed">
                  completed
                  <FaCheck />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <footer>
        <hr />
        <div>
          <h5 className="owner-total">
            total amount: <span>${thisTimesPrice}</span>
          </h5>
          <h5 className="owner-total">
            jake's cut: <span>${jakesCut}</span>
          </h5>
          <h5 className="owner-total">
            john's cut: <span>${johnsCut}</span>
          </h5>
        </div>
      </footer>
    </section>
  );
};
export default CurrentOwner;
