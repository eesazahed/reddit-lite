import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  text?: string;
  href?: string;
  auth?: boolean;
}

const NavItem: NextPage<Props> = ({ text, href, auth }) => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="p-4">
      {!auth ? (
        <a className="text-white" href={href}>
          {text}
        </a>
      ) : (
        <span
          onClick={session ? () => signOut() : () => signIn()}
          className="cursor-pointer"
        >
          {session ? "Sign out" : "Sign in"}
        </span>
      )}
    </div>
  );
};

export default NavItem;
