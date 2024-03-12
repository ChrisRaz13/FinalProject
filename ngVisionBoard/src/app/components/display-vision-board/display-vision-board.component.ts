import { Component, OnInit } from '@angular/core';
import { DisplayPostComponent } from '../display-post/display-post.component';
import { Board } from '../../models/board';
import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { BoardLikeService } from '../../services/board-like.service';

@Component({
  selector: 'app-display-vision-board',
  standalone: true,
  imports: [DisplayPostComponent, CommonModule],
  templateUrl: './display-vision-board.component.html',
  styleUrl: './display-vision-board.component.css'
})
export class DisplayVisionBoardComponent implements OnInit{
  currentBoard: Board = new Board();
  posts: Post[] = [];

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
        this.posts = posts;
      },
      error: (problem) => {
        console.error(
          'DisplayBoardHttpComponent.loadPosts(): error loading board posts:'
        )
      }
    });
  }

}
