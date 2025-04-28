import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramaACancelarComponent } from './programaACancelar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import  ProgramaACancelar from '@libs/shared/theme/assets/json/140101/Programa.json';

describe('ProgramaACancelarComponent', () => {
  let component: ProgramaACancelarComponent;
  let fixture: ComponentFixture<ProgramaACancelarComponent>;
  let programaACancelarServiceMock: any;
  let tramite140101StoreMock: any;
  let tramite140101QueryMock: any;

  beforeEach(async () => {
    // Mock del servicio ProgramaACancelarService
    programaACancelarServiceMock = {
      obtenerDatos: jest.fn().mockReturnValue(ProgramaACancelar),
    };

    // Mock del store Tramite140101Store
    tramite140101StoreMock = {
      setDatosData: jest.fn(),
      setPrograma: jest.fn(),
      setRadioSelection: jest.fn(),
    };

    // Mock del query Tramite140101Query
    tramite140101QueryMock = {
      selectSolicitud$: of({
        programaACancelar: {
          folioPrograma: '123',
          idProgramaSeleccionado: '1',
          modalidad: 'Modalidad',
          representacionFederal: 'Federal',
          tipoPrograma: 'Tipo',
          estatus: 'Activo',
        },
        solicitudObservaciones: 'Observaciones',
        confirmar: true,
        radio: 0,
        datos: [],
      }),
    };

    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, ProgramaACancelarComponent],
      providers: [
        { provide: ProgramaACancelarService, useValue: programaACancelarServiceMock },
        { provide: Tramite140101Store, useValue: tramite140101StoreMock },
        { provide: Tramite140101Query, useValue: tramite140101QueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    // Creación del componente y detección de cambios
    fixture = TestBed.createComponent(ProgramaACancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the form and load data on ngOnInit', () => {
    // Ensure the mock service returns the expected data
    programaACancelarServiceMock.obtenerDatos.mockReturnValue(ProgramaACancelar);
  
    // Trigger ngOnInit
    component.ngOnInit();
  
    // Verify that the form is initialized
    expect(component.ProgramaForm).toBeTruthy();
  
    // Verify that datosTabla is populated with the mock data
    expect(component.datosTabla).toEqual(ProgramaACancelar);
  
    // Verify that setDatosData is called with the correct data
    expect(tramite140101StoreMock.setDatosData).toBe(ProgramaACancelar);
  });

  it('should update the form and store when valorDeAlternancia is called', () => {
    const mockRow = {
      folioPrograma: '456',
      idProgramaSeleccionado: '2',
      modalidad: 'Nueva Modalidad',
      representacionFederal: 'Nueva Federal',
      tipoPrograma: 'Nuevo Tipo',
      estatus: 'Inactivo',
    };

    component.valorDeAlternancia(mockRow);

    expect(tramite140101StoreMock.setPrograma).toHaveBeenCalledWith(mockRow);
    expect(tramite140101StoreMock.setRadioSelection).toHaveBeenCalledWith(-1);
    // expect(tramite140101StoreMock.setSolicitudObservaciones).toHaveBeenCalledWith('Observaciones');
    // expect(tramite140101StoreMock.setConfirmar).toHaveBeenCalledWith('false');
    expect(component.ProgramaForm.value).toEqual(mockRow);
  });

  it('should call setValoresStore with the correct parameters', () => {
    const spy = jest.spyOn(tramite140101StoreMock, 'setPrograma');
    component.setValoresStore(component.ProgramaForm, 'folioPrograma', 'setPrograma');
    expect(spy).toHaveBeenCalledWith(component.ProgramaForm.get('folioPrograma')?.value);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});