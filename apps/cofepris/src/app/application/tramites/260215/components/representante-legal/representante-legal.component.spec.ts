import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';

describe('Componente RepresentanteLegalComponent', () => {
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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

it('debería manejar controles de formulario inválidos', () => {
    const form = component.representante;
    form.get('nombreRazonSocial')?.setValue('');
    form.get('apellidoPaterno')?.setValue('');

    expect(form.valid).toBe(false);
  });

  describe('guardarDatosFormulario', () => {
    it('debería deshabilitar el formulario si esFormularioSoloLectura es verdadero', () => {
      component.esFormularioSoloLectura = true;
      component.representante.enable(); 
      const initSpy = jest.spyOn(component, 'inicializarFormulario');
      component.guardarDatosFormulario();
      expect(initSpy).toHaveBeenCalled();
      expect(component.representante.disabled).toBe(true);
    });

    it('debería habilitar el formulario si esFormularioSoloLectura es falso', () => {
      component.esFormularioSoloLectura = false;
      component.representante.disable(); // asegurar que esté deshabilitado antes
      const initSpy = jest.spyOn(component, 'inicializarFormulario');
      component.guardarDatosFormulario();
      expect(initSpy).toHaveBeenCalled();
      expect(component.representante.enabled).toBe(true);
    });
  });
});