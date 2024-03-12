import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BoardService } from '../../services/board.service';
import { User } from '../../models/user';
import { Board } from '../../models/board';

@Component({
  selector: 'app-user-boards',
  templateUrl: './user-boards.component.html',
  styleUrls: ['./user-boards.component.css']
})
export class UserBoardsComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null;
  userBoards: Board[] = [];

  constructor(
    private userService: UserService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onUserChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const userId = Number(selectElement.value);
    this.selectedUserId = userId;
    this.loadUserBoards(userId);
  }


  loadUserBoards(userId: number): void {
    this.boardService.getBoardsByUserId(userId).subscribe({
      next: (boards) => {
        this.userBoards = boards;
      },
      error: (error) => {
        console.error('Error fetching user boards:', error);
      }
    });
  }
}
