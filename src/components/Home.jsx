import CartItem from './CartItem';
import { owners } from '../data';
import { useGlobalContext } from '../context';
const Home = () => {
  const ownersArray = [...owners];
  const { isModalOpen, openModal } = useGlobalContext();

  if (ownersArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>J&J Safety Floor</h2>
          <h4 className="empty-cart">Add an owner to display info</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>J&J Safety Floor</h2>
      </header>
      {/* cart items */}
      <div>
        {ownersArray.map(cartItem => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
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
