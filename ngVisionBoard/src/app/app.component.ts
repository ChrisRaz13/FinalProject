import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsplashService } from './unsplash.service'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  photos: any[] = []; // Adjusted to hold any type of data

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.unsplashService.getPhotos().subscribe((data: any) => {
      this.photos = data; // Assuming the API returns an array directly; adjust based on the actual API response structure
    });
  }
}
