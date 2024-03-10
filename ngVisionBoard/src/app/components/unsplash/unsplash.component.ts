import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragtoresizeComponent } from '../dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from '../dragtoresize/drag-to-resize.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DragDropModule, DragtoresizeComponent, DragToResizeDirective],
})
export class UnsplashComponent implements OnInit {
  collections: any[] = [];
  searchQuery: string = '';
  dropAreaImages: any[] = [];
  dropList: any;
  searchResults: any[] = []; // Initialize searchResults as an array

  // New array to store the IDs of images in the drop area to track their order
  dropAreaImageIds: string[] = [];

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.searchCollections();
  }

  ngAfterViewInit() {
    // Disable the drop list to prevent items from being dragged into it
    this.dropList.disabled = true;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    // Update the order of images in the drop area
    this.updateDropAreaImageOrder();
  }

  search() {
    this.searchCollections();
  }

  searchCollections() {
    this.unsplashService.searchCollections(this.searchQuery).subscribe((response: any) => {
      // Clear collections array
      this.collections = [];

      // Add search results to collections
      this.searchResults = response.results;

      // Concatenate search results and dropped images
      this.updateCollections();
    });
  }

  // Function to handle adding images to the drop area
  addImageToDropArea(image: any) {
    // Check if the image is not already in the drop area
    if (!this.dropAreaImages.includes(image)) {
      this.dropAreaImages.push(image);

      // Add the ID of the added image to the order array
      this.dropAreaImageIds.push(image.id);
    }
  }

  // Function to update the order of images in the drop area
  updateDropAreaImageOrder() {
    // Clear the order array and update it with the new order of IDs
    this.dropAreaImageIds = this.dropAreaImages.map(image => image.id);
  }

  // Function to update collections array
  updateCollections() {
    // Clear collections array
    this.collections = [];

    // Add images from drop area based on the saved order
    this.dropAreaImageIds.forEach(id => {
      const image = this.dropAreaImages.find(img => img.id === id);
      if (image) {
        this.collections.push(image);
      }
    });

    // Add remaining search results
    this.searchResults.forEach(result => {
      if (!this.dropAreaImages.find(image => image.id === result.id)) {
        this.collections.push(result);
      }
    });
  }
}
