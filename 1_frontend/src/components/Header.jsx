import { Link } from 'react-router-dom';
// img
import logo from '../img/newYear.jpg';

const Header = () => {
  return (
    <header>
      <div className='header'>
        <div>
          <img class='company' src={logo} alt='logo' />
        </div>
        <ul className='nav'>
          <li>
            <Link to='/'>Registracija</Link>
          </li>
          <li>
            <Link to='/users'>Visi dalyviai</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
