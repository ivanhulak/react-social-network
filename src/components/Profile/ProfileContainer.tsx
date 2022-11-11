import React from "react";
import Profile from "./Profile";
import { setProfile, getStatus, updateStatus, uploadPhoto, upgradeProfile } from "../../redux/profile-reducer";
import { actions } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { withLocationAndMatch } from '../HOC/withLocationAndMatch';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";


type MapStateToPropsType = {
  profile: ProfileType | null
  status: string
  userId: number | null
}
type MapDispatchToPropsType = {
  setProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  uploadPhoto: (photo: File) => void
  upgradeProfile: (formData: ProfileType) => void
  loadDataToProfileDataForm: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

  refreshProfile() {
    // @ts-ignore
    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        // @ts-ignore
        this.props.history.push('/login');
      }
    }
    this.props.setProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  // @ts-ignore
  componentDidUpdate(prevProps) {
    // @ts-ignore
    if (this.props.params.userId !== prevProps.params.userId) {
      this.refreshProfile();
    }
  }
  // I can edit only my profile (cannot edit others)
  // some Id in URL -- it means I am not an owner (but when those Id in Url === my id --> I am owner ) 
  // @ts-ignore
  isOwner = !(this.props.params.userId && (Number(this.props.params.userId) !== this.props.userId))

  render() {
    return <Profile {...this.props} profile={this.props.profile} uploadPhoto={this.props.uploadPhoto}
      status={this.props.status} updateStatus={this.props.updateStatus} isOwner={this.isOwner}
      upgradeProfile={this.props.upgradeProfile} loadDataToProfileDataForm={this.props.loadDataToProfileDataForm} />
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
  }
}

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    setProfile, getStatus, updateStatus, uploadPhoto, upgradeProfile,
    loadDataToProfileDataForm: actions.loadDataToProfileDataForm
  }),
  withLocationAndMatch)(ProfileContainer)