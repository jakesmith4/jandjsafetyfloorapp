import { FaCog, FaHome, FaMap, FaUser } from 'react-icons/fa';
import { links } from '../data';
import { useGlobalContext } from '../context';

const Sidebar = () => {
  const { openHome, openCurrentOwner, isHomeOpen } = useGlobalContext();
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
              !isHomeOpen ? 'sidebar-btn sidebar-btn-open' : 'sidebar-btn'
            }
            onClick={openCurrentOwner}
          >
            <FaUser />
          </button>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
