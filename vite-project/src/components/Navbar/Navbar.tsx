import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;