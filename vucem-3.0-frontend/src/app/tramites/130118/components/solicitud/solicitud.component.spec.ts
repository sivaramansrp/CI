import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PeximService } from '../../../../core/services/130118/pexim/pexim.service';
import { SolicitudComponent } from './solicitud.component';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let peximService: jasmine.SpyObj<PeximService>;
  let validacionesService: jasmine.SpyObj<ValidacionesFormularioService>;

  beforeEach(async () => {
    const peximServiceSpy = jasmine.createSpyObj('PeximService', [
      'getRegimenMercancia',
      'getClasifiRegimen',
      'getFraccionArancelariaCatalogo',
      'getNicoCatalogo',
      'getPaisOrigenCatalogo',
      'getPaisDestinoCatalogo',
      'getEstadoCatalogo'
    ]);
    const validacionesServiceSpy = jasmine.createSpyObj('ValidacionesFormularioService', ['isValid']);

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: PeximService, useValue: peximServiceSpy },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    peximService = TestBed.inject(PeximService) as jasmine.SpyObj<PeximService>;
    validacionesService = TestBed.inject(ValidacionesFormularioService) as jasmine.SpyObj<ValidacionesFormularioService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on creation', () => {
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should call getRegimenMercancia on ngOnInit', () => {
    spyOn(component, 'getRegimenMercancia');
    component.ngOnInit();
    expect(component.getRegimenMercancia).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    component.FormSolicitud.get('datosRegimen.regimenMercancia')?.setValue('');
    component.validarFormulario();
    expect(component.FormSolicitud.invalid).toBeTrue();
  });

  it('should escape HTML quotes correctly', () => {
    const result = component.escapeHtmlQuotes('"test"');
    expect(result).toBe('&#34;test&#34;');
  });

  it('should show fields for persona moral', () => {
    component.FormSolicitud.get('datosProducto.razonSocial')?.setValue('Test');
    component.muestraCamposPersona();
    expect(component.isVisibleMoral).toBeTrue();
    expect(component.isVisibleFisica).toBeFalse();
  });

  it('should show fields for persona fisica', () => {
    component.FormSolicitud.get('datosProducto.nombre')?.setValue('Test');
    component.muestraCamposPersona();
    expect(component.isVisibleFisica).toBeTrue();
    expect(component.isVisibleMoral).toBeFalse();
  });

  it('should calculate precio unitario USD correctly', () => {
    component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(10);
    component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(100);
    component.calcularPrecioUnitarioUSD();
    expect(component.FormSolicitud.get('datosMercancia.precioUnitarioUSD')?.value).toBe(10);
  });

  it('should truncate number correctly', () => {
    const result = component.truncar(123.456);
    expect(result).toBe(123.45);
  });

  it('should set datosEstado correctly on getEstado', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getEstadoCatalogo.and.returnValue(of(mockResponse));
    component.getEstado();
    expect(component.datosEstado.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosRegimenMercancia correctly on getRegimenMercancia', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getRegimenMercancia.and.returnValue(of(mockResponse));
    component.getRegimenMercancia();
    expect(component.datosRegimenMercancia.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosClasifiRegimen correctly on getClasifiRegimen', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getClasifiRegimen.and.returnValue(of(mockResponse));
    component.getClasifiRegimen();
    expect(component.datosClasifiRegimen.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosFraccionArancelaria correctly on getFraccionArancelaria', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getFraccionArancelariaCatalogo.and.returnValue(of(mockResponse));
    component.getFraccionArancelaria();
    expect(component.datosFraccionArancelaria.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosNico correctly on getNico', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getNicoCatalogo.and.returnValue(of(mockResponse));
    component.getNico();
    expect(component.datosNico.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosPaisOrigen correctly on getPaisOrigen', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getPaisOrigenCatalogo.and.returnValue(of(mockResponse));
    component.getPaisOrigen();
    expect(component.datosPaisOrigen.catalogos).toEqual(mockResponse.data);
  });

  it('should set datosPaisDestino correctly on getPaisDestino', () => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: 'Test' }], message: 'Success' };
    peximService.getPaisDestinoCatalogo.and.returnValue(of(mockResponse));
    component.getPaisDestino();
    expect(component.datosPaisDestino.catalogos).toEqual(mockResponse.data);
  });
});
