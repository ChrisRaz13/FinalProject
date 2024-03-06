import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private baseUrl: string = 'https://api.unsplash.com/photos';
  private accessKey: string = 'g2TUe8r-1sUbtn1lIxX_C2AwstnMEcGCKfXh6LVV3A4'; // Replace with your Unsplash Access Key

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/photos?client_id=${this.accessKey}`);
  }
}
