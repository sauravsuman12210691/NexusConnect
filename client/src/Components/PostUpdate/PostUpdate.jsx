import React, { useState } from "react";
import "./post.css";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function PostUpdate() {
  const navigate= useNavigate();
  const [profileImg, setProfileImg] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [discription, setDiscription] = useState("");
const handleDiscription =(e)=>{
  setDiscription(e.target.value)
}
  const handleImageClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handlePost = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = new FormData();
    formData.append("image", profileImg); 
    formData.append("description", discription); // Corrected the field name
  
    try {
      const res = await axios.post("http://localhost:5000/api/posts/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem('awthToken')
        }
      });
      console.log(res.data); 
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
    navigate("/profile");
  };
  

  return (
    <div className="cont">
      <div className="c1">
        {profileImg && <img id="postImg" src={URL.createObjectURL(profileImg)} alt="IMG" />}
        <input
          id="inputPost"
          type="text"
          className="border border-success"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="c2">
        <ul>
          <li onClick={handleImageClick}>
            <span className="material-symbols-outlined icon-link icon-link-hover">Image</span>
            Image
          </li>
          <li>
            <span className="material-symbols-outlined">attachment</span>
            Attachment
          </li>
          <li>
            <span className="material-symbols-outlined">mic</span>
            Audio
          </li>

          <button type="submit" className="btn btn-outline-info">
            POST
          </button>
        </ul>
      </div>

      {isFormOpen && (
        <div className="form-overlay bg-light ">
          <div className="form-container">
            <button className="btn btn-outline-danger" onClick={handleCloseForm}>
              Close
            </button>
            <form onSubmit={handleSubmit} className="border border-success text-light" >
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Example file input</label>
                <input
                  onChange={handlePost}
                  type="file"
                  accept="image/*"
                  className="form-control-file btn  btn-outline-warning "
                  id="exampleFormControlFile1"
                />
                <br />
                <label htmlFor="discription"> Discription:</label>
                <input type="text" id="dicInput" placeholder="Write your thoughts" onChange={handleDiscription} />
              </div>
              <button className="btn  btn-outline-light" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostUpdate;
