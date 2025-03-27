import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';
import McdonaldsIcon from '../../brand-icons/McdonaldsIcon';
import LovesIcon from '../../brand-icons/LovesIcon';
import PilotIcon from '../../brand-icons/PilotIcon';
import FlyingJIcon from '../../brand-icons/FlyingJIcon';
import WalmartIcon from '../../brand-icons/WalmartIcon';
import TaIcon from '../../brand-icons/TaIcon';
import PetroIcon from '../../brand-icons/PetroIcon';
import DaysInnIcon from '../../brand-icons/DaysInnIcon';
import LaQuintaIcon from '../../brand-icons/LaQuintaIcon';
import Super8Icon from '../../brand-icons/Super8Icon';

const OpenMaps = () => {
  const { currentSingleJob } = useGlobalContext();

  console.log(currentSingleJob);

  const checkBusinessName = businessName =>
    currentSingleJob.staySpot.startsWith(businessName);

  return (
    <form className="form">
      <h3 className="form-heading">where would you like to go</h3>
      <div className="maps-btns-container">
        <button
          className="btn btn-maps mcdonalds-btn"
          onClick={e => {
            e.preventDefault();
            window.open(
              `https://maps.google.com?q=${currentSingleJob.address}`
            );
          }}
        >
          <h3>Store</h3>
          <McdonaldsIcon />
        </button>
        <button
          className={`btn btn-maps ${
            checkBusinessName('Walmart') && 'walmart-btn'
          } ${checkBusinessName(`Love's`) && 'loves-btn'}
          ${checkBusinessName('Pilot') && 'pilot-btn'}
          ${checkBusinessName('Flying J') && 'flying-j-btn'}
          ${checkBusinessName('TA') && 'ta-btn'}
          ${checkBusinessName('Petro') && 'petro-btn'}
          ${checkBusinessName('Days Inn') && 'days-inn-btn'}
          ${checkBusinessName('La Quinta') && 'la-quinta-btn'}
          ${checkBusinessName('Super 8') && 'super-8-btn'}
          `}
          onClick={e => {
            e.preventDefault();
            if (!currentSingleJob.staySpot) {
              toast.warning(`Please enter a "Stay Spot" for this job`);
              return;
            }
            window.open(
              `https://maps.google.com?q=${currentSingleJob.staySpot}`
            );
          }}
        >
          <h3>motel</h3>
          {checkBusinessName('Walmart') && <WalmartIcon />}
          {checkBusinessName(`Love's`) && <LovesIcon />}
          {checkBusinessName('Pilot') && <PilotIcon />}
          {checkBusinessName('Flying J') && <FlyingJIcon />}
          {checkBusinessName('TA') && <TaIcon />}
          {checkBusinessName('Petro') && <PetroIcon />}
          {checkBusinessName('Days Inn') && <DaysInnIcon />}
          {checkBusinessName('La Quinta') && <LaQuintaIcon />}
          {checkBusinessName('Super 8') && <Super8Icon />}
        </button>
      </div>
    </form>
  );
};
export default OpenMaps;
