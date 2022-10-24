import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';
import Paginator from '../../common/Pagination/Paginator';

const Users = (props) => {
    return (
        <div className={styles.users}>
            <div className={styles.userItemsRow}>
                {props.users.map(u => <UserItem key={u.id} userId={u.id}
                    userPhoto={u.photos.small}
                    followed={u.followed}
                    userName={u.name}
                    status={u.status}
                    isFetching={props.isFetching}
                    setIsFetching={props.setIsFetching}
                    setFollowingInProgress={props.setFollowingInProgress}
                    followingInProgress={props.followingInProgress}
                    followSuccess={props.followSuccess}
                    unfollowSuccess={props.unfollowSuccess} />)}
            </div>
            <div className={styles.paginationBlock}>
                <Paginator currentPage={props.currentPage} totalItemsCount={props.totalItemsCount}
                    pageSize={props.pageSize} onPageChanged={props.onPageChanged} portionSize={10} />
            </div>

        </div>
    );
}


export default Users;