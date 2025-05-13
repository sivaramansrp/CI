import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../../../120404/component/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideToastr, ToastrService } from 'ngx-toastr';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SolicitudPageComponent,
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
      ],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        provideHttpClient(),
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pasos).toBeDefined();
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with "ant"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
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

  it('should render the correct title for step 1', () => {
    component.indice = 1;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain(
      'Registro de Solicitud modificación programa IMMEX (Cambio de sector)'
    );
  });

  it('should render the correct step component based on indice', () => {
    component.indice = 1;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-paso-uno')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-paso-dos')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-paso-tres')).toBeFalsy();

    component.indice = 2;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-paso-uno')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-paso-dos')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-paso-tres')).toBeFalsy();

    component.indice = 3;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-paso-uno')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-paso-dos')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-paso-tres')).toBeTruthy();
  });

  it('should call getValorIndice when continuarEvento is emitted', () => {
    const getValorIndiceSpy = jest.spyOn(component, 'getValorIndice');
    const continuarButton = fixture.debugElement.query(
      By.css('btn-continuar')
    ).componentInstance;

    continuarButton.continuarEvento.emit({ accion: 'cont', valor: 2 });

    expect(getValorIndiceSpy).toHaveBeenCalledWith({
      accion: 'cont',
      valor: 2,
    });
  });
});
