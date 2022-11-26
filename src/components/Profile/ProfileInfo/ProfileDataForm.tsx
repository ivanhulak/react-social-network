import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Contact } from './ProfileInfoFields/ProfileInfoFields';
import styles from './ProfileInfoFields/ProfileInfoFields.module.css';
import uploadIcon from '../../../assets/icons/upload_icon.svg';
import { createField, Input, Textarea } from '../../../common/FormControls/FormControl';
import { maxLength, required } from '../../../utils/validator';
import { ContactsType, ProfileType } from '../../../types/types';
import { actions } from '../../../redux/profile-reducer';

let maxLength30 = maxLength(30);

type PropsType = {
   profile: ProfileType
}
type EditProfileFormDataValuesType = {
   fullName: string
   lookingForAJobDescription: string
   lookingForAJob: boolean
   aboutMe: string
}
type EditProfileFormValuesTypeKeys = Extract<keyof EditProfileFormDataValuesType, string>


const ProfileDataForm: React.FC<InjectedFormProps<EditProfileFormDataValuesType, PropsType> & PropsType> =
   ({ profile, handleSubmit, pristine, reset, submitting }) => {
      return (
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="fullName">Full name</label>
               {createField<EditProfileFormValuesTypeKeys>("Name", "fullName", Input, { type: "text" }, "", [required, maxLength30])}
            </div>
            <div>Looking for job:{createField<EditProfileFormValuesTypeKeys>("", "lookingForAJob", Input, { type: "checkbox" }, "", [])}</div>
            <div>
               <label htmlFor="lookingForAJobDescription">My professional skills:</label>
               {createField<EditProfileFormValuesTypeKeys>("My professional skills", "lookingForAJobDescription", Input, { type: "text" }, "", [required])}
            </div>
            <div>
               <label htmlFor="aboutMe">About me:</label>
               {createField<EditProfileFormValuesTypeKeys>("About me", "aboutMe", Textarea, { type: "text" }, "", [required])}
            </div>
            <div>Contacts:
               {Object.keys(profile.contacts)
                  .map(key => <Contact key={key} contactTitle={key}
                     contactValue={profile.contacts[key as keyof ContactsType]} />)}
            </div>
            <button className={styles.changeBtn} type="submit" >
               <span>Save</span>
               <img src={uploadIcon} alt="" />
            </button>
            <button className={styles.changeBtn} onClick={() => { actions.loadDataToProfileDataForm(profile) }}>
               Load profile data
            </button>
            <button className={styles.changeBtn} disabled={pristine || submitting} onClick={reset}>
               Undo Changes
            </button>
         </form>
      );
   }

export default reduxForm<EditProfileFormDataValuesType, PropsType>({ form: 'editProfile', enableReinitialize: true })(ProfileDataForm);