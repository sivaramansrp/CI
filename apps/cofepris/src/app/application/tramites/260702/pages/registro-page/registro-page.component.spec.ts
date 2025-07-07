import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPageComponent } from './registro-page.component';
import { SeccionLibQuery, SeccionLibStore, PASOS, SeccionLibState, WizardComponent } from '@ng-mf/data-access-user';
import { ReplaySubject, of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';

@Component({selector: 'mf-wizard', template: ''})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('RegistroPageComponent', () => {
  let component: RegistroPageComponent;
  let fixture: ComponentFixture<RegistroPageComponent>;
  let seccionQueryMock: any;
  let seccionStoreMock: any;
  let seccionStateMock: SeccionLibState;

  beforeEach(async () => {
    seccionStateMock = { test: 'state' } as any;
    seccionQueryMock = {
      selectSeccionState$: of(seccionStateMock)
    };
    seccionStoreMock = {};

    await TestBed.configureTestingModule({
      declarations: [RegistroPageComponent, MockWizardComponent, PasoUnoComponent, PasoTresComponent, PasoDosComponent],
      providers: [
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock }
      ]
    })
    .overrideComponent(RegistroPageComponent, {
      set: {
        template: '<mf-wizard></mf-wizard>'
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPageComponent);
    component = fixture.componentInstance;
    // Attach the mock wizardComponent
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos', () => {
    expect(component.pasos).toBe(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should set seccion on ngOnInit', () => {
    component.ngOnInit();
    expect(component.seccion).toEqual(seccionStateMock);
  });

  it('should update indice on seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call wizardComponent.siguiente on getValorIndice with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras on getValorIndice with accion not "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 3 });
    expect(component.indice).toBe(3);
    expect(spy).toHaveBeenCalled();
  });
  
  it('should not call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  
    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');
  
    component.getValorIndice({ accion: 'cont', valor: 0 });
    component.getValorIndice({ accion: 'atras', valor: 5 });
  
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});