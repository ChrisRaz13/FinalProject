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
  collections: any[] = [];
  searchQuery: string = '';

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.searchCollections();
  }

  search(){

    this.searchCollections();
  }

  searchCollections() {
    this.unsplashService.searchCollections(this.searchQuery).subscribe((response: any) => {
      this.collections = response.results;
    });
  }
}
