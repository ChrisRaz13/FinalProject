import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { DisplayPostComponent } from '../display-post/display-post.component';
import { CommonModule } from '@angular/common';
import { CreateBordFormComponent } from '../create-bord-form/create-bord-form.component';

@Component({
  selector: 'app-visionboard-alternate',
  standalone: true,
  imports: [PostFormComponent, DisplayPostComponent, CommonModule, CreateBordFormComponent],
  templateUrl: './visionboard-alternate.component.html',
  styleUrl: './visionboard-alternate.component.css'
})
export class VisionboardAlternateComponent implements OnInit{
  user: User = new User();
  boards: Board[] = [];
  currentBoard: Board = new Board();
  posts: Post[] = [];
  isNewPost: boolean[] = [];
  showPostForm: boolean = false;
  userHasBoards: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardService,
    private postService: PostService

  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loadBoards(user.id);
      },
      error: (problem) => {
        console.error(
          'VisionBoardAltHttpComponent.getLoggedInIser(): error loading user:'
        )
      }
    });
  }

  loadBoards(userId: number): void {
    this.boardService.getBoardsByUserId(userId).subscribe({
      next: (boards) => {
        this.boards = boards;
        this.findMostRecentBoard();
      },
      error: (problem) => {
        console.error(
          'VisionBoardHttpComponent.loadBoards(): error loading user boards:'
        )
      }
    });
  }

  loadPosts(boardId: number): void {
    this.postService.getPostsByBoardId(boardId).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (problem) => {
        console.error(
          'VisionBoardHttpComponent.loadPosts(): error loading board posts:'
        )
      }
    });
  }

  findMostRecentBoard(): void {
    if (this.boards.length > 0) {
      this.boards.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.currentBoard = this.boards[0];
      this.loadPosts(this.currentBoard.id)
      this.userHasBoards = true;
    }
  }

  addPost(): void {
    const newPost = new Post();
    this.posts.push(newPost); // Add new post to posts array
    this.isNewPost.push(true); // Mark this post as new
  }

  handleAddButtonClicked() {
    this.loadPosts(this.currentBoard.id)
  }

  createNewBoard() {
    this.router.navigate(['/create-board']);
  }

}

