// comment.model.ts

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

  constructor(id: number, createdAt: Date, updatedAt: Date, comment: string, enabled: boolean, board: Board, user: User, inReplyTo: Comment) {
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

export class Board {
  id: number;
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}


