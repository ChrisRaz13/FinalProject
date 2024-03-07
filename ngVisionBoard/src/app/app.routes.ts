import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: UnsplashComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '**', component: NotfoundComponent}
];
