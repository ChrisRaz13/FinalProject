import { AuthService } from './../../services/auth.service';
import { BoardService } from './../../services/board.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { Board } from '../../models/board';
import { BoardLikeService } from '../../services/board-like.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {
  user: User = new User();
  boardCount: number = 0;
  likedBoardCount: number = 0;
  likeCount: number = 0;
  userLikedBoards: Board[] = [];
  userCreatedBoards: Board[] = [];
  //   user: User = new User(
  //     1,
  //     'username',
  //     'password',
  //     'John',
  //     'Doe',
  //     'john@example.com',
  //     true,
  //     'user',
  //     null,
  //     'About me...'
  // );

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private authService: AuthService,
    private boardLikeService: BoardLikeService,
    private activatedRoute: ActivatedRoute
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

  load(userId: number): void {
    this.userService.show(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (problem) => {
        console.error('UserHttpComponent.reload(): error loading user:');
        console.error(problem);
      },
    });
  }

  generateInitials(firstName: string, lastName: string): string {
    let fi = firstName.charAt(0).toUpperCase();
    let li = lastName.charAt(0).toUpperCase();
    return fi + li;
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

  loadUserLikedBoards(userId: number) {
    this.boardService.getBoardsByUserId(userId).subscribe({
      next: (boards) => {
        this.userLikedBoards = boards;
        console.log(this.userLikedBoards);
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
}
