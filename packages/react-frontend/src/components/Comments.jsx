import { useState } from "react";
import "./Comments.css";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";


function Comments({ playlistId, userId }) { 
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  
  const submitComment = async (commentText) => {
    try {
      const response = await fetch(`https://songsmith.azurewebsites.net/playlists/${playlistId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, 
          commentText: commentText,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await response.json();
      console.log("Comment submitted successfully:", data);
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
      <Comment username="ExampleUser" commentText={'test comment'} />
    </div>
  );
}


Comments.propTypes = {
  playlistId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Comments;
