import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  // user: User = new User();
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let userId = params['userId'];
      this.load(userId);
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
    console.log(fi + li);
    return fi+li;
  }

  getBoardCount()

  getLikeCount()
}
