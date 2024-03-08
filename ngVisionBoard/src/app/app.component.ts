import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisionboardComponent } from './components/visionboard/visionboard.component';
import { FlipComponent } from "./components/flip/flip.component";
import { CommentComponent } from "./components/comment/comment.component";
import { AccountPageComponent } from './components/account-page/account-page.component';
import { DragtoresizeComponent } from './components/dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from './components/dragtoresize/drag-to-resize.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, RouterLink, RouterLinkActive, FlipComponent, VisionboardComponent, CommentComponent, AccountPageComponent, DragtoresizeComponent, DragToResizeDirective]
})
export class AppComponent {
  title = 'Dreamscape';
}
