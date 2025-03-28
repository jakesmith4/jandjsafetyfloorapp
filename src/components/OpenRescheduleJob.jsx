import { useState } from 'react';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';
import { formatDate } from '../utils';

const OpenRescheduleJob = () => {
  const [date, setDate] = useState('');
  const { currentSingleJob, addJobToCurrentOwner, closeModal } =
    useGlobalContext();

  return (
    <form className="form">
      <h3 className="form-heading">please enter a date</h3>
      <div className="form-row">
        {currentSingleJob.date && (
          <div>
            <h4>old date</h4>
            {formatDate(currentSingleJob.date)}
          </div>
        )}
      </div>
      <div className="form-row">
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={e => {
            setDate(e.target.value);
          }}
        />
      </div>
      <button
        className="btn"
        onClick={e => {
          e.preventDefault();

          if (!date) {
            toast.warning('Please Enter A Valid Date');
            return;
          }

          addJobToCurrentOwner(
            e,
            currentSingleJob.storeNumber,
            currentSingleJob.address,
            currentSingleJob.price,
            date,
            currentSingleJob.phoneNumber,
            currentSingleJob.notes,
            currentSingleJob.staySpot,
            true
          );
          closeModal();
          toast.success(
            `Successfully rescheduled "${
              currentSingleJob.storeNumber
            }" for "${formatDate(date)}"`
          );
        }}
      >
        reschedule job
      </button>
    </form>
  );
};
export default OpenRescheduleJob;
