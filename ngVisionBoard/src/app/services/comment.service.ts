import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from '../models/comment'; // Import the Comment model
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.baseUrl + 'api/comments'; // Adjust the URL for comments

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    return {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      }
    };
  }

  index(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('CommentService.index(): error retrieving comments: ' + err)
        );
      })
    );
  }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('CommentService.create(): error creating comment', err);
        return throwError(
          () => new Error('Error creating comment: ' + err.message)
        );
      })
    );
  }

  update(comment: Comment): Observable<Comment> {
    const updateUrl = `${this.url}/${comment.id}`;
    return this.http.put<Comment>(updateUrl, comment, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('CommentService.update(): error updating comment', err);
        return throwError(
          () => new Error('Error updating comment: ' + err.message)
        );
      })
    );
  }

  destroy(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('CommentService.destroy(): error deleting comment', err);
        return throwError(
          () => new Error('Error deleting comment: ' + err.message)
        );
      })
    );
  }

  // You can add more methods here as needed, such as getting comments by board ID, etc.
}
