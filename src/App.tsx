import React, { useEffect } from "react";
import styles from './App.module.css';
import Preloader from "./common/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from 'react-router-dom';
import { initializeApp, handleError } from './redux/app-reducer';
import { getFriends } from "./redux/users-reducer";
import { withLazyComponent } from "./components/HOC/withLazyComponent";
import { AppStateType } from './redux/redux-store';
import { NotFound } from "./components/ErrorPages/NotFound";
import { LoginPage } from "./components/Login/LoginPage";
import { Header } from "./components/Header/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Use lazy loading
const ProfilePage = withLazyComponent(React.lazy(() => import('./components/Profile/ProfilePage')));
const DialogsContainer = withLazyComponent(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersPage = withLazyComponent(React.lazy(() => import('./components/Users/UsersPage')));
const ChatPage = withLazyComponent(React.lazy(() => import('./components/Chat/ChatPage')));
const CartPage = withLazyComponent(React.lazy(() => import('./components/CartPage/CartPage')));


export const App: React.FC = () => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const globalError = useSelector((state: AppStateType) => state.app.globalError)
  const errorsData = useSelector((state: AppStateType) => state.profilePage.errorsData)
  const dispatch: any = useDispatch()

  const catchUnhandledErrors = (error: PromiseRejectionEvent) => {
    dispatch(handleError(error.reason.message));
  }

  useEffect(() => {
    dispatch(initializeApp())
    dispatch(getFriends())
    window.addEventListener("unhandledrejection", catchUnhandledErrors);

    return () => {
      window.removeEventListener("unhandledrejection", catchUnhandledErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <>
      {!initialized ? <Preloader /> :
        <div className={styles.Container} >
          <div className={styles.wrapper}>
            <Header />
            < Navbar />
            <div className={styles.wrapperContent}>
              {errorsData && <div>{errorsData.messages}</div>}
              {globalError && <div>{globalError}</div>}
              < Routes >
                <Route path='/' element={< ProfilePage />}>
                  <Route path="/profile" element={< ProfilePage />} />
                  < Route path="/profile/:userId" element={< ProfilePage />} />
                </Route>
                < Route path="/dialogs" element={< DialogsContainer />} />
                < Route path="/chat" element={< ChatPage />} />
                < Route path="/users" element={< UsersPage />} />
                < Route path="/login" element={< LoginPage />} />
                < Route path="/shop" element={< CartPage />} />
                < Route path="*" element={< NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      }
      </>
  );
}