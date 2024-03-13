import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = `${environment.baseUrl}api/posts`;


  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    return {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
  }

  getPostsByBoardId(boardId: number): Observable<Post[]> {
    let userSearchUrl = `${this.url}/search/board/${boardId}`;
    return this.http.get<Post[]>(userSearchUrl , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PostService.getPostsByBoardId(): error retrieving posts: ' + err)
        );
      })
    );
  }

  update(post: Post): Observable<Post> {
    const updateUrl = `${this.url}/${post.id}`;
    return this.http.put<Post>(updateUrl, post, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('PostService.update(): error updating post', err);
        return throwError(() => new Error('Error updating post: ' + err));
      })
    );
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('PostService.create(): error creating post', err);
        return throwError(
          () => new Error('Error creating post: ' + err.message)
        );
      })
    );
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('PostService.getPosts(): error retrieving posts', err);
        return throwError(
          () => new Error('Error retrieving posts: ' + err.message)
        );
      })
    );
    }
    deletePost(postId: number): Observable<any> {
      return this.http.delete(`${this.url}/${postId}`, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error('PostService.deletePost(): error deleting post', err);
          return throwError(() => new Error('Error deleting post: ' + err.message));
        })
      );
    }

    }
