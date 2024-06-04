import PropTypes from 'prop-types';
import "./Comment.css";

const Comment = ({ username, commentText }) => {
  return (
    <div className="comment">
      <div className="comment-profile-circle"></div>
      <div className="comment-content">
        <div className="comment-username">{username}</div>
        <div className="comment-text">{commentText}</div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
};

export default Comment;
