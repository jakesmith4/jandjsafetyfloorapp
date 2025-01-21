import {
  FaCog,
  FaHome,
  FaMap,
  FaUser,
  FaCalendarDay,
  FaCalendarCheck,
} from 'react-icons/fa';
import { links } from '../data';
import { useGlobalContext } from '../context';

const Sidebar = () => {
  const {
    openHome,
    openCurrentOwner,
    openCurrentJob,
    openCompletedJobs,
    isHomeOpen,
    isCurrentOwnerOpen,
    isCurrentJobOpen,
    isCompletedJobsOpen,
  } = useGlobalContext();
  return (
    <aside className="sidebar sidebar-item-open">
      <ul className="sidebar-list">
        {/* {links.map(link => (
          <li className="sidebar-item" key={link.id}>
            <button className="sidebar-btn">{link.icon}</button>
          </li>
        ))} */}
        <li className="sidebar-item">
          <button
            className={
              isHomeOpen ? 'sidebar-btn sidebar-btn-open' : 'sidebar-btn'
            }
            onClick={openHome}
          >
            <FaHome />
          </button>
        </li>
        <li className="sidebar-item">
          <button
            className={
              isCurrentOwnerOpen
                ? 'sidebar-btn sidebar-btn-open'
                : 'sidebar-btn'
            }
            onClick={openCurrentOwner}
          >
            <FaUser />
          </button>
        </li>
        <li className="sidebar-item">
          <button
            className={
              isCurrentJobOpen ? 'sidebar-btn sidebar-btn-open' : 'sidebar-btn'
            }
            onClick={openCurrentJob}
          >
            <FaCalendarDay />
          </button>
        </li>
        <li className="sidebar-item">
          {/* <button
            className={
              isCompletedJobsOpen
                ? 'sidebar-btn sidebar-btn-open'
                : 'sidebar-btn'
            }
            onClick={openCompletedJobs}
          >
            <FaCalendarCheck />
          </button> */}
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
