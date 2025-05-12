import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DirectorGeneralComponent } from './director-general.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DirectorGeneralComponent', () => {
  let component: DirectorGeneralComponent;
  let fixture: ComponentFixture<DirectorGeneralComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DirectorGeneralComponent],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectorGeneralComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    component.directorGeneralForm = fb.group({
      name: [''],
      email: [''],
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
