import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Board } from '../../models/board';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.css'
})
export class BoardListComponent {
  @Input() boards: Board[] = [];

  constructor(private router: Router) {}

  goToBoard(boardId: number) {
    this.router.navigate([`/display-board/${boardId}`]);//needs fixed to app route
  }

  editBoard(boardId: number): void {
    this.router.navigate([`/edit-board/${boardId}`]);
  }
}
