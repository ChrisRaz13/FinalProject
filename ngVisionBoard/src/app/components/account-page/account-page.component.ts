import { BoardService } from './../../services/board.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { Board } from '../../models/board';
import { BoardLikeService } from '../../services/board-like.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  // user: User = new User();
  boardCount: number = 0;
  likedBoardCount: number = 0;
  likeCount: number = 0;
  userLikedBoards: Board[] = [];
  userCreatedBoards: Board[] = [];
  user: User = new User(
    1,
    'username',
    'password',
    'John',
    'Doe',
    'john@example.com',
    true,
    'user',
    null,
    'About me...'
);


  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private boardLikeService: BoardLikeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let userId = params['userId'];
      this.load(userId);
      //TODO fix hardcoded value
      this.loadUserCreatedBoards(1);
      this.loadUserLikedBoards(1);

    });
  }

  load(userId : number): void {
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

  generateInitials(firstName : string, lastName : string): string {
    let fi = firstName.charAt(0).toUpperCase();
    let li = lastName.charAt(0).toUpperCase();
    return fi+li;
  }

  loadUserCreatedBoards(userId: number) {
    this.boardService.getBoardsByUserId(userId).subscribe({
      next: (boards) => {
        this.userCreatedBoards = boards
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
        this.userLikedBoards = boards
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
