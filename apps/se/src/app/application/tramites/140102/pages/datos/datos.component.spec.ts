import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { RegistroDeSolicitudService } from '../../services/registro-de-solicitud.service';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let registroDeSolicitudServiceMock: { getImportacionDefinitivaData: jest.Mock, actualizarEstadoFormulario: jest.Mock };

  beforeEach(async () => {
    registroDeSolicitudServiceMock = {
      getImportacionDefinitivaData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: RegistroDeSolicitudService, useValue: registroDeSolicitudServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    component.pestanaCambiado = new EventEmitter<number>();
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

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    component.consultaState = { update: true } as any;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta and call actualizarEstadoFormulario for each key in guardarDatosFormulario', () => {
    const mockResp = { campo1: 'valor1', campo2: 'valor2' };
    registroDeSolicitudServiceMock.getImportacionDefinitivaData.mockReturnValue(of(mockResp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(registroDeSolicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('campo1', 'valor1');
    expect(registroDeSolicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('campo2', 'valor2');
  });

  it('should update indice and emit pestanaCambiado when seleccionaTab is called', () => {
    const emitSpy = jest.spyOn(component.pestanaCambiado, 'emit');
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
