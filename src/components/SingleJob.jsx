import { useState } from 'react';
import { useGlobalContext } from '../context';

const SingleJob = ({ job }) => {
  const { editJob, deleteJob, markJobAsCompleted } = useGlobalContext();
  const [date, setDate] = useState(job.date);
  const [storeNumber, setStoreNumber] = useState(job.storeNumber);
  const [address, setAddress] = useState(job.address);
  const [price, setPrice] = useState(job.price);

  return (
    <form className="single-job">
      <h2 className="single-job-header">{job.owner}</h2>
      <div className="form-row">
        <label htmlFor="date" className="form-label">
          date:
        </label>
        <input
          type="date"
          className="form-input single-job-input"
          value={date}
          onChange={e => {
            setDate(e.target.value);
            editJob(
              job.id,
              e.target.value,
              storeNumber,
              address,
              price,
              job.owner,
              e
            );
          }}
        />
      </div>
      <div className="form-row">
        <label htmlFor="store-number" className="form-label">
          store number:
        </label>
        <input
          className="form-input single-job-input"
          type="text"
          id="store-number"
          value={storeNumber}
          onChange={e => {
            setStoreNumber(e.target.value);
            editJob(job.id, date, e.target.value, address, price, job.owner, e);
          }}
        />
      </div>
      <div className="form-row">
        <label htmlFor="address" className="form-label">
          address:
        </label>
        <textarea
          className="form-input single-job-textarea"
          id="address"
          value={address}
          onChange={e => {
            setAddress(e.target.value);
            editJob(
              job.id,
              date,
              storeNumber,
              e.target.value,
              price,
              job.owner,
              e
            );
          }}
        ></textarea>
      </div>
      <div className="form-row">
        <label htmlFor="price" className="form-label">
          price:
        </label>
        <input
          className="form-input single-job-input"
          type="number"
          id="price"
          value={price}
          onChange={e => {
            setPrice(e.target.value);
            editJob(
              job.id,
              date,
              storeNumber,
              address,
              e.target.value,
              job.owner,
              e
            );
          }}
        />
      </div>
      <div className="form-row">
        <label htmlFor="completed" className="form-label">
          completed:
        </label>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={job.completed}
          onChange={() => markJobAsCompleted(job.id, job.owner)}
        />
      </div>
      <div className="btn-container">
        <button
          className="btn single-job-btn"
          type="button"
          onClick={() => deleteJob(job.id, job.owner)}
        >
          delete job
        </button>
      </div>
    </form>
  );
};
export default SingleJob;
