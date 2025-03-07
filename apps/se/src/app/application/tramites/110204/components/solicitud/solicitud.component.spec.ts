import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SolicitudComponent } from './solicitud.component';
import { PeximService, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Tramite130118Store } from '../../estados/tramites/tramite130118.store';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let peximService: jasmine.SpyObj<PeximService>;
  let validacionesService: jasmine.SpyObj<ValidacionesFormularioService>;
  let tramite130118Store: jasmine.SpyObj<Tramite130118Store>;

  beforeEach(async () => {
    const peximServiceSpy = jasmine.createSpyObj('PeximService', ['getRegimenMercancia', 'getClasifiRegimen', 'getFraccionArancelariaCatalogo', 'getNicoCatalogo', 'getUnidadMedidaTarifariaCatalogo', 'getPaisOrigenCatalogo', 'getPaisDestinoCatalogo', 'getMolinoCatalogo', 'getEstadoCatalogo', 'getRepresentacionFederal']);
    const validacionesServiceSpy = jasmine.createSpyObj('ValidacionesFormularioService', ['isValid']);
    const tramite130118StoreSpy = jasmine.createSpyObj('Tramite130118Store', ['setRegimenMercancia', 'setClasifiRegimen', 'setFraccionArancelaria', 'setNico', 'setUnidadMedidaTarifaria', 'setPaisOrigen', 'setPaisDestino', 'setMolino', 'setEstado', 'setRepresentacionFederal']);

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PeximService, useValue: peximServiceSpy },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceSpy },
        { provide: Tramite130118Store, useValue: tramite130118StoreSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    peximService = TestBed.inject(PeximService) as jasmine.SpyObj<PeximService>;
    validacionesService = TestBed.inject(ValidacionesFormularioService) as jasmine.SpyObj<ValidacionesFormularioService>;
    tramite130118Store = TestBed.inject(Tramite130118Store) as jasmine.SpyObj<Tramite130118Store>;

    peximService.getRegimenMercancia.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getClasifiRegimen.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getFraccionArancelariaCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getNicoCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getUnidadMedidaTarifariaCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getPaisOrigenCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getPaisDestinoCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getMolinoCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getEstadoCatalogo.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    peximService.getRepresentacionFederal.and.returnValue(of({ code: 200, message: 'Success', data: [] }));

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
    expect(peximService.getMolinoCatalogo).toHaveBeenCalled();
    expect(peximService.getEstadoCatalogo).toHaveBeenCalled();
    expect(peximService.getRepresentacionFederal).toHaveBeenCalled();
  });

  it('should initialize form on creation', () => {
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should validate form field', () => {
    const form = component.FormSolicitud;
    const field = 'datosRegimen.regimenMercancia';
    validacionesService.isValid.and.returnValue(true);
    expect(component.isValid(form, field)).toBeTrue();
    expect(validacionesService.isValid).toHaveBeenCalledWith(form, field);
  });

  it('should create form on initialization', () => {
    component.crearFormSolicitud();
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should set regimenMercancia on selection', () => {
    component.FormSolicitud.get('regimenMercancia')?.setValue('test');
    component.regimenMercanciaSeleccion();
    expect(tramite130118Store.setRegimenMercancia).toHaveBeenCalledWith('test');
  });

  it('should set clasifiRegimen on selection', () => {
    component.FormSolicitud.get('clasifiRegimen')?.setValue('test');
    component.clasifiRegimenSeleccion();
    expect(tramite130118Store.setClasifiRegimen).toHaveBeenCalledWith('test');
  });

  it('should set fraccionArancelaria on selection', () => {
    component.FormSolicitud.get('fraccionArancelaria')?.setValue('test');
    component.fraccionArancelariaSeleccion();
    expect(tramite130118Store.setFraccionArancelaria).toHaveBeenCalledWith('test');
  });

  it('should set nico on selection', () => {
    component.FormSolicitud.get('nico')?.setValue('test');
    component.nicoSeleccion();
    expect(tramite130118Store.setNico).toHaveBeenCalledWith('test');
  });

  it('should set unidadMedidaTarifaria on selection', () => {
    component.FormSolicitud.get('unidadMedidaTarifaria')?.setValue('test');
    component.unidadMedidaTarifariaSeleccion();
    expect(tramite130118Store.setUnidadMedidaTarifaria).toHaveBeenCalledWith('test');
  });

  it('should set paisOrigen on selection', () => {
    component.FormSolicitud.get('paisOrigen')?.setValue('test');
    component.paisOrigenSeleccion();
    expect(tramite130118Store.setPaisOrigen).toHaveBeenCalledWith('test');
  });

  it('should set paisDestino on selection', () => {
    component.FormSolicitud.get('paisDestino')?.setValue('test');
    component.paisDestinoSeleccion();
    expect(tramite130118Store.setPaisDestino).toHaveBeenCalledWith('test');
  });

  it('should set molino on selection', () => {
    component.FormSolicitud.get('molino')?.setValue('test');
    component.molinoSeleccion();
    expect(tramite130118Store.setMolino).toHaveBeenCalledWith('test');
  });

  it('should set estado on selection', () => {
    component.FormSolicitud.get('estado')?.setValue('test');
    component.estadoSeleccion();
    expect(tramite130118Store.setEstado).toHaveBeenCalledWith('test');
  });

  it('should set representacionFederal on selection', () => {
    component.FormSolicitud.get('representacionFederal')?.setValue('test');
    component.representacionFederalSeleccion();
    expect(tramite130118Store.setRepresentacionFederal).toHaveBeenCalledWith('test');
  });

  it('should validate form', () => {
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

  it('should change fecha final', () => {
    const nuevoValor = '2023-01-01';
    component.cambioFechaFinal(nuevoValor);
    expect(component.datosMercancia.get('fechaFinal')?.value).toBe(nuevoValor);
  });
});
