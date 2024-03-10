import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageNavigationComponent } from './landing-page-navigation.component';

describe('LandingPageNavigationComponent', () => {
  let component: LandingPageNavigationComponent;
  let fixture: ComponentFixture<LandingPageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
