import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/images/logo_SN.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { SimpleBtn } from "../../common/Buttons/SimpleButton/SimpleBtn";
import { useSelector } from "react-redux";
import { getLogin, getUserId } from "../../redux/selectors/header-selectors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth-reducer";


export const Header: React.FC = () => {

  const userId = useSelector(getUserId)
  const login = useSelector(getLogin)
  const dispatch: any = useDispatch()

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/profile/${userId}`;
    navigate(path);
  }
  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logotype" />
      {login
        ? <div className={styles.headerInnerRow}>
          <SimpleBtn btn_text={login} onClickCallback={routeChange} />
          <div>
            <SimpleBtn btn_text='logout' onClickCallback={logoutCallback} />
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