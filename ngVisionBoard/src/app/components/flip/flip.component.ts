import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flip',
  standalone: true,
  imports: [],
  templateUrl: './flip.component.html',
  styleUrl: './flip.component.css'
})
export class FlipComponent {
additionalDetails: any;

@Input() frontImageUrl: string | undefined;
https: any;
}
