import React from "react";
import styles from './Header.module.css';
import logo from './../../images/logo_SN.jpg';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logotype" />
      {props.login
        ? <div className={styles.headerInnerRow}>
          {props.login}
          <div>
            <button onClick={props.logout}>logout</button>
          </div>
        </div>
        : <div>
          <Link to='/login'>
            <div>Login</div>
          </Link>
        </div>
      }
    </header>
  );
}

export default Header;