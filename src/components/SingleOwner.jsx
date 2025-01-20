import { useGlobalContext } from '../context';
import { FaTrashAlt } from 'react-icons/fa';

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
        <div className="owner-price">
          <span>${price}</span>
        </div>
        <div className="owner-amount">{amount} stores</div>
        <button className="remove-btn" onClick={() => removeOwner(id)}>
          <span>remove</span>
          <FaTrashAlt />
        </button>
      </div>
    </article>
  );
};

export default SingleOwner;
