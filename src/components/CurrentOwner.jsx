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

      <footer>
        <hr />
      </footer>
    </section>
  );
};
export default CurrentOwner;
