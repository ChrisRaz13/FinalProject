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
  private url = environment.baseUrl + 'api/posts';

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

}
