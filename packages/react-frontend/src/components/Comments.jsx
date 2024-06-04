import { useEffect, useState, useCallback} from "react";
import "./Comments.css";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";


function Comments({comments}) { 
  const [newComment, setNewComment] = useState("");
  console.log(comments)
  const [comms, setComms] = useState(comments);
  
  
  const location = useLocation();
  const commentUrl = "https://songsmith.azurewebsites.net" + location.pathname + "/comments";
  console.log(commentUrl);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };


  const fetchComments = useCallback(() => {
    fetch(commentUrl)
      .then((res) => res.json())
      .then((json) => {
        setComms(json["comment_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentUrl]);


  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  
  const submitComment = async (commentText) => {
    console.log(commentText)
    try {
      const response = await fetch(commentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "Anonymous", 
          comment: commentText,
        }),
      })
    
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await response.json();
      console.log("Comment submitted successfully:", data);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
   
  };


  const handleSubmitComment = () => {
    if (newComment.trim()) {
      submitComment(newComment);
      setNewComment(""); 
    }
  };



  return (
    <div className="comment-box">
      <h2 className="comment-header">Comments</h2>
      <textarea
        className="comment-textarea"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
      />
      <button className="comment-send-button" onClick={handleSubmitComment}>
        Post Comment
      </button>
      {comms.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );

}


Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;
