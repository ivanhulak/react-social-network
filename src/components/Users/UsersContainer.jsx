import React from "react";
import {connect} from "react-redux";
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUserCountAC, setIsFetchingAC } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader";
import * as axios from 'axios';

class UsersAPIComponent extends React.Component{
    componentDidMount(){
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setIsFetching(false);
        })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setIsFetching(false);
        })
    }

    render(){
        if (this.props.isFetching === true) {
            return <Preloader />;
        }
        return <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}/>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUserCount: (totalCount) => {
            dispatch(setTotalUserCountAC(totalCount));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingAC(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
