import type { NextPage } from "next";
import FormattedTime from "./FormattedTime";
import { useEffect, useState } from "react";

interface Props {
  userId?: number;
  commentData: CommentType;
  onDeleteComment: (commentId: number) => void;
}

const Comment: NextPage<Props> = ({ userId, commentData, onDeleteComment }) => {
  const [username, setUsername] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/users/username/${commentData.creatorUserId}`)
      .then((response) => response.json())
      .then((data) => setUsername(data.username));
  }, [commentData]);

  const deleteThisComment = async () => {
    setDeleting(true);

    const request = await fetch("/api/comments/delete", {
      method: "DELETE",
      body: JSON.stringify({ commentId: commentData.id }),
    });

    const data = await request.json();

    if (data.type === "success") {
      onDeleteComment(commentData.id);
    } else {
      setDeleting(false);
    }
  };

  if (deleting) {
    return (
      <div>
        <p>Deleting..</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        {username ? <a href={`/u/${username}`}>{username}</a> : "Loading..."}
      </p>
      <p>
        <FormattedTime timestamp={commentData.createdAt} />
      </p>
      <p>{commentData.content}</p>
      {userId === commentData.creatorUserId && (
        <div className="cursor-pointer" onClick={deleteThisComment}>
          Delete
        </div>
      )}
    </div>
  );
};

export default Comment;
