import { useState } from 'react';
import { useGlobalContext } from '../context';

const SingleJob = ({ job }) => {
  const { editJob, deleteJob } = useGlobalContext();
  const [date, setDate] = useState(job.date);
  const [storeNumber, setStoreNumber] = useState(job.storeNumber);
  const [address, setAddress] = useState(job.address);
  const [price, setPrice] = useState(job.price);

  return (
    <form
      className="single-job"
      onSubmit={e => {
        editJob(job.id, date, storeNumber, address, price, job.owner, e);
      }}
    >
      <h2>{job.owner}</h2>
      <div className="form-row">
        <label htmlFor="date" className="form-label">
          date
        </label>
        <input
          type="date"
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
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div className="btn-container">
        <button className="btn" type="submit">
          edit job
        </button>
        <button className="btn" type="button">
          delete job
        </button>
      </div>
    </form>
  );
};
export default SingleJob;