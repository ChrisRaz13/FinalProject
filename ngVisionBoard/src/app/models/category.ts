import { Post } from "./post";

export class Category {
  id: number;
  name: string;
  createdAt: Date;
  description: string;
  imageUrl: string;
  posts: Post[];

  constructor(
    id: number = 0,
    name: string = '',
    createdAt: Date = new Date(),
    description: string = '',
    imageUrl: string = '',
    posts: Post[] = []
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.description = description;
    this.imageUrl = imageUrl;
    this.posts = posts;
  }
}
