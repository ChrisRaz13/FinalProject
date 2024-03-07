import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = "Dreamscape";
}


