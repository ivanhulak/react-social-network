import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';

const Users = (props) => {

    let userElements = props.users
        .map(u => <UserItem key={u.id} userId={u.id} userPhoto={u.photo}
                            followed={u.followed}
                            userName={u.name}
                            userSurname={u.surname}
                            userAge={u.age}
                            lookingForJob={u.lookingForJob}
                            follow={props.follow}
                            unfollow={props.unfollow}/>)

    return (
        <div className={styles.users}>
            <div>Users</div>
            <div className={styles.userItemsRow}>
                {userElements}
            </div>

        </div>
    );
}

export default Users;