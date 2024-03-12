import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { BoardLikeService } from '../../services/board-like.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Board } from '../../models/board';
import { HomeComponent } from "../home/home.component";
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorService } from '../../services/color.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UnsplashComponent } from '../unsplash/unsplash.component';


@Component({
    selector: 'app-account',
    standalone: true,
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.css',
    imports: [FormsModule, CommonModule, HomeComponent, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, ColorPickerModule, UnsplashComponent, RouterModule ]
})
export class AccountPageComponent implements OnInit {

  user: User | any;
  Users: User[] = [];
  editUser: any;
  isAdmin: boolean = false;
  errorMessage: string | undefined;
  editAddress: any;
  allUsers: any;
  newBoard: Board = new Board();
  boardCount: number = 0;
  likedBoardCount: number = 0;
  likeCount: number = 0;
  userLikedBoards: Board[] = [];
  userCreatedBoards: Board[] = [];
  selectedColor: any;
  colors: any;
  showModal: boolean = false;
  defaultColor: string = '#CCCCCC';

  // constructor(private userService: UserService, private auth: AuthService) {}
  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private authService: AuthService,
    private boardLikeService: BoardLikeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private colorService: ColorService,
    // private snackBar: MatSnackBar


  ) {}
  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loadUserLikedBoards(user.id);
        this.loadUserCreatedBoards(user.id);
      },
      error: (problem) => {
        console.error('UserHttpComponent.reload(): error loading user:');
        console.error(problem);
      },
    });
  }


  updateUser(userToUpdate: User): void {
    if (this.user) {
      // userToUpdate.address = this.editAddress
      this.userService.update(this.user.id, userToUpdate).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          alert('User updated successfully');
        },
        error: (err) => {
          this.errorMessage = 'Error updating user';
          console.error(err);
        },
      });
    }
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe({
      next: () => {
        alert('Account disabled successfully.');
      },
      error: (err) => {
        this.errorMessage = 'Error disabling account';
        console.error(err);
      },
    });
  }

  loadUserLikedBoards(userId: number) {
    this.boardService.getBoardsLikedByUserId(userId).subscribe({
      next: (boards) => {
        this.userLikedBoards = boards;
        this.likedBoardCount = this.userLikedBoards.length;
      },
      error: (problem) => {
        console.error(
          'UserBoardLikeHttpComponent.loadBook(): error loading user likedboards:'
        );
        console.error(problem);
      },
    });
  }

    loadUserCreatedBoards(userId: number) {
    this.boardService.getBoardsByUserId(userId).subscribe({
      next: (boards) => {
        this.userCreatedBoards = boards;
        this.boardCount = this.userCreatedBoards.length;
      },
      error: (problem) => {
        console.error(
          'UserBoardHttpComponent.loadBook(): error loading user created boards:'
        );
        console.error(problem);
      },
    });
  }

  generateInitials(firstName: string, lastName: string): string {
    let fi = firstName.charAt(0).toUpperCase();
    let li = lastName.charAt(0).toUpperCase();
    return fi + li;
  }
  deleteBoard(boardId: number): void {
    if (confirm('Are you sure you want to delete this board?')) {
      this.boardService.deleteBoard(boardId).subscribe({
        next: () => {
          // Remove the deleted board from the list
          this.userCreatedBoards = this.userCreatedBoards.filter(board => board.id !== boardId);
          // If you also want to update the liked boards list
          this.userLikedBoards = this.userLikedBoards.filter(board => board.id !== boardId);
          alert('Board deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting board:', err);
          alert('Failed to delete board. Please try again.');
        }
      });
    }
  }
}
