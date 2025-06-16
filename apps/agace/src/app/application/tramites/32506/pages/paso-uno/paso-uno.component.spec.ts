import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { AvisoDestruccionService } from '../../services/aviso-destruccion.service';
import { Tramite32506Store } from '../../estados/tramite32506.store';
import { Tramite32506Query } from '../../estados/tramite32506.query';
import { ConsultaioQuery, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvisoComponent } from '../../components/aviso/aviso.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: any;
  let mockStore: jest.Mocked<Tramite32506Store>;
  let mockTramiteQuery: jest.Mocked<Tramite32506Query>;
  let mockAvisoDestruccionService: jest.Mocked<AvisoDestruccionService>;
  let mockConsultaQuery: jest.Mocked<ConsultaioQuery>;

  const tramiteStateMock = { pestanaActiva: 2 } as any;
  const consultaStateMock = { update: false } as any;

  beforeEach(async () => {
    mockStore = { setPestanaActiva: jest.fn() } as any;
    mockTramiteQuery = {
      selectSolicitud$: of(tramiteStateMock)
    } as any;
    mockAvisoDestruccionService = {
      guardarDatosFormulario: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    } as any;
    mockConsultaQuery = {
      selectConsultaioState$: of(consultaStateMock)
    } as any;

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, HttpClientTestingModule,SolicitanteComponent, AvisoComponent],
      providers: [
        { provide: Tramite32506Store, useValue: mockStore },
        { provide: Tramite32506Query, useValue: mockTramiteQuery },
        { provide: AvisoDestruccionService, useValue: mockAvisoDestruccionService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to consultaQuery and tramiteQuery and set states', () => {
      fixture.detectChanges();
      expect(component.consultaState).toEqual(consultaStateMock);
      expect(component.tramiteState).toEqual(tramiteStateMock);
      expect(component.indice).toBe(tramiteStateMock.pestanaActiva);
    });

    it('should call guardarDatosFormulario if consultaState.update is true', () => {
      mockConsultaQuery.selectConsultaioState$ = of({ update: true } as any);
      jest.spyOn(component, 'guardarDatosFormulario');
      fixture = TestBed.createComponent(PasoUnoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true if consultaState.update is false', () => {
      mockConsultaQuery.selectConsultaioState$ = of({ update: false } as any);
      fixture = TestBed.createComponent(PasoUnoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.esDatosRespuesta).toBeTruthy();
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should call avisoDestruccionService.guardarDatosFormulario and actualizarEstadoFormulario', () => {
      const respMock = { foo: 'bar' } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(respMock));
      component.guardarDatosFormulario();
      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBeTruthy();
      expect(mockAvisoDestruccionService.actualizarEstadoFormulario).toHaveBeenCalledWith(respMock);
    });

    it('should not call actualizarEstadoFormulario if response is falsy', () => {
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of());
      component.esDatosRespuesta = false;
      component.guardarDatosFormulario();
      expect(component.esDatosRespuesta).toBeFalsy();
      expect(mockAvisoDestruccionService.actualizarEstadoFormulario).not.toHaveBeenCalled();
    });
  });

  describe('seleccionaTab', () => {
    it('should set indice and call store.setPestanaActiva', () => {
      component.indice = 1;
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);
      expect(mockStore.setPestanaActiva).toHaveBeenCalledWith(3);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$', () => {
      jest.spyOn(component.destroyNotifier$, 'next');
      jest.spyOn(component.destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(component.destroyNotifier$.next).toHaveBeenCalled();
      expect(component.destroyNotifier$.complete).toHaveBeenCalled();
    });
  });
});