import React from "react";
import styles from './App.module.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import LoginPageContainer from "./components/Login/LoginPageContainer.jsx";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { initializeApp, handleError } from './redux/app-reducer.ts';
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { withLocationAndMatch } from "./components/HOC/withLocationAndMatch";
import { withLazyComponent } from "./components/HOC/withLazyComponent";
import Preloader from "./common/Preloader";
import store from './redux/redux-store';
import { NotFound } from "./components/ErrorPages/NotFound";
// Use this lazy loading
const ProfileContainer = withLazyComponent(React.lazy(() => import('./components/Profile/ProfileContainer')));
const DialogsContainer = withLazyComponent(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersContainer = withLazyComponent(React.lazy(() => import('./components/Users/UsersContainer')));

class App extends React.Component {

  catchUnhandledErrors = (error) => {
    this.props.handleError(error.reason.message);
  }

  componentDidMount() {
    this.props.initializeApp();
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
      <div className={styles.Container}>
        <div className={styles.wrapper}>
          <HeaderContainer />
          <Navbar />
          <div className={styles.wrapperContent}>
            {this.props.errorsData && <div>{this.props.errorsData.message}</div>}
            {this.props.globalError && <div>{this.props.globalError}</div>}
            <Routes>
              <Route path='/' element={<ProfileContainer />}>
                <Route path="/profile" element={<ProfileContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
              </Route>
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginPageContainer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>)
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError,
  errorsData: state.profilePage.errorsData
})

const AppContainer = compose(withLocationAndMatch, connect(mapStateToProps, { initializeApp, handleError }))(App);

const MySocialNetworkApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MySocialNetworkApp;