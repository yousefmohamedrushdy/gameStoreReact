import React, { useState } from "react";
import StyledWrapper from "../custom/StyledWrapper";
import { BiCheckCircle } from "react-icons/bi";
import { updateGame } from "../API/API";

const Comments = ({ game, onUpdate }) => {
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!commentText.trim()) newErrors.comment = "Comment cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Add comment
      const updatedComments = game.comments
        ? [
            ...game.comments,
            { text: commentText, date: new Date().toISOString() },
          ]
        : [{ text: commentText, date: new Date().toISOString() }];

      const updatedGame = await updateGame(game._id, {
        ...game,
        comments: updatedComments,
      });

      onUpdate(updatedGame); // update parent state
      setCommentText("");
      setErrors({});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to add comment:", err);
      setErrors({ comment: "Failed to add comment." });
    }
  };

  return (
    <StyledWrapper>
      <div className="overlay">
        {success && (
          <div
            className="alert alert-success d-flex align-items-center fixed-alert"
            role="alert"
            style={{ backgroundColor: "#23C552", border: "none" }}
          >
            <BiCheckCircle className="me-2" size={24} />
            <div>Comment added!</div>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Comments</p>
          <p className="message">Share your thoughts about this game.</p>

          <div className={`input-group ${errors.comment ? "error" : ""}`}>
            <input
              id="comment-input"
              name="comment"
              placeholder=" "
              type="text"
              className="input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <label htmlFor="comment-input" className="label">
              Add a comment
            </label>
            {errors.comment && <p className="error-text">{errors.comment}</p>}
          </div>

          <button type="submit" className="submit">
            Submit Comment
          </button>
        </form>

        {/* Display existing comments */}
        <div className="mt-3 comments-list">
          {game.comments && game.comments.length > 0 ? (
            game.comments
              .slice()
              .reverse()
              .map((c, idx) => (
                <div key={idx} className="comment-item">
                  <p>{c.text}</p>
                  <small>{new Date(c.date).toLocaleString()}</small>
                </div>
              ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Comments;
