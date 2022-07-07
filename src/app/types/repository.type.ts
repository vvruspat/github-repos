import { User } from './user.type';

export type Repository = {
  name: string;
  owner: User;
  url: string;
  description: string;
  isPrivate: boolean;
  stargazerCount: number;
  forkCount: number;
};
