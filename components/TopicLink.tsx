import type { NextPage } from "next";

interface Props {
  id: number;
  name: string;
  description: string;
}

const TopicLink: NextPage<Props> = ({ id, name, description }) => {
  return (
    <p>
      <a href={`/topic/${id}`}>{name}</a> - {description}
    </p>
  );
};

export default TopicLink;
