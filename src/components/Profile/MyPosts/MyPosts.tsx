import React, { useContext, useState } from "react";
import Post from './Post/Post';
import { PostsFormikForm } from "./PostsFormikForm";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import styled from "styled-components";
import add_icon from '../../../assets/posts-icons/add.svg'
import minus_icon from '../../../assets/posts-icons/minus-circle.svg'
import paperclip_icon from '../../../assets/posts-icons/paperclip.svg'
import { OwnerContext } from "../ProfilePage";

const PostsBlock = styled.div`
    position: relative;
    margin-left: 20px;
    margin-top: 50px;
    .createPostTextarea{
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s, opacity 0.6s linear;
    }
    .createPostDisappear{
        visibility: visible;
        opacity: 1;
    }
    .postsAdding{
        transition: all 0.4s ease;
        position: absolute;
        top: 80px;
        left: 0px;
        width: 98%;
    }
    .posts{
        transition: all 0.4s ease;
        position: absolute;
        top: 180px;
        left: 0px;
        width: 100%;
    }
`;
const CreatePost = styled.div`
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    padding: 0px 14px;
    background-color: #8000FF;
    border-radius: 21px;
    color: #E3E3E3;
    margin-bottom: 15px;
    transition: all 0.4s ease;
    .add-icon-image{
        margin-left: 76px;
    }
`;

const MyPosts: React.FC = React.memo(() => {
    const [addingMode, setAddingMode] = useState(true)
    //@ts-ignore
    const { isOwner } = useContext(OwnerContext)
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    return (
        <PostsBlock >
            {isOwner &&
                <>
                    <CreatePost>Create post
                        <img src={addingMode ? add_icon : minus_icon} alt="" className="add-icon-image"
                            onClick={() => setAddingMode((prev => !prev))} />
                        <img src={paperclip_icon} alt="" className="paperclip-image" />
                    </CreatePost>
                    <div className={(addingMode ? 'createPostTextarea' : 'createPostTextarea createPostDisappear')}>
                        <PostsFormikForm />
                    </div>
                </>}
            <div className={addingMode ? 'postsAdding' : 'posts'}>
                {posts.map(p => <Post key={p.id}
                    postText={p.postText}
                    likes={p.likes}
                    comments={p.comments}
                    sendings={p.sendings}
                    photo={p.photo} />)}
            </div>
        </PostsBlock>
    );
})

export default MyPosts;