import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavigationComponent } from './components/navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: UnsplashComponent  },
  { path: 'home', component: UnsplashComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: '**', component: NotfoundComponent}
];
