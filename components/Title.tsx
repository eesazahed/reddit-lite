import type { NextPage } from "next";

interface Props {
  text: string;
}

const Title: NextPage<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Title;
