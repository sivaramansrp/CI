import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ElegibilidadTextilesComponent } from './elegibilidad-textiles.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('ElegibilidadTextilesComponent', () => {
  let component: ElegibilidadTextilesComponent;
  let fixture: ComponentFixture<ElegibilidadTextilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent],
      declarations: [ElegibilidadTextilesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ElegibilidadTextilesComponent);
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
    expect(component.title).toBe('Elegibilidad Textiles');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Elegibilidad Textiles');
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
