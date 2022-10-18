import React from "react";
import Header from './Header';
import { connect } from "react-redux";
import { AuthMe, logout } from './../../redux/auth-reducer';
import { compose } from "redux";


class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.AuthMe();
  }
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
  }
}

export default compose(
  connect(mapStateToProps, { AuthMe, logout }))
  (HeaderContainer);