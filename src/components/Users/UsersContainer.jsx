import React from "react";
import {connect} from "react-redux";
import {setIsFetching, setFollowingInProgress, requestUsers, 
        followSuccess, unfollowSuccess } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, 
         getPageSize, getTotalUsersCount, getUsers } from "../../redux/selectors/users-selectors";

class UsersAPIComponent extends React.Component{
    componentDidMount(){
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.requestUsers(page, this.props.pageSize)
    }

    render(){
        console.log('Render')
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    isFetching={this.props.isFetching}
                    setIsFetching={this.props.setIsFetching}
                    setFollowingInProgress={this.props.setFollowingInProgress}
                    followingInProgress={this.props.followingInProgress}
                    followSuccess={this.props.followSuccess}
                    unfollowSuccess={this.props.unfollowSuccess}/>
        </>
    }
}

const mapStateToProps = (state) => {
    console.log('MapStateToProps');
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {setIsFetching, setFollowingInProgress, 
            requestUsers, followSuccess, unfollowSuccess})
)(UsersAPIComponent)
