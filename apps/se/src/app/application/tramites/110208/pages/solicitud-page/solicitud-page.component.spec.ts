import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solocitud110208Service } from '../../services/service110208.service';
import { of, Subject } from 'rxjs';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let consultaQueryMock: any;
  let solocitud110208ServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };
    solocitud110208ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ campo: 'valor' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Solocitud110208Service, useValue: solocitud110208ServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call actualizarEstadoFormulario and set esDatosRespuesta to true in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(solocitud110208ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ campo: 'valor' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with invalid valor', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    const initialIndice = component.indice;

    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(initialIndice);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();

    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(initialIndice);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
