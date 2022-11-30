import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateStatus } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
   isOwner: boolean
}
const ProfileStatusWithHooks: React.FC<PropsType> = ({isOwner}) => {
   const profileStatus = useSelector((state: AppStateType) => state.profilePage.status)
   const dispatch: any = useDispatch()

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(profileStatus);

   useEffect(() => {
      setStatus(profileStatus)
   }, [profileStatus])

   const activateEditMode = () => {
      setEditMode(true);
   }
   const deactivateEditMode = () => {
      setEditMode(false);
      dispatch(updateStatus(status));
   }

   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value);
   }

   return (
      <div>
         {!editMode &&
            <div>
               {isOwner 
                  ? <span onDoubleClick={activateEditMode}>{profileStatus || 'Here, could be your status'}</span>
                  : <span >{profileStatus || 'Here, could be your status'}</span>}
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