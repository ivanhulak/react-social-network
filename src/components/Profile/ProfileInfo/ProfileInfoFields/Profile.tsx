import React, { ChangeEvent, useState } from 'react';
import add_big_image from '../../../../assets/profile-icons/add-big-image.svg';
import styled from 'styled-components';
import { ProfileType } from '../../../../types/types';
import Preloader from '../../../../common/Preloader/Preloader';
import { useDispatch } from 'react-redux';
import { upgradeProfile, uploadPhoto } from '../../../../redux/profile-reducer';
import ProfileDataForm from '../ProfileDataForm';
import { UserProfileBlock } from './UserProfile';
import { ProfileDataFormikForm } from '../ProfileDataFormikForm';

const StyledProfile = styled.div`
   margin-left: 10px;
   margin-bottom: 100px;
`;
const BigImage = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 210px;
   background-color: #8000FF;
   margin-bottom: 50px;
   p{
      font-size: 48px;
      font-weight: 500;
      color: #B7A8F5;
      margin-right: 30px;
   }
`;

export type ProfileInfoPropsType = {
   profile: ProfileType | null
   isOwner: boolean
}
export const Profile: React.FC<ProfileInfoPropsType> = ({ profile, isOwner }) => {
   const [editMode, setEditMode] = useState(false);
   const dispatch: any = useDispatch()

   const onAvatarPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         dispatch(uploadPhoto(e.target.files[0]));
      }
   }
   const onSubmitCallback = (formData: any) => {
      dispatch(upgradeProfile(formData));
      setEditMode(false);
   }
   const goToEditMode = () => {
      setEditMode(!editMode);
   }
   return (
      <>
         {(!profile)
            ? <Preloader />
            : <StyledProfile>
               <BigImage>
                  <p>Add photo</p>
                  <button><img src={add_big_image} alt="" /></button>
               </BigImage>
               <div>
                  {editMode
                     ? <ProfileDataFormikForm profile={profile} onSubmitCallback={onSubmitCallback}
                        isOwner={isOwner} onAvatarPhotoSelected={onAvatarPhotoSelected}/>
                     : <UserProfileBlock profile={profile} goToEditMode={goToEditMode}
                           isOwner={isOwner} onAvatarPhotoSelected={onAvatarPhotoSelected}/>}
               </div>
            </StyledProfile>
         }
      </>
   );
}

