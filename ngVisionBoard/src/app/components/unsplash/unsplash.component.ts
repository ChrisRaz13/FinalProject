import { UnsplashService } from './../../services/unsplash.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragtoresizeComponent } from '../dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from '../dragtoresize/drag-to-resize.directive';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DragDropModule, DragtoresizeComponent, DragToResizeDirective, CdkDropList],
})
export class UnsplashComponent implements OnInit {
  draggedPhotoIds: string[] = [];
  collections: any[] = [];
  searchQuery: string = '';
  dropAreaImages: any[] = [];
  dropList: any;
  searchResults: any[] = []; // Initialize searchResults as an array

  // New array to store the IDs of images in the drop area to track their order
  dropAreaImageIds: string[] = [];
  @ViewChild('dropList') dropListElement: ElementRef | undefined;
  errorMessage: string | undefined;
  boardId: number = 1;
  constructor(private unsplashService: UnsplashService, private boardService: BoardService, private authService: AuthService) {}

  ngOnInit() {
    console.log('Initializing Unsplash component...');
    this.loadDraggedPhotos(this.boardId);
    this.searchCollections();
  }

  ngAfterViewInit() {
    // Check if dropListElement is defined before accessing its properties
    if (this.dropListElement) {
      this.dropListElement.nativeElement.disabled = true;
    } else {
      console.error('Drop list element is undefined.');
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    console.log('Dropping photo...');
    // Update the order of images in the drop area
    this.updateDropAreaImageOrder();

    // Save the dragged photo IDs after the drop operation
    // this.saveDraggedPhotosLocally();
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

  loadDraggedPhotos(boardId: number): void {
    if(this.authService.checkLogin()) {
    this.boardService.getDraggedPhotos(boardId).subscribe(
      (photos: any[]) => {
        if (photos.length > 0) {
          this.dropAreaImages = photos;
        } else {
          this.errorMessage = 'No saved dragged photos found.';
        }
      },
      (error: any) => {
        console.error('Error loading dragged photos:', error);
        this.errorMessage = 'Error loading dragged photos. Please try again later.';
      }
    );
  }

  // saveDraggedPhotosLocally() {
  //   localStorage.setItem('draggedPhotos', JSON.stringify(this.draggedPhotoIds));
  // }
}


todo = ['Complete a 5k run', 'Attend yoga class', 'Lift weights at the gym', 'Try a new workout routine'];
travel_goals = ['Plan a trip to a new country', 'Visit historical landmarks', 'Explore a national park', 'Go on a road trip'];
education_goals = ['Enroll in an online course', 'Read a book on a new subject', 'Attend a workshop or seminar', 'Learn a new language'];
other_goals = ['Start a personal project', 'Volunteer for a cause', 'Meditate for 10 minutes daily', 'Cook a new recipe each week'];

done = ['Ran 5k in under 30 minutes', 'Completed a week of consistent yoga practice', 'Achieved personal best in weightlifting', 'Explored different workout routines'];
completed_travel = ['Visited Paris and saw the Eiffel Tower', 'Explored Machu Picchu', 'Hiked the Grand Canyon', 'Completed a cross-country road trip'];
completed_education = ['Completed an online course on coding', 'Read "Sapiens" by Yuval Noah Harari', 'Attended a workshop on public speaking', 'Reached conversational fluency in Spanish'];
completed_other = ['Launched a blog about personal development', 'Volunteered at a local shelter every weekend for a month', 'Meditated daily for 30 days', 'Cooked a new recipe every day for a week'];


dropGoals(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}

