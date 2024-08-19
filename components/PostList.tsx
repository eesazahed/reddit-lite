import type { NextPage } from "next";
import PostLink from "./PostLink";

interface Props {
  postList: PostType[];
  topicId: number;
}

const PostList: NextPage<Props> = ({ postList, topicId }) => {
  return (
    <div>
      {postList.map((post) => (
        <PostLink
          key={post.id}
          topicId={topicId}
          postId={post.id}
          title={post.title}
        />
      ))}
    </div>
  );
};

export default PostList;
