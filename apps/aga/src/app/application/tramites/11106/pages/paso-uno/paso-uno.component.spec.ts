import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { EventEmitter } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11106/pasos.enum';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasoUnoComponent],
      declarations: [],
      providers: [],
    }).compileComponents();

    const fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con valores predeterminados', () => {
    expect(component.indice).toBe(1);
    expect(component.pasos).toBe(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('debería emitir continuarEvento cuando se llame a continuar', () => {
    const emitSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(emitSpy).toHaveBeenCalledWith('');
  });

  it('debería actualizar el índice cuando se llame a seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería actualizar el índice y llamar a wizardComponent.siguiente cuando se llame a getValorIndice con "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar a wizardComponent.atras cuando se llame a getValorIndice con "ant"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar a los métodos de wizardComponent si el valor está fuera de rango', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();

    component.getValorIndice({ accion: 'ant', valor: 6 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });
});
