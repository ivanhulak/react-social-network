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
    Number(userId);
    console.log(userId)
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
  checkIsOwner = (paramsId: any, ownId: any) => {
    let isOwner;
    paramsId = Number(paramsId)
    if (paramsId) {
      if (paramsId === ownId) {
        isOwner = true
      } else {
        isOwner = false
      }
    } else {
      isOwner = true
    }
    return isOwner
  }
  
  
  render() {
    //@ts-ignore
    let isOwner = this.checkIsOwner(this.props.params.userId, this.props.userId)
    console.log(isOwner)
    return <Profile {...this.props} profile={this.props.profile} uploadPhoto={this.props.uploadPhoto}
      status={this.props.status} updateStatus={this.props.updateStatus} isOwner={isOwner}
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