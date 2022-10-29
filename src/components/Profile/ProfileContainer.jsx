import React from "react";
import Profile from "./Profile";
import { setProfile, getStatus, updateStatus, uploadPhoto, upgradeProfile } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { withLocationAndMatch } from '../HOC/withLocationAndMatch';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from "redux";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.setProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps) {
    if (this.props.params.userId !== prevProps.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} uploadPhoto={this.props.uploadPhoto}
      status={this.props.status} updateStatus={this.props.updateStatus} isOwner={!this.props.params.userId}
      upgradeProfile={this.props.upgradeProfile}/>
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, { setProfile, getStatus, updateStatus, uploadPhoto, upgradeProfile }),
  withLocationAndMatch
)(ProfileContainer)