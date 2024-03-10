import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisionboardComponent } from './components/visionboard/visionboard.component';
import { FlipComponent } from "./components/flip/flip.component";
import { AccountPageComponent } from './components/account-page/account-page.component';
import { DragtoresizeComponent } from './components/dragtoresize/dragtoresize.component';
import { DragToResizeDirective } from './components/dragtoresize/drag-to-resize.directive';
import { HomeComponent } from "./components/home/home.component";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommentComponent } from './components/comment/comment.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, UnsplashComponent, RouterOutlet, NavigationComponent, RouterLink, RouterLinkActive, FlipComponent, VisionboardComponent, AccountPageComponent, DragtoresizeComponent, DragToResizeDirective, HomeComponent, AdminDashboardComponent, CommentComponent]
})
export class AppComponent {
  title = 'Dreamscape';
  boards: any;
}
