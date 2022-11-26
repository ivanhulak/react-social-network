import React from 'react';
import { ContactsType, ProfileType } from '../../../../types/types';
import ProfileStatusWithHooks from '../ProfileStatusWithHooks';
import styles from './ProfileInfoFields.module.css';

type PropsType = {
   profile: ProfileType
}
const ProfileInfoFields: React.FC<PropsType> = ({ profile }) => {
   return (
      <div>
         <div>
            <div className={styles.topInfoRow}>
               <div className={styles.fullName}>{profile.fullName}</div>
               <div className={styles.status}>Status:</div>
               <ProfileStatusWithHooks />
            </div>
            <div className={styles.middleInfoRow}>
               <div>Looking for job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
               <div>My professional skills: {profile.lookingForAJobDescription}</div>
               <div>About me: {profile.aboutMe}</div>
               <div className={styles.contacts}>Contacts:
                  {Object.keys(profile.contacts).map(key => 
                     <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />)}
               </div>
            </div>
         </div>
      </div>
   );
}
export default ProfileInfoFields;

type ContactsPropsType = {
   contactTitle: string
   contactValue: string
}
export const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
   return <a className={styles.contactLink} rel="noopener noreferrer" target="_blank" href={contactValue}>{contactTitle}</a>
}