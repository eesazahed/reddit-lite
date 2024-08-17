import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <PageHead title="Home" />

      <Navbar />

      <h1>Home</h1>
    </div>
  );
};

export default Home;
