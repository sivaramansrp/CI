import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetornoImportacionTemporalComponent } from './retorno-importacion-temporal-page.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PASOS_REGISTRO } from '../../enum/retorno-importacion-temporal.enum';
import { DatosPasos } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  @Input() listaPasos: any;
  siguiente = jest.fn();
  atras = jest.fn();
}

@Component({ selector: 'app-paso-uno', template: '' })
class MockPasoUnoComponent {}

@Component({ selector: 'app-paso-dos', template: '' })
class MockPasoDosComponent {}

@Component({ selector: 'app-paso-tres', template: '' })
class MockPasoTresComponent {}

@Component({
  selector: 'btn-continuar',
  template: ''
})
class MockBtnContinuarComponent {
  @Input() datos!: DatosPasos;
  @Output() continuarEvento = new EventEmitter<any>();
}

@Component({
  selector: 'ng-alert',
  template: ''
})
class MockNgAlertComponent {
  @Input() CONTENIDO: any;
  @Input() CUSTOMECLASS: string = '';
}

describe('RetornoImportacionTemporalComponent', () => {
  let COMPONENTE: RetornoImportacionTemporalComponent;
  let FIXTURE: ComponentFixture<RetornoImportacionTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RetornoImportacionTemporalComponent,
        MockWizardComponent,
        MockPasoUnoComponent,
        MockPasoDosComponent,
        MockPasoTresComponent,
        MockBtnContinuarComponent,
        MockNgAlertComponent
      ]
    }).compileComponents();

    FIXTURE = TestBed.createComponent(RetornoImportacionTemporalComponent);
    COMPONENTE = FIXTURE.componentInstance;

    const WIZARD_DEBUG_EL = FIXTURE.debugElement.query(By.directive(MockWizardComponent));
    COMPONENTE.wizardComponent = WIZARD_DEBUG_EL?.componentInstance;

    FIXTURE.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });

  it('debería inicializar pasos y pantallasPasos con PASOS_REGISTRO', () => {
    expect(COMPONENTE.pasos).toEqual(PASOS_REGISTRO);
    expect(COMPONENTE.pantallasPasos).toEqual(PASOS_REGISTRO);
  });

  it('debería inicializar datosPasos correctamente', () => {
    expect(COMPONENTE.datosPasos).toEqual({
      nroPasos: PASOS_REGISTRO.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debería tener el valor predeterminado de infoAlert como "alert-info"', () => {
    expect(COMPONENTE.infoAlert).toBe('alert-info');
  });

  it('debería inicializar TEXTOS desde AVISO.Aviso', () => {
    expect(COMPONENTE.TEXTOS).toBeDefined();
  });

  it('debería establecer el índice y llamar a siguiente() cuando la acción sea "cont" y el valor sea válido', () => {
    COMPONENTE.getValorIndice({ accion: 'cont', valor: 2 });
    expect(COMPONENTE.indice).toBe(2);
    expect(COMPONENTE.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debería establecer el índice y llamar a atras() cuando la acción no sea "cont" y el valor sea válido', () => {
    COMPONENTE.getValorIndice({ accion: 'back', valor: 3 });
    expect(COMPONENTE.indice).toBe(3);
    expect(COMPONENTE.wizardComponent.atras).toHaveBeenCalled();
  });

  it('debería ignorar valores inválidos (<1 o >4)', () => {
    const INICIAL = COMPONENTE.indice;
    COMPONENTE.getValorIndice({ accion: 'cont', valor: -1 });
    COMPONENTE.getValorIndice({ accion: 'cont', valor: 5 });
    expect(COMPONENTE.indice).toBe(INICIAL);
    expect(COMPONENTE.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(COMPONENTE.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('debería pasar pantallasPasos al input de app-wizard', () => {
    const WIZARD = FIXTURE.debugElement.query(By.css('app-wizard'));
    expect(WIZARD.componentInstance.listaPasos).toEqual(COMPONENTE.pantallasPasos);
  });

  it('debería llamar a getValorIndice cuando btn-continuar emita un evento', () => {
    jest.spyOn(COMPONENTE, 'getValorIndice');
    const BTN = FIXTURE.debugElement.query(By.css('btn-continuar'));
    BTN.componentInstance.continuarEvento.emit({ accion: 'cont', valor: 2 });
    FIXTURE.detectChanges();
    expect(COMPONENTE.getValorIndice).toHaveBeenCalledWith({ accion: 'cont', valor: 2 });
  });

  it('debería renderizar app-paso-uno cuando el índice sea 1', () => {
    COMPONENTE.indice = 1;
    FIXTURE.detectChanges();
    const PASO = FIXTURE.debugElement.query(By.css('app-paso-uno'));
    expect(PASO).toBeTruthy();
  });

  it('debería renderizar app-paso-dos cuando el índice sea 2', () => {
    COMPONENTE.indice = 2;
    FIXTURE.detectChanges();
    const PASO = FIXTURE.debugElement.query(By.css('app-paso-dos'));
    expect(PASO).toBeTruthy();
  });

  it('debería renderizar app-paso-tres cuando el índice sea 3', () => {
    COMPONENTE.indice = 3;
    FIXTURE.detectChanges();
    const PASO = FIXTURE.debugElement.query(By.css('app-paso-tres'));
    expect(PASO).toBeTruthy();
  });

  it('debería renderizar ng-alert cuando el índice sea 1', () => {
    COMPONENTE.indice = 1;
    FIXTURE.detectChanges();
    const ALERT = FIXTURE.debugElement.query(By.css('ng-alert'));
    expect(ALERT).toBeTruthy();
    expect(ALERT.componentInstance.CONTENIDO).toBe(COMPONENTE.TEXTOS);
    expect(ALERT.componentInstance.CUSTOMECLASS).toBe(COMPONENTE.infoAlert);
  });

  it('NO debería renderizar ng-alert cuando el índice no sea 1', () => {
    COMPONENTE.indice = 2;
    FIXTURE.detectChanges();
    const ALERT = FIXTURE.debugElement.query(By.css('ng-alert'));
    expect(ALERT).toBeFalsy();
  });
});