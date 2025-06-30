import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SolicitudComponent } from './solicitud.component';
import { CatalogoSelectComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Solicitud130118State, Tramite130118Store } from '../../estados/tramites/tramite130118.store';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PeximService } from '../../service/pexim.service';
import { Tramite130118Query } from '../../estados/queries/tramite130118.query';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture;
  let peximService: Partial<PeximService>;
  let validacionesService: Partial<ValidacionesFormularioService>;
  let tramite130118Store: Partial<Tramite130118Store>;
  let tramite130118Query: Partial<Tramite130118Query>;

  beforeEach(async () => {
    peximService = {
      getRegimenMercancia: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getClasifiRegimen: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getFraccionArancelariaCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getNicoCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getUnidadMedidaTarifariaCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getPaisOrigenCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getPaisDestinoCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getEstadoCatalogo: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
      getRepresentacionFederal: jest.fn(() => of({ code: 200, message: 'Success', data: [] })),
    };

    validacionesService = { isValid: jest.fn(() => true) };

    tramite130118Store = {
      setRegimenMercancia: jest.fn(),
      setClasifiRegimen: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setNico: jest.fn(),
      setUnidadMedidaTarifaria: jest.fn(),
      setPaisOrigen: jest.fn(),
      setPaisDestino: jest.fn(),
      setEstado: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setPrecioUnitarioUSD: jest.fn(),
      setFechaSalida: jest.fn(),
      _select: jest.fn((project: (store: Solicitud130118State) => any) => of(project({} as Solicitud130118State)))
    };
    tramite130118Query = {
      selectSeccionState$: of({} as Solicitud130118State)
    };

    await TestBed.configureTestingModule({
      declarations: [
        SolicitudComponent
      ],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        CatalogoSelectComponent
      ],        
      providers: [
        FormBuilder,
        { provide: PeximService, useValue: peximService },
        { provide: ValidacionesFormularioService, useValue: validacionesService },
        { provide: Tramite130118Store, useValue: tramite130118Store },
        { provide: Tramite130118Query, useValue: tramite130118Query }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogs on ngOnInit', () => {
    component.ngOnInit();
    expect(peximService.getRegimenMercancia).toHaveBeenCalled();
    expect(peximService.getClasifiRegimen).toHaveBeenCalled();
    expect(peximService.getFraccionArancelariaCatalogo).toHaveBeenCalled();
    expect(peximService.getNicoCatalogo).toHaveBeenCalled();
    expect(peximService.getUnidadMedidaTarifariaCatalogo).toHaveBeenCalled();
    expect(peximService.getPaisOrigenCatalogo).toHaveBeenCalled();
    expect(peximService.getPaisDestinoCatalogo).toHaveBeenCalled();
    expect(peximService.getEstadoCatalogo).toHaveBeenCalled();
    expect(peximService.getRepresentacionFederal).toHaveBeenCalled();
  });

  it('should initialize form on creation', () => {
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should validate form field', () => {
    const form = component.FormSolicitud;
    const field = 'datosRegimen.regimenMercancia';
    expect(component.isValid(form, field)).toBeTruthy();
    expect(validacionesService.isValid).toHaveBeenCalledWith(form, field);
  });

  it('should create form on initialization', () => {
    component.crearFormSolicitud();
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should handle form selections', () => {
    const form = component.FormSolicitud;
    form.get('datosRegimen.regimenMercancia')?.setValue('test');
    component.regimenMercanciaSeleccion();
    expect(tramite130118Store.setRegimenMercancia).toHaveBeenCalledWith('test');

    form.get('datosRegimen.clasifiRegimen')?.setValue('test');
    component.clasifiRegimenSeleccion();
    expect(tramite130118Store.setClasifiRegimen).toHaveBeenCalledWith('test');

    form.get('datosMercancia.fraccionArancelaria')?.setValue('test');
    component.fraccionArancelariaSeleccion();
    expect(tramite130118Store.setFraccionArancelaria).toHaveBeenCalledWith('test');

    form.get('datosMercancia.nico')?.setValue('test');
    component.nicoSeleccion();
    expect(tramite130118Store.setNico).toHaveBeenCalledWith('test');

    form.get('datosMercancia.unidadMedidaTarifaria')?.setValue('test');
    component.unidadMedidaTarifariaSeleccion();
    expect(tramite130118Store.setUnidadMedidaTarifaria).toHaveBeenCalledWith('test');

    form.get('datosMercancia.paisOrigen')?.setValue('test');
    component.paisOrigenSeleccion();
    expect(tramite130118Store.setPaisOrigen).toHaveBeenCalledWith('test');

    form.get('datosMercancia.paisDestino')?.setValue('test');
    component.paisDestinoSeleccion();
    expect(tramite130118Store.setPaisDestino).toHaveBeenCalledWith('test');

    form.get('registroFederal.estado')?.setValue('test');
    component.estadoSeleccion();
    expect(tramite130118Store.setEstado).toHaveBeenCalledWith('test');

    form.get('registroFederal.representacionFederal')?.setValue('test');
    component.representacionFederalSeleccion();
    expect(tramite130118Store.setRepresentacionFederal).toHaveBeenCalledWith('test');
  });

  it('should validate form', () => {
    component.FormSolicitud.get('datosRegimen.regimenMercancia')?.setValue('');
    component.validarFormulario();
    expect(component.FormSolicitud.invalid).toBeTruthy();
  });

  it('should escape HTML quotes correctly', () => {
    const result = component.escapeHtmlQuotes('"test"');
    expect(result).toBe('&#34;test&#34;');
  });

  it('should show fields for persona moral', () => {
    component.FormSolicitud.get('datosProducto.razonSocial')?.setValue('Test');
    component.muestraCamposPersona();
    expect(component.isVisibleMoral).toBeTruthy();
    expect(component.isVisibleFisica).toBeFalsy();
  });

  it('should show fields for persona fisica', () => {
    component.FormSolicitud.get('datosProducto.nombre')?.setValue('Test');
    component.muestraCamposPersona();
    expect(component.isVisibleFisica).toBeTruthy();
    expect(component.isVisibleMoral).toBeFalsy();
  });

  it('should calculate precio unitario USD correctly', () => {
    component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(10);
    component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(100);
    component.calcularPrecioUnitarioUSD();
    expect(component.FormSolicitud.get('datosMercancia.precioUnitarioUSD')?.value).toBe(10);
  });

  it('should truncate number correctly', () => {
    const result = component.truncar(123.4567);
    expect(result).toBe(123.456);
  });

  it('should change fecha final', () => {
    component.FormSolicitud = new FormBuilder().group({
      datosMercancia: new FormBuilder().group({
        fechaSalida: [''],
      }),
    });
    const nuevoValor = '2025-01-01';
    component.cambioFechaFinal(nuevoValor);
    expect(component.datosMercancia.get('fechaSalida')?.value).toBe(nuevoValor);
  });

  it('should call inicializaCatalogos on ngOnInit', () => {
    const inicializaCatalogosSpy = jest.spyOn(component as any, 'inicializaCatalogos');
    component.ngOnInit();
    expect(inicializaCatalogosSpy).toHaveBeenCalled();
  });

  it('should call destruirNotificador$ complete on ngOnDestroy', () => {
    const destruirNotificadorSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(destruirNotificadorSpy).toHaveBeenCalled();
  });
});