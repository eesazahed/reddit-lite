import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import { useSession } from "next-auth/react";
import Input from "../components/Input";
import getUserFromSession from "../utils/getUserFromSession";
import { useState } from "react";
import Btn from "../components/Btn";
import { useRouter } from "next/router";
import Error from "../components/Error";
import Success from "../components/Succeed";

interface Props {
  user: ProfileType;
}

interface FormData {
  username: string;
}

const Settings: NextPage<Props> = ({ user }) => {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ username: "" });
  const [message, setMessage] = useState({ content: "", type: "" });

  const submitForm = async () => {
    setMessage({ content: "Updating settings...", type: "success" });

    const request = await fetch("/api/users/settings", {
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
      <PageHead title="Settings" />

      {session.status === "loading" && <Title text="Loading..." />}
      {session.status === "unauthenticated" && (
        <Title text="Please log in first" />
      )}

      {session.status === "authenticated" && (
        <div>
          <Title text="Settings" />

          {user && (
            <div>
              <p>Hello, {user.username}.</p>

              {!user.accountActivated ? (
                <div>
                  <p>
                    You haven&apos;t chosen a username. Make sure you do! You
                    can only choose once.
                  </p>
                  <Input
                    parentData={formData.username}
                    updateParent={(e: string) =>
                      setFormData({ ...formData, username: e })
                    }
                    label="Username"
                    name="username"
                    placeholder="Username"
                  />
                  <p className="text-sm text-right mt-1 text-gray-400">
                    {16 - formData.username.length} characters left
                  </p>
                  {message.type === "username" && (
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
                <div>You have already chosen a username!</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);

  return {
    props: {
      user,
    },
  };
};
