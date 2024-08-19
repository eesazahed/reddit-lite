import type { NextPage } from "next";
import getTimeFormatted from "../utils/getTimeFormatted";

interface Props {
  timestamp: string;
}

const FormattedTime: NextPage<Props> = ({ timestamp }) => {
  return <>{getTimeFormatted(parseInt(timestamp))}</>;
};

export default FormattedTime;
