import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentanteLegalComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.representanteLegalForm).toBeDefined();
    expect(component.representanteLegalForm.get('nombreRazonSocial')?.disabled).toBe(true);
    expect(component.representanteLegalForm.get('apellidoPaterno')?.disabled).toBe(true);
    expect(component.representanteLegalForm.get('apellidoMaterno')?.disabled).toBe(true);
  });

 it('should handle invalid form controls', () => {
    const form = component.representanteLegalForm;
    form.get('nombreRazonSocial')?.setValue('');
    form.get('apellidoPaterno')?.setValue('');

    expect(form.valid).toBe(false);
  });

  describe('guardarDatosFormulario', () => {
    it('should disable the form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.representanteLegalForm.enable(); 
      const initSpy = jest.spyOn(component, 'inicializarFormulario');
      component.guardarDatosFormulario();
      expect(initSpy).toHaveBeenCalled();
      expect(component.representanteLegalForm.disabled).toBe(true);
    });

    it('should enable the form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.representanteLegalForm.disable(); // ensure disabled before
      const initSpy = jest.spyOn(component, 'inicializarFormulario');
      component.guardarDatosFormulario();
      expect(initSpy).toHaveBeenCalled();
      expect(component.representanteLegalForm.enabled).toBe(true);
    });
  });
});