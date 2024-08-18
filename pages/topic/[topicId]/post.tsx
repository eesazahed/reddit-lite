import type { NextPage } from "next";
import PageHead from "../../../components/PageHead";
import Title from "../../../components/Title";
import getTopicById from "../../../utils/getTopicById";
import getUserFromSession from "../../../utils/getUserFromSession";
import CreatePostForm from "../../../components/CreatePostForm";

interface Props {
  topicData: TopicType;
  user: ProfileType;
}

const Post: NextPage<Props> = ({ topicData, user }) => {
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
      <PageHead title={`Create post - ${topicData.name}`} />
      <Title text={`Create post - ${topicData.name}`} />

      {user && user.accountActivated ? (
        user.topicsJoined.includes(topicData.id) && (
          <CreatePostForm topicId={topicData.id} />
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

export default Post;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const topicData = await getTopicById(Number(context.params.topicId));

  if (!topicData) {
    return { props: {} };
  }

  return {
    props: {
      user,
      topicData,
    },
  };
};
