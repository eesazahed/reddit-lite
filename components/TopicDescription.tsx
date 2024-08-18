import type { NextPage } from "next";
import getTimeFormatted from "../utils/getTimeFormatted";
import Link from "./Link";

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
        {getTimeFormatted(parseInt(topicData.createdAt))}
      </p>
    </div>
  );
};

export default TopicDescription;
