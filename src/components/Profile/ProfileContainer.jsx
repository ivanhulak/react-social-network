import React from "react";
import Profile from "./Profile";
import { SetProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import {withLocationAndMatch} from '../HOC/withLocationAndMatch';
import {withAuthRedirect} from '../HOC/withAuthRedirect';
import { compose } from "redux";

class ProfileContainer extends React.Component {

  componentDidMount(){
    let userId = this.props.params.userId;
    if(!userId){
      userId = this.props.userId;
    }
    this.props.SetProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} 
                    status={this.props.status} updateStatus={this.props.updateStatus}/>
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {SetProfile, getStatus, updateStatus}),
  withLocationAndMatch
)(ProfileContainer)