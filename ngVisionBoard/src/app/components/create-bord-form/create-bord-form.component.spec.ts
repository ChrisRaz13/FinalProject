import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBordFormComponent } from './create-bord-form.component';

describe('CreateBordFormComponent', () => {
  let component: CreateBordFormComponent;
  let fixture: ComponentFixture<CreateBordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
