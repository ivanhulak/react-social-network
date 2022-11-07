import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/images/logo_SN.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/profile/${props.userId}`;
    navigate(path);
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logotype" />
      {props.login
        ? <div className={styles.headerInnerRow}>
          <button onClick={routeChange}>{props.login}</button>
          <div>
            <button onClick={props.logout}>logout</button>
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