import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionboardComponent } from './visionboard.component';

describe('VisionboardComponent', () => {
  let component: VisionboardComponent;
  let fixture: ComponentFixture<VisionboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
