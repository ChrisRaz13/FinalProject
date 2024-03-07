import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-visionboard',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './visionboard.component.html',
  styleUrl: './visionboard.component.css'
})
export class VisionboardComponent {

  items = ['Item 1', 'Item 2', 'Item 3'];

drop(event: CdkDragDrop<string[]>): void {
  moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}

}
