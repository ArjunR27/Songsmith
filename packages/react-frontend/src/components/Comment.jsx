import PropTypes from 'prop-types';
import "./Comment.css";

function Comment ({comment}) {
  return (
    <div className="comment">
      <div className="comment-profile-circle"></div>
      <div className="comment-content">
        <div className="comment-username">{comment.username}</div>
        <div className="comment-text">{comment.comment}</div>
      </div>
    </div>
  )
}


Comment.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
