import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private baseUrl: string = 'https://api.unsplash.com';
  private accessKey: string = 'g2TUe8r-1sUbtn1lIxX_C2AwstnMEcGCKfXh6LVV3A4'; // Replace with your Unsplash Access Key

  constructor(private http: HttpClient) { }

  getRandomPhoto(query?: string, count: number = 1): Observable<any> {
    const url = `${this.baseUrl}/photos/random`;
    let params = new HttpParams().set('client_id', this.accessKey).set('count', count.toString());

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get(url, { params });
  }

  }


