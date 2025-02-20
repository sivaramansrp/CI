import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasoDosComponent } from './paso-dos.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent],
      declarations: [PasoDosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a default title', () => {
    expect(component.title).toBe('Paso Dos');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Paso Dos');
  });

  it('should initialize form group', () => {
    expect(component.formGroup).toBeDefined();
  });

  it('should have default form values', () => {
    const formValues = component.formGroup.value;
    expect(formValues).toEqual({
      campo1: '',
      campo2: ''
    });
  });

  it('should validate form fields', () => {
    const campo1 = component.formGroup.controls['campo1'];
    campo1.setValue('');
    expect(campo1.valid).toBeFalsy();

    campo1.setValue('Valid Value');
    expect(campo1.valid).toBeTruthy();
  });

  // Add more test cases as needed
});