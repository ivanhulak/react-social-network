import React, { useEffect } from "react";
import styles from './Header.module.css';
import logo from '../../assets/images/logo_SN.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { SimpleBtn } from "../../common/Buttons/SimpleButton/SimpleBtn";
import { useSelector } from "react-redux";
import { getLogin, getUserId } from "../../redux/selectors/header-selectors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth-reducer";


export const Header: React.FC = React.memo(() => {

  const userId = useSelector(getUserId)
  const login = useSelector(getLogin)
  const dispatch: any = useDispatch()
  const navigate = useNavigate();

  const routeChange = () => {
    let path = `/profile/${userId}`;
    navigate(path);
  }
  const logoutCallback = () => {
    dispatch(logout())
  }

  useEffect(() => {
    navigate('/login')
    // eslint-disable-next-line
  }, [login])

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
            <SimpleBtn btn_text='Login' />
          </Link>
        </div>
      }
    </header>
  );
})