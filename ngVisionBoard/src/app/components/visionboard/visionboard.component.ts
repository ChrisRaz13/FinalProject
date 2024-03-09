import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Comment } from '../../models/comment'; // Import Comment model
import { HttpClient } from '@angular/common/http';
import { CommentService } from '../../services/comment.service'; // Import CommentService
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-visionboard',
  standalone: true,
  templateUrl: './visionboard.component.html',
  styleUrls: ['./visionboard.component.css']
})
export class VisionboardComponent implements OnInit {
  comments: Comment[] = [];
  editComment: Comment | null = null;
  newComment: Comment = new Comment();
  title: string = 'Board Tracker';
  selected: Comment | null = null;
  updateSuccess: boolean = false;
  showEditFormFlag: boolean = false;
  displayEditForm: boolean = false;
  items = ['Item 1', 'Item 2', 'Item 3'];

  userId: number | undefined;

  constructor(private http: HttpClient, private commentService: CommentService, private authService: AuthService) {
    this.displayEditForm = false;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    if (this.authService.checkLogin()) {
      this.commentService.index().subscribe({
        next: (commentList) => {
          this.comments = commentList;
          console.log(this.comments);
        },
        error: (err: any) => {
          console.error('VisionBoardComponent.loadComments: error', err);
        }
      });
    }
  }

  addComment(comment: Comment) {
    if (this.authService.checkLogin()) {
      this.commentService.create(comment).subscribe(
        () => {
          this.loadComments(); // Reload comments after adding
          this.newComment = new Comment(); // Reset newComment
        },
        (error) => {
          console.error('VisionBoardComponent.addComment: error', error);
        }
      );
    }
  }

  setEditComment() {
    this.editComment = Object.assign({}, this.selected);
  }

  updateComment(editComment: Comment) {
    if (this.authService.checkLogin()) {
      this.commentService.update(editComment).subscribe(
        () => {
          this.loadComments(); // Reload comments after updating
          this.editComment = null; // Reset editComment
        },
        (error) => {
          console.error('VisionBoardComponent.updateComment: error', error);
        }
      );
    }
  }

  deleteComment(id: number) {
    if (this.authService.checkLogin()) {
      this.commentService.destroy(id).subscribe(
        () => {
          this.comments = this.comments.filter((comment) => comment.id !== id);
          console.log('Delete of comment id: ' + id + ' successful');
        },
        (error) => {
          console.error('VisionBoardComponent.deleteComment: error', error);
        }
      );
    }
  }
}
