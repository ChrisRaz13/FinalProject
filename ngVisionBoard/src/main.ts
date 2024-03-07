import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Adjust the path as necessary
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
=======
import { appConfig } from './app/app.config';
>>>>>>> f3491996ce579f00c1638133a96e7f5790da133e

const routes: Routes = [
  // Your routes go here
];

<<<<<<< HEAD
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes),
    ), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
=======
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
>>>>>>> f3491996ce579f00c1638133a96e7f5790da133e
