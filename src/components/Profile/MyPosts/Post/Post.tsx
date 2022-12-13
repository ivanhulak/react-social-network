import React from "react";
import styled from "styled-components";
import heart from '../../../../assets/posts-icons/heart.jpg'
import likes_icon from '../../../../assets/posts-icons/heart.svg'
import comments_icon from '../../../../assets/posts-icons/comments.svg'
import sendings_icon from '../../../../assets/posts-icons/pointer.svg'

type PropsType = {
    photo: string
    postText: string
    likes: number
    comments: number
    sendings: number
}
const PostWrapper = styled.div`
    border: 5px solid #B7A8F5;
    box-shadow: 0px 0px 24px 4px #B7A8F5;
    border-radius: 37px;
    margin-bottom: 40px;
`;
export const PostHeader = styled.div`
    background-color: #B7A8F5;
    display: flex;
    gap: 23px;
    padding: 11px 16px;
    box-shadow: 0px 0px 24px 4px #B7A8F5;
    border-radius: 30px;
    margin-bottom: 12px;
    .avatar{
        border-radius: 50%;
        width: 76px;
        height: 76px;
        overflow: hidden;
    }
    .fullName{
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .postText{
        font-weight: 500;
        font-size: 20px;
        letter-spacing: 0.015em;
    }
`;
type PropType = {
    image?: string
}
const PostImageContainer = styled.div`
    padding: 0px 20px;
    .container{
    max-width: 810px;
    margin: 0 auto;
    /* border: 4px solid #000; */
    }
`;
const PostImage = styled.div<PropType>`
    margin: 0 auto;
    width: 800px;
    height: 650px;
    border-radius: 79px;
    overflow: hidden;
    background-position: center;
    background-image: ${(props) => `url(${props.image})`};
`;
const PostActivity = styled.div`
    display: flex;
    gap: 60px;
    color: #8000FF;
    font-weight: 600;
    font-size: 24px;
    padding: 25px 0px 40px 35px;
    .likes,
    .comments,
    .send{
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;

const Post: React.FC<PropsType> = ({ postText, likes, comments, sendings, photo }) => {
    return (
        <PostWrapper>
            <PostHeader>
                <div className="avatar"><img src={photo} alt="" /></div>
                <div>
                    <div className="fullName">Ivan Hulak</div>
                    <div className="postText">{postText}</div>
                </div>
            </PostHeader>
            <PostImageContainer>
                <div className="container">
                    <PostImage image={photo}></PostImage>
                    <PostActivity>
                        <div className="likes">
                            <img src={likes_icon} alt="" />
                            <span>{likes}</span>
                        </div>
                        <div className="comments">
                            <img src={comments_icon} alt="" />
                            <span>{comments}</span>
                        </div>
                        <div className="send">
                            <img src={sendings_icon} alt="" />
                            <span>{sendings}</span>
                        </div>
                    </PostActivity>
                </div>
            </PostImageContainer>
        </PostWrapper>
    );
}

export default Post;