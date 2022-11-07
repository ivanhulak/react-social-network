import React from "react";
import Header from './Header';
import { connect } from "react-redux";
import { logout } from '../../redux/auth-reducer';
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { getLogin, getUserId } from "../../redux/selectors/header-selectors";


type PropsType = MapStateToPropsType & MapDispatchToPropsType;
type MapStateToPropsType = { login: string | null, userId: number | null }
type MapDispatchToPropsType = { logout: () => void }

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    login: getLogin(state),
    userId: getUserId(state),
  }
}
export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { logout }))
(HeaderContainer);