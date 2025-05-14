import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let tramite261401StoreMock: jest.Mocked<Tramite261401Store>;
  let tramite261401QueryMock: jest.Mocked<Tramite261401Query>;

  beforeEach(async () => {
    tramite261401StoreMock = {
      actualizarEstado: jest.fn(),
    } as unknown as jest.Mocked<Tramite261401Store>;

    tramite261401QueryMock = {
      selectSolicitud$: of({
        observaciones: 'Test Observations',
      }),
    } as unknown as jest.Mocked<Tramite261401Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, HttpClientModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite261401Store, useValue: tramite261401StoreMock },
        { provide: Tramite261401Query, useValue: tramite261401QueryMock },
        { provide: SolicitudModificacionPermisoSalidaTerritorioService, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data from the query', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('observaciones')?.value).toBe('Test Observations');
  });

  it('should call actualizarEstado in the store when setValoresStore is called', () => {
    const mockForm = new FormBuilder().group({
      observaciones: 'Updated Observations',
    });

    component.setValoresStore(mockForm, 'observaciones');

    expect(tramite261401StoreMock.actualizarEstado).toHaveBeenCalledWith({
      observaciones: 'Updated Observations',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should create the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('observaciones')).toBeTruthy();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
});