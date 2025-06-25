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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer esDatosRespuesta en true si consultaState.update es false en ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe llamar a actualizarEstadoFormulario y establecer esDatosRespuesta en true en guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(solocitud110208ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ campo: 'valor' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe actualizar el índice y llamar a wizardComponent.siguiente cuando getValorIndice es llamado con accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe actualizar el índice y llamar a wizardComponent.atras cuando getValorIndice es llamado con accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debe actualizar el índice ni llamar métodos de wizardComponent cuando getValorIndice es llamado con valor inválido', () => {
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

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
