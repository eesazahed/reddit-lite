import type { NextPage } from "next";
import Comment from "./Comment";

interface Props {
  userId?: number;
  commentsList: CommentType[];
  setCommentsList: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const CommentsList: NextPage<Props> = ({
  userId,
  commentsList,
  setCommentsList,
}) => {
  const handleDeleteComment = (commentId: number) => {
    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div>
      {commentsList
        .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
        .map((commentData) => (
          <Comment
            key={commentData.id}
            commentData={commentData}
            userId={userId}
            onDeleteComment={handleDeleteComment}
          />
        ))}
    </div>
  );
};

export default CommentsList;
