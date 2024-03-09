// board.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Board } from '../models/board';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private url = environment.baseUrl + 'api/boards';
  baseUrl: any;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getBoardById(boardId: number): Observable<Board> {
    const url = `${this.url}/${boardId}`;

    return this.http.get<Board>(this.url, this.getHttpOptions());
  }

  getBoardsByUserId(userId: number): Observable<Board[]> {
    let userSearchUrl = `${this.url}/search/${userId}`;
    return this.http.get<Board[]>(userSearchUrl , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BoardService.getBoardsByUserId(): error retrieving boards: ' + err)
        );
      })
    );
  }

  getBoardsLikedByUserId(userId: number): Observable<Board[]> {
    let userSearchUrl = `${this.url}/search/likedbyuser/${userId}`;
    return this.http.get<Board[]>(userSearchUrl , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BoardService.getBoardsLikedByUserId(): error retrieving boards: ' + err)
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
  index(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(new Error('BoardService.index(): error retrieving boards: ' + err));
      })
    );
  }

  create(board: Board): Observable<Board> {
    return this.http.post<Board>(this.url, board).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'BoardService.create(): error creating board: ' + err )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'BoardService.destroy(): error deleting board: ' + error )
        );
      })
    );
  }

  update(board: Board): Observable<Board> {
    const updateUrl = `${this.url}/${board.id}`;
    return this.http.put<Board>(updateUrl, board).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'BoardService.update(): error updating board: ' + error )
        );
      })
    );
  }

  show(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'BoardService.show(): error showing board: ' + err )
        );
      })
    );
  }
}

