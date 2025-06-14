import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import { formatDate } from '../utils';
import { FaPlus, FaCalendarDay, FaHistory } from 'react-icons/fa';
import { GiCheckMark, GiCrossMark } from 'react-icons/gi';

const formatNum = num => new Intl.NumberFormat(navigator.language).format(num);

const CurrentOwner = () => {
  const {
    currentOwner,
    editOwner,
    editShowJobsInfo,
    openCurrentOwnerForm,
    openCurrentJob,
    openModal,
    changeCurrentSingleJob,
  } = useGlobalContext();

  const [name, setName] = useState(currentOwner?.name);
  const [numberOfStores, setNumberOfStores] = useState(currentOwner?.amount);
  const [ownerPrice, setOwnerPrice] = useState(currentOwner?.price);

  const [showCompletedJobs, setShowCompletedJobs] = useState(
    currentOwner.showJobsInfo.showJobs
  );

  const jobsArray = currentOwner ? currentOwner.jobs : [];

  const completedJobs = currentOwner?.jobs.filter(
    job => job.completed === true
  );

  const unCompletedJobs = currentOwner?.jobs.filter(
    job => job.completed === false
  );

  const oldJobs = currentOwner?.jobs.filter(job => job.completed === null);

  const lifeTimeAmount = currentOwner?.jobs
    .map(job => +job.price)
    .reduce((accumulator, current) => accumulator + current, 0);

  let currentJobs;

  useEffect(() => {
    window.scrollTo({
      top: currentOwner.showJobsInfo.scrollY,
      left: 0,
      behavior: 'smooth', // Optional: adds smooth scrolling animation
    });
  }, []);

  if (showCompletedJobs === false) currentJobs = unCompletedJobs;
  if (showCompletedJobs === true) currentJobs = completedJobs;
  if (showCompletedJobs === null) currentJobs = oldJobs;

  const sortedJobs = currentJobs?.slice();

  sortedJobs?.sort((a, b) => new Date(a.date) - new Date(b.date));

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
    // if (+job.price >= 795) {
    //   jakesCut += +job.price - 250;
    //   johnsCut += 250;
    // } else {
    //   jakesCut += +job.price - 200;
    //   johnsCut += 200;
    // }
    if (+job.price <= 350) {
      jakesCut += +job.price - 50;
      johnsCut += 50;
    }

    if (+job.price < 795 && +job.price > 350) {
      jakesCut += +job.price - 200;
      johnsCut += 200;
    }

    if (+job.price >= 795) {
      jakesCut += +job.price - 250;
      johnsCut += 250;
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

      <div className="jobs-item-btn-container">
        <button
          className="jobs-item-btn"
          style={showCompletedJobs === false ? { background: '#ff4500' } : {}}
          title="Upcoming Jobs"
          onClick={() => {
            setShowCompletedJobs(false);
            editShowJobsInfo(false, window.scrollY);
          }}
        >
          <span>upcoming jobs</span>
          <span>
            <span>
              <GiCrossMark />
            </span>
            <span className="jobs-item-number">{unCompletedJobs.length}</span>
          </span>
        </button>
        <button
          className="jobs-item-btn"
          style={showCompletedJobs === true ? { background: '#ff4500' } : {}}
          title="Completed Jobs"
          onClick={() => {
            setShowCompletedJobs(true);
            editShowJobsInfo(true, window.scrollY);
          }}
        >
          <span>completed jobs</span>
          <span>
            <span>
              <GiCheckMark />
            </span>
            <span className="jobs-item-number">{completedJobs.length}</span>
          </span>
        </button>
      </div>

      <div className="jobs-item-old-btn-container">
        <button
          className="jobs-item-btn jobs-item-old-btn"
          style={showCompletedJobs === null ? { background: '#ff4500' } : {}}
          title="Old Jobs"
          onClick={() => {
            setShowCompletedJobs(null);
            editShowJobsInfo(null, window.scrollY);
          }}
        >
          <span>old jobs</span>
          <span>
            <span>
              <FaHistory />
            </span>
            <span className="jobs-item-number">{oldJobs.length}</span>
          </span>
        </button>
      </div>

      <h2 className="jobs-item-heading">Jobs</h2>

      {currentJobs.length === 0 && (
        <h3 className="jobs-item-no-jobs-heading">No jobs to display</h3>
      )}

      <ul className="current-owner-list">
        {sortedJobs.map(job => {
          const { id } = job;

          return (
            <li
              key={id}
              className="jobs-item"
              title="Edit Job"
              onClick={() => {
                openCurrentJob();
                changeCurrentSingleJob(job);
                editShowJobsInfo(showCompletedJobs, window.scrollY);
              }}
            >
              <div>
                <h3 className="jobs-item-date-heading">date:</h3>
                <div className="jobs-item-info jobs-item-date">
                  <span className="jobs-item-icon">
                    <FaCalendarDay />
                  </span>
                  <span className="jobs-item-text">
                    {job.date === ''
                      ? 'Please enter a valid date!'
                      : formatDate(job.date || '2025-01-01')}
                  </span>
                </div>
              </div>

              <div>
                <h3>store number:</h3>
                <span className="jobs-item-info">#{job.storeNumber}</span>
              </div>

              {/* <input type="date" defaultValue={job.date} /> */}

              <div>
                <h3>address:</h3>
                <span className="jobs-item-info jobs-item-address">
                  {job.address}
                </span>
              </div>
              <div
                className={
                  showCompletedJobs === true
                    ? 'completed show-jobs-container'
                    : showCompletedJobs === false
                    ? 'upcoming show-jobs-container'
                    : 'history show-jobs-container'
                }
              >
                <div className="show-jobs">
                  {showCompletedJobs === true && (
                    <div className="show-jobs-item">
                      <span>completed</span>
                      <span>
                        <GiCheckMark />
                      </span>
                    </div>
                  )}
                  {showCompletedJobs === false && (
                    <div className="show-jobs-item">
                      <span>upcoming</span>
                      <span>
                        <GiCrossMark />
                      </span>
                    </div>
                  )}

                  {showCompletedJobs === null && (
                    <div className="show-jobs-item">
                      <span>old job</span>
                      <span>
                        <FaHistory />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <footer>
        <hr />
        <h2 className="jobs-item-heading">analytics</h2>
        {currentOwner.jobs.length > 0 && (
          <div>
            <div className="owner-total">
              <span className="owner-total-heading">jake's cut:</span>
              <span className="owner-total-value">${formatNum(jakesCut)}</span>
            </div>
            <div className="owner-total">
              <span className="owner-total-heading">john's cut:</span>
              <span className="owner-total-value">${formatNum(johnsCut)}</span>
            </div>
            <div className="owner-total">
              <span className="owner-total-heading">total amount:</span>
              <span className="owner-total-value">
                ${formatNum(thisTimesPrice)}
              </span>
            </div>
            <div className="owner-total">
              <span className="owner-total-heading">lifetime amount:</span>
              <span className="owner-total-value">
                ${formatNum(lifeTimeAmount)}
              </span>
            </div>
          </div>
        )}
      </footer>
    </section>
  );
};
export default CurrentOwner;
