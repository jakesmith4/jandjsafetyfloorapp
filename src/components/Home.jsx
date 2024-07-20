import SingleOwner from './SingleOwner';
import { owners } from '../data';
import { useGlobalContext } from '../context';
const Home = () => {
  const ownersArray = [...owners];
  const { isModalOpen, openModal } = useGlobalContext();

  if (ownersArray.length === 0) {
    return (
      <section className="owner-info">
        <header>
          <h2>J&J Safety Floor</h2>
          <h4 className="empty-owners">Add an owner to display info</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="owner-info">
      <header>
        <h2>J&J Safety Floor</h2>
      </header>
      <div>
        {ownersArray.map(owner => {
          return <SingleOwner key={owner.id} {...owner} />;
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h5 className="owner-total">
            total owners: <span>10</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={openModal}>
          add owner
        </button>
      </footer>
    </section>
  );
};

export default Home;
