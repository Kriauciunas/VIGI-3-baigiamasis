import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Registracija</Link>
          </li>
          <li>
            <Link to='/users'>Visi dalyviai</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
