import { Component, NgModule, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service'; // Import CommentService
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    // Other imported modules
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  boardId: any;
  boardInfo: any;

submitComment() {
throw new Error('Method not implemented.');
}
comments: Comment[] = [];
editComment: Comment | null = null;
newComment: Comment = this.getDefaultComment();
title: string = 'Comment Tracker';
selected: Comment | null = null;
updateSuccess: boolean = false;
showEditFormFlag: boolean = false;
displayEditForm: boolean;

  constructor(
    private commentService: CommentService,
    private boardService: BoardService,
    private route: ActivatedRoute

    ) {
    this.displayEditForm = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const boardId = params['boardId']; // Extract the boardId from route parameters
      if (boardId) {
        // Load board information and comments
        this.loadBoardInfo(boardId);
        this.loadComments(boardId);
      } else {
        console.error('Board ID is not provided.');
      }
    });
  }




loadBoardInfo(boardId: any) {
  // Mock board object
  const mockBoard = {
    id: boardId,
    title: 'Sample Board',
    description: 'This is a sample board description.'
  };

  // Simulate API call by returning an observable with the mock board object
  return of(mockBoard).pipe(
    tap((boardInfo: any) => {
      console.log('Board info loaded successfully:', boardInfo);
      this.boardInfo = boardInfo;
    }),
    catchError((err: any) => {
      console.error('Error loading board information:', err);
      return throwError(err); // Rethrow the error
    })
  );
}

//FIX ME
  // loadComments(boardId: number) {
  //   this.commentService.index(boardId).subscribe(
  //     (commentList) => {
  //       this.comments = commentList;
  //       console.log(this.comments);
  //     },
  //     (err) => {
  //       console.error('CommentComponent.loadComments: error', err);
  //     }
  //   );
  // }

  getCommentCount(): number {
    return this.comments.length;
  }

  displayComment(comment: Comment): void {
    this.selected = comment;
  }

  displayTable(): void {
    this.selected = null;
  }

  addComment(boardId: number) {
    this.commentService.create(this.newComment).subscribe(
      () => {
        // this.loadComments(boardId); // Load comments for the specified board
        this.newComment = this.getDefaultComment(); // Reset newComment to default values
      },
      (error) => {
        console.error('CommentComponent.addComment: error', error);
      }
    );
  }

  setEditComment(comment: Comment) {
    this.editComment = { ...comment }; // Clone the selected comment
  }

  updateComment(boardId: number) {
    if (this.editComment) {
      this.commentService.update(this.editComment).subscribe(
        () => {
          // this.loadComments(boardId); // Pass the board ID here
          this.editComment = null; // Reset editComment
        },
        (error) => {
          console.error('CommentComponent.updateComment: error', error);
        }
      );
    }
  }

  deleteComment(id: number, boardId: number) {
    this.commentService.destroy(id).subscribe(
      () => {
        // this.loadComments(boardId); // Pass the board ID here
      },
      (error) => {
        console.error('CommentComponent.deleteComment: error', error);
      }
    );
  }

  getDefaultComment(): Comment {
    const defaultComment: Comment = {
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      comment: '',
      enabled: false,
      board: {
        id: 0,
      },
      user: {
        id: 0,
      },
      inReplyTo: undefined,
      text: undefined
    };

    return defaultComment;
  }

}
