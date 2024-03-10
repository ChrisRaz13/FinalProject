import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { VisionboardComponent } from '../visionboard/visionboard.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { AccountPageComponent } from '../account-page/account-page.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { CommentComponent } from '../comment/comment.component';
import { DragToResizeDirective } from '../dragtoresize/drag-to-resize.directive';
import { DragtoresizeComponent } from '../dragtoresize/dragtoresize.component';
import { FlipComponent } from '../flip/flip.component';
import { UnsplashComponent } from '../unsplash/unsplash.component';
import { Board } from '../../models/board';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, RouterLink, RouterLinkActive, FlipComponent, VisionboardComponent, CommentComponent, AccountPageComponent, DragtoresizeComponent, DragToResizeDirective, HomeComponent, AdminDashboardComponent]
  })
export class HomeComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private boardService: BoardService, private authService: AuthService, private commentService: CommentService ) {}
  route: any;

  boards: Board[] = [];
  editBoard: Board | null = null;
  newBoard: Board = new Board();
  title: string = 'Board Tracker';
  selected: Board | null = null;

  items = ['Item 1', 'Item 2', 'Item 3'];

  userId: number| undefined;


  ngOnInit(): void {
    this.loadBoards();

  }

loadBoards() {
  if(this.authService.checkLogin()) {
    this.boardService.index().subscribe( {
      next: (boardList) => {
        this.boards = boardList; // Update variable name
        console.log(this.boards); // Update variable name
      },
      error: (err: any) => {
        console.error('VisionBoardComponent.loadVisionBoards: error', err); // Update method name
      }
    });
  }
}

}
