import type { NextPage } from "next";

interface Props {
  text: string;
}

const Success: NextPage<Props> = ({ text }) => {
  return <span className="text-green-500">{text}</span>;
};

export default Success;
