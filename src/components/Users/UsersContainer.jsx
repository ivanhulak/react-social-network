import React from "react";
import {connect} from "react-redux";
import {setIsFetching, setFollowingInProgress, getUsers, 
        getUsersCount, followSuccess, unfollowSuccess } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader";

class UsersAPIComponent extends React.Component{
    componentDidMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.getUsersCount(this.props.pageSize, page)
    }

    render(){
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
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps, 
    {setIsFetching, setFollowingInProgress, getUsers, getUsersCount, 
    followSuccess, unfollowSuccess})(UsersAPIComponent);
