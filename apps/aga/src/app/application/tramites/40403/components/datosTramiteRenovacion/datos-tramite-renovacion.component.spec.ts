import { DatosTramiteRenovacionComponent } from './datosTramiteRenovacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite40403Service } from '../../estados/tramite40403.service';
import { Tramite40403Store } from '../../estados/tramite40403.store';
import { Tramite40403Query } from '../../estados/tramite40403.query';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosTramiteRenovacionComponent', () => {
  let component: DatosTramiteRenovacionComponent;
  let fixture: ComponentFixture<DatosTramiteRenovacionComponent>;
  let mockTramite40403Service: jest.Mocked<Tramite40403Service>;
  let mockTramite40403Store: jest.Mocked<Tramite40403Store>;
  let mockTramite40403Query: jest.Mocked<Tramite40403Query>;

  beforeEach(async () => {
    mockTramite40403Service = {
      buscarSolicitudPorCAATe: jest.fn(),
      getTipoDeCaatAerea: jest.fn().mockReturnValue(of([])),
      geTideCodTransportacionAerea: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<Tramite40403Service>;

    mockTramite40403Store = {
      establecerCveFolioCaat: jest.fn(),
      establecerDescripcionTipoCaat: jest.fn(),
      establecerTipoDeCaatAerea: jest.fn(),
      establecerIdeCodTransportacionAerea: jest.fn(),
      establecerCodIataIcao: jest.fn(),
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn(),
      establecerClaveFolioCAAT: jest.fn(),
      setLoading: jest.fn(),
      destroy: jest.fn(),
    } as unknown as jest.Mocked<Tramite40403Store>;

    mockTramite40403Query = {
      selectSeccionState$: of({
        claveFolioCAAT: '1234',
        cveFolioCaat: '1234',
        descripcionTipoCaat: 'Test Description',
        tipoDeCaatAerea: 'Aerea Type',
        ideCodTransportacionAerea: 'Transport Code',
        codIataIcao: 'IATA Code',
      }),
    } as jest.Mocked<Tramite40403Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CatalogoSelectComponent, 
        DatosTramiteRenovacionComponent,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite40403Service, useValue: mockTramite40403Service },
        { provide: Tramite40403Store, useValue: mockTramite40403Store },
        { provide: Tramite40403Query, useValue: mockTramite40403Query }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTramiteRenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should initialize the form and load data', () => {
      const spyInicializarFormulario = jest.spyOn(component, 'inicializarFormulario');
      const spyTipoDeCaatAereaData = jest.spyOn(component, 'tipoDeCaatAereaData');
      const spyIdeCodTransportacionAereaData = jest.spyOn(component, 'ideCodTransportacionAereaData');

      component.ngOnInit();

      expect(spyInicializarFormulario).toHaveBeenCalled();
      expect(spyTipoDeCaatAereaData).toHaveBeenCalled();
      expect(spyIdeCodTransportacionAereaData).toHaveBeenCalled();
    });
  });

  describe('inicializarFormulario', () => {
    it('should create the component and initialize state', () => {
      expect(component).toBeTruthy();
      expect(component.formulario).toBeDefined();
    });
  });

  describe('caatConMayusculas', () => {
    it('should convert the input value to uppercase', () => {
      component.inicializarFormulario();
      const event = { target: { value: 'abcd' } } as unknown as Event;

      component.caatConMayusculas(event);

      expect(component.formulario.get('claveFolioCAAT')?.value).toBe('ABCD');
    });
  });

  describe('establecerCampoValor', () => {
    it('should call store methods with correct values', () => {
      const mockCAAT = {
        claveFolioCAAT: '1234',
        cveFolioCaat: '1234',
        descripcionTipoCaat: 'Test Description',
        tipoDeCaatAerea: 'Aerea Type',
        ideCodTransportacionAerea: 'Transport Code',
        codIataIcao: 'IATA Code',
      };

      component.establecerCampoValor(mockCAAT);

      expect(mockTramite40403Store.establecerCveFolioCaat).toHaveBeenCalledWith('1234');
      expect(mockTramite40403Store.establecerDescripcionTipoCaat).toHaveBeenCalledWith('Test Description');
      expect(mockTramite40403Store.establecerTipoDeCaatAerea).toHaveBeenCalledWith('Aerea Type');
      expect(mockTramite40403Store.establecerIdeCodTransportacionAerea).toHaveBeenCalledWith('Transport Code');
      expect(mockTramite40403Store.establecerCodIataIcao).toHaveBeenCalledWith('IATA Code');
    });
  });

  describe('tipoDeCaatAereaData', () => {
    it('should fetch and set tipoDeCaatAerea data', () => {
      const mockData = [{ id: 1, descripcion: 'Type A' }];
      mockTramite40403Service.getTipoDeCaatAerea.mockReturnValue(of(mockData));

      component.tipoDeCaatAereaData();

      expect(mockTramite40403Service.getTipoDeCaatAerea).toHaveBeenCalled();
      expect(component.tipoDeCaatAerea).toEqual(mockData);
    });
  });

  describe('ideCodTransportacionAereaData', () => {
    it('should fetch and set ideCodTransportacionAerea data', () => {
      const mockData = [{ id: 1, descripcion: 'Code A' }];
      mockTramite40403Service.geTideCodTransportacionAerea.mockReturnValue(of(mockData));

      component.ideCodTransportacionAereaData();

      expect(mockTramite40403Service.geTideCodTransportacionAerea).toHaveBeenCalled();
      expect(component.ideCodTransportacionAerea).toEqual(mockData);
    });
  });

  describe('setValoresStore', () => {
    it('should call the correct store method with the form value', () => {
      component.inicializarFormulario();
      component.formulario.get('claveFolioCAAT')?.setValue('1234');

      component.setValoresStore(component.formulario, 'claveFolioCAAT', 'establecerCveFolioCaat');

      expect(mockTramite40403Store.establecerCveFolioCaat).toHaveBeenCalledWith('1234');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$', () => {
      const spy = jest.spyOn(component['destroyNotifier$'], 'complete');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});