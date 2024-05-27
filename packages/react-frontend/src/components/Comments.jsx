import React, { useState } from "react";
import "./Comments.css";

function Comments() {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    console.log("New comment:", newComment);
    setNewComment("");
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
    </div>
  );
}

export default Comments;

