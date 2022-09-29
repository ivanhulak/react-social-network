import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';
import * as axios from 'axios';

const Users = (props) => {
    if(props.users.length === 0){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }

    let userElements = props.users
        .map(u => <UserItem key={u.id} userId={u.id} userPhoto={u.photos.small}
                            followed={u.followed}
                            userName={u.name}
                            status={u.status}
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