import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../models/board';
import { Post } from '../../models/post';
import { AuthService } from '../../services/auth.service';
import { BoardLikeService } from '../../services/board-like.service';
import { BoardService } from '../../services/board.service';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-view-only-vision-board',
  standalone: true,
  imports: [CommonModule, FormsModule, PostFormComponent],
  templateUrl: './view-only-vision-board.component.html',
  styleUrl: './view-only-vision-board.component.css'
})
export class ViewOnlyVisionBoardComponent implements OnInit {
  currentBoard: Board = new Board();
  posts: Post[] = [];
  showPostForm: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private postService: PostService,
    private boardLikeService: BoardLikeService

  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const boardId = +params['boardId'];
      this.loadBoard(boardId);
      this.loadPosts(boardId);
    });
  }


  loadBoard(boardId: number): void {
    this.boardService.getBoardById(boardId).subscribe({
      next: (board) => {
        this.currentBoard = board;
      },
      error: (error) => {
        console.error('Error loading board:', error);
      }
    });
  }

  loadPosts(boardId: number): void {
    this.postService.getPostsByBoardId(boardId).subscribe({
      next: (posts) => {
        this.posts = posts.map(post => ({
          ...post,
          bgColor: this.getRandomLightColor() // Assign a random light color to each post
        }));
      },
      error: (problem) => {
        console.error('DisplayBoardHttpComponent.loadPosts(): error loading board posts:');
      }
    });
  }

  flipState: { [key: number]: boolean } = {};

  toggleFlip(postId: number): void {
    this.flipState[postId] = !this.flipState[postId];
  }

  flipAllToBack(): void {
    this.posts.forEach(post => {
      this.flipState[post.id] = true;
    });
  }

  // New method to flip all cards to their frontside
  flipAllToFront(): void {
    this.posts.forEach(post => {
      this.flipState[post.id] = false;
    });
  }



  randomizeLeft(index: number): string {
    // Random left position, adjust the range as needed
    return `${20 + (index * 5 % 30)}%`;
  }

  randomizeTop(index: number): string {
    // Random top position, adjust the range as needed
    return `${10 + (index * 5 % 20)}%`;
  }

  getRandomSpan(): number {
    // Randomly return 1, 2, or 3 to span across 1 to 3 tracks
    return Math.ceil(Math.random() * 3);
  }
  deletePost(postId: number, event: MouseEvent): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== postId);
          console.log('Post deleted successfully');
        },
        error: (error) => console.error('Error deleting post:', error)
      });
    }
  }
  getRandomLightColor(): string {
    const hue = Math.floor(Math.random() * 360); // Hue value between 0 and 360
    const saturation = Math.floor(Math.random() * (100 - 50) + 50); // Saturation between 50% and 100%
    const lightness = Math.floor(Math.random() * (100 - 70) + 70); // Lightness between 70% and 100% for lighter colors
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  togglePostForm(){
    this.showPostForm = !this.showPostForm;
  }

  onPostCreated(newPost: Post){
    this.posts.push(newPost);
  }
}
