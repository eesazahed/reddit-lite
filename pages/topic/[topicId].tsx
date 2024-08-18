import type { NextPage } from "next";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";
import getTopicById from "../../utils/getTopicById";
import TopicDescription from "../../components/TopicDescription";
import getUserFromSession from "../../utils/getUserFromSession";
import getUsernameByUserId from "../../utils/getUsernameByUserId";
import LeaveOrJoinTopic from "../../components/LeaveOrJoinTopic";

interface Props {
  topicData: TopicType;
  createdBy: string;
  user: ProfileType;
}

const Topic: NextPage<Props> = ({ topicData, createdBy, user }) => {
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

      <TopicDescription createdBy={createdBy} topicData={topicData} />

      <LeaveOrJoinTopic user={user} topicId={topicData.id} />

      {user && user.accountActivated ? (
        user.topicsJoined.includes(topicData.id) && (
          <p>
            <a href={`/topic/${topicData.id}/post`}>Create post!</a>
          </p>
        )
      ) : (
        <p>
          To participate in this topic, head over to{" "}
          <a href="/settings">settings</a> and choose a username to active your
          account first!
        </p>
      )}
    </div>
  );
};

export default Topic;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const topicData = await getTopicById(Number(context.params.topicId));

  if (!topicData) {
    return { props: {} };
  }

  const createdBy = await getUsernameByUserId(topicData.creatorUserId);

  return {
    props: {
      user,
      topicData,
      createdBy,
    },
  };
};
