import type { NextPage } from "next";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

const Navbar: NextPage = () => {
  const session = useSession();

  return (
    <nav className="px-16 bg-black flex justify-between">
      <div className="flex">
        <NavItem text="Home" href="" />
        <NavItem text="Explore" href="explore" />
        <NavItem text="Create" href="create" />
        <NavItem text="Settings" href="settings" />
      </div>
      <div className="flex">
        {session.status === "authenticated" && (
          <NavItem text="Profile" href="profile" />
        )}
        <NavItem auth />
      </div>
    </nav>
  );
};

export default Navbar;
