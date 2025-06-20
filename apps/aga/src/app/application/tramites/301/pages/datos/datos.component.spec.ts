import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mock de WizardComponent
class WizardComponentMock {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('DatosComponent', () => {
  let componente: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      imports: [
        require('@angular/common/http/testing').HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    componente = fixture.componentInstance;
    // Inyectar el mock manualmente
    componente.wizardComponent = new WizardComponentMock() as any;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería tener el índice inicial en 1', () => {
    expect(componente.indice).toBe(1);
  });

  it('debería tener la lista de pasos igual a PASOS_REGISTRO', () => {
    expect(componente.pasos).toEqual(componente.pantallasPasos);
  });

  it('debería tener mensajeAlertaAvisoPrivacidad definido', () => {
    expect(componente.mensajeAlertaAvisoPrivacidad).toBeDefined();
  });

  it('debería tener datosPasos con nroPasos igual a la longitud de pasos', () => {
    expect(componente.datosPasos.nroPasos).toBe(componente.pasos.length);
  });

  it('debería tener datosPasos.indice igual al índice inicial', () => {
    expect(componente.datosPasos.indice).toBe(componente.indice);
  });

  it('debería actualizar el índice y llamar a siguiente si accion es "cont"', () => {
    const spySiguiente = jest.spyOn(componente.wizardComponent, 'siguiente');
    const evento = { accion: 'cont', valor: 2 };
    componente.getValorIndice(evento as any);
    expect(componente.indice).toBe(2);
    expect(spySiguiente).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar a atras si accion no es "cont"', () => {
    const spyAtras = jest.spyOn(componente.wizardComponent, 'atras');
    const evento = { accion: 'otro', valor: 3 };
    componente.getValorIndice(evento as any);
    expect(componente.indice).toBe(3);
    expect(spyAtras).toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar métodos si valor es menor o igual a 0', () => {
    const spySiguiente = jest.spyOn(componente.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(componente.wizardComponent, 'atras');
    componente.indice = 1;
    componente.getValorIndice({ accion: 'cont', valor: 0 } as any);
    expect(componente.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar métodos si valor es mayor o igual a 5', () => {
    const spySiguiente = jest.spyOn(componente.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(componente.wizardComponent, 'atras');
    componente.indice = 1;
    componente.getValorIndice({ accion: 'cont', valor: 5 } as any);
    expect(componente.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });
});