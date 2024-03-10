import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionboardAlternateComponent } from './visionboard-alternate.component';

describe('VisionboardAlternateComponent', () => {
  let component: VisionboardAlternateComponent;
  let fixture: ComponentFixture<VisionboardAlternateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionboardAlternateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisionboardAlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
