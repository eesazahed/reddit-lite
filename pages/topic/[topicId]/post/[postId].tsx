import type { NextPage } from "next";
import PageHead from "../../../../components/PageHead";
import Title from "../../../../components/Title";
import getUserFromSession from "../../../../utils/getUserFromSession";
import getPostById from "../../../../utils/getPostById";
import FormattedTime from "../../../../components/FormattedTime";
import getUsernameByUserId from "../../../../utils/getUsernameByUserId";
import PostCommentForm from "../../../../components/PostCommentForm";

interface Props {
  postData: PostType;
  user: ProfileType;
  postCreatorUsername: string;
}

const Post: NextPage<Props> = ({ postData, user, postCreatorUsername }) => {
  if (!postData) {
    return (
      <div>
        <PageHead title="Topic not found" />
        <Title text="Topic not found" />
      </div>
    );
  }

  return (
    <div>
      <PageHead title={`Post - ${postData.title}`} />
      <Title text={`Post - ${postData.title}`} />
      <p>
        Created <FormattedTime timestamp={postData.createdAt} /> by{" "}
        <a href={`/u/${postCreatorUsername}`}>{postCreatorUsername}</a>
      </p>
      <p>{postData.content}</p>

      {user && user.accountActivated ? (
        user.topicsJoined.includes(postData.topicId) && (
          <PostCommentForm postId={postData.id} />
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
  const postData = await getPostById(Number(context.params.topicId));

  if (!postData) {
    return { props: {} };
  }

  const postCreatorUsername = await getUsernameByUserId(postData.creatorUserId);

  return {
    props: {
      user,
      postData,
      postCreatorUsername,
    },
  };
};
