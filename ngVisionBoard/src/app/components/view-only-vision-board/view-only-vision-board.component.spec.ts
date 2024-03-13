import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnlyVisionBoardComponent } from './view-only-vision-board.component';

describe('ViewOnlyVisionBoardComponent', () => {
  let component: ViewOnlyVisionBoardComponent;
  let fixture: ComponentFixture<ViewOnlyVisionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOnlyVisionBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOnlyVisionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
