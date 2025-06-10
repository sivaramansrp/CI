import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { DomicilioEstablecimientoAduanasComponent } from './domicilio-establecimiento-aduanas.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
import {
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';


const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: true }),
  };

  const mockAvisocalidadQuery = {
    selectSolicitud$: of({ solicitudId: 123 }),
  };

describe('DomicilioEstablecimientoAduanasComponent', () => {
  let component: DomicilioEstablecimientoAduanasComponent;
  let fixture: ComponentFixture<DomicilioEstablecimientoAduanasComponent>;
  let store: DatosDomicilioLegalStore;
  let query: DatosDomicilioLegalQuery;
  let service: DatosDomicilioLegalService;

  beforeEach(async () => {
    const mockQuery = {
      selectSolicitud$: of({
        codigoPostal: '12345',
        estado: 'TestEstado',
        muncipio: 'TestMunicipio',
        localidad: 'TestLocalidad',
        colonia: 'TestColonia',
        calle: 'TestCalle',
        lada: '123',
        telefono: '9876543210',
        avisoCheckbox: true,
        licenciaSanitaria: 'TestLicencia',
      }),
    };

    const mockStore = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMuncipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoCheckbox: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
    };

    const mockService = {
      getObtenerEstadoList: jest
        .fn()
        .mockReturnValue(of({ data: [{ id: 1, descripcion: 'Estado 1' }] })),
      getObtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [] })),
      getObtenerMercanciasDatos: jest.fn().mockReturnValue(of({ data: [] })),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DomicilioEstablecimientoAduanasComponent, // Import the standalone component
        TituloComponent,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
      ],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioEstablecimientoAduanasComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(DatosDomicilioLegalStore);
    query = TestBed.inject(DatosDomicilioLegalQuery);
    service = TestBed.inject(DatosDomicilioLegalService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.domicilio).toBeDefined();
    expect(component.domicilio.get('codigoPostal')?.value).toBe('12345');
    expect(component.domicilio.get('estado')?.value).toBe('TestEstado');
    expect(component.domicilio.get('telefono')?.value).toBe('9876543210');
  });

  it('should fetch estado list on initialization', () => {
    expect(service.getObtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, descripcion: 'Estado 1' }]);
  });

  it('should fetch table data on initialization', () => {
    expect(service.getObtenerTablaDatos).toHaveBeenCalled();
    expect(component.nicoTablaDatos).toEqual([]);
  });

  it('should fetch mercancias data on initialization', () => {
    expect(service.getObtenerMercanciasDatos).toHaveBeenCalled();
    expect(component.mercanciasTablaDatos).toEqual([]);
  });

  it('should set values in the store when setValoresStore is called', () => {
    component.domicilio.get('codigoPostal')?.setValue('54321');
    component.setValoresStore(
      component.domicilio,
      'codigoPostal',
      'setCodigoPostal'
    );
    expect(store.setCodigoPostal).toHaveBeenCalledWith('54321');
  });

  it('should unsubscribe from destroyNotifier$ on destroy', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('should handle null solicitudState gracefully', () => {
    component.solicitudState = null as any;
    component.ngOnInit();
    expect(component.domicilio).toBeDefined();
  });

  it('should handle destroyNotifier$ being called multiple times', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    component.ngOnDestroy(); // Call again to ensure no errors occur

    // Ensure `next` is called twice (once for each `ngOnDestroy` call)
    expect(component['destroyNotifier$'].next).toHaveBeenCalledTimes(2);

    // Ensure `complete` is only called once
    expect(component['destroyNotifier$'].complete).toHaveBeenCalledTimes(1);
  });
  
 it('should set esFormularioSoloLectura from query and call setup methods', () => {
    component.ngOnInit();

    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.obtenerEstadoList).toHaveBeenCalled();
    expect(component.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.obtenerMercanciasDatos).toHaveBeenCalled();
    expect(component.configurarGrupoForm).toHaveBeenCalled();
  });

  it('should disable all forms when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;

    const domicilioDisable = jest.spyOn(component.domicilio, 'disable');
    const agenteDisable = jest.spyOn(component.formAgente, 'disable');
    const mercanciasDisable = jest.spyOn(component.formMercancias, 'disable');

    component.configurarGrupoForm();

    expect(domicilioDisable).toHaveBeenCalled();
    expect(agenteDisable).toHaveBeenCalled();
    expect(mercanciasDisable).toHaveBeenCalled();
  });

  it('should enable domicilio and disable others when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    const domicilioEnable = jest.spyOn(component.domicilio, 'enable');
    const agenteDisable = jest.spyOn(component.formAgente, 'disable');
    const mercanciasDisable = jest.spyOn(component.formMercancias, 'disable');

    component.configurarGrupoForm();

    expect(domicilioEnable).toHaveBeenCalled();
    expect(agenteDisable).toHaveBeenCalled();
    expect(mercanciasDisable).toHaveBeenCalled();
  });
  
});
