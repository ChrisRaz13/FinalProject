import { routes } from './app.routes';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), provideHttpClient(), FormsModule]
};
