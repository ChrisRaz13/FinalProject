import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
editUser(arg0: User) {
throw new Error('Method not implemented.');
}
  updateUser: User = new User();
  updateSuccess: boolean = false;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.updateUser = user;
      },
      error: (problem) => {
        console.error('UserHttpComponent.reload(): error loading user:');
        console.error(problem);
      },
    });
  }
//FIXME
  // load(userId : number): void {
  //   this.userService.show(userId).subscribe({
  //     next: (user) => {
  //       this.updateUser = user;
  //     },
  //     error: (problem) => {
  //       console.error('UserUpdateHttpComponent.reload(): error loading user:');
  //       console.error(problem);
  //     },
  //   });
  // }
//FIXME
//   editUser(editUser: User): void {

//     this.userService.update(editUser).subscribe({
//       next: (updatedUser) => {
//         console.log('User updated successfully:', updatedUser);
//         this.updateSuccess = true;
//       },
//       error: (error) => {
//         console.error('Error updating user:', error);
//       },
//     });
//   }
}
