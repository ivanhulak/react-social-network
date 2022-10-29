import React from 'react';
import { reduxForm } from 'redux-form';
import { Contact } from './ProfileInfoFields/ProfileInfoFields';
import styles from './ProfileInfoFields/ProfileInfoFields.module.css';
import uploadIcon from '../../../assets/icons/upload_icon.svg';
import { createField, Input, Textarea } from '../../../common/FormControls/FormControl';
import { maxLength, required } from '../../../utils/validator';

let maxLength30 = maxLength(30);

const ProfileDataForm = ({ profile, handleSubmit }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="fullName">Full name</label>
            {createField("name", "fullName", Input, { type: "text" }, "", [required, maxLength30])}
         </div>
         <div>Looking for job:{createField("", "lookingForAJob", Input, {  type: "checkbox" }, "", [])}</div>
         <div>
            <label htmlFor="lookingForAJobDescription">My professional skills:</label>
            {createField("My professional skills", "lookingForAJobDescription", Input, { type: "text" }, "", [required])}
         </div>
         <div>
            <label htmlFor="aboutMe">About me:</label>
            {createField("About me", "aboutMe", Textarea, { type: "text" }, "", [required])}
         </div>

         <div>Contacts:
            {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)}
         </div>
         <button className={styles.changeBtn} type="submit">
            <span>Save</span>
            <img src={uploadIcon} alt="" />
         </button>
      </form>
   );
}

export default reduxForm({ form: 'editProfile', enableReinitialize : true })(ProfileDataForm);