import type { NextPage } from "next";
import Comment from "./Comment";

interface Props {
  commentsList: CommentType[];
}

const CommentsList: NextPage<Props> = ({ commentsList }) => {
  return (
    <div>
      {commentsList.map((commentData) => (
        <Comment commentData={commentData} />
      ))}
    </div>
  );
};

export default CommentsList;
