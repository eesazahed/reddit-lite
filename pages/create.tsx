import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Error from "../components/Error";
import Success from "../components/Succeed";
import Input from "../components/Input";
import Btn from "../components/Btn";
import getUserFromSession from "../utils/getUserFromSession";
import Link from "../components/Link";

interface Props {
  user: ProfileType;
}

interface FormData {
  name: string;
  description: string;
}

const Create: NextPage<Props> = ({ user }) => {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });
  const [message, setMessage] = useState({ content: "", type: "" });

  const submitForm = async () => {
    setMessage({ content: "Updating settings...", type: "success" });

    const request = await fetch("/api/topics/create", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await request.json();

    setMessage(data);

    if (data.type === "success") {
      router.push("/profile");
    }
  };

  return (
    <div>
      <PageHead title="Create" />

      {session.status === "loading" && <Title text="Loading..." />}
      {session.status === "unauthenticated" && (
        <Title text="Please log in first" />
      )}

      {session.status === "authenticated" && (
        <div>
          <Title text="Create" />

          {user && (
            <div>
              <p>
                Hello, {user.username}. Create a topic to dicuss with others!
              </p>

              {user.accountActivated ? (
                <div>
                  <p>What should the name of your new topic be?</p>
                  <Input
                    parentData={formData.name}
                    updateParent={(e: string) =>
                      setFormData({ ...formData, name: e })
                    }
                    label="Name"
                    name="name"
                    placeholder="Name"
                  />
                  <p className="text-sm text-right mt-1 text-gray-400">
                    {30 - formData.name.length} characters left
                  </p>
                  {message.type === "name" && (
                    <p className="my-2">
                      <Error text={message.content} />
                    </p>
                  )}

                  <Input
                    parentData={formData.description}
                    updateParent={(e: string) =>
                      setFormData({ ...formData, description: e })
                    }
                    label="Description"
                    name="description"
                    placeholder="Description"
                  />
                  <p className="text-sm text-right mt-1 text-gray-400">
                    {60 - formData.description.length} characters left
                  </p>
                  {message.type === "description" && (
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
              ) : (
                <div>
                  Head over to <a href="/settings">settings</a> and choose a
                  username to active your account first!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Create;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);

  return {
    props: {
      user,
    },
  };
};
