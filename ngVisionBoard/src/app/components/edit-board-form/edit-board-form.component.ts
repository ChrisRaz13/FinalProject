import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Board } from "../../models/board";
import { BoardService } from "../../services/board.service";


@Component({
  selector: 'app-edit-board-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-board-form.component.html',
  styleUrl: './edit-board-form.component.css'
})
export class EditBoardFormComponent implements OnInit {
  board: Board = new Board();

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const boardId = +this.route.snapshot.params['boardId'];
    this.boardService.getBoardById(boardId).subscribe({
      next: (board) => this.board = board,
      error: (err) => console.error('Failed to load board', err)
    });
  }

  updateBoard(): void {
    this.boardService.update(this.board).subscribe({
      next: () => {
        alert('Board updated successfully!');
        this.router.navigate(['/visionboard']);
      },
      error: (err) => {
        console.error('Error updating board:', err);
        alert('Failed to update board. Please try again.');
      }
    });
  }

}
