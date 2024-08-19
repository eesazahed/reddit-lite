interface ProfileType {
  id: number;
  userId: number;
  username: string;
  bio: string;
  createdAt: string;
  topicsCreated: number[];
  topicsJoined: number[];
  accountActivated: boolean;
  disabled: boolean;
}

interface TopicType {
  id: number;
  createdAt: string;
  members: number;
  creatorUserId: number;
  name: string;
  description: string;
}

interface PostType {
  id: number;
  createdAt: string;
  topicId: number;
  creatorUserId: number;
  title: string;
  content: string;
  upvotes: number;
}
