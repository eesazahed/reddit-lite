import type { NextPage } from "next";

interface Props {
  topicId: number;
  postId: number;
  title: string;
}

const PostLink: NextPage<Props> = ({ topicId, postId, title }) => {
  return (
    <p>
      <a href={`/topic/${topicId}/post/${postId}`}>{title}</a>
    </p>
  );
};

export default PostLink;
