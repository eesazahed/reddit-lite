import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  text?: string;
  href?: string;
  auth?: boolean;
}

const NavItem: NextPage<Props> = ({ text, href, auth }) => {
  const session = useSession();

  if (auth && session.status === "loading") return <></>;

  return (
    <div className="p-4">
      {!auth ? (
        <a className="text-white" href={`/${href}`}>
          {text}
        </a>
      ) : (
        <span
          onClick={
            session.status === "authenticated"
              ? () => signOut()
              : () => signIn()
          }
          className="cursor-pointer"
        >
          {session.status === "authenticated" ? "Sign out" : "Sign in"}
        </span>
      )}
    </div>
  );
};

export default NavItem;
