import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Adjust the path as necessary
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';

const routes: Routes = [
  // Your routes go here
];

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
