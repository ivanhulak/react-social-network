import React from "react";
import Header from './Header';
import * as axios from 'axios';
import { connect } from "react-redux";
import { authUserProfileAC } from './../../redux/auth-reducer';

class HeaderContainer extends React.Component {

  componentDidMount() {
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true })
      .then(response => {
        let { id, email, login } = response.data.data;
        this.props.authUserProfile(id, email, login);
      })
  }

  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authUserProfile: (id, email, login) => {
      dispatch(authUserProfileAC(id, email, login))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);