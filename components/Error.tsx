import type { NextPage } from "next";

interface Props {
  text: string;
}

const Error: NextPage<Props> = ({ text }) => {
  return <span className="text-red-500">{text}</span>;
};

export default Error;
