import React from "react";
import Header from './Header';
import * as axios from 'axios';
import { connect } from "react-redux";
import { authUserProfileAC } from './../../redux/auth-reducer';

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true })
      .then(response => {
        if (response.data.resultCode === 0){
          let { id, email, login } = response.data.data;
          this.props.authUserProfile(id, email, login);
        } else {
          alert(response.data.messages[0]);
        }
      })
  }

  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    email: state.auth.email,
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