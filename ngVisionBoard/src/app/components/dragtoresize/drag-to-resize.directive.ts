import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDragToResize]',
  standalone: true
})
export class DragToResizeDirective implements OnInit {
  private cornerSize = 20;
  private resizeHandle: HTMLElement | undefined;
  private initialX: number = 0;
  private initialY: number = 0;
  private initialWidth: number = 0;
  private initialHeight: number = 0;
  private isResizing: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createResizeHandle();
  }

  createResizeHandle() {
    this.resizeHandle = this.renderer.createElement('div');
    this.renderer.addClass(this.resizeHandle, 'resize-handle');
    this.renderer.appendChild(this.el.nativeElement, this.resizeHandle);

    this.renderer.setStyle(this.resizeHandle, 'position', 'absolute');
    this.renderer.setStyle(this.resizeHandle, 'right', '0');
    this.renderer.setStyle(this.resizeHandle, 'bottom', '0');
    this.renderer.setStyle(this.resizeHandle, 'width', `${this.cornerSize}px`);
    this.renderer.setStyle(this.resizeHandle, 'height', `${this.cornerSize}px`);
    this.renderer.setStyle(this.resizeHandle, 'cursor', 'nwse-resize');

    this.renderer.listen(this.resizeHandle, 'mousedown', (event: MouseEvent) => {
      this.initialX = event.clientX;
      this.initialY = event.clientY;
      this.initialWidth = this.el.nativeElement.offsetWidth;
      this.initialHeight = this.el.nativeElement.offsetHeight;
      this.isResizing = true;
      event.stopPropagation();
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const width = this.initialWidth + (event.clientX - this.initialX);
      const height = this.initialHeight + (event.clientY - this.initialY);
      this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${height}px`);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }
}
