import React, { useEffect, useState } from 'react';
import './pp.css';
import axios from 'axios';
import { useContext } from 'react';
import img1 from '../PostUpdate/img1.jpg';
import postContent from "../../context/Posts/postContext";
import noteContext from '../../context/notes/noteContext';

function PostCompo() {
    // const { userPost } = useContext(postContent);
    const userProfileData=useContext(noteContext);
    const [profileImage, setProfileImage] = useState(img1);
    const [userPost, setUserPost] = useState();
    const [postImg, setPostImage] = useState(img1);
    const [userName, setUserName] = useState("User_Name");
    const [postLocation, setPostLocation] = useState("User_Location");
    const [description, setDescription] = useState("");

    const handlePost = async () => {
        try {
            const authToken = localStorage.getItem('awthToken');
            const res = await axios.get("http://localhost:5000/api/posts/getPost", {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                }
            });

            setUserPost(res.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    useEffect(() => {
        handlePost();
        // setProfileImage(userProfileData.)
        setUserName(userProfileData.name);

        console.log(userPost);
    }, []); // eslint-disable-line

    return (
        <> 
        {userPost && userPost.map((data) => (
            <div key={data._id} className="mar cont1 py-0.5">
                <ul className='flex p-0'>
                    <li><img id="Pimg" src={profileImage} alt="PP" /></li>
                    <div className="">
                        <li className='fs-1.5'><b>{userName}</b></li>
                        <li className='fs-0.1'>{postLocation}</li>
                    </div>
                </ul>
                <p>{data.discription}</p>
                <div className="postimg">
                    <img src={require(`../../images/${data.imgName}`)} alt="" />
                </div>
            </div>
        ))}
      </>
    );
}

export default PostCompo;
