import React, { ChangeEvent, useState } from "react";
import Preloader from "../../../common/Preloader/Preloader";
import styles from './ProfileInfo.module.css';
import ProfileInfoFields from "./ProfileInfoFields/ProfileInfoFields";
import editIcon from '../../../assets/icons/edit_icon.svg';
import ProfileDataForm from "./ProfileDataForm";
import { EditButton } from "../../../common/Buttons/EditButton/EditButton";
import { ProfileType } from "../../../types/types";
import { useDispatch } from "react-redux";
import { upgradeProfile, uploadPhoto } from "../../../redux/profile-reducer";

export type ProfileInfoPropsType = {
  profile: ProfileType | null
  isOwner: boolean
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, isOwner}) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch: any = useDispatch()

  if (!profile) {
    return <Preloader />
  }
  const onAvatarPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(uploadPhoto(e.target.files[0]));
    }
  }
  const onSubmit = (formData: any) => {
    dispatch(upgradeProfile(formData));
    setEditMode(false);
  }
  const goToEditMode = () => {
    setEditMode(!editMode);
  }
  return (
    <div className={styles.profileInfo}>
      <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="" />
      <div className={styles.profileInfoRow}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            <img src={profile.photos.small || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" />
          </div>
          {isOwner && <input type="file" onChange={onAvatarPhotoSelected} />}
        </div>

        <div className={styles.ProfileDataForm}>
          {editMode
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
            : <ProfileInfoFields profile={profile} />}
        </div>
        {isOwner && <EditButton onClickCallback={goToEditMode}>
          <img className={styles.editIconImg} src={editIcon} alt="Icon" />
        </EditButton>}
      </div>
    </div>
  );
}

export default ProfileInfo;