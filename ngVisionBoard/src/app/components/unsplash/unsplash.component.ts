import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DragDropModule],
})
export class UnsplashComponent implements OnInit {



drop(event: CdkDragDrop<any[]>) {
  // Implement your drop logic here
  // For example, moving an item to a new array representing items in the drop zone
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

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
