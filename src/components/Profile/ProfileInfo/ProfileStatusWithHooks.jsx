import React, { useState, useEffect } from 'react';
import styles from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(props.status);

   useEffect(() => {
      setStatus(props.status)
   }, [props.status])

   const activateEditMode = () => {
      setEditMode(true);
   }
   const deactivateEditMode = () => {
      setEditMode(false);
      props.updateStatus(status);
   }

   const onStatusChange = (e) => {
      setStatus(e.currentTarget.value);
   }

   return (
      <div className={styles.status}>
         <span>Status: </span>
         {!editMode &&
            <div>
               <span onDoubleClick={activateEditMode}>{props.status || 'Here, could be your status'}</span>
            </div>
         }
         {editMode &&
            <div>
               <input autoFocus={true} type="text" onBlur={deactivateEditMode}
                  onChange={onStatusChange} value={status} />
            </div>
         }
      </div>
   );
}

export default ProfileStatusWithHooks;