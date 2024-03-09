import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { BoardLikeService } from '../../services/board-like.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../../models/board';
import { HomeComponent } from "../home/home.component";

@Component({
    selector: 'app-account',
    standalone: true,
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.css',
    imports: [FormsModule, CommonModule, HomeComponent]
})
export class AccountPageComponent implements OnInit {
  user: User | any;
  Users: User[] = [];
  editUser: any;
  isAdmin: boolean = false;
  errorMessage: string | undefined;
  editAddress: any;
  allUsers: any;

  boardCount: number = 0;
  likedBoardCount: number = 0;
  likeCount: number = 0;
  userLikedBoards: Board[] = [];
  userCreatedBoards: Board[] = [];

  // constructor(private userService: UserService, private auth: AuthService) {}
  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private authService: AuthService,
    private boardLikeService: BoardLikeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private snackBar: MatSnackBar


  ) {}
  ngOnInit(): void {
    this.fetchAuthenticatedUserDetails();
  }

  fetchAuthenticatedUserDetails(): void {
    if (this.authService.checkLogin()) {
      this.authService.getLoggedInUser().subscribe({
        next: (user) => {
          this.user = user;
          this.isAdmin = user.role === 'admin';

          this.editUser = Object.assign({}, this.user);

          if (this.user.address) {
            this.editAddress = Object.assign({}, this.user.address);
          } else {
            this.editAddress = {};
          }

          if (this.isAdmin) {
            this.fetchAllUsers();
          }
        },
        error: (err) => {
          console.error('Error fetching authenticated user details:', err);
          this.errorMessage = 'Error fetching user details';
        },
      });
    } else {
      this.errorMessage = 'User not logged in';
    }
  }

  fetchAllUsers(): void {
    this.userService.index().subscribe({
      next: (users) => {
        this.allUsers = users;
        console.log("All Users:", this.allUsers);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching all users';
        console.error(err);
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

  activateUser(userId: number): void {
    this.userService.activateUser(userId).subscribe({
      next: () => {
        alert('Account enabled successfully.');
        this.fetchAllUsers();
      },
      error: (err) => {
        this.errorMessage = 'Error enabling account';
        console.error(err);
      },
    });
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe({
      next: () => {
        alert('Account disabled successfully.');
        this.fetchAllUsers();
      },
      error: (err) => {
        this.errorMessage = 'Error disabling account';
        console.error(err);
      },
    });
  }

    loadUserLikedBoards(userId: number) {
    this.boardService.getBoardsByUserId(userId).subscribe({
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

}
