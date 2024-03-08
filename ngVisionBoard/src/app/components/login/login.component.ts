import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUser: User = new User();

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  login(user: User) {
    this.authService.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        this.router.navigateByUrl('');
        this.close.emit();
      },
      error: (failedLogin) => {
        console.error(failedLogin);
      }
    });
  }

}
