import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service'; // Import CommentService
import { Comment } from '../models/comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
submitComment() {
throw new Error('Method not implemented.');
}
  comments: Comment[] = [];
  editComment: Comment | null = null;
  newComment: Comment = { id: 0, createdAt: new Date(), updatedAt: new Date(), comment: '', enabled: false, board: null, user: null, inReplyTo: null };
  title: string = 'Comment Tracker';
  selected: Comment | null = null;
  updateSuccess: boolean = false;
  showEditFormFlag: boolean = false;
  displayEditForm: boolean;

  constructor(private commentService: CommentService) {
    this.displayEditForm = false;
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.index().subscribe(
      (commentList) => {
        this.comments = commentList;
        console.log(this.comments);
      },
      (err) => {
        console.error('CommentComponent.loadComments: error', err);
      }
    );
  }

  getCommentCount(): number {
    return this.comments.length;
  }

  displayComment(comment: Comment): void {
    this.selected = comment;
  }

  displayTable(): void {
    this.selected = null;
  }

  addComment() {
    this.commentService.create(this.newComment).subscribe(
      () => {
        this.loadComments();
        this.newComment = { id: 0, createdAt: new Date(), updatedAt: new Date(), comment: '', enabled: false, board: null, user: null, inReplyTo: null }; // Reset newComment
      },
      (error) => {
        console.error('CommentComponent.addComment: error', error);
      }
    );
  }

  setEditComment(comment: Comment) {
    this.editComment = { ...comment }; // Clone the selected comment
  }

  updateComment() {
    if (this.editComment) {
      this.commentService.update(this.editComment).subscribe(
        () => {
          this.loadComments();
          this.editComment = null; // Reset editComment
        },
        (error) => {
          console.error('CommentComponent.updateComment: error', error);
        }
      );
    }
  }

  deleteComment(id: number) {
    this.commentService.destroy(id).subscribe(
      () => {
        this.loadComments();
      },
      (error) => {
        console.error('CommentComponent.deleteComment: error', error);
      }
    );
  }
}
