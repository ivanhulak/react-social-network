import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { getFriends } from "../../redux/selectors/users-selectors";
import { UsersType } from "../../types/types";
import Friends from "./Friends";

type PropsType = MapStateToPropsType & MapDispatchToPropsType;
type MapStateToPropsType = { friends: Array<UsersType> }
type MapDispatchToPropsType = {}

class FriendsContainer extends React.Component<PropsType> {
  render() {
    return <Friends {...this.props}/>
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    friends: getFriends(state)
  }
}
export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {}))
(FriendsContainer);