import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.baseUrl + 'api/comments'; // Assuming the endpoint is 'api/comments'
  baseUrl: any;

  constructor(private http: HttpClient) { }

  index(boardId: number): Observable<Comment[]> {
    if (!this.url) {
      console.error('Base URL is not defined.');
      return throwError(new Error('Base URL is not defined.'));
    }

    if (!boardId) {
      console.error('Board ID is not provided.');
      return throwError(new Error('Board ID is not provided.'));
    }

    const url = `${this.url}/boards/${boardId}`;
    return this.http.get<Comment[]>(url).pipe(
      tap((comments: any) => {
        console.log(comments);
      }),
      catchError((err: any) => {
        console.error(err);
        return throwError(new Error('CommentService.index(): error retrieving comments: ' + err));
      })
    );
  }



  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('CommentService.create(): error creating comment: ' + err));
      })
    );
  }

  destroy(id: number): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => new Error('CommentService.destroy(): error deleting comment: ' + error));
      })
    );
  }

  update(comment: Comment): Observable<Comment> {
    const updateUrl = `${this.url}/${comment.id}`;
    return this.http.put<Comment>(updateUrl, comment).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => new Error('CommentService.update(): error updating comment: ' + error));
      })
    );
  }

  show(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('CommentService.show(): error showing comment: ' + err));
      })
    );
  }
}
