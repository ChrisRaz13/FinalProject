import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from './../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
  @ViewChild('newPassword') newPasswordRef!: ElementRef;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.index().subscribe({
      next: (users) => {
        const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.users = users.filter(user => user.id !== loggedInUser.id || user.role !== 'admin');
      },
      error: (error) => console.error('There was an error loading the users', error)
    });
  }

  resetPassword(userId: number, newPassword: string) {
    this.errorMessage = '';
    this.successMessage = '';

    if (!newPassword) {
      this.errorMessage = 'Please enter a new password.';
      return;
    }

    this.userService.resetPassword(userId, newPassword).subscribe({
      next: () => {
        this.successMessage = `Password for user ID ${userId} reset successfully.`;
        this.newPasswordRef.nativeElement.value = '';
      },
      error: (error) => {
        console.error('Error resetting password', error);
        this.errorMessage = 'Error resetting password. Please try again.';
      },
    });
  }

  toggleUserStatus(user: User): void {
    if (user.enabled) {
      this.userService.deactivateUser(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deactivating user', error),
      });
    } else {
      this.userService.activateUser(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error activating user', error),
      });
    }
    user.enabled = !user.enabled;
  }
}
