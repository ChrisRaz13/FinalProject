import { Board } from "./board";
import { User } from "./user";

export class BoardLike {
  id: number;
  user: User;
  board: Board;

  constructor(
    id: number = 0,
    user: User = new User(),
    board: Board = new Board()
  ) {
    this.id = id;
    this.user = user;
    this.board = board;
  }
}
