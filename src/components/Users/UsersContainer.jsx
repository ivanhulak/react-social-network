import React from "react";
import {connect} from "react-redux";
import { follow, unfollow, setUsers, setCurrentPage, setTotalUserCount, setIsFetching } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader";
import * as axios from 'axios';

class UsersAPIComponent extends React.Component{
    componentDidMount(){
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`, {withCredentials: true})
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setIsFetching(false);
        })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`, {withCredentials: true})
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

export default connect(mapStateToProps, 
    {follow, unfollow, setUsers, 
    setCurrentPage, setTotalUserCount, setIsFetching})(UsersAPIComponent);
