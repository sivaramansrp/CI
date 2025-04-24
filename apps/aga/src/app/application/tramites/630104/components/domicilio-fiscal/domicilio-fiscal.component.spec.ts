import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DomicilioFiscalComponent } from './domicilio-fiscal.component';

describe('DomicilioFiscalComponent', () => {
  let component: DomicilioFiscalComponent;
  let fixture: ComponentFixture<DomicilioFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DomicilioFiscalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reactive form on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.domicilioFiscalFormulario).toBeDefined();
  });

  it('should initialize the form with default values', () => {
    component.inicializarFormulario();
    expect(component.domicilioFiscalFormulario).toBeDefined();
    expect(component.domicilioFiscalFormulario.controls).toBeDefined();
  });

  it('should have the correct form structure', () => {
    component.inicializarFormulario();
    expect(component.domicilioFiscalFormulario instanceof FormGroup).toBe(true);
    // Add specific form control checks if applicable
    // Example: expect(component.domicilioFiscalFormulario.get('fieldName')).toBeDefined();
  });
});