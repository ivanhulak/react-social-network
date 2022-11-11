import React, { ChangeEvent, useState } from "react";
import Preloader from "../../../common/Preloader/Preloader";
import styles from './ProfileInfo.module.css';
import ProfileInfoFields from "./ProfileInfoFields/ProfileInfoFields";
import editIcon from '../../../assets/icons/edit_icon.svg';
import ProfileDataForm from "./ProfileDataForm";
import { EditButton } from "../../../common/Buttons/EditButton/EditButton";
import { ProfileInfoPropsType } from "../Profile";
import { ProfileType } from "../../../types/types";


const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }
  const onAvatarPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.uploadPhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData: any) => {
    console.log(formData);
    props.upgradeProfile(formData);
    setEditMode(false);
  }
  const goToEditMode = () => {
    setEditMode(!editMode);
  }
  return (
    <div className={styles.profileInfo}>
      <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="" />
      <div className={styles.profileInfoRow}>
        <div>
          <div className={styles.avatar}>
            <img src={props.profile.photos.small || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" />
          </div>
          {props.isOwner && <input type="file" onChange={onAvatarPhotoSelected} />}
        </div>

        <div className={styles.ProfileDataForm}>
          {editMode
            ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} loadDataToProfileDataForm={props.loadDataToProfileDataForm} />
            : <ProfileInfoFields profile={props.profile} status={props.status} updateStatus={props.updateStatus} />}
        </div>
        {props.isOwner && <EditButton onClickCallback={goToEditMode}>
          <img className={styles.editIconImg} src={editIcon} alt="" />
        </EditButton>}
      </div>
    </div>
  );
}

export default ProfileInfo;