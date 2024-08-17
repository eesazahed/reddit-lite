import type { NextPage } from "next";
import TopicLink from "./TopicLink";

interface Props {
  topicsList: TopicType[];
}

const TopicsList: NextPage<Props> = ({ topicsList }) => {
  return (
    <div>
      {topicsList.map((topic) => (
        <TopicLink
          id={topic.id}
          name={topic.name}
          description={topic.description}
        />
      ))}
    </div>
  );
};

export default TopicsList;
