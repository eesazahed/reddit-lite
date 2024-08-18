import type { NextPage } from "next";

interface Props {
  text: string;
}

const Title: NextPage<Props> = ({ text }) => {
  return <h1 className="text-4xl">{text}</h1>;
};

export default Title;
