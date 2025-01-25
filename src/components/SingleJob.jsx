import { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';

import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const places = ['places'];

const SingleJob = ({ job }) => {
  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB0rLqZ5ov3ufr6ZZXpPaKVSyGcMdLkJ2o',

    libraries: places,
  });

  const handleOnPlacesChanged = () => {
    let address = inputRef.current.getPlaces();

    const currentAddress = `McDonald's, ${address[0].formatted_address}`;

    setAddress(currentAddress);

    editJob(job.id, date, storeNumber, currentAddress, price, job.owner);

    toast.success(`Successfully changed Store Address`);
  };

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
        <label htmlFor="address" className="form-label">
          address:
        </label>
        {/* ADDRESS */}
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={ref => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged}
          >
            <input
              type="text"
              id="address"
              className="form-textarea"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </StandaloneSearchBox>
        )}
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
