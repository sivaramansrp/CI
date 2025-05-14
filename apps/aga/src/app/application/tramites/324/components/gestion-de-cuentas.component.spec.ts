import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionDeCuentasComponent } from './gestion-de-cuentas.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { TecnologicosService } from '../service/tecnologicos.service';
import { Tramite324Store } from '../state/Tramite324.store';
import { Tramite324Query } from '../state/Tramite324.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('GestionDeCuentasComponent', () => {
  let component: GestionDeCuentasComponent;
  let fixture: ComponentFixture<GestionDeCuentasComponent>;
  let tecnologicosServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    tecnologicosServiceMock = {
      obtenerDatosAduana: jest.fn().mockReturnValue(of([])),
      obtenerDatosRol: jest.fn().mockReturnValue(of([])),
      obtenerDatosSistema: jest.fn().mockReturnValue(of([])),
      obtenerDatosTipoMovimiento: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      setAduana: jest.fn(),
      setRol: jest.fn(),
      setSistema: jest.fn(),
      setTipoMovimiento: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        rfc: 'RFC123',
        aduana: 'Aduana1',
        sistema: 'Sistema1',
        rol: 'Rol1',
        tipoMovimiento: 'Movimiento1',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,GestionDeCuentasComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: TecnologicosService, useValue: tecnologicosServiceMock },
        { provide: Tramite324Store, useValue: tramiteStoreMock },
        { provide: Tramite324Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDeCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    jest.spyOn(component, 'obtenerDatosAduana');
    jest.spyOn(component, 'obtenerDatosRol');
    jest.spyOn(component, 'obtenerDatosSistema');
    jest.spyOn(component, 'obtenerDatosTipoMovimiento');
    jest.spyOn(component, 'donanteDomicilio');

    component.ngOnInit();

    expect(component.accesosForm).toBeDefined();
    expect(component.obtenerDatosAduana).toHaveBeenCalled();
    expect(component.obtenerDatosRol).toHaveBeenCalled();
    expect(component.obtenerDatosSistema).toHaveBeenCalled();
    expect(component.obtenerDatosTipoMovimiento).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should fetch aduana data and update catalog', () => {
    component.obtenerDatosAduana();
    expect(tecnologicosServiceMock.obtenerDatosAduana).toHaveBeenCalled();
    expect(component.aduanaCatalogo.catalogos).toEqual([]);
  });

  it('should fetch rol data and update catalog', () => {
    component.obtenerDatosRol();
    expect(tecnologicosServiceMock.obtenerDatosRol).toHaveBeenCalled();
    expect(component.rolCatalogo.catalogos).toEqual([]);
  });

  it('should fetch sistema data and update catalog', () => {
    component.obtenerDatosSistema();
    expect(tecnologicosServiceMock.obtenerDatosSistema).toHaveBeenCalled();
    expect(component.sistemaCatalogo.catalogos).toEqual([]);
  });

  it('should fetch tipoMovimiento data and update catalog', () => {
    component.obtenerDatosTipoMovimiento();
    expect(tecnologicosServiceMock.obtenerDatosTipoMovimiento).toHaveBeenCalled();
    expect(component.movimientoCatalogo.catalogos).toEqual([]);
  });

  it('should open the modal when abrirAccesos is called', () => {
    const modalElementMock = {
      nativeElement: document.createElement('div'),
    };
    component.modalElementAccesos = modalElementMock as any;
  
    const modalInstanceMock = {
      show: jest.fn(),
    };
    jest.spyOn(global as any, 'Modal').mockImplementation(() => modalInstanceMock);
  
    component.abrirAccesos();
  
    expect(modalInstanceMock.show).toHaveBeenCalled();
  });

  it('should add a new access when agregarAccesos is called with valid form', () => {
    component.accesosForm.setValue({
      rfc: 'RFC123',
      aduana: 'Aduana1',
      sistema: 'Sistema1',
      rol: 'Rol1',
      tipoMovimiento: 'Movimiento1',
    });

    component.agregarAccesos();

    expect(component.accesosTablaDatos.length).toBe(1);
    expect(component.accesosTablaDatos[0]).toEqual({
      rfc: 'RFC123',
      aduana: 'Aduana1',
      sistema: 'Sistema1',
      rol: 'Rol1',
      tipoMovimiento: 'Movimiento1',
    });
  });

  it('should not add a new access when agregarAccesos is called with invalid form', () => {
    component.accesosForm.setValue({
      rfc: '',
      aduana: '',
      sistema: '',
      rol: '',
      tipoMovimiento: '',
    });

    component.agregarAccesos();

    expect(component.accesosTablaDatos.length).toBe(0);
  });

  it('should validate a form field using esValido', () => {
    const result = component.esValido(component.accesosForm, 'rfc');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.accesosForm, 'rfc');
    expect(result).toBe(true);
  });

  it('should update store values using setValoresStore', () => {
    component.accesosForm.setValue({
      rfc: 'RFC123',
      aduana: 'Aduana1',
      sistema: 'Sistema1',
      rol: 'Rol1',
      tipoMovimiento: 'Movimiento1',
    });

    component.setValoresStore(component.accesosForm, 'rfc', 'setAduana');
    expect(tramiteStoreMock.setAduana).toHaveBeenCalledWith('RFC123');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(true);
  });
});