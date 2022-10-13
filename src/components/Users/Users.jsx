import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize) / 140;
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let buttonElement = pages.map(p => {
        return (
            <div>
                <button
                    onClick={(e) => { props.onPageChanged(p) }}
                    className={props.currentPage === p ? styles.currentPage : ''}>{p}</button>
            </div>)
    })

    let userElements = props.users
        .map(u => <UserItem key={u.id} userId={u.id}
            userPhoto={u.photos.small}
            followed={u.followed}
            userName={u.name}
            status={u.status}
            isFetching={props.isFetching}
            setIsFetching={props.setIsFetching}
            setFollowingInProgress={props.setFollowingInProgress}
            followingInProgress={props.followingInProgress}
            followSuccess={props.followSuccess}
            unfollowSuccess={props.unfollowSuccess} />)

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


export default Users;