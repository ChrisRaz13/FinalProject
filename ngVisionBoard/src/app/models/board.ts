// board.ts
import { User } from './user';
import { Color } from './color';

export class Board {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  description: string;
  enabled: boolean;
  color: Color; // Update the type to Color
  published: boolean;
  posts: any[]; // Adjust types as needed
  comments: any[]; // Adjust types as needed
  boardLikes: any[]; // Adjust types as needed

  constructor(
    id: number = 0,
    title: string = '',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    user: User = {
      id: 0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      enabled: false,
      role: '',
      imageUrl: null,
      aboutMe: ''
    },
    description: string = '',
    enabled: boolean = false,
    color: Color = {
      id: 0,
      name: '',
      value: ''
    }, // Update to Color type
    published: boolean = false,
    posts: any[] = [], // Adjust types as needed
    comments: any[] = [], // Adjust types as needed
    boardLikes: any[] = [] // Adjust types as needed
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.description = description;
    this.enabled = enabled;
    this.color = color; // Assign to Color type
    this.published = published;
    this.posts = posts; // Assign posts array
    this.comments = comments; // Assign comments array
    this.boardLikes = boardLikes; // Assign boardLikes array
  }
}
