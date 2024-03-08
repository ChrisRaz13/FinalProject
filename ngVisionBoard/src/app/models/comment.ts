// comment.model.ts

import { Board } from "./board";
import { User } from "./user";


export class Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  enabled: boolean;
  board: Board;
  user: User;
  inReplyTo: Comment;

  constructor(
    id: number = 0,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    comment: string = '',
    enabled: boolean = false,
    board: Board = new Board(),
    user?: User,
    inReplyTo?: Comment
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.comment = comment;
    this.enabled = enabled;
    this.board = board;
    this.user = user;
    this.inReplyTo = inReplyTo;
  }

}
