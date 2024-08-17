import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import getAllTopics from "../utils/getAllTopics";
import { useEffect, useState } from "react";
import TopicsList from "../components/TopicsList";

interface Props {
  allTopics: TopicType[];
}

const Explore: NextPage<Props> = ({ allTopics }) => {
  const [topics, setTopics] = useState<TopicType[]>();

  useEffect(() => {
    setTopics(allTopics);
  }, []);

  return (
    <div>
      <PageHead title="Explore" />
      <Title text="Explore" />
      {topics && topics.length > 0 ? (
        <div>
          <p>Topics:</p>
          <TopicsList topicsList={topics} />
        </div>
      ) : (
        <div>
          <p>
            There are no topics available. However, you are free to{" "}
            <a href="/create">create your own</a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;

export const getServerSideProps = async (context: any) => {
  const allTopics = await getAllTopics();

  return {
    props: {
      allTopics,
    },
  };
};
