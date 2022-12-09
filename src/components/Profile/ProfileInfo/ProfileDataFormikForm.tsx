import React, { ChangeEvent } from 'react';
import { Field, Formik } from "formik";
import instagram from './../../../assets/profile-icons/instagram.svg';
import facebook from './../../../assets/profile-icons/facebook.svg';
import github from './../../../assets/profile-icons/github.svg';
import telegram from './../../../assets/profile-icons/telegram.svg';
import down_arrow from './../../../assets/profile-icons/down-arrow.svg';
import up_arrow from './../../../assets/profile-icons/up-arrow.svg';
import contacts from './../../../assets/profile-icons/contacts.svg';
import { ProfileType } from '../../../types/types';
import styled from 'styled-components';
import { ProfileAvatar } from './ProfileAvatar';
import { AboutMe, Contacts, LookJob, ProfSkills, ProfSkillsInfo } from './ProfileInfoFields/UserProfile';
import ProfileStatus from './ProfileStatus';
import './ProfileDataFormikForm.css';

const UserProfileEditMode = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 40px;
`;
const EditProfileForm = styled.form`
  position: relative;
  flex: 0 1 700px;
  padding: 30px;
  background-color: #B7A8F5;
  box-shadow: 0px 0px 24px 4px #926BFF;
  border-radius: 55px 55px 55px 55px;
  width: 400px;
  display: flex;
  gap: 80px;
`;

type ProfileDataFormType = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}
type PropsType = {
  onSubmitCallback: (formData: any) => void
  profile: ProfileType
  isOwner: boolean
  onAvatarPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}
export const ProfileDataFormikForm: React.FC<PropsType> = React.memo(({ isOwner, profile, onSubmitCallback, onAvatarPhotoSelected }) => {

  const submit = (values: ProfileDataFormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const profile = {
      fullName: values.fullName,
      aboutMe: values.aboutMe,
      lookingForAJob: values.lookingForAJob,
      lookingForAJobDescription: values.lookingForAJobDescription,
    }
    onSubmitCallback(profile);
    setSubmitting(false);
  }
  return (
    <Formik enableReinitialize={true}
      initialValues={{
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
      }}
      onSubmit={submit}>
      {({ handleSubmit, isSubmitting, }) => (
        <UserProfileEditMode>
          <ProfileAvatar profile={profile} isOwner={isOwner} onAvatarPhotoSelected={onAvatarPhotoSelected} />
          <EditProfileForm onSubmit={handleSubmit} >
            <div style={{ maxWidth: '243px' }}>
              <div style={{ fontWeight: '700', fontSize: '30px' }}><Field type="text" name="fullName" className='styled-input'/></div>
              <ProfileStatus isOwner={isOwner} />
              <LookJob>
                <span>Looking for a job</span>
                <Field type="checkbox" name="lookingForAJob" />
              </LookJob>
              <ProfSkills>
                <span>Professional skills</span>
                <img src={down_arrow} alt="" />
              </ProfSkills>
              <ProfSkillsInfo><Field type="text" name="lookingForAJobDescription" /></ProfSkillsInfo>
            </div>
            <div>
              <AboutMe>
                <p><Field type="text" name="aboutMe" /></p>
                <img src={up_arrow} alt="" />
                <span>About me</span>
              </AboutMe>
              <Contacts>
                <img src={contacts} alt="" />
                <span>Contacts</span>
                <ul>
                  <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.instagram}>
                    <img src={instagram} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={'http://facebook.com'}>
                    <img src={facebook} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={'http://github.com'}>
                    <img src={github} alt="" /></a></li>
                  <li><a rel="noopener noreferrer" target="_blank" href={'https://web.telegram.org/z/'}>
                    <img src={telegram} alt="" /></a></li>
                </ul>
              </Contacts>
            </div>
            <button type="submit" disabled={isSubmitting}>Edit</button>
            {/* {isOwner && <EditProfileButton onClick={goToEditMode}><img src={edit_profile} alt="" /></EditProfileButton>} */}
          </EditProfileForm>
        </UserProfileEditMode>
      )}
    </Formik>
  );
})



{/* <div>Username: <Field type="text" name="fullName" style={{ border: '1px solid red' }} /></div>
    <div>About me: <Field type="text" name="aboutMe" style={{ border: '1px solid red', width: '500px' }} /></div>
    <div>lookingForAJob: <Field type="checkbox" name="lookingForAJob" /></div>
    <div>lookingForAJobDescription: <Field type="text" name="lookingForAJobDescription" /></div>
    <button type="submit" disabled={isSubmitting}>Edit</button> */}


