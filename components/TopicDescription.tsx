import type { NextPage } from "next";
import Link from "./Link";
import FormattedTime from "./FormattedTime";

interface Props {
  topicData: TopicType;
  createdBy: string;
}

const TopicDescription: NextPage<Props> = ({ topicData, createdBy }) => {
  return (
    <div>
      <p>{topicData.description}</p>
      <p>Members: {topicData.members}</p>
      <p>
        Created by <Link text={createdBy} href={`/u/${createdBy}`} />{" "}
        <FormattedTime timestamp={topicData.createdAt} />
      </p>
    </div>
  );
};

export default TopicDescription;
