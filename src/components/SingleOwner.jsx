import { useGlobalContext } from '../context';
const SingleOwner = ({ id, name, price, amount }) => {
  const { removeOwner, setCurrentOwner } = useGlobalContext();
  return (
    <article
      className="single-owner"
      onClick={() => {
        setCurrentOwner(id);
      }}
    >
      <div>
        <h5>{name}</h5>
        <span className="owner-price">${price}</span>
        <span className="owner-amount">{amount} stores</span>
        <button className="remove-btn" onClick={() => removeOwner(id)}>
          remove
        </button>
      </div>
    </article>
  );
};

export default SingleOwner;
