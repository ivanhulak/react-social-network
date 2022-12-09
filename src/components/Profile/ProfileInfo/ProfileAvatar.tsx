import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ProfileType } from '../../../types/types';


export const UserAvatar = styled.div`
   flex: 0 1 213px;
   input{
      max-width: 213px;
   }
`;
export const Avatar = styled.div`
   max-width: 213px;
   max-height: 213px;
   overflow: hidden;
   border-radius: 50%;
   margin-bottom: 20px;
   img{
      width: 100%;
   }
`;
type PropsType = {
   profile: ProfileType
   isOwner: boolean
   onAvatarPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}
export const ProfileAvatar: React.FC<PropsType> = ({profile, isOwner, onAvatarPhotoSelected}) => {
   return (
      <UserAvatar>
         <Avatar>
            <img src={profile.photos.small || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" />
         </Avatar>
         {isOwner && <input type="file" onChange={onAvatarPhotoSelected} />}
      </UserAvatar>
   );
}