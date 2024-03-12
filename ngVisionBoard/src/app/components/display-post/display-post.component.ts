import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { VisionboardComponent } from '../visionboard/visionboard.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VisionboardAlternateComponent } from '../visionboard-alternate/visionboard-alternate.component';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [VisionboardComponent, CommonModule, VisionboardAlternateComponent],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css'
})
export class DisplayPostComponent {
  @Input() post: Post = new Post();
  flipState: { [key: number]: boolean } = {};
  @Input() boardId!: number;
  @Input() posts!: Post[]; // This expects an array of Post objects

  constructor(private http: HttpClient, private authService: AuthService, private postService: PostService ) { }


  ngOnInit(): void {
    if (this.boardId) {
      this.loadPostsByBoardId();
    }
  }

  loadPostsByBoardId(): void {
    this.postService.getPostsByBoardId(this.boardId).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        // Initialize flip state for each post
        posts.forEach(post => this.flipState[post.id] = false);
      },
      error: (error) => console.error('Error fetching posts:', error)
    });
  }



  deletePost(postId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevents the flip action when clicking the delete button
    // Implementation to delete a post...
  }

  toggleFlip(postId: number): void {
    // Implementation to toggle flip state...
  }
}
