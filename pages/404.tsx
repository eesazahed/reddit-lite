import type { NextPage } from "next";
import PageHead from "../components/PageHead";

const Custom404: NextPage = () => {
  return (
    <div>
      <PageHead title="404" />

      <h1>Page not found :(</h1>
    </div>
  );
};

export default Custom404;
