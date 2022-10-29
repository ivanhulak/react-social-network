import React from 'react';
import ProfileStatusWithHooks from '../ProfileStatusWithHooks';
import styles from './ProfileInfoFields.module.css';

const ProfileInfoFields = ({ profile, status, updateStatus }) => {
   return (
      <div>
         <div>
            <div className={styles.topInfoRow}>
               <div className={styles.fullName}>{profile.fullName}</div>
               <div className={styles.status}>Status:</div>
               <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
            <div className={styles.middleInfoRow}>
               <div>Looking for job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
               <div>My professional skills: {profile.lookingForAJobDescription}</div>
               <div>About me: {profile.aboutMe}</div>
               <div className={styles.contacts}>Contacts:
                  {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)}
               </div>
            </div>
         </div>
      </div>
   );
}
export default ProfileInfoFields;

export const Contact = ({ contactTitle, contactValue }) => {
   return <a className={styles.contactLink} rel="noopener noreferrer" target="_blank" href={contactValue}>{contactTitle}</a>
}