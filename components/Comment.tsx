import type { NextPage } from "next";

interface Props {
  commentData: CommentType;
}

const Comment: NextPage<Props> = ({ commentData }) => {
  return (
    <div>
      <p>{commentData.content}</p>
    </div>
  );
};

export default Comment;
