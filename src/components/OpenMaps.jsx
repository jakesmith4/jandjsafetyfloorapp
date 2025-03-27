import { useGlobalContext } from '../context';

const OpenMaps = () => {
  const { currentSingleJob } = useGlobalContext();

  console.log(currentSingleJob);

  return (
    <form className="form">
      <h3 className="form-heading">where would you like to go</h3>
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            window.open(
              `https://maps.google.com?q=${currentSingleJob.address}`
            );
          }}
        >
          Store
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            window.open(
              `https://maps.google.com?q=${currentSingleJob.staySpot}`
            );
          }}
        >
          Stay Spot
        </button>
      </div>
    </form>
  );
};
export default OpenMaps;
