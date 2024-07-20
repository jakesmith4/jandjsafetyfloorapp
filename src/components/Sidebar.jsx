import { FaCog, FaHome, FaMap, FaUser } from 'react-icons/fa';
import { links } from '../data';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        {links.map(link => (
          <li className="sidebar-item" key={link.id}>
            <button className="sidebar-btn">{link.icon}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
