export class Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  enabled: boolean;
  board: {
    id: number;
  };
  user: {
    id: number;
  };
  inReplyTo?: Comment;
text: any;

  constructor(
    id: number = 0,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    comment: string = '',
    enabled: boolean = false,
    board: { id: number } = { id: 0 },
    user: { id: number } = { id: 0 },
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
