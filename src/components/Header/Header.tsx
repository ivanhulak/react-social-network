import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/images/logo_SN.jpg';
import { Link, useNavigate } from 'react-router-dom';

type PropsType = {
  userId: number | null, login: string | null, logout: () => void
}
const Header: React.FC<PropsType> = ({userId, login, logout}) => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/profile/${userId}`;
    navigate(path);
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logotype" />
      {login
        ? <div className={styles.headerInnerRow}>
          <button onClick={routeChange}>{login}</button>
          <div>
            <button onClick={logout}>logout</button>
          </div>
        </div>
        : <div>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
      }
    </header>
  );
}

export default Header;