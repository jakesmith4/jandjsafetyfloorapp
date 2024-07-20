import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
const SingleOwner = ({ id, name, price, amount }) => {
  return (
    <article className="single-owner">
      <div>
        <h5>{name}</h5>
        <span className="owner-price">${price}</span>
        <span className="owner-amount">{amount} stores</span>
        <button className="remove-btn" onClick={() => console.log('remove')}>
          remove
        </button>
      </div>
    </article>
  );
};

export default SingleOwner;
