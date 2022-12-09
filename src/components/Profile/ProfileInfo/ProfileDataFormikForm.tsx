import React, { ChangeEvent } from 'react';
import { Field, Formik } from "formik";
import instagram from './../../../assets/profile-icons/instagram.svg';
import facebook from './../../../assets/profile-icons/facebook.svg';
import github from './../../../assets/profile-icons/github.svg';
import twitter from './../../../assets/profile-icons/twitter.svg';
import youtube from './../../../assets/profile-icons/youtube.svg';
import down_arrow from './../../../assets/profile-icons/down-arrow.svg';
import contacts from './../../../assets/profile-icons/contacts.svg';
import edit_profile from './../../../assets/profile-icons/edit-profile.svg';
import close from './../../../assets/profile-icons/close.svg';
import { ProfileType } from '../../../types/types';
import styled from 'styled-components';
import { ProfileAvatar } from './ProfileAvatar';
import { EditProfileButton, LookJob, ProfSkills, ProfSkillsInfo } from './ProfileInfoFields/UserProfile';
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
const AboutMe = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  p{
    overflow: scroll;
    scroll-behavior: smooth;
    color: #fff;
    background-color: #926BFF;
    padding: 20px;
    border-radius: 40px;
    margin-top: 6px;
  }
  img{
    margin-left: 24px;
  }
`;
const Contacts = styled.div`
  padding-top: 10px;
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
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 21px;
   }
`;
const ContactsBlock = styled.div`
  max-width: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  .contacts-inputs{
    width: 100%;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #8000FF;
    border-radius: 16px;
  }
  .contacts-inputs:not(:last-child){
    margin-bottom: 20px;
  }
`;
const CloseEditingButton = styled.button`
  position: absolute;
  right: 25px;
  top: 15px;
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

type ProfileDataFormType = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  contacts: any
}
type PropsType = {
  onSubmitCallback: (formData: any) => void
  profile: ProfileType
  isOwner: boolean
  onAvatarPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
  goToEditMode: () => void
}
export const ProfileDataFormikForm: React.FC<PropsType> = React.memo(({ goToEditMode, isOwner, profile, onSubmitCallback, onAvatarPhotoSelected }) => {

  const submit = (values: ProfileDataFormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const profile = {
      fullName: values.fullName,
      aboutMe: values.aboutMe,
      lookingForAJob: values.lookingForAJob,
      lookingForAJobDescription: values.lookingForAJobDescription,
      contacts: values.contacts,
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
        contacts: {
          instagram: profile.contacts.instagram,
          twitter: profile.contacts.twitter,
          youtube: profile.contacts.youtube,
          facebook: profile.contacts.facebook,
          github: profile.contacts.github,
        }
      }}
      onSubmit={submit}>
      {({ handleSubmit, isSubmitting, }) => (
        <UserProfileEditMode>
          <ProfileAvatar profile={profile} isOwner={isOwner} onAvatarPhotoSelected={onAvatarPhotoSelected} />
          <EditProfileForm onSubmit={handleSubmit} >
            <div style={{ maxWidth: '243px' }}>
              <div style={{ fontWeight: '700', fontSize: '30px' }}>
                <Field type="text" name="fullName" className='styled-input' />
              </div>
              <ProfileStatus isOwner={isOwner} />
              <LookJob>
                <span>Looking for a job</span>
                <Field type="checkbox" name="lookingForAJob" className='lookJobCheckbox' />
              </LookJob>
              <ProfSkills>
                <span>Professional skills</span>
                <img src={down_arrow} alt="" />
              </ProfSkills>
              <ProfSkillsInfo>
                <Field as='textarea' name="lookingForAJobDescription" className='lookJobTextarea' />
              </ProfSkillsInfo>
              <AboutMe>
                <span>About me</span>
                <img src={down_arrow} alt="" />
                <p><Field as='textarea' name="aboutMe" className='aboutMeTextarea' /></p>
              </AboutMe>
            </div>
            <div>
              <Contacts>
                <img src={contacts} alt="" />
                <span>Contacts</span>
                <ContactsBlock>
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
                  <div>
                    <Field name='contacts.instagram' type="text" className='contacts-inputs' />
                    <Field name='contacts.facebook' type="text" className='contacts-inputs' />
                    <Field name='contacts.github' type="text" className='contacts-inputs' />
                    <Field name='contacts.youtube' type="text" className='contacts-inputs' />
                    <Field name='contacts.twitter' type="text" className='contacts-inputs' />
                    {/* {Object.keys(profile.contacts).map(key => {
                      return <Field key={key} name={`${key}`} type="text" className='contacts-inputs' />})} */}
                  </div>
                </ContactsBlock>


              </Contacts>
            </div>
            <EditProfileButton type="submit" disabled={isSubmitting}>
              <img src={edit_profile} alt="" />
            </EditProfileButton>
            <CloseEditingButton onClick={goToEditMode}>
              <img src={close} alt="" />
            </CloseEditingButton>
          </EditProfileForm>

        </UserProfileEditMode>
      )}
    </Formik>
  );
})


