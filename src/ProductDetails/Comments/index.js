import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setComments } from './CommentsReducer';
import {findCommentsForProduct, createComment} from './client';
import { useParams } from "react-router-dom";
import "./index.css";
function Comments() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { comments } = useSelector((state) => state.commentsReducer);
  const [comment, setComment] = useState("");
  const currentUser = { name: "John Doe", id: 1};
  const [username, setUsername] = useState('');

  const handleAddComment = () => {
    createComment(productId, comment).then((comment) => {
      dispatch(addComment({ text: comment, likes: 0, user: currentUser }));
      setComment("");
    });
  };

  const handleLike = (index) => () => {
    const comments = [...comments];
    comments[index].likes += 1;
    dispatch(setComments(comments));
  };

  useEffect(() => {
    findCommentsForProduct(productId).then((comments) => dispatch(setComments(comments)));
  }, [productId]);

  return (
    <div className="comments ps-5 mb-5">
      <h3>Comments</h3>
      <hr />
      <form
        className="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
      >
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <p>
            
            {/* <Link to={`/profile/${comment.user.id}`}> */}
              <strong>{comment.user_id}</strong>
            {/* </Link> */}
          </p>
          <p>{comment.comment}</p>
          <button onClick={handleLike(comment.id)}>Like ({comment.likes})</button>
        </div>
      ))}
    </div>
  );
}
export default Comments;
