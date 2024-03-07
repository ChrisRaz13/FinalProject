import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class UnsplashComponent implements OnInit {
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


