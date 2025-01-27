import { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';
import { IoMapSharp } from 'react-icons/io5';
import { FaTrashAlt } from 'react-icons/fa';
import { GiAcid, GiBubbles } from 'react-icons/gi';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';

import { convertDateOneDayForward, toFraction } from '../utils';

const places = ['places'];

const SingleJob = ({ job }) => {
  let globalAddress = job.address;

  const showInMapClicked = () => {
    window.open(`https://maps.google.com?q=${globalAddress}`);
  };

  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB0rLqZ5ov3ufr6ZZXpPaKVSyGcMdLkJ2o',

    libraries: places,
  });

  const handleOnPlacesChanged = () => {
    let address = inputRef.current.getPlaces();

    const currentAddress = `McDonald's, ${address[0].formatted_address}`;

    const currentNumber = address[0].formatted_phone_number;

    setAddress(currentAddress);
    setPhoneNumber(currentNumber);

    globalAddress = currentAddress;

    editJob(
      job.id,
      date,
      storeNumber,
      currentAddress,
      price,
      job.owner,
      lobbyAcid,
      kitchenAcid,
      currentNumber,
      notes
    );

    toast.success(`Successfully changed store address`);
  };

  const { editJob, deleteJob, markJobAsCompleted } = useGlobalContext();
  const [date, setDate] = useState(job.date);
  const [storeNumber, setStoreNumber] = useState(job.storeNumber);
  const [address, setAddress] = useState(job.address);
  const [price, setPrice] = useState(job.price);
  const [lobbyAcid, setLobbyAcid] = useState(job.lobbyAcid);
  const [kitchenAcid, setKitchenAcid] = useState(job.kitchenAcid);
  const [phoneNumber, setPhoneNumber] = useState(job.phoneNumber);
  const [notes, setNotes] = useState(job.notes);
  const [isNoteOpen, setIsNoteOpen] = useState(job.notes);

  return (
    <form
      className="single-job"
      style={
        job.completed ? { background: '#0f5132' } : { background: '#16191b' }
      }
    >
      <h2 className="single-job-header">{job.owner}</h2>
      <div className="form-row">
        <label htmlFor="date" className="form-label single-job-date-label">
          date:
        </label>
        <input
          type="date"
          className="form-input single-job-input single-job-date-input "
          value={date}
          disabled={job.completed}
          onChange={e => {
            setDate(e.target.value);
            editJob(
              job.id,
              e.target.value,
              storeNumber,
              address,
              price,
              job.owner,
              lobbyAcid,
              kitchenAcid,
              phoneNumber,
              notes,
              e
            );
            toast.success(
              `Date changed to: ${Intl.DateTimeFormat('en-US').format(
                new Date(convertDateOneDayForward(e.target.value))
              )}`
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
          type="number"
          id="store-number"
          value={storeNumber}
          disabled={job.completed}
          onChange={e => {
            setStoreNumber(e.target.value);
            editJob(
              job.id,
              date,
              e.target.value,
              address,
              price,
              job.owner,
              lobbyAcid,
              kitchenAcid,
              phoneNumber,
              notes,
              e
            );
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
          disabled={job.completed}
          onChange={e => {
            setPrice(e.target.value);
            editJob(
              job.id,
              date,
              storeNumber,
              address,
              e.target.value,
              job.owner,
              lobbyAcid,
              kitchenAcid,
              phoneNumber,
              notes,
              e
            );
          }}
        />
      </div>
      <div className="form-row">
        <label htmlFor="lobby-acid">acid used in lobby</label>
        <input
          type="range"
          className="single-job-range"
          id="lobby-acid"
          min="0"
          max=".5"
          step="0.125"
          value={lobbyAcid}
          disabled={job.completed}
          onChange={e => {
            setLobbyAcid(e.target.value);
            editJob(
              job.id,
              date,
              storeNumber,
              address,
              price,
              job.owner,
              e.target.value,
              kitchenAcid,
              phoneNumber,
              notes,
              e
            );
          }}
        />
        <div
          className="single-job-acid-container"
          style={{
            background:
              lobbyAcid > 0 ? 'yellow' : job.completed ? '#16191b' : '#0f5132',
          }}
        >
          {lobbyAcid > 0 ? (
            <div className="single-job-acid">
              <span>
                <GiAcid />
              </span>
              <span>{toFraction(lobbyAcid)} Cup</span>
            </div>
          ) : (
            <div className="single-job-soap">
              <span className="single-job-soap-icon">
                <GiBubbles />
              </span>
              <span>Soap only</span>
            </div>
          )}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="kitchen-acid">acid used in kitchen</label>
        <input
          type="range"
          className="single-job-range"
          id="kitchen-acid"
          min="0"
          max="1.25"
          step="0.125"
          value={kitchenAcid}
          disabled={job.completed}
          onChange={e => {
            setKitchenAcid(e.target.value);
            editJob(
              job.id,
              date,
              storeNumber,
              address,
              price,
              job.owner,
              lobbyAcid,
              e.target.value,
              phoneNumber,
              notes,
              e
            );
          }}
        />
        <div
          className="single-job-acid-container"
          style={{
            background:
              kitchenAcid > 0
                ? 'yellow'
                : job.completed
                ? '#16191b'
                : '#0f5132',
          }}
        >
          {kitchenAcid > 0 ? (
            <div className="single-job-acid">
              <span>
                <GiAcid />
              </span>
              <span>{toFraction(kitchenAcid)} Cup</span>
            </div>
          ) : (
            <div className="single-job-soap">
              <span className="single-job-soap-icon">
                <GiBubbles />
              </span>
              <span>Soap only</span>
            </div>
          )}
        </div>
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
              disabled={job.completed}
              onChange={e => {
                setAddress(e.target.value);
              }}
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

      <div className="form-row">
        {isNoteOpen && (
          <>
            <label htmlFor="notes" className="form-label">
              notes:
            </label>
            <textarea
              name=""
              id="notes"
              className="form-input single-job-input note-text-textarea"
              disabled={job.completed}
              value={notes}
              onChange={e => {
                setNotes(e.target.value);
                editJob(
                  job.id,
                  date,
                  storeNumber,
                  address,
                  price,
                  job.owner,
                  lobbyAcid,
                  kitchenAcid,
                  phoneNumber,
                  e.target.value,
                  e
                );
              }}
            ></textarea>
          </>
        )}
      </div>

      <div className="call-to-action-btns">
        <div className="btn-container">
          <a
            href={`tel:${phoneNumber}`}
            className="btn call-btn"
            title="Call Store"
            style={job.completed ? { background: '#16191b' } : {}}
          >
            <BsFillTelephoneOutboundFill />
          </a>
        </div>

        <div className="btn-container">
          <button
            className="btn maps-btn"
            title="Open In Maps"
            onClick={showInMapClicked}
          >
            <IoMapSharp />
          </button>
        </div>

        <div className="btn-container">
          <button
            className="btn single-job-btn"
            type="button"
            title="Delete Job"
            onClick={() => deleteJob(job.id, job.owner)}
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="btn-container">
          <button
            className="btn note-btn"
            type="button"
            title="Take Note"
            style={
              job.notes
                ? { background: 'gray', borderColor: 'white' }
                : {
                    background: '#7e27d0',
                    borderColor: isNoteOpen ? 'white' : 'transparent',
                  }
            }
            disabled={job.completed}
            onClick={() =>
              setIsNoteOpen(noteOpen => (job.notes ? true : !noteOpen))
            }
          >
            <MdEdit />
          </button>
        </div>
      </div>
    </form>
  );
};
export default SingleJob;
