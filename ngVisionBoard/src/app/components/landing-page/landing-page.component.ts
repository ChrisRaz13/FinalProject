import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RegistrationComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  images: string[] = [
    'https://i.pinimg.com/originals/28/9c/78/289c78c47338f16a7d5384eb5f931803.jpg',
    'https://i.pinimg.com/originals/28/9c/78/289c78c47338f16a7d5384eb5f931803.jpg',
    'https://i.pinimg.com/originals/28/9c/78/289c78c47338f16a7d5384eb5f931803.jpg'
  ];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
}
