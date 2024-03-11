import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private baseUrl: string = 'https://api.unsplash.com';
  private accessKey: string = 'g2TUe8r-1sUbtn1lIxX_C2AwstnMEcGCKfXh6LVV3A4';

  constructor(private http: HttpClient) { }

  searchCollections(query: string, page: number = 1, perPage: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('client_id', this.accessKey);

    return this.http.get(`${this.baseUrl}/search/collections`, { params });



  }


  searchImages(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/photos`;
    const params = {
      query: query,
      client_id: this.accessKey
    };
    return this.http.get(url, { params: params });
  }

}


