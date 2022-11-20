import React from 'react';
import { PhotosType, UsersType } from '../../types/types';
import { Friend } from './Friend';

type PropsType = {
   friends: Array<UsersType>
}
export type FriendType = {
   id: number
   name: string
   photos: PhotosType
}
const Friends: React.FC<PropsType> = ({friends}) => {
   let friendsItems = friends.map(f => <Friend key={f.id} id={f.id} name={f.name} photos={f.photos}/>)
   return <div>{friendsItems}</div>
}

export default Friends;