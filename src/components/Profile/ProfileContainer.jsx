import React from "react";
import Profile from "./Profile";
import { setProfile, getStatus, updateStatus, uploadPhoto, 
         upgradeProfile, loadDataToProfileDataForm } from "../../redux/profile-reducer.ts";
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
  // I can edit only my profile (cannot edit others)
  // some Id in URL -- it means I am not an owner (but when those Id in Url === my id --> I am owner ) 
  isOwner = !(this.props.params.userId && (Number(this.props.params.userId) !== this.props.userId))

  render() {
    return <Profile {...this.props} profile={this.props.profile} uploadPhoto={this.props.uploadPhoto}
      status={this.props.status} updateStatus={this.props.updateStatus} isOwner={this.isOwner}
      upgradeProfile={this.props.upgradeProfile} loadDataToProfileDataForm={this.props.loadDataToProfileDataForm} />
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
  connect(mapStateToProps, { setProfile, getStatus, updateStatus, uploadPhoto, upgradeProfile, loadDataToProfileDataForm }),
  withLocationAndMatch
)(ProfileContainer)