import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page-navigation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing-page-navigation.component.html',
  styleUrl: './landing-page-navigation.component.css'
})
export class LandingPageNavigationComponent {

}
