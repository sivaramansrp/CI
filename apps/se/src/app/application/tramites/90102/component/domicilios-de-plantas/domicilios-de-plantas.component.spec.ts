import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { of, throwError } from 'rxjs';
import { ProsecService } from '../../services/prosec.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;
  let prosecServiceMock: any;

  beforeEach(async () => {
    prosecServiceMock = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(of([])),
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ plantasDatos: [] })),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        DomiciliosDePlantasComponent,
      ], // Import the custom component
      providers: [{ provide: ProsecService, useValue: prosecServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Add this to allow any custom elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.forma).toBeDefined();
    expect(component.forma.controls['modalidad']).toBeDefined();
    expect(component.forma.controls['Estado']).toBeDefined();
    expect(component.forma.controls['RepresentacionFederal']).toBeDefined();
    expect(component.forma.controls['ActividadProductiva']).toBeDefined();
  });

  it('should call obtenserListaEstado and set estadoSeleccionar', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Estado 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(MOCKDATA));

    component.obtenerListaEstado();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith(
      'estado.json'
    );
    expect(component.estadoSeleccionar).toEqual(MOCKDATA);
  });

  it('should call obtenserListaFederal and set RepresentacionFederal', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Federal 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(MOCKDATA));

    component.obtenerListaFederal();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith(
      'federal.json'
    );
    expect(component.RepresentacionFederal).toEqual(MOCKDATA);
  });

  it('should call obtenserListaActividad and set ActividadProductiva', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Actividad 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(MOCKDATA));

    component.obtenerListaActividad();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith(
      'actividad_productiva.json'
    );
    expect(component.ActividadProductiva).toEqual(MOCKDATA);
  });

  it('should call obtenerLista and call obtenserListaFederal and obtenserListaActividad', () => {
    jest.spyOn(component, 'obtenerListaFederal');
    jest.spyOn(component, 'obtenerListaActividad');

    component.obtenerLista();

    expect(component.obtenerListaFederal).toHaveBeenCalled();
    expect(component.obtenerListaActividad).toHaveBeenCalled();
  });

  it('should populate plantasDatos on valid response', () => {
    const mockPlantas = [
      {
        calle: 'Calle 1',
        numeroExterior: '10',
        municipioOAlcaldia: 'X',
        razonSocial: 'Empresa',
      },
    ];
    prosecServiceMock.obtenerTablaDatos.mockReturnValue(
      of({ plantasDatos: mockPlantas })
    );
    component.recuperarDatos();
    expect(component.plantasDatos).toEqual(mockPlantas);
  });

  it('should set plantasDatos to empty array when response is missing plantasDatos', () => {
    prosecServiceMock.obtenerTablaDatos.mockReturnValue(of({}));
    component.recuperarDatos();
    expect(component.plantasDatos).toEqual([]);
  });

  it('should initialize form with values from domiciliosState', () => {
    (component as any).domiciliosState = {
      modalidad: 'A',
      Estado: 'CDMX',
      RepresentacionFederal: 'Sí',
      ActividadProductiva: 'Industria',
    };
    component.initActionFormBuild();
    expect(component.forma.value).toEqual({
      modalidad: 'A',
      Estado: 'CDMX',
      RepresentacionFederal: 'Sí',
      ActividadProductiva: 'Industria',
    });
  });

  it('should disable form when esFormularioSoloLectura is true', () => {
    component.forma = new FormBuilder().group({ Estado: [''] });
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.forma.disabled).toBe(true);
  });

  it('should enable form when esFormularioSoloLectura is false', () => {
    component.forma = new FormBuilder().group({ Estado: [''] });
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.forma.enabled).toBe(true);
  });

  it('should enable form when esFormularioSoloLectura is false', () => {
    component.forma = new FormBuilder().group({ Estado: [''] });
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.forma.enabled).toBe(true);
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    component['esFormularioSoloLectura'] = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false', () => {
    component['esFormularioSoloLectura'] = false;
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should set estadoSeleccionar to [] on error', () => {
  prosecServiceMock.obtenerMenuDesplegable.mockImplementationOnce(() => {
    return throwError(() => new Error('fail'));
  });

  component.estadoSeleccionar = [{ id: 1, descripcion: 'test' }];
  component.obtenerListaEstado();

  expect(component.estadoSeleccionar).toEqual([]);
});

it('should set RepresentacionFederal to [] on error', () => {
  prosecServiceMock.obtenerMenuDesplegable.mockImplementationOnce(() => {
    return throwError(() => new Error('fail'));
  });

  component.RepresentacionFederal = [{ id: 1, descripcion: 'test' }];
  component.obtenerListaFederal();

  expect(component.RepresentacionFederal).toEqual([]);
});

it('should set ActividadProductiva to [] on error', () => {
  prosecServiceMock.obtenerMenuDesplegable.mockImplementationOnce(() => {
    return throwError(() => new Error('fail'));
  });

  component.ActividadProductiva = [{ id: 1, descripcion: 'test' }];
  component.obtenerListaActividad();

  expect(component.ActividadProductiva).toEqual([]);
});

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
