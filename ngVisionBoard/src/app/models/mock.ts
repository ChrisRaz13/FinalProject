// board.mock.ts
import { Board } from './board';
import { Color } from './color';
import { User } from './user';


export const Mock: Board = {
  id: 1,
  title: "John's Travels",
  createdAt: new Date("2024-03-05T12:15:00"),
  updatedAt: new Date("2024-03-05T12:15:00"),
  user: {
    id: 2
  } as User, // Create a mock User object
  description: "This vision board helps to remind me of the trips I have taken and the trips I want to take still.",
  enabled: true,
  color: {
    id: 2
  } as Color, // Create a mock Color object
  published: true,
  posts: [],
  comments: [],
  boardLikes: []
};
