import { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';
import { fixName, formatDate } from '../utils';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const places = ['places'];

const AddJob = () => {
  // console.log(import.meta.env.VITE_GOOGLEMAPS_API_KEY);

  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB0rLqZ5ov3ufr6ZZXpPaKVSyGcMdLkJ2o',

    libraries: places,
  });

  const handleOnPlacesChanged = () => {
    let address = inputRef.current.getPlaces();
    const currentNumber = address[0].formatted_phone_number;
    setAddress(`McDonald's, ${address[0].formatted_address}`);
    setNumber(currentNumber);
  };

  const {
    addJobToCurrentOwner,
    closeCurrentOwnerForm,
    closeModal,
    currentOwner,
  } = useGlobalContext();

  const [date, setDate] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(currentOwner.price);
  const [number, setNumber] = useState('');

  return (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();

        if (!date) {
          toast.warning(`Please enter a "Date"`);
          return;
        }

        if (!storeNumber) {
          toast.warning(`Please enter a "Store Number"`);
          return;
        }

        if (!address) {
          toast.warning(`Please enter a "Valid Address"`);
          return;
        }

        if (!price) {
          toast.warning(`Please enter a "Price"`);
          return;
        }

        addJobToCurrentOwner(e, storeNumber, address, price, date, number);
        toast.success(
          `Successfully added #${storeNumber} to "${fixName(
            currentOwner.name
          )}" on ${formatDate(date)}`
        );
        closeCurrentOwnerForm();
        closeModal();
        setStoreNumber('');
        setAddress('');
        setPrice('');
      }}
    >
      <h3 className="form-heading">add job</h3>
      <div className="form-row">
        <label htmlFor="date" className="form-label">
          date:
        </label>
        <input
          type="date"
          id="date"
          className="form-input"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="store-number" className="form-label">
          store number:
        </label>
        <input
          type="number"
          id="store-number"
          className="form-input"
          value={storeNumber}
          onChange={e => setStoreNumber(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="address" className="form-label">
          address:
        </label>
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={ref => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged}
          >
            <input type="text" id="address" className="form-input" />
          </StandaloneSearchBox>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="price" className="form-label">
          price:
        </label>
        <input
          type="number"
          id="price"
          className="form-input"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <button className="btn">add job</button>
    </form>
  );
};
export default AddJob;
