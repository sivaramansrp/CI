import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarTransferenciaCuposMainComponent } from './solicitar-transferencia-cupos-main.component';
import { WizardComponent } from '@ng-mf/data-access-user';

import { SOLICITARPASOS } from '@ng-mf/data-access-user';

describe('SolicitarTransferenciaCuposMainComponent', () => {
  let component: SolicitarTransferenciaCuposMainComponent;
  let fixture: ComponentFixture<SolicitarTransferenciaCuposMainComponent>;
  let wizardComponent: WizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitarTransferenciaCuposMainComponent, WizardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarTransferenciaCuposMainComponent);
    component = fixture.componentInstance;
    wizardComponent = TestBed.createComponent(WizardComponent).componentInstance;
    component.wizardComponent = wizardComponent;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las propiedades correctamente', () => {
    expect(component.pasosSolicitar).toEqual(SOLICITARPASOS);
    expect(component.indice).toBe(1);
    expect(component.texto).toBe(
      'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.'
    );
    expect(component.datosPasos).toEqual({
      nroPasos: SOLICITARPASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debería actualizar el índice y llamar a wizardComponent.siguiente() cuando se llama a getValorIndice con la acción "cont"', () => {
    const E = { accion: 'cont', valor: 2 };
    component.getValorIndice(E);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar a wizardComponent.atras() cuando se llama a getValorIndice con la acción "atras"', () => {
    const E = { accion: 'atras', valor: 1 };
    component.indice = 2; // Establecer el índice inicial a 2
    component.getValorIndice(E);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar a los métodos de wizardComponent cuando se llama a getValorIndice con un valor inválido', () => {
    const E = { accion: 'cont', valor: 0 };
    const INITIALINDEX = component.indice;
    component.getValorIndice(E);
    expect(component.indice).toBe(INITIALINDEX);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});