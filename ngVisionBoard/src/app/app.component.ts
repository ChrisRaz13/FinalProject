import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisionboardComponent } from './components/visionboard/visionboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, VisionboardComponent]
=======
  imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, RouterLink, RouterLinkActive]
>>>>>>> f3491996ce579f00c1638133a96e7f5790da133e
})
export class AppComponent {
  title = "Dreamscape";
}


