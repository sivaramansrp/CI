import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasoCuatroComponent } from './paso-cuatro.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent],
      declarations: [PasoCuatroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
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
    expect(component.title).toBe('Paso Cuatro');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Paso Cuatro');
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