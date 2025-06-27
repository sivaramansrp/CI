import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos-declaraciones.component';

describe('ManifiestosComponent', () => {
  let component: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      component.manifiestos = new FormGroup({});
      // Espía manual para inicializarFormulario
      component.inicializarFormulario = jest.fn();
      // Espías manuales para enable/disable
      component.manifiestos.disable = jest.fn();
      component.manifiestos.enable = jest.fn();
    });

    it('debería inicializar el formulario siempre', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.inicializarFormulario).toHaveBeenCalled();
    });

    it('debería deshabilitar el formulario si es solo lectura', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.manifiestos.disable).toHaveBeenCalled();
      expect(component.manifiestos.enable).not.toHaveBeenCalled();
    });

    it('debería habilitar el formulario si no es solo lectura', () => {
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      expect(component.manifiestos.enable).toHaveBeenCalled();
      expect(component.manifiestos.disable).not.toHaveBeenCalled();
    });
  });
});

