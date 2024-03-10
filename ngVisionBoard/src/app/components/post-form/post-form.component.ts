import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit{
  post: Post = new Post();
  board: Board = new Board();
  @Input() boardId: number = 0;
  createSuccess: boolean = false;

  constructor(private postService: PostService,
    private boardService: BoardService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
  }

  loadBoard(boardId: number): void {
    this.boardService.getBoardById(boardId).subscribe({
      next: (board) => {
        console.log(boardId);
        this.board = board;
      },
      error: (problem) => {
        console.error(
          'PostFormHttpComponent.loadBoard(): error loading board:'
        );
        console.error(problem);
      },
    });
  }

  createPost(addPost: Post): void {
    addPost.board.id = this.boardId;
    console.log('Post JSON:', JSON.stringify(addPost));
    this.postService.create(addPost).subscribe({
      next: (addedPost) => {
        console.log('Post created successfully:', addedPost);
        this.createSuccess = true;
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }

}
