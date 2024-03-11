import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Board } from '../../models/board';
import { HttpClient } from '@angular/common/http';
import { Mock } from '../../models/mock';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { UnsplashComponent } from '../unsplash/unsplash.component';
import { Post } from '../../models/post';


@Component({
  selector: 'app-visionboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, RouterLink, RouterModule, UnsplashComponent],
  templateUrl: './visionboard.component.html',
  styleUrl: './visionboard.component.css'
})
export class VisionboardComponent implements OnInit{
  boards: Board[] = [];
  editBoard: Board | null = null;
  newBoard: Board = new Board();
  title: string = 'Board Tracker';
  selected: Board | null = null;
  updateSuccess: boolean = false;
  showEditFormFlag: boolean = false;
  displayEditForm: boolean = false;
  items = ['Item 1', 'Item 2', 'Item 3'];
  posts: Post[] = [];

  board: Board | undefined;
  userId: number = 1; // Assuming there's a logged-in user

  constructor(private http: HttpClient, private boardService: BoardService, private authService: AuthService, private PostService: PostService ) {
    this.displayEditForm = false;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // in testing phase of the methods below

  ngOnInit(): void {
    // const boardId = 1;
    // this.loadBoardInfo(boardId);
    this.loadPosts();
    // throw new Error('Method not implemented.');
  }

  // loadBoardInfo(boardId: any) {
  //   this.board = Mock;
  // }

  getBoardCount(): number {
    return this.boards.length;
  }

  loadBoards() {
    if(this.authService.checkLogin()) {
      this.boardService.index().subscribe( {
        next: (boardList) => {
          this.boards = boardList; // Update variable name
          console.log(this.boards); // Update variable name
        },
        error: (err: any) => {
          console.error('VisionBoardComponent.loadVisionBoards: error', err); // Update method name
        }
      });
    }
  }

  addBoard(board: Board) {
    if(this.authService.checkLogin()) {
    this.boardService.create(board).subscribe(
      () => {
        this.loadBoards(); // Reload boards after adding
        this.newBoard = new Board(); // Reset newBoard
      },
      (error) => {
        console.error('HomeComponent.addBoard: error', error);
      }
    );
  }
}

  setEditBoard() {
    this.editBoard = Object.assign({}, this.selected);
  }

  updateBoard(editBoard: Board) {
    if(this.authService.checkLogin()) {
    this.boardService.update(editBoard).subscribe(
      () => {
        this.loadBoards(); // Reload boards after updating
        this.editBoard = null; // Reset editBoard
      },
      (error) => {
        console.error('HomeComponent.updateBoard: error', error);
      }
    );
  }
}

  deleteBoard(id: number) {
    if(this.authService.checkLogin()) {
      this.boardService.destroy(id).subscribe(
        () => {
          this.boards = this.boards.filter((board) => board.id !== id);
          console.log('Delete of board id: ' + id + ' successful');
        },
      (error) => {
        console.error('HomeComponent.deleteBoard: error', error);
      }
    );
  }
}
loadPosts() {
  this.PostService.getPosts().subscribe({
    next: (data) => {
      this.posts = data; // Directly assign the data to posts
    },
    error: (error) => console.error('Error fetching posts:', error)
  });
}


deletePost(postId: number, event: MouseEvent): void {
  if (confirm('Are you sure you want to delete this post?')) {
    this.PostService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== postId);
        console.log('Post deleted successfully');
      },
      error: (error) => console.error('Error deleting post:', error)
    });
  }
}
// Inside your component class
flipState: { [key: number]: boolean } = {};

toggleFlip(postId: number): void {
  this.flipState[postId] = !this.flipState[postId];
}




}

