import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';
import * as axios from 'axios';


class Users extends React.Component {
    
    componentDidMount(){
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount);
        })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount);
        })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize) / 140;
        let pages = []
        for(let i = 1; i <= pagesCount; i++){
            pages.push(i);
        }
        let buttonElement = pages.map(p => {
            return (
                <div>
                    <button onClick={(e) => {this.onPageChanged(p)}} 
                            className={this.props.currentPage === p ? styles.currentPage : ''}>{p}</button>
                </div>)
        })

        let userElements = this.props.users
                .map(u => <UserItem key = { u.id } userId = { u.id } 
                            userPhoto = { u.photos.small }
                            followed = { u.followed }
                            userName = { u.name }
                            status = { u.status }
                            follow = { this.props.follow }
                            unfollow = { this.props.unfollow } />)
        return (
            <div className={styles.users}>
                <div>Users</div>
                <div className={styles.userItemsRow}>
                    {userElements}
                </div>
                <div className={styles.paginationBlock}>
                    {buttonElement}
                </div>
            </div>
        );
    }
}

export default Users;