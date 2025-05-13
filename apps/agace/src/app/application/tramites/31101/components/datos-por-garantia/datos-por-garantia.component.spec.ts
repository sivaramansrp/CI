import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPorGarantiaComponent } from './datos-por-garantia.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { of, Subject } from 'rxjs';
import { DatosPorGarantia } from '../../models/solicitud.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputFechaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosPorGarantiaComponent', () => {
  let component: DatosPorGarantiaComponent;
  let fixture: ComponentFixture<DatosPorGarantiaComponent>;
  let solicitudServiceMock: any;
  let solicitud31101StoreMock: any;
  let solicitud31101QueryMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirNombreInstitucionCatalogo: jest
        .fn()
        .mockReturnValue(of({} as CatalogosSelect)),
      conseguirDatosPorGarantia: jest
        .fn()
        .mockReturnValue(of({} as DatosPorGarantia)),
    };

    solicitud31101StoreMock = {
      actualizarPolizaDeFianzaActual: jest.fn(),
      actualizarNumeroFolio: jest.fn(),
      actualizarRfcInstitucion: jest.fn(),
      actualizarFechaExpedicion: jest.fn(),
      actualizarFechaInicioVigenciaNo: jest.fn(),
      actualizarFechaFinVigenciaNo: jest.fn(),
      actualizarFechaInicioVigencia: jest.fn(),
      actualizarFechaFinVigencia: jest.fn(),
      actualizarImporteTotal: jest.fn(),
    };

    solicitud31101QueryMock = {
      selectSolicitud$: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatosPorGarantiaComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputFechaComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreMock },
        { provide: Solicitud31101Query, useValue: solicitud31101QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPorGarantiaComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
  });

  it('should call conseguirNombreInstitucionCatalogo on initialization', () => {
    const spy = jest.spyOn(
      solicitudServiceMock,
      'conseguirNombreInstitucionCatalogo'
    );
    component.conseguirNombreInstitucionCatalogo();
  });

  it('should call conseguirDatosPorGarantia on initialization', () => {
    const spy = jest.spyOn(solicitudServiceMock, 'conseguirDatosPorGarantia');
    component.conseguirDatosPorGarantia();
  });

  it('should update the form values when selectSolicitud$ emits', () => {
    const mockState = {
      polizaDeFianzaActual: 1,
      numeroFolio: '12345',
      rfcInstitucion: 'RFC123',
      fechaExpedicion: '01/01/2023',
      fechaInicioVigenciaNo: '01/02/2023',
      fechaFinVigenciaNo: '01/03/2023',
      fechaInicioVigencia: '01/04/2023',
      fechaFinVigencia: '01/05/2023',
      importeTotal: '1000',
    };

    component.ngOnInit();
  });

  it('should call actualizarPolizaDeFianzaActual when seleccionaNombreInstitucion is triggered', () => {
    const mockCatalogo = { id: 1, descripcion: 'test' } as Catalogo;
    component.seleccionaNombreInstitucion(mockCatalogo);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
  });
});
