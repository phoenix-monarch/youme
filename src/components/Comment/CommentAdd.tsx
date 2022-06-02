import { useAppSelector } from "App/store";
import { db } from "firebase-app/firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { IComment } from "interfaces/components";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledCommentAdd = styled.form`
  .comment-post {
    margin-top: 20px;
    width: 100%;
    display: flex;
    gap: 14px;
  }
  .comment-textarea {
    flex: 1;
    border-radius: 10px;
    padding: 14px;
    min-height: 44px;
    flex: 1;
    resize: none;
    overflow-y: hidden;
    background-color: #39354d;
    color: var(--white);
    &::placeholder {
      color: var(--white);
    }
  }
  .comment-button {
    border-radius: 4px;
    padding: 0 20px;
    background-color: var(--primary-color);
    color: var(--white);
    height: 44px;
    place-self: end;
  }
`;

interface CommentAddProps {
  comments: IComment[];
  id: string;
  fetchCommentList: () => Promise<void>;
}

const CommentAdd = ({ comments, fetchCommentList, id }: CommentAddProps) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [commentValue, setCommentValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (commentValue === "") {
        toast.error("Comment must be filled out");
        return;
      }
      await setDoc(doc(db, "comments", id), {
        comments: [
          ...comments,
          {
            userId: currentUser.uid,
            username: currentUser.username,
            avatar: currentUser.avatar,
            email: currentUser.email,
            content: commentValue,
            like: 0,
            dislike: 0,
            createdAt: Timestamp.now(),
          },
        ],
      });
      fetchCommentList();
      setCommentValue("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(resizeTextArea, [commentValue]);

  return (
    <StyledCommentAdd className="comment-form" onSubmit={handleAddComment} method="POST">
      <div className="comment-post">
        <img className="comment-avatar" src={currentUser.avatar} alt="avatar" />
        <textarea
          className="comment-textarea"
          placeholder="Add a comment..."
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          ref={textAreaRef}
          value={commentValue}
          onChange={onChange}
          rows={1}
        />
        <button type="submit" className="comment-button">
          Post
        </button>
      </div>
    </StyledCommentAdd>
  );
};

export default CommentAdd;
