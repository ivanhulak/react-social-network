import React from "react";
import styles from './App.module.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./common/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { initializeApp, handleError } from './redux/app-reducer';
import { getFriends } from "./redux/users-reducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { withLocationAndMatch } from "./components/HOC/withLocationAndMatch";
import { withLazyComponent } from "./components/HOC/withLazyComponent";
import store, { AppStateType } from './redux/redux-store';
import { NotFound } from "./components/ErrorPages/NotFound";
import { LoginPage } from "./components/Login/LoginPage";
// Use lazy loading
const ProfileContainer = withLazyComponent(React.lazy(() => import('./components/Profile/ProfileContainer')));
const DialogsContainer = withLazyComponent(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersPage = withLazyComponent(React.lazy(() => import('./components/Users/UsersPage')));

type MapStateToPropsType = {
  initialized: boolean
  globalError: string
  errorsData: any
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

  catchUnhandledErrors = (error: PromiseRejectionEvent) => {
    this.props.handleError(error.reason.message);
  }

  componentDidMount() {
    this.props.initializeApp();
    this.props.getFriends();
    window.addEventListener("unhandledrejection", this.catchUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={styles.Container} >
        <div className={styles.wrapper}>
          <HeaderContainer />
          < Navbar />
          <div className={styles.wrapperContent}>
            {this.props.errorsData && <div>{this.props.errorsData.message}</div>}
            {this.props.globalError && <div>{this.props.globalError}</div>}
            < Routes >
              <Route path='/' element={< ProfileContainer />}>
                <Route path="/profile" element={< ProfileContainer />} />
                < Route path="/profile/:userId" element={< ProfileContainer />} />
              </Route>
              < Route path="/dialogs" element={< DialogsContainer />} />
              < Route path="/users" element={< UsersPage />} />
              < Route path="/login" element={< LoginPage />} />
              < Route path="*" element={< NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }
}
type MapDispatchToPropsType = {
  initializeApp: () => void
  handleError: (error: any) => void
  getFriends: () => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError,
  errorsData: state.profilePage.errorsData
})

const AppContainer = compose(withLocationAndMatch,
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    { initializeApp, handleError, getFriends }))(App);

export const MySocialNetworkApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MySocialNetworkApp;