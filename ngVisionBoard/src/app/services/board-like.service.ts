import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BoardLike } from '../models/board-like';

@Injectable({
  providedIn: 'root'
})
export class BoardLikeService {
  private url = environment.baseUrl + 'api/boardLikes';

  constructor(private http: HttpClient, private auth: AuthService) { }


  getBoardLikesByUserId(userId: number): Observable<BoardLike[]> {
    let userSearchUrl = `${this.url}/search/user/${userId}`;
    return this.http.get<BoardLike[]>(userSearchUrl , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BoardLikeService.getBoardLikesByUserId(): error retrieving board likes: ' + err)
        );
      })
    );
  }
    //TODO to fix authorization
    getHttpOptions() {
      let options = {
        headers: {
          Authorization: 'Basic ' + btoa(`test:test`),
          'X-Requested-With': 'XMLHttpRequest',
        },
      };
      return options;
    }
}
