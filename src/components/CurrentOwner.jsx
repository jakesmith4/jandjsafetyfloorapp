import { useGlobalContext } from '../context';

const CurrentOwner = () => {
  const { currentOwner } = useGlobalContext();

  if (!currentOwner) {
    return (
      <section className="owner-info">
        <header>
          <h2>Please select an owner</h2>
        </header>
      </section>
    );
  }
  return (
    <section className="owner-info">
      <header>
        <h2>{currentOwner.name}</h2>
      </header>

      <footer>
        <hr />
      </footer>
    </section>
  );
};
export default CurrentOwner;
