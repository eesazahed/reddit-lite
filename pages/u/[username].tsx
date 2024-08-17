import type { NextPage } from "next";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";
import getUserByUsername from "../../utils/getUserByUsername";

interface Props {
  profile: ProfileType;
}

const Username: NextPage<Props> = ({ profile }) => {
  console.log(profile);

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
    </div>
  );
};

export default Username;

export const getServerSideProps = async (context: any) => {
  const profile = await getUserByUsername(context.params.username);

  return {
    props: {
      profile,
    },
  };
};
