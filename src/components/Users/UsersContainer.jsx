import React from "react";
import {connect} from "react-redux";
import {follow, unfollow, setIsFetching, setTotalUserCount, setFollowingInProgress, 
        GetUsersThunkCreator, GetUsersCountThunkCreator } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader";

class UsersAPIComponent extends React.Component{
    componentDidMount(){
        this.props.GetUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.GetUsersCountThunkCreator(this.props.pageSize, page)
    }

    render(){
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                    isFetching={this.props.isFetching}
                    setIsFetching={this.props.setIsFetching}
                    followingInProgress={this.props.followingInProgress}
                    setFollowingInProgress={this.props.setFollowingInProgress}/>
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
    {follow, unfollow, setTotalUserCount, setIsFetching, 
    setFollowingInProgress, GetUsersThunkCreator,
    GetUsersCountThunkCreator})(UsersAPIComponent);
