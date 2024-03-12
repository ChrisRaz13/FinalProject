import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisionboardComponent } from './components/visionboard/visionboard.component';
import { FlipComponent } from './components/flip/flip.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { DragtoresizeComponent } from './components/dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from './components/dragtoresize/drag-to-resize.directive';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommentComponent } from './components/comment/comment.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LandingPageNavigationComponent } from './components/landing-page-navigation/landing-page-navigation.component';
import { PostFormComponent } from './components/post-form/post-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UnsplashComponent,
    RouterOutlet,
    NavigationComponent,
    RouterLink,
    RouterLinkActive,
    FlipComponent,
    VisionboardComponent,
    AccountPageComponent,
    DragtoresizeComponent,
    DragToResizeDirective,
    HomeComponent,
    AdminDashboardComponent,
    CommentComponent,
    LandingPageComponent,
    RegistrationComponent,
    LandingPageNavigationComponent,
    PostFormComponent,
  ],
})
export class AppComponent {
  title = 'Dreamscape';
  boards: any;
  showFullNavbar: boolean = true;


  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route
        if (event.url === '/landing-page' || event.url === '/login') { // Adjust the route as per your landing page route
          this.showFullNavbar = false;
        } else {
          this.showFullNavbar = true;
        }
      }
    });
  }
}
