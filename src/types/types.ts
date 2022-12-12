export type PostsType = {
   id: number,
   postText: string,
   likes: number,
   comments: number,
   sendings: number,
   photo: any
}
export type ContactsType = {
   facebook: string
   website: string,
   vk: string,
   twitter: string,
   instagram: string,
   github: string,
   mainLink: string,
   youtube: string,
}
export type PhotosType = {
   small: string | null,
   large: string | null
}
export type ProfileType = {
   aboutMe: string,
   contacts: ContactsType,
   fullName: string,
   lookingForAJob: boolean,
   lookingForAJobDescription: string,
   photos: PhotosType,
   userId: number
}
export type UsersType = {
   name: string,
   id: number,
   photos: PhotosType,
   status: string,
   followed: boolean
}