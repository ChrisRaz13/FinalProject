import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Board } from '../models/board';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private url = environment.baseUrl + 'api/boards';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    return {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      }
    };
  }

  index(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BoardService.index(): error retrieving boards: ' + err)
        );
      })
    );
  }

  create(board: Board): Observable<Board> {
    return this.http.post<Board>(this.url, board, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('BoardService.create(): error creating board', err);
        return throwError(
          () => new Error('Error creating board: ' + err.message)
        );
      })
    );
  }

  update(board: Board): Observable<Board> {
    const updateUrl = `${this.url}/${board.id}`;
    return this.http.put<Board>(updateUrl, board, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('BoardService.update(): error updating board', err);
        return throwError(
          () => new Error('Error updating board: ' + err.message)
        );
      })
    );
  }

  destroy(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('BoardService.destroy(): error deleting board', err);
        return throwError(
          () => new Error('Error deleting board: ' + err.message)
        );
      })
    );
  }

  getBoardById(boardId: number): Observable<Board> {
    const url = `${this.url}/${boardId}`;
    return this.http.get<Board>(this.url, this.getHttpOptions());
  }

  getBoardsByUserId(userId: number): Observable<Board[]> {
    const userSearchUrl = `${this.url}/search/${userId}`;
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
    const userSearchUrl = `${this.url}/search/likedbyuser/${userId}`;
    return this.http.get<Board[]>(userSearchUrl , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BoardService.getBoardsLikedByUserId(): error retrieving boards: ' + err)
        );
      })
    );
  }

  savePhotoUrls(photoUrls: string[]): Observable<any> {
    // Replace 'your-api-endpoint' with the actual endpoint to save data in your backend
    return this.http.post<any>('your-api-endpoint', { photoUrls });
  }

  getDraggedPhotos(boardId: number): Observable<any[]> {
    const endpoint = `${this.url}/posts/search/board${boardId}`;
    return this.http.get<any[]>(endpoint).pipe(
      catchError((error: any) => {
        console.error('Error fetching dragged photos:', error);
        return throwError('Failed to fetch dragged photos. Please try again later.');
      })
    );
  }

}
