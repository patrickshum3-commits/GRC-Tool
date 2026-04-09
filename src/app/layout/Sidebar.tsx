import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Dashboard'],
  ['/frameworks', 'Frameworks'],
  ['/controls', 'Controls'],
  ['/risks', 'Risks'],
  ['/audits', 'Audits'],
  ['/evidence', 'Evidence'],
  ['/reports', 'Reports'],
  ['/settings', 'Settings']
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1>GRC MVP</h1>
      {links.map(([path, label]) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {label}
        </NavLink>
      ))}
    </aside>
  );
};
