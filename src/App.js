import React from "react";
import styles from './App.module.css';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPageContainer from "./components/Login/LoginPageContainer.jsx";
import { Routes, Route } from 'react-router-dom';
import {initializeApp} from './redux/app-reducer';
import { connect } from "react-redux";
import { compose } from "redux";
import { withLocationAndMatch } from "./components/HOC/withLocationAndMatch";
import Preloader from "./common/Preloader";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized){
      return <Preloader/>
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
              <Route path="/dialogs" element={<DialogsContainer />} />
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

const AppContainer = compose(withLocationAndMatch, connect(mapStateToProps, {initializeApp}))(App);

const MySocialNetworkApp = () => {
  return <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
}

export default MySocialNetworkApp;