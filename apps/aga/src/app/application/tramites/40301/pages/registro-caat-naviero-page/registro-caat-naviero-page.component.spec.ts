/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionExtraordinariosPageComponent } from './cancelacion-extraordinarios-page.component';
import { BtnContinuarComponent, SolicitanteComponent, SolicitanteService, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('CancelacionExtraordinariosPageComponent', () => {
  let component: CancelacionExtraordinariosPageComponent;
  let fixture: ComponentFixture<CancelacionExtraordinariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelacionExtraordinariosPageComponent, PasoUnoComponent, PasoDosComponent],
      imports: [WizardComponent, BtnContinuarComponent,SolicitanteComponent,HttpClientTestingModule],
      providers: [SolicitanteService]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionExtraordinariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modal instance in ngAfterViewInit', () => {
    const modalElementMock = {
      nativeElement: document.createElement('div')
    } as ElementRef;
    component.cancelarModal = modalElementMock;

    component.ngAfterViewInit();

    expect(component.cancelarModelInstance).toBeDefined();
  });

  it('should update step index in seleccionaTab()', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update index on getValorIndice() with "cont"', () => {
    const wizardMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    component.wizardComponent = wizardMock;

    component.getValorIndice({ valor: 2, accion: 'cont' });

    expect(component.indice).toBe(2);
    expect(wizardMock.siguiente).toHaveBeenCalled();
  });

  it('should open modal if form is valid', () => {
    const pasoUnoMock = { isFormValid: jest.fn().mockReturnValue(true) } as unknown as PasoUnoComponent;
    component.pasoUnoComponent = pasoUnoMock;
    component.cancelarModelInstance = new Modal(document.createElement('div'));

    component.abrirModal();

    expect(component.cancelarModelInstance.show).toHaveBeenCalled();
  });

  it('should close modal when crearerModal() is called', () => {
    component.cancelarModelInstance = new Modal(document.createElement('div'));

    component.crearerModal();

    expect(component.cancelarModelInstance.hide).toHaveBeenCalled();
  });

  it('should handle encendidoSi() to proceed to next step and close modal', () => {
    const wizardMock = { siguiente: jest.fn() } as unknown as WizardComponent;
    component.wizardComponent = wizardMock;
    component.cancelarModelInstance = new Modal(document.createElement('div'));

    component.encendidoSi();

    expect(component.indice).toBe(2);
    expect(wizardMock.siguiente).toHaveBeenCalled();
    expect(component.cancelarModelInstance.hide).toHaveBeenCalled();
  });

  it('should update mostrarBotonParaModal based on pestanaCambiado()', () => {
    component.pestanaCambiado(2);
    expect(component.mostrarBotonParaModal).toBeTruthy();

    component.pestanaCambiado(1);
    expect(component.mostrarBotonParaModal).toBeFalsy();
  });
});
