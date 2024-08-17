import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import getUserFromSession from "../utils/getUserFromSession";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  user: ProfileType;
}

const Profile: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(`/u/${user.username}`);
    } else {
      router.replace("/api/auth/signin");
    }
  }, []);

  return (
    <div>
      <PageHead title="Redirecting..." />
      <Title text="Redirecting..." />
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);

  return {
    props: {
      user,
    },
  };
};
