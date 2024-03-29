import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostFormComponent } from './edit-post-form.component';

describe('EditPostFormComponent', () => {
  let component: EditPostFormComponent;
  let fixture: ComponentFixture<EditPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPostFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
