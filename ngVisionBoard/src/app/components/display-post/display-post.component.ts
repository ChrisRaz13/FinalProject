import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { Board } from '../../models/board';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css'
})
export class DisplayPostComponent {
  @Input() post: Post = new Post();
  constructor() { }
}
