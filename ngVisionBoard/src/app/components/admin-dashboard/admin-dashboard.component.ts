import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.index().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('There was an error loading the users', error)
    });
  }

  deactivateUser(id: number) {
    this.userService.deactivateUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (error) => console.error('Error deactivating user', error),
    });
  }

  activateUser(id: number){
    this.userService.activateUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (error) => console.error('Error activating user', error),
    });
  }

  resetPassword(userId: number, newPassword: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!newPassword) {
      this.errorMessage = 'Please enter a new password.';
      return;
    }

    this.userService.resetPassword(userId, newPassword).subscribe({
      next: () => {
        this.successMessage = `Password for user ID ${userId} reset successfully.`;
      },
      error: (error) => {
        console.error('Error resetting password', error);
        this.errorMessage = 'Error resetting password. Please try again.';
      },
    });
  }
}
