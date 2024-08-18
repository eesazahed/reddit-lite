import type { NextPage } from "next";
import { useRouter } from "next/router";
import Btn from "./Btn";

interface Props {
  user: ProfileType;
  topicId: number;
}

const LeaveOrJoinTopic: NextPage<Props> = ({ user, topicId }) => {
  const router = useRouter();

  const joinTopic = async () => {
    const request = await fetch("/api/topics/join", {
      method: "POST",
      body: JSON.stringify({ id: topicId }),
    });

    const data = await request.json();

    if (data.type === "success") {
      router.reload();
    }
  };

  const leaveTopic = async () => {
    const request = await fetch("/api/topics/leave", {
      method: "POST",
      body: JSON.stringify({ id: topicId }),
    });

    const data = await request.json();

    if (data.type === "success") {
      router.reload();
    }
  };

  return (
    <>
      {user &&
        user.accountActivated &&
        !user.topicsCreated.includes(topicId) && (
          <div>
            {!user.topicsJoined.includes(topicId) ? (
              <Btn text="Join topic" onClick={joinTopic} />
            ) : (
              <Btn text="Leave topic" onClick={leaveTopic} />
            )}
          </div>
        )}
    </>
  );
};

export default LeaveOrJoinTopic;
