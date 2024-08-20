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
import Textarea from "../components/Textarea";

interface Props {
  user: ProfileType;
}

interface FormData {
  username: string;
  bio: string;
}

const Settings: NextPage<Props> = ({ user }) => {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    bio: user?.bio || "",
  });
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
        <>
          <Title text="Please log in first" />
          <a href="/api/auth/signin">Okay</a>
        </>
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
                    You haven&apos;t chosen a username yet. Make sure you do!
                    You can only choose once.
                  </p>
                  <Input
                    parentData={formData.username}
                    updateParent={(e: string) =>
                      setFormData({ ...formData, username: e })
                    }
                    label="Username"
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
                </div>
              ) : (
                <div>You have already chosen a username!</div>
              )}

              <div>
                <p>Write a small bio!</p>
                <Textarea
                  parentData={formData.bio}
                  updateParent={(e: string) =>
                    setFormData({ ...formData, bio: e })
                  }
                  label="Bio"
                  placeholder="Bio"
                />
                <p className="text-sm text-right mt-1 text-gray-400">
                  {100 - formData.bio.length} characters left
                </p>
                {message.type === "bio" && (
                  <p className="my-2">
                    <Error text={message.content} />
                  </p>
                )}
              </div>

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
