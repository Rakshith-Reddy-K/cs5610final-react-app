import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, setComments } from "./CommentsReducer";
import { findCommentsForProduct, createComment, getAllUsers } from "./client";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from '../../Home/AuthContext';

function Comments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { comments } = useSelector((state) => state.commentsReducer);
  const [comment, setComment] = useState("");
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);

  const handleAddComment = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    createComment(productId, comment, user.id).then((comment) => {
      dispatch(addComment({ text: comment, likes: 0, user_id: user.id }));
      setComment("");
    });
  };

  const getUsernameById = (userId) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == userId) {
        return users[i].username;
      }
    }
    return "Anonymous";
  };
  
  useEffect(() => {
    findCommentsForProduct(productId).then((comments) => dispatch(setComments(comments)));
    getAllUsers().then((users) => setUsers(users));
  }, [productId]);

  return (
    <div className="comments ps-5 mb-5">
      <h3>Comments</h3>
      <hr />
      <form className="comment-form" onSubmit={handleAddComment}>
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
            <strong>{getUsernameById(comment.user_id)}</strong>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
export default Comments;
