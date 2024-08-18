import type { NextPage } from "next";
import Btn from "./Btn";
import { useState } from "react";
import Input from "./Input";
import Error from "./Error";
import Success from "./Succeed";

interface Props {
  topicId: number;
}

interface FormData {
  title: string;
  content: string;
}

const CreatePostForm: NextPage<Props> = ({ topicId }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [message, setMessage] = useState({ content: "", type: "" });

  const submitForm = async () => {
    const request = await fetch("/api/topics/post", {
      method: "POST",
      body: JSON.stringify({ ...formData, topicId }),
    });

    const data = await request.json();

    if (data.type === "success") {
      console.log("sucess");
    }
  };

  return (
    <>
      <div>
        <Input
          parentData={formData.title}
          updateParent={(e: string) => setFormData({ ...formData, title: e })}
          label="Title"
          placeholder="Title"
        />
        <p className="text-sm text-right mt-1 text-gray-400">
          {60 - formData.title.length} characters left
        </p>
        {message.type === "title" && (
          <p className="my-2">
            <Error text={message.content} />
          </p>
        )}

        <Input
          parentData={formData.content}
          updateParent={(e: string) => setFormData({ ...formData, content: e })}
          label="Content"
          placeholder="Content"
        />
        <p className="text-sm text-right mt-1 text-gray-400">
          {1000 - formData.content.length} characters left
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

export default CreatePostForm;
