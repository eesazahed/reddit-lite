import type { NextPage } from "next";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";
import getTopicById from "../../utils/getTopicById";
import getUserByUserId from "../../utils/getUserByUserId";
import Link from "../../components/Link";
import getTimeFormatted from "../../utils/getTimeFormatted";

interface Props {
  topicData: TopicType;
  createdBy: ProfileType;
}

const Topic: NextPage<Props> = ({ topicData, createdBy }) => {
  if (!topicData) {
    return (
      <div>
        <PageHead title="Topic not found" />
        <Title text="Topic not found" />
      </div>
    );
  }

  return (
    <div>
      <PageHead title={topicData.name} />
      <Title text={topicData.name} />
      <p>{topicData.description}</p>
      <p>
        Created by <Link text={createdBy.username} href={createdBy.username} />{" "}
        {getTimeFormatted(parseInt(topicData.createdAt))}
      </p>
    </div>
  );
};

export default Topic;

export const getServerSideProps = async (context: any) => {
  const topicData = await getTopicById(Number(context.params.topicId));

  if (!topicData) {
    return { props: {} };
  }

  const createdBy = await getUserByUserId(topicData.creatorUserId);

  return {
    props: {
      topicData,
      createdBy,
    },
  };
};
