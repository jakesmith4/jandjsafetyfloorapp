import { FaHome, FaUser, FaCalendarDay, FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const Sidebar = () => {
  const {
    openHome,
    openCurrentOwner,
    openCurrentJob,
    openSearchJobs,
    isHomeOpen,
    isCurrentOwnerOpen,
    isCurrentJobOpen,
    isSearchJobsOpen,
    searchJob,
    searchInputValue,
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
            title="Home"
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
            title="Current Owner"
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
            title="Current Jobs"
            onClick={openCurrentJob}
          >
            <FaCalendarDay />
          </button>
        </li>
        <li className="sidebar-item">
          <button
            className={
              isSearchJobsOpen ? 'sidebar-btn sidebar-btn-open' : 'sidebar-btn'
            }
            title="Search Jobs"
            onClick={() => {
              openSearchJobs();
              searchJob(searchInputValue);
            }}
          >
            <FaSearch />
          </button>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
