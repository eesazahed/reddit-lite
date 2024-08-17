import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";

const Home: NextPage = () => {
  return (
    <div>
      <PageHead title="Home" />
      <Title text="Home" />
    </div>
  );
};

export default Home;
