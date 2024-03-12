import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { DisplayPostComponent } from '../display-post/display-post.component';
import { CommonModule } from '@angular/common';
import { CreateBordFormComponent } from '../create-bord-form/create-bord-form.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-display-boards',
  standalone: true,
  imports: [
    PostFormComponent,
    DisplayPostComponent,
    CommonModule,
    CreateBordFormComponent,
    FormsModule,
    AppComponent,
    RouterModule
  ],

  templateUrl: './display-boards.component.html',
  styleUrl: './display-boards.component.css'
})
export class DisplayBoardsComponent implements OnInit{

  user: User = new User();
  boards: Board[] = [];
  currentBoard: Board = new Board();
  posts: Post[] = [];
  isNewPost: boolean[] = [];
  showPostForm: boolean = false;
  userHasBoards: boolean = false;
  searchTerm: string = '';
  searchedUsers: User[] = [];
  userBoards: Board[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardService,
    private postService: PostService,
    private UserService: UserService

  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loadBoards();
        // this.loadBoards(user.id);
      },
      error: (problem) => {
        console.error(
          'VisionBoardAltHttpComponent.getLoggedInIser(): error loading user:'
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

    loadBoards(): void {
      this.boardService.index().subscribe({
        next: (boardList) => {
          this.boards = boardList;
          // After fetching boards, load posts for each board
          this.loadPostsForEachBoard();
        },
        error: (err: any) => {
          console.error('VisionBoardComponent.loadBoards: error', err);
        }
      });
    }

    loadPostsForEachBoard(): void {
      if (this.boards && this.boards.length > 0) {
        this.boards.forEach((board) => {
          this.postService.getPostsByBoardId(board.id).subscribe({
            next: (posts) => {
              board.posts = posts; // Assign posts to the 'posts' property of each board
            },
            error: (problem) => {
              console.error(
                'VisionBoardHttpComponent.loadPostsForEachBoard(): error loading posts for board:',
                problem
                );
              }
            });
          });
        }
      }
    }

