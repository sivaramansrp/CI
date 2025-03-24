import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { AccionBoton } from 'libs/shared/data-access-user/src/core/models/301/servicios-pantallas.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  // Mock for WizardComponent
  const wizardComponentMock = {
    siguiente: jest.fn(),
    atras: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements in the template
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;

    // Manually assign the mock to the `wizardComponent` property
    component.wizardComponent = wizardComponentMock as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PASOS', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
  });

  it('should initialize datosPasos correctly', () => {
    const expectedDatosPasos: DatosPasos = {
      nroPasos: PASOS.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    expect(component.datosPasos).toEqual(expectedDatosPasos);
  });

  it('should set the index and call wizardComponent.siguiente() when accion is "cont" in getValorIndice', () => {
    const accion: AccionBoton = { valor: 2, accion: 'cont' };

    // Spy on the mock methods
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(siguienteSpy).toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should set the index and call wizardComponent.atras() when accion is not "cont" in getValorIndice', () => {
    const accion: AccionBoton = { valor: 1, accion: 'back' };

    // Spy on the mock methods
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(atrasSpy).toHaveBeenCalled();
    expect(siguienteSpy).not.toHaveBeenCalled();
  });

  it('should not change the index or call wizardComponent when valor is out of bounds in getValorIndice', () => {
    const accion: AccionBoton = { valor: 0, accion: 'cont' };

    // Spy on the mock methods
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // Index remains unchanged
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should not call wizardComponent methods when valor is out of valid range', () => {
    const invalidAccion: AccionBoton = { valor: 6, accion: 'cont' }; // Out of range (e.g., > length of PASOS)

    // Spy on the mock methods
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(invalidAccion);

    expect(component.indice).toBe(1); // Index remains unchanged
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });
});