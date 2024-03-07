// board.model.ts
import { BoardLike } from './board-like';
import { Color } from './color';
import { Post } from './post';
import { User } from './user';

export class Board {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  description: string;
  enabled: boolean;
  color: Color;
  published: boolean;
  posts: Post[];
  comments: Comment[];
  boardLikes: BoardLike[];

  constructor(
    id: number,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    user: User,
    description: string,
    enabled: boolean,
    color: Color,
    published: boolean,
    posts: Post[],
    comments: Comment[],
    boardLikes: BoardLike[]
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.description = description;
    this.enabled = enabled;
    this.color = color;
    this.published = published;
    this.posts = posts;
    this.comments = comments;
    this.boardLikes = boardLikes;
  }
}
