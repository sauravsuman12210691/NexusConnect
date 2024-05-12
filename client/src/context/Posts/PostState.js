import { useEffect, useState } from "react";
// import NoteContext from "./noteContext";
import PostContext from "./postContext";

import axios from 'axios';

const PostState = (props) => {
    const [userData, setUserData] = useState(null);

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
    }, []); // Empty dependency array to ensure it only runs once after initial render

    return (
        <PostContext.Provider value={userData}>
            {props.children}
        </PostContext.Provider>
    );
};

export default PostState;
