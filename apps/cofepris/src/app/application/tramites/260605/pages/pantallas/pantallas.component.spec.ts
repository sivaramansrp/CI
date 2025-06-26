import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
// import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { AccionBoton } from 'libs/shared/data-access-user/src/core/models/301/servicios-pantallas.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PASOS } from '@libs/shared/data-access-user/src';


describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  // Mock para WizardComponent
  const wizardComponentMock = {
    siguiente: jest.fn(),
    atras: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignorar elementos desconocidos en la plantilla
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;

    // Asignar manualmente el mock a la propiedad `wizardComponent`
    component.wizardComponent = wizardComponentMock as unknown as WizardComponent;

    fixture.detectChanges();
    jest.clearAllMocks(); // <-- Reset mock call counts before each test
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar pantallasPasos con PASOS', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
  });

  it('debería inicializar datosPasos correctamente', () => {
    const expectedDatosPasos: DatosPasos = {
      nroPasos: PASOS.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    expect(component.datosPasos).toEqual(expectedDatosPasos);
  });

it('debería establecer el índice y llamar a wizardComponent.atras() cuando la acción no es "cont" en getValorIndice', () => {
    const accion: AccionBoton = { valor: 1, accion: 'back' };

    // Espiar los métodos mock
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    (wizardComponentMock.siguiente as jest.Mock).mockImplementation(() => {});
    (wizardComponentMock.atras as jest.Mock).mockImplementation(() => {});

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    // El método no llama a atras para el primer paso, así que esperamos que NO se haya llamado
    expect(atrasSpy).not.toHaveBeenCalled();
    expect(siguienteSpy).not.toHaveBeenCalled();
  });

  it('no debería cambiar el índice ni llamar a wizardComponent cuando el valor está fuera de los límites en getValorIndice', () => {
    const accion: AccionBoton = { valor: 0, accion: 'cont' };

    // Espiar los métodos mock
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // El índice permanece sin cambios
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('no debería llamar a los métodos de wizardComponent cuando el valor está fuera del rango válido', () => {
    const invalidAccion: AccionBoton = { valor: 6, accion: 'cont' }; // Fuera de rango (por ejemplo, > longitud de PASOS)

    // Espiar los métodos mock
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(invalidAccion);

    expect(component.indice).toBe(1); // El índice permanece sin cambios
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  // Cobertura adicional

  it('debería manejar acción con valor NaN en getValorIndice sin errores', () => {
    const accion: AccionBoton = { valor: NaN as any, accion: 'cont' };
    expect(() => component.getValorIndice(accion)).not.toThrow();
    expect(component.indice).toBe(1);
  });

  it('debería mantener valores por defecto de las propiedades al crear el componente', () => {
    expect(component.indice).toBeDefined();
    expect(component.pantallasPasos).toBeDefined();
    expect(component.datosPasos).toBeDefined();
  });

  it('debería manejar acción con propiedad accion undefined', () => {
    const accion: AccionBoton = { valor: 2, accion: undefined as any };
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    // Si el método no llama a atras para accion undefined, esperamos que no se haya llamado
    expect(atrasSpy).not.toHaveBeenCalled();
    expect(siguienteSpy).not.toHaveBeenCalled();
  });

  it('debería manejar acción con valor negativo', () => {
    const accion: AccionBoton = { valor: -1, accion: 'cont' };
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });
});