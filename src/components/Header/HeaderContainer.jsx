import React from "react";
import Header from './Header';
import { connect } from "react-redux";
import { logout } from '../../redux/auth-reducer.ts';
import { compose } from "redux";


class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    userId: state.auth.userId,
  }
}

export default compose(
  connect(mapStateToProps, { logout }))
  (HeaderContainer);