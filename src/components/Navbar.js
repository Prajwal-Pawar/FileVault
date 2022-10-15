import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <h1>
        <Link to="/">FileVault</Link>
      </h1>
      <Link to="/user">Profile</Link>
    </div>
  );
};

export default Navbar;
