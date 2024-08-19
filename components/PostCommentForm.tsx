import type { NextPage } from "next";
import Btn from "./Btn";
import { useState } from "react";
import Input from "./Input";
import Error from "./Error";
import Success from "./Succeed";

interface Props {
  postId: number;
}

interface FormData {
  content: string;
}

const PostCommentForm: NextPage<Props> = ({ postId }) => {
  const [formData, setFormData] = useState<FormData>({
    content: "",
  });
  const [message, setMessage] = useState({ content: "", type: "" });

  const submitForm = async () => {
    setMessage({ content: "Posting...", type: "success" });

    const request = await fetch("/api/posts/comment", {
      method: "POST",
      body: JSON.stringify({ ...formData, postId }),
    });

    const data = await request.json();

    setMessage(data);

    if (data.type === "success") {
      console.log("sucess");
    }
  };

  return (
    <>
      <div>
        <Input
          parentData={formData.content}
          updateParent={(e: string) => setFormData({ ...formData, content: e })}
          label="Leave a comment"
          placeholder="comment"
        />
        <p className="text-sm text-right mt-1 text-gray-400">
          {500 - formData.content.length} characters left
        </p>
        {message.type === "content" && (
          <p className="my-2">
            <Error text={message.content} />
          </p>
        )}

        <div className="py-8">
          {["auth", "server", "success"].includes(message.type) ? (
            message.type === "success" ? (
              <p className="text-center text-xl">
                <Success text={message.content} />
              </p>
            ) : (
              <p className="text-center text-xl">
                <Error text={message.content} />
              </p>
            )
          ) : (
            ""
          )}
        </div>

        <Btn text="Confirm" submit onClick={submitForm} />
      </div>
    </>
  );
};

export default PostCommentForm;
