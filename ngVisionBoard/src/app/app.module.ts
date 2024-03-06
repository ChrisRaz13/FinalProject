import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Define your application routes here
  // Example: { path: 'home', component: HomeComponent, standalone: true }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Configure the routes
  ],
  bootstrap: [] // Bootstrap the standalone AppComponent
})
export class AppModule { }
