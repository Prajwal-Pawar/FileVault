import { Link } from 'react-router-dom';
// semantic ui imports
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <Menu secondary>
      <Menu.Item name="FileVault">
        <Link to="/">
          <h3>FileVault</h3>
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/user">
            <h3>Profile</h3>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
