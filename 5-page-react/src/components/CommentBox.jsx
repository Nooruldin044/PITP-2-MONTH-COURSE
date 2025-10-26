import React, { useState } from "react";

const CommentBox = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const addComment = () => {
    if (text.trim()) {
      setComments([...comments, text]);
      setText("");
    }
  };

  return (
    <div className="comment-box">
      <h3>Leave a Comment</h3>
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={addComment}>Add Comment</button>

      <ul>
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
