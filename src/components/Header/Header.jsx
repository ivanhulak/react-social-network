import React from "react";
import styles from './Header.module.css';
import logo from './../../images/logo_SN.jpg';
import {Link} from 'react-router-dom';
 
const Header = (props) => {
  return (
    <header className={styles.header}>
        <img src={logo} alt="Logotype" />
        {props.login 
        ? <div>{props.login}</div> 
        : <div>
            <Link to='/login'>
                <div>Login</div>
            </Link>
          </div>}
    </header>
  );
}

export default Header;