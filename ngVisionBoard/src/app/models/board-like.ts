// board-like.model.ts

import { Board } from "./comments";
import { User } from "./user";

export class BoardLike {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  board: Board;

  constructor(id: number, createdAt: Date, updatedAt: Date, user: User, board: Board) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.board = board;
  }
}
