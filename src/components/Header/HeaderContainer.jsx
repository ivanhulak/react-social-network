import React from "react";
import Header from './Header';
import { connect } from "react-redux";
import { authUserProfile } from './../../redux/auth-reducer';
import {UsersAPI} from '../../DAL/api'

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    UsersAPI.authMe()
      .then(data => {
        if (data.resultCode === 0){
          let { id, email, login } = data.data;
          this.props.authUserProfile(id, email, login);
        } else {
          alert(data.messages[0]);
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

export default connect(mapStateToProps, {authUserProfile})(HeaderContainer);