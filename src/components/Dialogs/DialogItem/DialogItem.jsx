import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css';

const DialogItem = (props) => {
    return (
        <div className={styles.dialogItem}>
            <img src={props.photo} alt="" />
            <NavLink to={`/dialog/${props.id}`}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;