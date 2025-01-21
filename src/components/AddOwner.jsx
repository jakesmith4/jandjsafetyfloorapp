import { useGlobalContext } from '../context';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddOwner = () => {
  const { addOwner, changeNewOwnerInfo, closeAddOwnerForm } =
    useGlobalContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <form className="form">
      <h3 className="form-heading">add owner</h3>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name:
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
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
          onChange={e => setPrice(+e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="amount" className="form-label">
          amount of stores:
        </label>
        <input
          type="number"
          id="amount"
          className="form-input"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
        />
      </div>
      <button
        className="btn"
        onClick={e => {
          e.preventDefault();
          if (!name) {
            toast.error(`Please enter a "name"`);
            return;
          }

          if (!price) {
            toast.error(`Please enter a "price"`);
            return;
          }

          if (!amount) {
            toast.error(`Please enter an "amount of stores"`);
            return;
          }

          // if (name && price && amount) {
          // }
          changeNewOwnerInfo(name, price, amount);
          addOwner(e);
          closeAddOwnerForm();
          toast.success(`Owner added: ${name.toUpperCase()}`);
          setName('');
          setPrice('');
          setAmount('');
        }}
      >
        add owner
      </button>
    </form>
  );
};
export default AddOwner;
