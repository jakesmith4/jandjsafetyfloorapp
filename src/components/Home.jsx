import SingleOwner from './SingleOwner';
import { useGlobalContext } from '../context';

import logo from '../img/j-and-logo-1-min.png';
import Logo from './Logo';

const Home = () => {
  const { openModal, owners, openAddOwnerForm } = useGlobalContext();

  const ownersArray = Array.from(owners.entries());

  if (ownersArray.length === 0) {
    return (
      <section className="owner-info">
        <header>
          <Logo logo={logo} />
          <h4 className="empty-owners">Add an owner to display info</h4>
          <button
            className="btn btn-hipster"
            onClick={() => {
              openModal();
              openAddOwnerForm();
            }}
          >
            add owner
          </button>
        </header>
      </section>
    );
  }
  return (
    <section className="owner-info">
      <header>
        <Logo logo={logo} />
      </header>
      <div className="single-owner-container">
        {ownersArray.map(owner => {
          const [id, item] = owner;
          return <SingleOwner key={id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h5 className="owner-total">
            <span className="owner-total-heading">total owners:</span>{' '}
            <span className="owner-total-value">{owners.size}</span>
          </h5>
        </div>
        <button
          className="btn btn-hipster"
          onClick={() => {
            openModal();
            openAddOwnerForm();
          }}
        >
          add owner
        </button>
      </footer>
    </section>
  );
};

export default Home;
