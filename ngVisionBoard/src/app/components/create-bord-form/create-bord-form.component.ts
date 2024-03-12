import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-bord-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-bord-form.component.html',
  styleUrl: './create-bord-form.component.css'
})
export class CreateBordFormComponent implements OnInit {
  board: Board = new Board();
  user: User = new User();
  @Output() boardCreated: EventEmitter<Board> = new EventEmitter();


  constructor(private boardService: BoardService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router) {}


ngOnInit(): void {
  }

  createBoard(addBoard: Board): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.user = user;
        addBoard.user = this.user;
        this.boardService.create(addBoard).subscribe({
          next: (addedBoard) => {
            this.boardCreated.emit(addedBoard);
            alert('Board created successfully!');
            this.router.navigate(['/visionboard']);
          },
          error: (error) => {
            console.error('Error creating board:', error);
            alert('Failed to create board. Please try again.');
          },
        });
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        alert('Failed to create board. Please log in.');
      },
    });
  }
}


