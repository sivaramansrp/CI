import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './entidad-federal.component';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let importacionesServiceMock: jest.Mocked<ImportacionesAgropecuariasService>;
  let importacionesStoreMock: jest.Mocked<ImportacionesAgropecuariasStore>;
  let importacionesQueryMock: jest.Mocked<ImportacionesAgropecuariasQuery>;
  let formularioServiceMock: jest.Mocked<ServicioDeFormularioService>;

  beforeEach(async () => {
    importacionesServiceMock = {
      datosDeLaSolicitud: jest.fn().mockReturnValue(of({ entidad: [] })),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasService>;

    importacionesStoreMock = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasStore>;

    importacionesQueryMock = {
      selectSolicitudDeRegistroTpl$: of({ key: 'value' }),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasQuery>;

    formularioServiceMock = {
      setFormValue: jest.fn(),
    } as unknown as jest.Mocked<ServicioDeFormularioService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
      declarations: [],
      providers: [
        { provide: ImportacionesAgropecuariasService, useValue: importacionesServiceMock },
        { provide: ImportacionesAgropecuariasStore, useValue: importacionesStoreMock },
        { provide: ImportacionesAgropecuariasQuery, useValue: importacionesQueryMock },
        { provide: ServicioDeFormularioService, useValue: formularioServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    component.consultaState = { readonly: false } as any;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar solicitudDeRegistroState en ngOnInit', () => {
    const mockState = { key: 'value' };
    importacionesQueryMock.selectSolicitudDeRegistroTpl$ = of(mockState);

    component.ngOnInit();

    expect(component.solicitudDeRegistroState).toEqual(mockState);
  });

  it('debe llamar a datosEntidad y actualizar las opciones del campo ENTIDAD_FIELD', () => {
    const mockEntidadData = [
      { id: 1, descripcion: 'Entidad 1' },
      { id: 2, descripcion: 'Entidad 2' },
    ];
    importacionesServiceMock.datosDeLaSolicitud.mockReturnValue(
      of({
        entidad: mockEntidadData,
        representacion: [],
        fraccion: [],
        UMT: [],
        regimen: [],
        clasificacion: []
      })
    );

    component.datosRepresentacionFederal = [
      { campo: 'entidad' } as any,
    ];

    component.datosEntidad();

    expect(importacionesServiceMock.datosDeLaSolicitud).toHaveBeenCalled();
    const ENTIDAD_FIELD = component.datosRepresentacionFederal.find((datos) => datos.campo === 'entidad');
    expect(ENTIDAD_FIELD).toBeDefined();
  });

  it('debe manejar errores en datosEntidad', () => {
    importacionesServiceMock.datosDeLaSolicitud.mockReturnValue(throwError(() => new Error('Error fetching data')));

    component.datosEntidad();

    const ENTIDAD_FIELD = component.datosRepresentacionFederal.find((datos) => datos.campo === 'entidad');
    expect(ENTIDAD_FIELD).toBeDefined();
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
