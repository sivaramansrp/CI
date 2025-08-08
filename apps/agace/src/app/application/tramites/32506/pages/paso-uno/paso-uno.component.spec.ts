import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { AvisoDestruccionService } from '../../services/aviso-destruccion.service';
import { Tramite32506Store } from '../../estados/tramite32506.store';
import { Tramite32506Query } from '../../estados/tramite32506.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { ReplaySubject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockAvisoDestruccionService: jest.Mocked<AvisoDestruccionService>;
  let mockTramite32506Store: jest.Mocked<Tramite32506Store>;
  let mockTramite32506Query: jest.Mocked<Tramite32506Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    mockAvisoDestruccionService = {
      guardarDatosFormulario: jest.fn(),
      obtenerFederativa: jest.fn(),
      obtenerMunicipio: jest.fn(),
      obtenerColonias: jest.fn(),
      obtenerUnidadMedida: jest.fn(),
      obtenerFraccionArancelaria: jest.fn(),
      obtenerDatosSolicitante: jest.fn(),
      obtenerPedimentoTabla: jest.fn(),
      obtenerProcesoTabla: jest.fn(),
      obtenerDesperdicioTabla: jest.fn(),
      obtenerAvisoTabla: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    } as any;

    mockTramite32506Store = {
      setPestanaActiva: jest.fn(),
      setAvisoFormularioAdace: jest.fn(),
      setAvisoFormularioCalle: jest.fn(),
      setAvisoFormularioCodigoPostal: jest.fn(),
      setAvisoFormularioColonia: jest.fn(),
      setAvisoFormularioDelegacionMunicipio: jest.fn(),
      setAvisoFormularioEntidadFederativa: jest.fn(),
      setAvisoFormularioFechaTranslado: jest.fn(),
      setAvisoFormularioJustificacion: jest.fn(),
      setAvisoFormularioNombreComercial: jest.fn(),
      setAvisoFormularioNumeroExterior: jest.fn(),
      setAvisoFormularioNumeroInterior: jest.fn(),
      setAvisoFormularioTipoAviso: jest.fn(),
      setAvisoFormularioTipoCarga: jest.fn(),
      setAvisoFormularioValorAnioProgramaImmex: jest.fn(),
      setAvisoFormularioValorProgramaImmex: jest.fn(),
      setCantidadDesp: jest.fn(),
      setCircunstanciaHechos: jest.fn(),
      setClaveUnidadMedidaDesp: jest.fn(),
      setDescripcionDesperdicio: jest.fn(),
      setDescripcionMercancia: jest.fn(),
      setCantidadPedimento: jest.fn(),
      setClaveAduanaPedimento: jest.fn(),
      setClaveFraccionArancelariaPedimento: jest.fn(),
      setClaveUnidadMedidaPedimento: jest.fn(),
      setDescripcionProcesoDestruccion: jest.fn(),
      setDomicilioFormularioCalle: jest.fn(),
      setDomicilioFormularioCodigoPostal: jest.fn(),
      setDomicilioFormularioColonia: jest.fn(),
      setDomicilioFormularioDelegacionMunicipio: jest.fn(),
      setDomicilioFormularioEntidadFederativa: jest.fn(),
      setDomicilioFormularioNombreComercial: jest.fn(),
      setDomicilioFormularioNumeroExterior: jest.fn(),
      setDomicilioFormularioNumeroInterior: jest.fn(),
      setDomicilioFormularioRfc: jest.fn()
    } as any;

    mockTramite32506Query = {
      selectSolicitud$: of({
        pestanaActiva: 2,
        pasoActivo: 1
      })
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        readonly: false,
        update: false
      } as any)
    } as any;

    mockAvisoDestruccionService.obtenerFederativa.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerMunicipio.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerColonias.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerUnidadMedida.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerFraccionArancelaria.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerDatosSolicitante.mockReturnValue(of({} as any));
    mockAvisoDestruccionService.obtenerPedimentoTabla.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerProcesoTabla.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerDesperdicioTabla.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.obtenerAvisoTabla.mockReturnValue(of({ datos: [] } as any));
    mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of({ success: false, message: '', datos: null } as any));

    await TestBed.configureTestingModule({
      imports: [
        PasoUnoComponent,
        SolicitanteComponent,
        CommonModule,
        AvisoComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AvisoDestruccionService, useValue: mockAvisoDestruccionService },
        { provide: Tramite32506Store, useValue: mockTramite32506Store },
        { provide: Tramite32506Query, useValue: mockTramite32506Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 2 (from tramite state)', () => {
    expect(component.indice).toBe(2);
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);

    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });

  describe('guardarDatosFormulario', () => {
    it('should call avisoDestruccionService.guardarDatosFormulario and update store when response is successful', () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        datos: {
          avisoFormulario: {
            adace: 'ADACE-001',
            calle: 'Test Street',
            codigoPostal: '12345',
            claveColonia: 'COL-001',
            claveDelegacionMunicipio: 'DEL-001',
            claveEntidadFederativa: 'ENT-001',
            fechaTranslado: '2024-01-01',
            justificacion: 'Test justification',
            nombreComercial: 'Test Company',
            numeroExterior: '123',
            numeroInterior: '456',
            tipoAviso: 'TIPO-001',
            tipoCarga: 'CARGA-001',
            valorAnioProgramaImmex: '2024',
            valorProgramaImmex: 'IMMEX-001'
          },
          desperdicioFormulario: {
            cantidadDesp: '100',
            circunstanciaHechos: 'Test circumstances',
            claveUnidadMedidaDesp: 'KG',
            descripcionDesperdicio: 'Test desperdicio',
            descripcionMercancia: 'Test mercancia'
          },
          pedimentoFormulario: {
            cantidadPedimento: '200',
            claveAduanaPedimento: 'ADU-001',
            claveFraccionArancelariaPedimento: 'FRAC-001',
            claveUnidadMedidaPedimento: 'KG'
          },
          procesoFormulario: {
            descripcionProcesoDestruccion: 'Test destruction process'
          },
          domicilioFormulario: {
            calle: 'Domicilio Street',
            codigoPostal: '67890',
            claveColonia: 'COL-002',
            claveDelegacionMunicipio: 'DEL-002',
            claveEntidadFederativa: 'ENT-002',
            nombreComercial: 'Domicilio Company',
            numeroExterior: '789',
            numeroInterior: '012',
            rfc: 'RFC123456789'
          }
        }
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);

      expect(mockTramite32506Store.setAvisoFormularioAdace).toHaveBeenCalledWith('ADACE-001');
      expect(mockTramite32506Store.setAvisoFormularioCalle).toHaveBeenCalledWith('Test Street');
      expect(mockTramite32506Store.setAvisoFormularioCodigoPostal).toHaveBeenCalledWith('12345');
      expect(mockTramite32506Store.setAvisoFormularioColonia).toHaveBeenCalledWith('COL-001');
      expect(mockTramite32506Store.setAvisoFormularioDelegacionMunicipio).toHaveBeenCalledWith('DEL-001');
      expect(mockTramite32506Store.setAvisoFormularioEntidadFederativa).toHaveBeenCalledWith('ENT-001');
      expect(mockTramite32506Store.setAvisoFormularioFechaTranslado).toHaveBeenCalledWith('2024-01-01');
      expect(mockTramite32506Store.setAvisoFormularioJustificacion).toHaveBeenCalledWith('Test justification');
      expect(mockTramite32506Store.setAvisoFormularioNombreComercial).toHaveBeenCalledWith('Test Company');
      expect(mockTramite32506Store.setAvisoFormularioNumeroExterior).toHaveBeenCalledWith('123');
      expect(mockTramite32506Store.setAvisoFormularioNumeroInterior).toHaveBeenCalledWith('456');
      expect(mockTramite32506Store.setAvisoFormularioTipoAviso).toHaveBeenCalledWith('TIPO-001');
      expect(mockTramite32506Store.setAvisoFormularioTipoCarga).toHaveBeenCalledWith('CARGA-001');
      expect(mockTramite32506Store.setAvisoFormularioValorAnioProgramaImmex).toHaveBeenCalledWith('2024');
      expect(mockTramite32506Store.setAvisoFormularioValorProgramaImmex).toHaveBeenCalledWith('IMMEX-001');

      expect(mockTramite32506Store.setCantidadDesp).toHaveBeenCalledWith('100');
      expect(mockTramite32506Store.setCircunstanciaHechos).toHaveBeenCalledWith('Test circumstances');
      expect(mockTramite32506Store.setClaveUnidadMedidaDesp).toHaveBeenCalledWith('KG');
      expect(mockTramite32506Store.setDescripcionDesperdicio).toHaveBeenCalledWith('Test desperdicio');
      expect(mockTramite32506Store.setDescripcionMercancia).toHaveBeenCalledWith('Test mercancia');

      expect(mockTramite32506Store.setCantidadPedimento).toHaveBeenCalledWith('200');
      expect(mockTramite32506Store.setClaveAduanaPedimento).toHaveBeenCalledWith('ADU-001');
      expect(mockTramite32506Store.setClaveFraccionArancelariaPedimento).toHaveBeenCalledWith('FRAC-001');
      expect(mockTramite32506Store.setClaveUnidadMedidaPedimento).toHaveBeenCalledWith('KG');

      expect(mockTramite32506Store.setDescripcionProcesoDestruccion).toHaveBeenCalledWith('Test destruction process');

      expect(mockTramite32506Store.setDomicilioFormularioCalle).toHaveBeenCalledWith('Domicilio Street');
      expect(mockTramite32506Store.setDomicilioFormularioCodigoPostal).toHaveBeenCalledWith('67890');
      expect(mockTramite32506Store.setDomicilioFormularioColonia).toHaveBeenCalledWith('COL-002');
      expect(mockTramite32506Store.setDomicilioFormularioDelegacionMunicipio).toHaveBeenCalledWith('DEL-002');
      expect(mockTramite32506Store.setDomicilioFormularioEntidadFederativa).toHaveBeenCalledWith('ENT-002');
      expect(mockTramite32506Store.setDomicilioFormularioNombreComercial).toHaveBeenCalledWith('Domicilio Company');
      expect(mockTramite32506Store.setDomicilioFormularioNumeroExterior).toHaveBeenCalledWith('789');
      expect(mockTramite32506Store.setDomicilioFormularioNumeroInterior).toHaveBeenCalledWith('012');
      expect(mockTramite32506Store.setDomicilioFormularioRfc).toHaveBeenCalledWith('RFC123456789');
    });

    it('should not update store when response is unsuccessful', () => {
      const mockResponse = {
        success: false,
        message: 'Error',
        datos: null
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);

      expect(mockTramite32506Store.setAvisoFormularioAdace).not.toHaveBeenCalled();
      expect(mockTramite32506Store.setCantidadDesp).not.toHaveBeenCalled();
      expect(mockTramite32506Store.setCantidadPedimento).not.toHaveBeenCalled();
      expect(mockTramite32506Store.setDescripcionProcesoDestruccion).not.toHaveBeenCalled();
      expect(mockTramite32506Store.setDomicilioFormularioCalle).not.toHaveBeenCalled();
    });

    it('should handle partial data gracefully when some form data is missing', () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        datos: {
          avisoFormulario: {
            adace: 'ADACE-001',
            calle: 'Test Street'
          },
          desperdicioFormulario: null,
          pedimentoFormulario: {
            cantidadPedimento: '200'
          },
          procesoFormulario: {
            descripcionProcesoDestruccion: 'Test process'
          },
          domicilioFormulario: {
            rfc: 'RFC123456789'
          }
        }
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);

      expect(mockTramite32506Store.setAvisoFormularioAdace).toHaveBeenCalledWith('ADACE-001');
      expect(mockTramite32506Store.setAvisoFormularioCalle).toHaveBeenCalledWith('Test Street');
      expect(mockTramite32506Store.setCantidadPedimento).toHaveBeenCalledWith('200');
      expect(mockTramite32506Store.setDescripcionProcesoDestruccion).toHaveBeenCalledWith('Test process');
      expect(mockTramite32506Store.setDomicilioFormularioRfc).toHaveBeenCalledWith('RFC123456789');

      expect(mockTramite32506Store.setCantidadDesp).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setAvisoFormularioCodigoPostal).toHaveBeenCalledWith(undefined);
    });

    it('should handle null/undefined response datos gracefully', () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        datos: null
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);

      expect(mockTramite32506Store.setAvisoFormularioAdace).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setCantidadDesp).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setCantidadPedimento).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setDescripcionProcesoDestruccion).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setDomicilioFormularioCalle).toHaveBeenCalledWith(undefined);
    });

    it('should handle empty response datos gracefully', () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        datos: {}
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);

      expect(mockTramite32506Store.setAvisoFormularioAdace).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setCantidadDesp).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setCantidadPedimento).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setDescripcionProcesoDestruccion).toHaveBeenCalledWith(undefined);
      expect(mockTramite32506Store.setDomicilioFormularioCalle).toHaveBeenCalledWith(undefined);
    });

    it('should use takeUntil operator for subscription management', () => {
      const mockResponse = { 
        success: true, 
        message: 'Success',
        datos: {} 
      } as any;
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(mockResponse));
      const takeUntilSpy = jest.spyOn(component.destroyNotifier$, 'next');

      component.guardarDatosFormulario();

      expect(mockAvisoDestruccionService.guardarDatosFormulario).toHaveBeenCalled();
      
      component.ngOnDestroy();
      expect(takeUntilSpy).toHaveBeenCalled();
    });

    it('should handle service errors gracefully', () => {
      const errorResponse = new Error('Service error');
      mockAvisoDestruccionService.guardarDatosFormulario.mockReturnValue(of(errorResponse as any));

      expect(() => component.guardarDatosFormulario()).not.toThrow();
    });
  });

});