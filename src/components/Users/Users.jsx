import React from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';
import * as axios from 'axios';


class Users extends React.Component {
    

    componentDidMount(){
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {this.props.setUsers(response.data.items);
        })
    }

    

    render() {
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
            </div>
        );
    }
}

export default Users;