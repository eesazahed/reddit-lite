import type { NextPage } from "next";

interface Props {
  content: string;
}

const PostContent: NextPage<Props> = ({ content }) => {
  return <div>{content}</div>;
};

export default PostContent;
