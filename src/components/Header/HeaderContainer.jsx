import React from "react";
import Header from './Header';
import { connect } from "react-redux";
import { AuthMeThunkCreator } from './../../redux/auth-reducer';

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.AuthMeThunkCreator();
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

export default connect(mapStateToProps, {AuthMeThunkCreator})(HeaderContainer);