import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Tramite80301Store } from '../../estados/tramite80301.store';
import { SolicitudService } from '../../services/solicitud.service';

describe('DatosComplimentariaComponent', () => {
  let fixture: any;
  let component: DatosComplimentariaComponent;

  const mockSolicitudService = {
    obtenerDatosCertificacionSAT: jest.fn(),
    obtenerServiciosImmex: jest.fn(),
    obtenerComplimentaria: jest.fn().mockReturnValue(of({})),
    obtenerFederetarios: jest.fn().mockReturnValue(of({})),
    obtenerOperacion: jest.fn().mockReturnValue(of({})),
  };

  const mockStore = {
    setCertificacionSAT: jest.fn(),
    setServiciosImmex: jest.fn(),
    _select: jest.fn().mockReturnValue(of({})),
    select: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        DatosComplimentariaComponent
      ],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite80301Store, useValue: mockStore },
        { provide: SolicitudService, useValue: mockSolicitudService },
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComplimentariaComponent);
    component = fixture.componentInstance;

    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerComplimentaria()', () => {
    component.obtenerComplimentaria();
    expect(mockSolicitudService.obtenerComplimentaria).toHaveBeenCalled();
  });

  it('should call obtenerFederetarios()', () => {
    component.obtenerFederetarios();
    expect(mockSolicitudService.obtenerFederetarios).toHaveBeenCalled();
  });

  it('should call obtenerOperacions()', () => {
    component.obtenerOperacions();
    expect(mockSolicitudService.obtenerOperacion).toHaveBeenCalled();
    });

  describe('buscarDatosCertificacionSAT', () => {
    it('should set certificacionSAT and update store (success case)', () => {
      const mockResp = { datos: { certificacionSAT: 'CERT123' } };
      mockSolicitudService.obtenerDatosCertificacionSAT.mockReturnValue(of(mockResp));

      component.buscarDatosCertificacionSAT('ABC123');

      expect(component.certificacionSAT).toBe('CERT123');
      expect(mockStore.setCertificacionSAT).toHaveBeenCalledWith('CERT123');
      expect(mockSolicitudService.obtenerDatosCertificacionSAT).toHaveBeenCalledWith('ABC123');
    });

    it('should set certificacionSAT = "" when no datos', () => {
      mockSolicitudService.obtenerDatosCertificacionSAT.mockReturnValue(of({}));

      component.buscarDatosCertificacionSAT('ABC123');

      expect(component.certificacionSAT).toBe('');
      expect(mockStore.setCertificacionSAT).toHaveBeenCalledWith('');
    });

    it('should unsubscribe via destroyNotifier$', () => {
      const subject$ = new Subject<any>();
      mockSolicitudService.obtenerDatosCertificacionSAT.mockReturnValue(subject$);

      component.buscarDatosCertificacionSAT('ABC123');

      fixture.destroy();

      expect(subject$.observers.length).toBe(0);
    });
  });

  describe('obtenerServiciosImmex', () => {
    it('should map data and update store', () => {
      component.buscarIdSolicitud = ['ID001'];

      const mockServices = {
        datos: [
          {
            descripcion: 'Service 1',
            descripcionTipo: 'Tipo 1',
            descripcionTestado: 'Testado 1',
            desEstatus: 'Activo',
          },
        ],
      };

      mockSolicitudService.obtenerServiciosImmex.mockReturnValue(of(mockServices));

      component.obtenerServiciosImmex();

      expect(component.datosServiciosImmex).toEqual([
        {
          descripcion: 'Service 1',
          descripcionTipo: 'Tipo 1',
          descripcionTestado: 'Testado 1',
          desEstatus: 'Activo',
        },
      ]);

      expect(mockStore.setServiciosImmex).toHaveBeenCalledWith(component.datosServiciosImmex);

      expect(mockSolicitudService.obtenerServiciosImmex).toHaveBeenCalledWith(['ID001']);
    });

    it('should set empty array when datos missing', () => {
      mockSolicitudService.obtenerServiciosImmex.mockReturnValue(of({}));

      component.obtenerServiciosImmex();

      expect(component.datosServiciosImmex).toEqual([]);
      expect(mockStore.setServiciosImmex).toHaveBeenCalledWith([]);
    });

    it('should unsubscribe via destroyNotifier$', () => {
      const subject$ = new Subject();
      component.buscarIdSolicitud = ['ID001'];
      mockSolicitudService.obtenerServiciosImmex.mockReturnValue(subject$);

      component.obtenerServiciosImmex();
      fixture.destroy();

      expect(subject$.observers.length).toBe(0);
    });
  });
});