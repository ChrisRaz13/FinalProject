import { Component } from '@angular/core';
import { DragToResizeDirective } from './drag-to-resize.directive';

@Component({
  selector: 'app-dragtoresize',
  standalone: true,
  imports: [DragtoresizeComponent, DragToResizeDirective],
  templateUrl: './dragtoresize.component.html',
  styleUrl: './dragtoresize.component.css'
})
export class DragtoresizeComponent {

}
