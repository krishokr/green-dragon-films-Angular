import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsernameFormComponent } from './update-username-form.component';

describe('UpdateUsernameFormComponent', () => {
  let component: UpdateUsernameFormComponent;
  let fixture: ComponentFixture<UpdateUsernameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUsernameFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
