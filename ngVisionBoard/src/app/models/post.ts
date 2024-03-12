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
  bgColor?: string;

  constructor(
    id: number = 0,
    description: string = '',
    title: string = '',
    completed: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    dueDate: Date = new Date(),
    imageUrl: string = '',
    videoUrl: string = '',
    overlayText: string = '',
    completedDate: Date = new Date(),
    enabled: boolean = false,
    published: boolean = false,
    scale: number = 0,
    layer: number = 0,
    board: Board = new Board(),
    categories: Category[] = []
  ){


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
