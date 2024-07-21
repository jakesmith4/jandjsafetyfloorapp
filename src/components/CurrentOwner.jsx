import { useState } from 'react';
import { useGlobalContext } from '../context';

const CurrentOwner = () => {
  const { currentOwner, changeCurrentOwnerName } = useGlobalContext();
  const [name, setName] = useState(currentOwner?.name);

  if (!currentOwner) {
    return (
      <section className="current-owner">
        <header>
          <h2>Please select an owner</h2>
        </header>
      </section>
    );
  }
  return (
    <section className="current-owner">
      <header>
        <input
          className="current-owner-name"
          type="text"
          id="name"
          value={name}
          onChange={e => {
            setName(e.target.value);
            changeCurrentOwnerName(e.target.value);
          }}
        />
      </header>

      <div className="form">
        <h3>add job</h3>
        <div className="form-row">
          <label htmlFor="store-number" className="form-label">
            store number
          </label>
          <input type="text" id="store-number" className="form-input" />
        </div>
        <div className="form-row">
          <label htmlFor="address" className="form-label">
            address
          </label>
          <textarea id="address" className="form-textarea"></textarea>
        </div>
        <div className="form-row">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input type="number" id="price" className="form-input" />
        </div>
        <button className="btn">add job</button>
      </div>

      <footer>
        <hr />
      </footer>
    </section>
  );
};
export default CurrentOwner;
