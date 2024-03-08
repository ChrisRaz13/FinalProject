import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/users'

  constructor(private http: HttpClient, private auth: AuthService) { }


  index(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('USerService.index(): error retrieving user: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'UserService.show(): error showing Todo: ' + err )
        );
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'UserService.create(): error creating User: ' + err )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl, this.getHttpOptions()).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'UserService.destroy(): error deleting User: ' + error )
        );
      })
    );
  }

  update(user: User): Observable<User> {
    const updateUrl = `${this.url}/${user.id}`;
    return this.http.put<User>(updateUrl, user, this.getHttpOptions()).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'UserService.update(): error updating User: ' + error )
        );
      })
    );
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
}
