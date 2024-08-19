import type { NextPage } from "next";
import PageHead from "../../../../components/PageHead";
import Title from "../../../../components/Title";
import getUserFromSession from "../../../../utils/getUserFromSession";
import getPostById from "../../../../utils/getPostById";
import FormattedTime from "../../../../components/FormattedTime";
import getUsernameByUserId from "../../../../utils/getUsernameByUserId";
import PostCommentForm from "../../../../components/PostCommentForm";
import getPostComments from "../../../../utils/getPostComments";
import CommentsList from "../../../../components/CommentsList";

interface Props {
  postData: PostType;
  user: ProfileType;
  postCreatorUsername: string;
  postComments: CommentType[];
}

const Post: NextPage<Props> = ({
  postData,
  user,
  postCreatorUsername,
  postComments,
}) => {
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

      {postComments && postComments.length > 0 ? (
        <div>
          <p>View comments ({postComments.length})</p>
          <CommentsList commentsList={postComments} />
        </div>
      ) : (
        <div>There are no comments on this post yet.</div>
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
  const postComments = await getPostComments(postData.id);

  return {
    props: {
      user,
      postData,
      postCreatorUsername,
      postComments,
    },
  };
};
