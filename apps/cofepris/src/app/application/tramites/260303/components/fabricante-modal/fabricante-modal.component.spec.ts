import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabricanteModalComponent } from './fabricante-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Tramite260303Store, createInitialState as createTramiteInitialState } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { ConsultaioQuery, createConsultaInitialState } from '@ng-mf/data-access-user';
import { of} from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FabricanteModalComponent', () => {
  let componente: FabricanteModalComponent;
  let fixture: ComponentFixture<FabricanteModalComponent>;
  let tramiteStore: jest.Mocked<Tramite260303Store>;
  let tramiteQuery: jest.Mocked<Tramite260303Query>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    const tramiteStoreMock: Partial<jest.Mocked<Tramite260303Store>> = {
      SetTercerosRelacionadosDenominacionSocial: jest.fn(),
    };

    const tramiteQueryMock: Partial<jest.Mocked<Tramite260303Query>> = {
      selectSolicitud$: of(createTramiteInitialState()),
    };

    const consultaioQueryMock: Partial<jest.Mocked<ConsultaioQuery>> = {
      selectConsultaioState$: of({ ...createConsultaInitialState(), readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        FabricanteModalComponent,
        BsModalRef,
        { provide: Tramite260303Store, useValue: tramiteStoreMock },
        { provide: Tramite260303Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteModalComponent);
    componente = fixture.componentInstance;

    tramiteStore = TestBed.inject(Tramite260303Store) as jest.Mocked<Tramite260303Store>;
    tramiteQuery = TestBed.inject(Tramite260303Query) as jest.Mocked<Tramite260303Query>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  afterEach(() => {
    componente.ngOnDestroy();
  });

  it('debería crear el componente correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario al llamar cerrarTercerosRelacionadosForm', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarTercerosRelacionadosForm();

    expect(componente.tercerosRelacionadosForm).toBeDefined();
    expect(componente.tercerosRelacionadosForm.get('denominacionSocial')?.value).toBe(createTramiteInitialState().tercerosRelacionadosDenominacionSocial);
  });

  it('debería establecer valor en el store al llamar setValoresStore', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarTercerosRelacionadosForm();

    componente.tercerosRelacionadosForm.get('denominacionSocial')?.setValue('Nuevo Valor');
    componente.setValoresStore(componente.tercerosRelacionadosForm, 'denominacionSocial', 'SetTercerosRelacionadosDenominacionSocial');

    expect(tramiteStore.SetTercerosRelacionadosDenominacionSocial).toHaveBeenCalledWith('Nuevo Valor');
  });

  it('debería deshabilitar el formulario si es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esFormularioSoloLectura = true;
    componente.cerrarTercerosRelacionadosForm();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.disabled).toBe(true);
  });

  it('debería habilitar el formulario si no es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esFormularioSoloLectura = false;
    componente.cerrarTercerosRelacionadosForm();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.enabled).toBe(true);
  });

  it('debería emitir next y complete en destroyNotifier$ al llamar ngOnDestroy', () => {
    const spyNext = jest.spyOn(componente['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyNotifier$'], 'complete');

    componente.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
