import React from "react";
import Profile from "./Profile";
import { SetProfile } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import {withLocationAndMatch} from '../HOC/withLocationAndMatch';
import {withAuthRedirect} from '../HOC/withAuthRedirect';
import { compose } from "redux";

class ProfileContainer extends React.Component {

  componentDidMount(){
    let userId = this.props.params.userId;
    if(!userId){
      userId = 2;
    }
    this.props.SetProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile}/>
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {SetProfile}),
  withLocationAndMatch
)(ProfileContainer)