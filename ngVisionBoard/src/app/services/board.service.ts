// board.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private url = environment.baseUrl + 'api/boards';
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getBoardById(boardId: number): Observable<Board> {
    const url = `${this.url}/${boardId}`;

    return this.http.get<Board>(this.url);
  }
}
