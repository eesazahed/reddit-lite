import { NextPage } from "next";
import NavItem from "./NavItem";

const Navbar: NextPage = () => {
  return (
    <nav className="px-16 bg-black flex justify-between">
      <div className="flex">
        <NavItem text="Home" href="" />
        <NavItem text="About" href="about" />
      </div>
      <div className="flex">
        <NavItem auth />
      </div>
    </nav>
  );
};

export default Navbar;
