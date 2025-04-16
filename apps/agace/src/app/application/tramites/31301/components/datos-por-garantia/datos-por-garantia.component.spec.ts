import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPorGarantiaComponent } from './datos-por-garantia.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { of, Subject } from 'rxjs';
import { DatosPorGarantia } from '../../models/solicitud.model';
import {
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
  let solicitud31301StoreMock: any;
  let solicitud31301QueryMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirNombreInstitucionCatalogo: jest
        .fn()
        .mockReturnValue(of({} as CatalogosSelect)),
      conseguirDatosPorGarantia: jest
        .fn()
        .mockReturnValue(of({} as DatosPorGarantia)),
    };

    solicitud31301StoreMock = {
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

    solicitud31301QueryMock = {
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
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31301Store, useValue: solicitud31301StoreMock },
        { provide: Solicitud31301Query, useValue: solicitud31301QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPorGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.polizaDeFianzaForm).toBeDefined();
    expect(component.polizaDeFianzaForm.controls['numeroFolio']).toBeDefined();
  });

  it('should call conseguirNombreInstitucionCatalogo on initialization', () => {
    const spy = jest.spyOn(
      solicitudServiceMock,
      'conseguirNombreInstitucionCatalogo'
    );
    component.conseguirNombreInstitucionCatalogo();
    expect(spy).toHaveBeenCalled();
  });

  it('should call conseguirDatosPorGarantia on initialization', () => {
    const spy = jest.spyOn(solicitudServiceMock, 'conseguirDatosPorGarantia');
    component.conseguirDatosPorGarantia();
    expect(spy).toHaveBeenCalled();
  });

  it('should update the form values when selectSolicitud$ emits', () => {
    const mockState = {
      polizaDeFianzaActual: 1,
      numeroFolio: '12345',
      rfcInstitucion: 'RFC123',
      fechaExpedicion: '2023-01-01',
      fechaInicioVigenciaNo: '2023-01-02',
      fechaFinVigenciaNo: '2023-01-03',
      fechaInicioVigencia: '2023-01-04',
      fechaFinVigencia: '2023-01-05',
      importeTotal: '1000',
    };
    solicitud31301QueryMock.selectSolicitud$ = of(mockState);

    component.ngOnInit();
    expect(component.polizaDeFianzaForm.value).toEqual({
      polizaDeFianzaActual: 1,
      numeroFolio: '12345',
      rfcInstitucion: 'RFC123',
      fechaExpedicion: '2023-01-01',
      fechaInicioVigenciaNo: '2023-01-02',
      fechaFinVigenciaNo: '2023-01-03',
      fechaInicioVigencia: '2023-01-03',
      fechaFinVigencia: '2023-01-05',
      importeTotal: '1000',
    });
  });

  it('should call actualizarPolizaDeFianzaActual when seleccionaNombreInstitucion is triggered', () => {
    const mockCatalogo = { id: '123' } as any;
    component.seleccionaNombreInstitucion(mockCatalogo);
    expect(
      solicitud31301StoreMock.actualizarPolizaDeFianzaActual
    ).toHaveBeenCalledWith('123');
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
