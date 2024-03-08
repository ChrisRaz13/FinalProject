import { DragToResizeDirective } from './drag-to-resize.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('DragToResizeDirective', () => {
  let directive: DragToResizeDirective;
  let elementRef: ElementRef;
  let renderer2: Renderer2;

  beforeEach(() => {
    // Mock ElementRef and Renderer2
    const elementRefMock = {
      // Provide necessary mock properties if needed
    };

    const renderer2Mock = {
      // Mock methods if they're used in the directive
    };

    TestBed.configureTestingModule({
      // Provide the mocks to the TestBed
      providers: [
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: renderer2Mock },
        DragToResizeDirective // Now TestBed knows how to create DragToResizeDirective
      ]
    });

    // TestBed injects the mock dependencies
    elementRef = TestBed.inject(ElementRef);
    renderer2 = TestBed.inject(Renderer2);
    directive = new DragToResizeDirective(elementRef, renderer2);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
