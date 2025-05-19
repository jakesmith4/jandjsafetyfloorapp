import { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';
import { IoMapSharp } from 'react-icons/io5';
import { FaTrashAlt, FaClipboardCheck } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { GiAcid, GiBubbles, GiCheckMark, GiCrossMark } from 'react-icons/gi';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';

import { formatDate, toFraction } from '../utils';

const places = ['places'];

const SingleJob = ({ job }) => {
  let globalAddress = job.address;
  let globalAddressStay = job.staySpot;

  const showInMapClicked = e => {
    e.preventDefault();
    openModal();
    openMapsForm();
  };

  const inputRefStore = useRef(null);
  const inputRefStay = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB0rLqZ5ov3ufr6ZZXpPaKVSyGcMdLkJ2o',

    libraries: places,
  });

  const handleOnPlacesChanged = inputRef => {
    let addressObject = inputRef.current.getPlaces()[0];

    let storeAddress = address || '';
    let storeStaySpot = staySpot || '';

    let currentNumber;

    if (inputRef === inputRefStay) {
      currentNumber = currentSingleJob.phoneNumber;
    } else {
      currentNumber =
        inputRefStore.current.getPlaces()[0]?.formatted_phone_number;
    }

    if (inputRef === inputRefStay) {
      storeStaySpot = `${addressObject.name}, ${addressObject.formatted_address}`;
      setStaySpot(storeStaySpot);
      globalAddressStay = storeStaySpot;
      toast.success(`Successfully changed Stay Spot`);
    } else {
      storeAddress = `${addressObject.name}, ${addressObject.formatted_address}`;
      setAddress(storeAddress);
      setPhoneNumber(currentNumber);
      globalAddress = storeAddress;
      toast.success(`Successfully changed Store Address`);
    }

    editJob(
      job.id,
      date,
      storeNumber,
      storeAddress,
      price,
      job.owner,
      lobbyAcid,
      kitchenAcid,
      currentNumber,
      notes,
      storeStaySpot
    );
  };

  const saveToClipboard = async address => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(address);
        toast.success(`address copied to clipboard`);
      } catch (error) {
        toast.error('Failed to copy to clipboard');
      }
    } else {
      toast.error('Clipboard access not available');
    }
  };

  const {
    editJob,
    deleteJob,
    markJobAsCompleted,
    openMapsForm,
    openModal,
    openRescheduleJobForm,
    currentSingleJob,
    changeCurrentSingleJob,
  } = useGlobalContext();

  const [date, setDate] = useState(job.date);
  const [storeNumber, setStoreNumber] = useState(job.storeNumber);
  const [address, setAddress] = useState(job.address);
  const [staySpot, setStaySpot] = useState(job.staySpot);
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
        job.completed
          ? { background: '#024325', borderColor: '#475569' }
          : { background: '#16191b' }
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
              staySpot,
              e
            );

            if (e.target.value) {
              toast.success(`Date changed to: ${formatDate(e.target.value)}`);
            } else {
              toast.error('Please enter a valid date');
            }
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
              staySpot,
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
              staySpot,
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
              staySpot,
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
              staySpot,
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
          store address:
        </label>
        {/* ADDRESS */}
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={ref => (inputRefStore.current = ref)}
            onPlacesChanged={() => handleOnPlacesChanged(inputRefStore)}
          >
            <input
              type="text"
              id="address"
              className="single-job-input-address"
              value={address}
              disabled={job.completed}
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
          </StandaloneSearchBox>
        )}
        <button
          type="button"
          className="single-job-clipboard-copy"
          title="Copy address to clipboard"
          onClick={() => {
            saveToClipboard(address);
          }}
        >
          <FaClipboardCheck />
        </button>
      </div>
      <div className="form-row">
        <label htmlFor="address" className="form-label">
          stay spot:
        </label>
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={ref => (inputRefStay.current = ref)}
            onPlacesChanged={() => handleOnPlacesChanged(inputRefStay)}
          >
            <input
              type="text"
              id="address"
              className="single-job-input-address"
              value={staySpot}
              disabled={job.completed}
              onChange={e => {
                setStaySpot(e.target.value);
              }}
            />
          </StandaloneSearchBox>
        )}
        <button
          type="button"
          className="single-job-clipboard-copy"
          title="Copy address to clipboard"
          onClick={() => {
            saveToClipboard(staySpot);
          }}
        >
          <FaClipboardCheck />
        </button>
      </div>
      {currentSingleJob && (
        <button
          className="btn reschedule-btn"
          title="Reschedule Job"
          onClick={e => {
            e.preventDefault();
            openModal();
            openRescheduleJobForm();
          }}
        >
          <FaArrowsRotate />
        </button>
      )}
      <div className="form-row">
        <label
          htmlFor="completed"
          className="form-label single-job-checkbox-label"
        >
          {job.completed ? 'completed' : 'upcoming'}
        </label>
        <div
          className="single-job-flip-switch-container"
          onClick={() => markJobAsCompleted(job.id, job.owner)}
        >
          <button
            className={
              job.completed
                ? 'single-job-flip-switch single-job-flip-switch-checked'
                : 'single-job-flip-switch'
            }
            type="button"
          >
            {job.completed ? <GiCheckMark /> : <GiCrossMark />}
          </button>
        </div>
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
                  staySpot,
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
            className="btn call-to-action-btn call-btn"
            title="Call Store"
            style={job.completed ? { background: '#16191b' } : {}}
          >
            <BsFillTelephoneOutboundFill />
          </a>
        </div>

        <div className="btn-container">
          <button
            className="btn call-to-action-btn maps-btn"
            title="Open In Maps"
            onClick={e => {
              showInMapClicked(e);
              changeCurrentSingleJob(job);
            }}
          >
            <IoMapSharp />
          </button>
        </div>

        <div className="btn-container">
          <button
            className="btn call-to-action-btn delete-job-btn"
            type="button"
            title="Delete Job"
            onClick={() => deleteJob(job.id, job.owner)}
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="btn-container">
          <button
            className="btn call-to-action-btn note-btn"
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
