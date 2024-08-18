interface ProfileType {
  id: number;
  userId: number;
  username: string;
  bio: string;
  createdAt: string;
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
