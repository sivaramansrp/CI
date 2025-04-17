import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite261402Store } from '../../../../estados/tramites/tramite261402.store';
import { Tramite261402Query } from '../../../../estados/queries/tramite261402.query';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudModificacionPermisoInternacionService } from '../../services/solicitud-modificacion-permiso-internacion.service';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let tramite261402StoreMock: jest.Mocked<Tramite261402Store>;
  let tramite261402QueryMock: jest.Mocked<Tramite261402Query>;

  beforeEach(async () => {
    tramite261402StoreMock = {
      establecerDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite261402Store>;

    tramite261402QueryMock = {
      selectSolicitud$: of({
        observaciones: 'Test Observations',
      }),
    } as unknown as jest.Mocked<Tramite261402Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, HttpClientModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite261402Store, useValue: tramite261402StoreMock },
        { provide: Tramite261402Query, useValue: tramite261402QueryMock },
        { provide: SolicitudModificacionPermisoInternacionService, useValue: {} },
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

  it('should call establecerDatos in the store when setValoresStore is called', () => {
    const mockForm = new FormBuilder().group({
      observaciones: 'Updated Observations',
    });

    component.setValoresStore(mockForm, 'observaciones');

    expect(tramite261402StoreMock.establecerDatos).toHaveBeenCalledWith({
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