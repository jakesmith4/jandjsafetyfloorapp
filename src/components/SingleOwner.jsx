import { useGlobalContext } from '../context';
import { FaTrashAlt } from 'react-icons/fa';
import { VscVmActive } from 'react-icons/vsc';

const SingleOwner = ({ id, name, price, amount, jobs, currentOwner }) => {
  const { removeOwner, setCurrentOwner } = useGlobalContext();

  const completedJobsLength = jobs.filter(
    jobs => jobs.completed === true
  ).length;

  const upcomingJobsLength = jobs.filter(
    jobs => jobs.completed === false
  ).length;

  return (
    <article
      className="single-owner"
      style={{ background: currentOwner ? '#0f5132' : '#16191b' }}
      onClick={() => {
        setCurrentOwner(id);
      }}
    >
      <div>
        <header className="single-owner-header">
          <h5>{name}</h5>
          <button
            className="remove-btn"
            onClick={e => {
              e.stopPropagation();
              removeOwner(id, name);
            }}
          >
            <FaTrashAlt />
          </button>
        </header>
        <div
          className="owner-price"
          style={{ background: currentOwner ? '#3f745b' : '#333' }}
        >
          <span>${price}</span>
        </div>
        <div
          className="owner-amount"
          style={{ background: currentOwner ? '#3f745b' : '#333' }}
        >
          {amount} stores
        </div>
        {currentOwner && (
          <div className="active-owner-container">
            <div className="jobs-completed">
              <span>{`${completedJobsLength}/${
                upcomingJobsLength + completedJobsLength
              } jobs completed`}</span>
            </div>
            <div className="active-badge">
              <span>active</span>
              <VscVmActive />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default SingleOwner;
