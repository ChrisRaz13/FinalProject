import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsplashService } from './unsplash.service'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  randomPhotos: any[] = [];

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.getRandomPhotos();
  }

  getRandomPhotos() {
    this.unsplashService.getRandomPhoto('nature', 5).subscribe(
      (photos: any[]) => {
        this.randomPhotos = photos;
      },
      (error) => {
        console.error('Error fetching random photos:', error);
      }
    );
  }
}


