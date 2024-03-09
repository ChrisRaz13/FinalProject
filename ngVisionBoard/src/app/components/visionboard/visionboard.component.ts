import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Board } from '../../models/board';
import { HttpClient } from '@angular/common/http';
import { Mock } from '../../models/mock';


@Component({
  selector: 'app-visionboard',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './visionboard.component.html',
  styleUrl: './visionboard.component.css'
})
export class VisionboardComponent implements OnInit{
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    const boardId = 1;
    this.loadBoardInfo(boardId);
  }

  items = ['Item 1', 'Item 2', 'Item 3'];

  board: Board | undefined;
  userId: number = 1; // Assuming there's a logged-in user

  constructor(private http: HttpClient) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // testing

  loadBoardInfo(boardId: any) {
    // Assign the mockBoard object to the board property
    this.board = Mock;
  }

  // fetchBoardData() {
  //   this.http.get<Board>('/get-board/' + this.userId).subscribe(response => {
  //     this.board = response;
  //   });
  // }

  // onFileDrop(event: any) {
  //   // Handle file drop here
  // }

  // saveBoard() {
  //   this.http.post('/save-board', { userId: this.userId, boardData: this.board }).subscribe(response => {
  //     console.log('Board saved successfully');
  //   });
  // }
}
