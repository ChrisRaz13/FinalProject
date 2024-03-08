import { User } from "./user";
import { Post } from "./post";
import { Comment } from "./comment";
import { BoardLike } from "./board-like";

export class Board {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  description: string;
  enabled: boolean;
  color: string;
  published: boolean;
  posts: Post[];
  comments: Comment[];
  boardLikes: BoardLike[];

  constructor(
    id: number = 0,
    title: string = '',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    user: User = new User(),
    description: string = '',
    enabled: boolean = false,
    color: string = '',
    published: boolean = false,
    posts: Post[] = [],
    comments: Comment[] = [],
    boardLikes: BoardLike[] = []
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
