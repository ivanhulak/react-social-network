import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css';
type PropsType = { photo: string, id: number, name: string }
const DialogItem: React.FC<PropsType> = ({photo, id, name}) => {
    return (
        <div className={styles.dialogItem}>
            <img src={photo} alt="" />
            <NavLink to={`/dialog/${id}`}>{name}</NavLink>
        </div>
    );
}

export default DialogItem;