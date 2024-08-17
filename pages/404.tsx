import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";

const Custom404: NextPage = () => {
  return (
    <div>
      <PageHead title="404" />
      <Title text="Page not found :(" />
    </div>
  );
};

export default Custom404;
