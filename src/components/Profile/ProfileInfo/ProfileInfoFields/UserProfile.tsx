import React, { ChangeEvent } from 'react';
import instagram from '../../../../assets/profile-icons/instagram.svg';
import facebook from '../../../../assets/profile-icons/facebook.svg';
import github from '../../../../assets/profile-icons/github.svg';
import twitter from '../../../../assets/profile-icons/twitter.svg';
import youtube from '../../../../assets/profile-icons/youtube.svg';
import done_icon from '../../../../assets/profile-icons/done.svg';
import minus_icon from '../../../../assets/profile-icons/minus.svg';
import down_arrow from '../../../../assets/profile-icons/down-arrow.svg';
import up_arrow from '../../../../assets/profile-icons/up-arrow.svg';
import contacts from '../../../../assets/profile-icons/contacts.svg';
import edit_profile from '../../../../assets/profile-icons/edit-profile.svg';
import styled from 'styled-components';
import { ProfileType } from '../../../../types/types';
import ProfileStatus from '../ProfileStatus';
import { ProfileAvatar } from '../ProfileAvatar';

const UserProfile = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 40px;
`;

export const UserInfo = styled.div`
   position: relative;
   flex: 0 1 700px;
   padding: 30px;
   background-color: #B7A8F5;
   box-shadow: 0px 0px 24px 4px #926BFF;
   border-radius: 55px 55px 55px 55px;
   display: flex;
   gap: 80px;
`;
export const LookJob = styled.div`
   margin: 10px 0px;
   background-color: #fff;
   padding: 10px 14px;
   border-radius: 21px;
   span{
      font-size: 20px;
      margin-right: 16px;
   }
   img{
      width: 26px;
      height: 26px;
   }
`;
export const ProfSkills = styled.div`
   margin-bottom: 10px;
   background-color: #8000FF;
   padding: 10px 14px;
   border-radius: 21px;
   span{
      font-size: 20px;
      margin-right: 13px;
   }
`;
export const ProfSkillsInfo = styled.div`
   background-color: #CAB7FF;
   font-size: 18px;
   padding: 10px 20px;
   border-radius: 0px 24px 24px 24px;
`;
export const AboutMe = styled.div`
   font-size: 20px;
   font-weight: 500;
   margin-bottom: 55px;
   p{
      max-width: 300px;
      overflow: scroll;
      scroll-behavior: smooth;
      color: #fff;
      background-color: #926BFF;
      padding: 20px;
      border-radius: 40px;
      margin-bottom: 6px;
   }
   img{
      margin-right: 24px;
   }
`;
const Contacts = styled.div`
   img{
      margin-right: 20px;
      width: 26px;
      height: 26px;
   }
   span{
      font-weight: 500;
      font-size: 20px;
   }
   ul{
      margin-top: 20px;
      display: flex;
      max-width: 195px;
      gap: 25px;
   }
`;
export const EditProfileButton = styled.button`
   position: absolute;
   right: 25px;
   bottom: 25px;
   &:hover{
    img{
      width: 40px;
      height: 40px;
    }
  }
  &:active{
    transform: translate(3px, 3px);
  }
`;

type PropsType = {
   profile: ProfileType
   isOwner: boolean,
   onAvatarPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void,
   goToEditMode: () => void
}
export const UserProfileBlock: React.FC<PropsType> = ({ profile, isOwner, onAvatarPhotoSelected, goToEditMode }) => {

   return (<UserProfile>
      <ProfileAvatar profile={profile} isOwner={isOwner} onAvatarPhotoSelected={onAvatarPhotoSelected}/>
      <UserInfo>
         <div style={{ maxWidth: '243px' }}>
            <div style={{ fontWeight: '700', fontSize: '30px' }}>{profile.fullName}</div>
            <ProfileStatus isOwner={isOwner} />
            <LookJob>
               <span>Looking for a job</span>
               {profile.lookingForAJob ? <img src={done_icon} alt="" /> : <img src={minus_icon} alt="" />}
            </LookJob>
            <ProfSkills>
               <span>Professional skills</span>
               <img src={down_arrow} alt="" />
            </ProfSkills>
            <ProfSkillsInfo>{profile.lookingForAJobDescription}</ProfSkillsInfo>
         </div>
         <div>
            <AboutMe>
               <p>{profile.aboutMe}</p>
               <img src={up_arrow} alt="" />
               <span>About me</span>
            </AboutMe>
            <Contacts>
               <img src={contacts} alt="" />
               <span>Contacts</span>
               <ul>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.instagram}>
                     <img src={instagram} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.facebook}>
                     <img src={facebook} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.github}>
                     <img src={github} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.youtube}>
                     <img src={youtube} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.twitter}>
                     <img src={twitter} alt="" /></a></li>
               </ul>
            </Contacts>
         </div>
         {isOwner && <EditProfileButton onClick={goToEditMode}><img src={edit_profile} alt="" /></EditProfileButton>}
      </UserInfo>
   </UserProfile>
   );
}

