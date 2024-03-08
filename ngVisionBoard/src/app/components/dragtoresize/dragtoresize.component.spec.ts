import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragtoresizeComponent } from './dragtoresize.component';

describe('DragtoresizeComponent', () => {
  let component: DragtoresizeComponent;
  let fixture: ComponentFixture<DragtoresizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragtoresizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragtoresizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
