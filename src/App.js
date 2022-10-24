import React from "react";
import styles from './App.module.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import LoginPageContainer from "./components/Login/LoginPageContainer.jsx";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { withLocationAndMatch } from "./components/HOC/withLocationAndMatch";
import {withLazyComponent} from "./components/HOC/withLazyComponent";
import Preloader from "./common/Preloader";
import store from './redux/redux-store';

// Use this lazy loading
const ProfileContainer = withLazyComponent(React.lazy(() => import('./components/Profile/ProfileContainer')));
const DialogsContainer = withLazyComponent(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersContainer = withLazyComponent(React.lazy(() => import('./components/Users/UsersContainer')));
// instead of this simple loading
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
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
            <Routes>
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/dialogs" element={<DialogsContainer/>} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginPageContainer />} />
            </Routes>
          </div>
        </div>
      </div>)
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(withLocationAndMatch, connect(mapStateToProps, { initializeApp }))(App);

const MySocialNetworkApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MySocialNetworkApp;