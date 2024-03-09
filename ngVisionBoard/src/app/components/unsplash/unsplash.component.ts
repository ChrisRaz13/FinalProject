import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragtoresizeComponent } from '../dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from '../dragtoresize/drag-to-resize.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs/internal/Observable';
import { VisionboardComponent } from '../visionboard/visionboard.component';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DragDropModule, DragtoresizeComponent, DragToResizeDirective, ScrollingModule, VisionboardComponent],
})
export class UnsplashComponent implements OnInit {



drop(event: CdkDragDrop<any[]>) {

  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
  images$!: Observable<any[]>;
  collections: any[] = [];
  searchQuery: string = '';

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.searchCollections();
    this.search();
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
