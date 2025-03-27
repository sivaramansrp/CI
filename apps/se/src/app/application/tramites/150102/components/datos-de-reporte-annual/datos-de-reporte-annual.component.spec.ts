import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDeReporteAnnualComponent } from './datos-de-reporte-annual.component';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { SolicitudService } from '../../services/solicitud.service';
import { BienesProducidos } from '../../models/programas-reporte.model';

describe('DatosDeReporteAnnualComponent', () => {
  let component: DatosDeReporteAnnualComponent;
  let fixture: any;
  let solicitud150102Store: jest.Mocked<Solicitud150102Store>;
  let solicitud150102Query: Partial<jest.Mocked<Solicitud150102Query>>;
  let solicitudService: jest.Mocked<SolicitudService>;

  beforeEach(async () => {
    const storeMock: Partial<jest.Mocked<Solicitud150102Store>> = {
      actualizarProducidosDatos: jest.fn(),
      actualizarVentasTotales: jest.fn(),
      actualizarTotalExportaciones: jest.fn(),
      actualizarTotalImportaciones: jest.fn(),
      actualizarPorcentajeExportacion: jest.fn(),
      actualizarSaldo: jest.fn(),
      actualizarBienesProducidosDatos: jest.fn(),
    };

    const seleccionarSolicitudMock = of({
      ventasTotales: '1000',
      totalExportaciones: '500',
      totalImportaciones: '200',
      saldo: '300',
      porcentajeExportacion: '50',
      producidosDatos: [],
      bienesProducidosDatos: [],
      inicio: '2023-01-01',
      fin: '2023-12-31',
      folioPrograma: '12345',
      modalidad: 'modalidad-example',
      tipoPrograma: '',
      estatus: 'active',
    });

    const queryMock: Partial<jest.Mocked<Solicitud150102Query>> = {
      seleccionarSolicitud$: seleccionarSolicitudMock,
    };

    const serviceMock: Partial<jest.Mocked<SolicitudService>> = {
      obtenerProducidosDatos: jest.fn(),
      obtenerProgramasReporte: jest.fn(),
      obtenerReporteFechas: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosDeReporteAnnualComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Solicitud150102Store, useValue: storeMock },
        { provide: Solicitud150102Query, useValue: queryMock },
        { provide: SolicitudService, useValue: serviceMock },
      ],
    }).compileComponents();

    solicitud150102Store = TestBed.inject(Solicitud150102Store) as jest.Mocked<Solicitud150102Store>;
    solicitud150102Query = TestBed.inject(Solicitud150102Query) as jest.Mocked<Solicitud150102Query>;
    solicitudService = TestBed.inject(SolicitudService) as jest.Mocked<SolicitudService>;

    fixture = TestBed.createComponent(DatosDeReporteAnnualComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formReporteAnnual).toBeDefined();
    expect(component.formReporteAnnual.get('ventasTotales')?.value).toBe('1000');
    expect(component.formReporteAnnual.get('totalExportaciones')?.value).toBe('500');
    expect(component.formReporteAnnual.get('totalImportaciones')?.value).toBe('200');
    expect(component.formReporteAnnual.get('saldo')?.value).toBe('300');
    expect(component.formReporteAnnual.get('porcentajeExportacion')?.value).toBe('50');
  });

  it('should call obtenerProducidosDatos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'obtenerProducidosDatos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update producidosDatos on obtenerProducidosDatos', () => {
    const mockData: BienesProducidos[] = [
      {
        bienProducido: 'Producto1',
        sector: 'Sector1',
        fraccion: 'Fraccion1',
        unidadMedida: 'Unidad1',
        claveSector:'XIII',
        totalBienesProducidos: '100',
        mercadoNacional: '50',
        exportaciones: '50',
      },
    ];
    solicitudService.obtenerProducidosDatos.mockReturnValue(of(mockData));
    component.obtenerProducidosDatos();
    expect(solicitud150102Store.actualizarProducidosDatos).toHaveBeenCalledWith(mockData);
  });

  it('should update ventasTotales on obtenerVentasTotales', () => {
    const event = { target: { value: '1500' } } as any;
    component.obtenerVentasTotales(event);
    expect(solicitud150102Store.actualizarVentasTotales).toHaveBeenCalledWith('1500');
  });

  it('should update totalExportaciones on obtenerTotalExportaciones', () => {
    const event = { target: { value: '700' } } as any;
    component.obtenerTotalExportaciones(event);
    expect(solicitud150102Store.actualizarTotalExportaciones).toHaveBeenCalledWith('700');
  });

  it('should update totalImportaciones on obtenerTotalImportaciones', () => {
    const event = { target: { value: '300' } } as any;
    component.obtenerTotalImportaciones(event);
    expect(solicitud150102Store.actualizarTotalImportaciones).toHaveBeenCalledWith('300');
  });

  it('should calculate and update saldo and porcentajeExportacion on calcularReporteAnnual', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '1000',
      totalExportaciones: '500',
      totalImportaciones: '200',
    });
    component.calcularReporteAnnual();
    expect(solicitud150102Store.actualizarPorcentajeExportacion).toHaveBeenCalledWith('50');
    expect(solicitud150102Store.actualizarSaldo).toHaveBeenCalledWith('300');
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
