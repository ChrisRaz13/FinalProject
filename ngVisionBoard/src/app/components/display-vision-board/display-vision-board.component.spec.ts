import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVisionBoardComponent } from './display-vision-board.component';

describe('DisplayVisionBoardComponent', () => {
  let component: DisplayVisionBoardComponent;
  let fixture: ComponentFixture<DisplayVisionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayVisionBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayVisionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
