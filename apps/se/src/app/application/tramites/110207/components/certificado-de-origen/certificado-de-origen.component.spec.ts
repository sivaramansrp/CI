import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HEADERS, HEADERS_DATA } from '../../models/registro.model';
import { HttpClient } from '@angular/common/http';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let mockRegistroService: jest.Mocked<RegistroService>;
  let mockStore: jest.Mocked<Tramite110207Store>;
  let mockQuery: jest.Mocked<Tramite110207Query>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    const mockHttpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      request: jest.fn(), 
    } as unknown as jest.Mocked<HttpClient>;
  
    mockRegistroService = {
      urlServer: 'http://mock-server.com', 
      urlServerCatalogos: 'http://mock-catalog-server.com', 
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getCatalogoById: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      http: mockHttpClient, 
    } as unknown as jest.Mocked<RegistroService>;
  
    mockStore = {
      setEstablecerSiCasilla: jest.fn(),
      setTratado: jest.fn(),
      setPais: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setfraccionMercanArancelaria: jest.fn(),
      setnombretecnico: jest.fn(),
      setnomreeningles: jest.fn(),
      setcriterioparaconferir: jest.fn(),
      setmarca: jest.fn(),
      setcantidad: jest.fn(),
      setUMC: jest.fn(),
      setUnidadMedida: jest.fn(),
      setTipoFactura: jest.fn(),
      setFecha: jest.fn(),
      setNFactura: jest.fn(),
      setJustificacion: jest.fn(),
      setvalordelamercancia: jest.fn(),
      setcomplementodeladescripcion: jest.fn(),
      setmasabruta: jest.fn(),
      setnombrecomercialdelamercancia: jest.fn(),
      setNumRegistro: jest.fn(),
      setNomComercial: jest.fn(),
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setArchivo: jest.fn(),
      setObservaciones: jest.fn(),
      setPresica: jest.fn(),
      setPresenta: jest.fn(),
      setIdioma: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPrimer: jest.fn(),
      setApellidoSegundo: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setNacion: jest.fn(),
      setTransporte: jest.fn(),
      setCheckbox: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoEmbarque: jest.fn(),
      setPuertoDesembarque: jest.fn(),
      limpiarSolicitud: jest.fn(),
    } as unknown as jest.Mocked<Tramite110207Store>;

    mockQuery = {
      selectSolicitud$: of({}),
    } as jest.Mocked<Tramite110207Query>;

    mockValidacionesService = {
    isValid: jest.fn().mockReturnValue(true),
    noCeroValidator: jest.fn(),
    errorCampoRequerido: jest.fn(),
    errorEmail: jest.fn(),
    errorPattern: jest.fn(),
  } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: mockRegistroService },
        { provide: Tramite110207Store, useValue: mockStore },
        { provide: Tramite110207Query, useValue: mockQuery },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values', () => {
    expect(component.headers).toBe(HEADERS);
    expect(component.headersData).toBe(HEADERS_DATA);
    expect(component.TEXTO_DE_ALERTA).toBe('Para continuar con el trámite, debes agregar por lo menos una mercancía.');
  });

  it('should validate the destinatario form', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: [''],
        pais: [''],
        fraccionArancelaria: [''],
        numeroRegistro: [''],
        nombreComercial: [''],
        fechaInicial: [''],
        fechaFinal: [''],
        archivo: [''],
        siCasilla: [''],
      }),
    });
  
    component.validarDestinatarioFormulario();
  
    expect(component.registroForm.get('validacionForm')?.touched).toBe(true);
  });

  it('should validate the mercancia form', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fraccionMercanciaArancelaria: [''],
      }),
    });
    component.validarMercanciaForm();
    expect(component.mercanciaForm.touched).toBe(true);
  });

  it('should handle checkbox event and update store', () => {
    const event = {
      target: { checked: true },
      bubbles: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      returnValue: true,
      srcElement: null,
      timeStamp: Date.now(),
      type: 'change',
      preventDefault: jest.fn(),
      stopImmediatePropagation: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as Event; 
  
    component.establecerSiCasilla(event);
    expect(mockStore.setEstablecerSiCasilla).toHaveBeenCalledWith(true);
  });
  it('should fetch tratado catalog', () => {
    component.getTratado();
    expect(mockRegistroService.getTratado).toHaveBeenCalled();
  });

  it('should fetch pais catalog', () => {
    component.getPais();
    expect(mockRegistroService.getPais).toHaveBeenCalled();
  });

  it('should fetch UMC catalog', () => {
    component.getUMC();
    expect(mockRegistroService.getUMC).toHaveBeenCalled();
  });

  it('should fetch unidad medida catalog', () => {
    component.getUnidadMedida();
    expect(mockRegistroService.getUnidadMedida).toHaveBeenCalled();
  });

  it('should fetch tipo factura catalog', () => {
    component.getTipoFactura();
    expect(mockRegistroService.getTipoFactura).toHaveBeenCalled();
  });

  it('should fetch solicitudes tabla data', () => {
    component.getSolicitudesTabla();
    expect(mockRegistroService.getSolicitudesTabla).toHaveBeenCalled();
  });

  it('should fetch solicitudes data tabla', () => {
    component.getSolicitudesDataTabla();
    expect(mockRegistroService.getSolicitudesDataTabla).toHaveBeenCalled();
  });

  it('should validate a form field', () => {
    const form = new FormBuilder().group({
      field: ['value'],
    });
    const isValid = component.isValid(form, 'field');
    expect(isValid).toBe(true);
    expect(mockValidacionesService.isValid).toHaveBeenCalledWith(form, 'field');
  });

  it('should set values in the store', () => {
    const form = new FormBuilder().group({
      field: ['value'],
    });
    component.setValoresStore(form, 'field', 'setEstablecerSiCasilla');
    expect(mockStore.setEstablecerSiCasilla).toHaveBeenCalledWith('value');
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});