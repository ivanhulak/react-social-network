import React from "react";
import Profile from "./Profile";
import { SetProfileThunkCreator } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import {withLocationAndMatch} from '../HOC/withLocationAndMatch';

class ProfileContainer extends React.Component {

  componentDidMount(){
    let userId = this.props.params.userId;
    if(!userId){
      userId = 2;
    }
    this.props.SetProfileThunkCreator(userId);
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

let WithUrlDataContainerComponent = withLocationAndMatch(ProfileContainer)

export default connect(mapStateToProps, {SetProfileThunkCreator})(WithUrlDataContainerComponent);