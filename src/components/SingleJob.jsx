import { useState } from 'react';

const SingleJob = ({ job }) => {
  const [date, setDate] = useState(job.date);
  const [storeNumber, setStoreNumber] = useState(job.storeNumber);
  const [address, setAddress] = useState(job.address);
  const [price, setPrice] = useState(job.price);
  return (
    <article className="single-job">
      <h2>{job.owner}</h2>
      <div className="form-row">
        <label htmlFor="date" className="form-label">
          date
        </label>
        <input
          type="date"
          className="form-input"
          value={job.date}
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
          value={job.storeNumber}
          onChange={e => setStoreNumber(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="address" className="form-label">
          address
        </label>
        <textarea
          id="address"
          value={job.address}
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
          value={job.price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
    </article>
  );
};
export default SingleJob;
