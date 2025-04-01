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

  it('debería establecer el índice y llamar a wizardComponent.siguiente() cuando la acción es "cont" en getValorIndice', () => {
    const accion: AccionBoton = { valor: 2, accion: 'cont' };

    // Espiar los métodos mock
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(siguienteSpy).toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('debería establecer el índice y llamar a wizardComponent.atras() cuando la acción no es "cont" en getValorIndice', () => {
    const accion: AccionBoton = { valor: 1, accion: 'back' };

    // Espiar los métodos mock
    const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
    const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(atrasSpy).toHaveBeenCalled();
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
});