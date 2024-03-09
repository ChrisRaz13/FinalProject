import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule, NgbModule, RegistrationComponent, FormsModule, LoginComponent, LogoutComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isCollapsed: boolean = false;
  showLoginPopup: boolean = false;
  showRegistrationPopup: boolean = false;
  showHome: boolean = true;

  constructor(private authService: AuthService){}

  isLoggedIn() :boolean {
    return this.authService.checkLogin();
  }

  isAdmin() :boolean {
    return this.authService.isAdmin();
  }

  toggleLoginPopup(){
    this.showLoginPopup = !this.showLoginPopup;
  }

  toggleRegistrationPopup(){
    this.showRegistrationPopup = !this.showRegistrationPopup;
  }

}

