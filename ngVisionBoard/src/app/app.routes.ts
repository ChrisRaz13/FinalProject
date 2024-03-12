import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { VisionboardComponent } from './components/visionboard/visionboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { VisionboardAlternateComponent } from './components/visionboard-alternate/visionboard-alternate.component';
import { DisplayPostComponent } from './components/display-post/display-post.component';
import { Post } from './models/post';
import { CreateBordFormComponent } from './components/create-bord-form/create-bord-form.component';
import { DisplayVisionBoardComponent } from './components/display-vision-board/display-vision-board.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'account/:userId', component: AccountPageComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'home', component: UnsplashComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'update-profile', component: UpdateUserComponent },
  { path: 'visionboard-alternate', component: VisionboardComponent },
  { path: 'create-post/:boardId', component: PostFormComponent },
  { path: 'visionboard', component: VisionboardAlternateComponent },
  { path: 'display-post', component: DisplayPostComponent },
  { path: 'create-board', component: CreateBordFormComponent},
  { path: 'display-board/:boardId', component: DisplayVisionBoardComponent},
  { path: '**', component: NotfoundComponent},
];
