// post.model.ts

import { Board } from "./board";
import { Category } from "./category";

export class Post {
  id: number;
  description: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  imageUrl: string;
  videoUrl: string;
  overlayText: string;
  completedDate: Date;
  enabled: boolean;
  published: boolean;
  scale: number;
  layer: number;
  board: Board;
  categories: Category[];

  constructor(
    id: number,
    description: string,
    title: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
    dueDate: Date,
    imageUrl: string,
    videoUrl: string,
    overlayText: string,
    completedDate: Date,
    enabled: boolean,
    published: boolean,
    scale: number,
    layer: number,
    board: Board,
    categories: Category[]
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dueDate = dueDate;
    this.imageUrl = imageUrl;
    this.videoUrl = videoUrl;
    this.overlayText = overlayText;
    this.completedDate = completedDate;
    this.enabled = enabled;
    this.published = published;
    this.scale = scale;
    this.layer = layer;
    this.board = board;
    this.categories = categories;
  }
}
