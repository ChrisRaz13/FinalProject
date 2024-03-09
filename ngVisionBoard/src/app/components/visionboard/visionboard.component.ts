import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Board } from '../../models/board';
import { HttpClient } from '@angular/common/http';
import { Mock } from '../../models/mock';
import { BoardService } from '../../services/board.service';


@Component({
  selector: 'app-visionboard',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './visionboard.component.html',
  styleUrl: './visionboard.component.css'
})
export class VisionboardComponent implements OnInit{
  boards: Board[] = [];
  editBoard: Board | null = null;
  newBoard: Board = new Board();
  title: string = 'Board Tracker';
  selected: Board | null = null;
  updateSuccess: boolean = false;
  showEditFormFlag: boolean = false;
  displayEditForm: boolean = false;
  items = ['Item 1', 'Item 2', 'Item 3'];

  board: Board | undefined;
  userId: number = 1; // Assuming there's a logged-in user

  constructor(private http: HttpClient, private boardService: BoardService ) {
    this.displayEditForm = false;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // in testing phase of the methods below
  toggleEditForm() {
    throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    const boardId = 1;
    this.loadBoardInfo(boardId);
    this.loadBoards();
    // throw new Error('Method not implemented.');
  }

  loadBoardInfo(boardId: any) {
    this.board = Mock;

  }
  loadBoards() {
    this.boardService.index().subscribe(
      (boardList: Board[]) => {
        this.boards = boardList;
        console.log(this.boards);
      },
      (err) => {
        console.error('HomeComponent.loadBoards: error', err);
      }
    );
  }
  getBoardCount(): number {
    return this.boards.length;
  }

  displayBoard(board: Board): void {
    this.selected = board;
  }

  displayTable(): void {
    this.selected = null;
  }

  addBoard(board: Board) {
    this.boardService.create(board).subscribe(
      () => {
        this.loadBoards(); // Reload boards after adding
        this.newBoard = new Board(); // Reset newBoard
      },
      (error) => {
        console.error('HomeComponent.addBoard: error', error);
      }
    );
  }

  setEditBoard() {
    this.editBoard = Object.assign({}, this.selected);
  }

  updateBoard(editBoard: Board) {
    this.boardService.update(editBoard).subscribe(
      () => {
        this.loadBoards(); // Reload boards after updating
        this.editBoard = null; // Reset editBoard
      },
      (error) => {
        console.error('HomeComponent.updateBoard: error', error);
      }
    );
  }

  deleteBoard(id: number) {
    this.boardService.destroy(id).subscribe(
      () => {
        this.loadBoards(); // Reload boards after deleting
      },
      (error) => {
        console.error('HomeComponent.deleteBoard: error', error);
      }
    );
  }
}

