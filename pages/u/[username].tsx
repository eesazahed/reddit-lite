import type { NextPage } from "next";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";
import getUserByUsername from "../../utils/getUserByUsername";
import getUserTopicsCreated from "../../utils/getUserTopicsCreated";
import getUserTopicsJoined from "../../utils/getUserTopicsJoined";
import TopicsList from "../../components/TopicsList";

interface Props {
  profile: ProfileType;
  profileTopicsCreated: TopicType[];
  profileTopicsJoined: TopicType[];
}

const Username: NextPage<Props> = ({
  profile,
  profileTopicsCreated,
  profileTopicsJoined,
}) => {
  if (!profile) {
    return (
      <div>
        <PageHead title="User not found" />
        <Title text="User not found" />
      </div>
    );
  }

  return (
    <div>
      <PageHead title={profile.username} />
      <Title text={profile.username} />
      {profileTopicsCreated && (
        <div>
          <p>Topics created:</p>
          <TopicsList topicsList={profileTopicsCreated} />{" "}
        </div>
      )}
      {profileTopicsJoined && (
        <div>
          <p>Topics joined:</p>
          <TopicsList topicsList={profileTopicsJoined} />{" "}
        </div>
      )}
    </div>
  );
};

export default Username;

export const getServerSideProps = async (context: any) => {
  const profile = await getUserByUsername(context.params.username);

  if (!profile) {
    return { props: {} };
  }

  const profileTopicsCreated = await getUserTopicsCreated(profile.username);
  const profileTopicsJoined = await getUserTopicsJoined(profile.username);

  return {
    props: {
      profile,
      profileTopicsCreated,
      profileTopicsJoined,
    },
  };
};
