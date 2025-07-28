import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDeReporteAnnualComponent } from './datos-de-reporte-annual.component';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { SolicitudService } from '../../services/solicitud.service';
import { BienesProducidos } from '../../models/programas-reporte.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import {
  TablaConEntradaComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

describe('DatosDeReporteAnnualComponent', () => {
  let component: DatosDeReporteAnnualComponent;
  let fixture: any;
  let solicitud150102Store: jest.Mocked<Solicitud150102Store>;
  let solicitud150102Query: Partial<jest.Mocked<Solicitud150102Query>>;
  let solicitudService: jest.Mocked<SolicitudService>;

  beforeEach(async () => {
    const storeMock = {
      actualizarProducidosDatos: jest.fn(() =>
        of([
          {
            bienProducido: 'Producto1',
            sector: 'Sector1',
            fraccion: 'Fraccion1',
            unidadMedida: 'Unidad1',
            claveSector: 'XIII',
            totalBienesProducidos: '100',
            mercadoNacional: '50',
            exportaciones: '50',
          },
        ])
      ),
      actualizarVentasTotales: jest.fn(() => of('1500')),
      actualizarTotalExportaciones: jest.fn(() => of('700')),
      actualizarTotalImportaciones: jest.fn(() => of('300')),
      actualizarPorcentajeExportacion: jest.fn(() => of('50')),
      actualizarSaldo: jest.fn(() => of('300')),
      actualizarBienesProducidosDatos: jest.fn(() => of()),
    } as unknown as jest.Mocked<Solicitud150102Store>;

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
      indiceDeRegistroDelPrograma: -1,
    });

    const queryMock: Partial<jest.Mocked<Solicitud150102Query>> = {
      seleccionarSolicitud$: seleccionarSolicitudMock,
    };

    const serviceMock: Partial<jest.Mocked<SolicitudService>> = {
      obtenerProducidosDatos: jest.fn(() => of()),
      obtenerProgramasReporte: jest.fn(() => of()),
      obtenerReporteFechas: jest.fn(() => of()),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDeReporteAnnualComponent,
        TituloComponent,
        TablaConEntradaComponent,
        TablaDinamicaComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Solicitud150102Store, useValue: storeMock },
        { provide: Solicitud150102Query, useValue: queryMock },
        { provide: SolicitudService, useValue: serviceMock },
      ],
    }).compileComponents();

    solicitud150102Store = TestBed.inject(
      Solicitud150102Store
    ) as jest.Mocked<Solicitud150102Store>;
    solicitud150102Query = TestBed.inject(
      Solicitud150102Query
    ) as jest.Mocked<Solicitud150102Query>;
    solicitudService = TestBed.inject(
      SolicitudService
    ) as jest.Mocked<SolicitudService>;

    fixture = TestBed.createComponent(DatosDeReporteAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formReporteAnnual).toBeDefined();
    expect(component.formReporteAnnual.get('ventasTotales')?.value).toBe(
      '1000'
    );
    expect(component.formReporteAnnual.get('totalExportaciones')?.value).toBe(
      '500'
    );
    expect(component.formReporteAnnual.get('totalImportaciones')?.value).toBe(
      '200'
    );
    expect(component.formReporteAnnual.get('saldo')?.value).toBe('300');
    expect(
      component.formReporteAnnual.get('porcentajeExportacion')?.value
    ).toBe('50');
  });

  it('should call obtenerProducidosDatos on ngOnInit', () => {
    component.esFormularioSoloLectura = false;
    jest.spyOn(component, 'obtenerProducidosDatos');
    component.ngOnInit();
    component.inicializarEstadoFormulario();
    expect(component.obtenerProducidosDatos).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario when esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarDatosFormularioSpy = jest.spyOn(
      component,
      'guardarDatosFormulario'
    );
    component.inicializarEstadoFormulario();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario when esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const inicializarFormularioSpy = jest.spyOn(
      component,
      'inicializarFormulario'
    );
    component.inicializarEstadoFormulario();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
  });

  it('should disable formReporteAnnual when esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(FormGroup.prototype, 'disable');
    component.guardarDatosFormulario();
    expect(disableSpy).toHaveBeenCalled();
    expect(component.formReporteAnnual.disabled).toBe(true);
  });

  it('should enable formReporteAnnual when esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;

    const enableSpy = jest.spyOn(FormGroup.prototype, 'enable');
    component.guardarDatosFormulario();

    expect(enableSpy).toHaveBeenCalled();
    expect(component.formReporteAnnual.enabled).toBe(true);
  });

  it('should set bienesProducidos and update producidosDatos in seleccionarFilaDeEntrada', () => {
    const mockBien: BienesProducidos = {
      bienProducido: 'Producto2',
      sector: 'Sector2',
      fraccion: 'Fraccion2',
      unidadMedida: 'Unidad2',
      claveSector: 'XIV',
      totalBienesProducidos: '200',
      mercadoNacional: '120',
      exportaciones: '80',
    };
    const actualizarProducidosDatosSpy = jest.spyOn(
      solicitud150102Store,
      'actualizarProducidosDatos'
    );
    component.seleccionarFilaDeEntrada(mockBien);
    expect(component.bienesProducidos).toEqual(mockBien);
    expect(actualizarProducidosDatosSpy).toHaveBeenCalledWith([mockBien]);
  });

  it('should add bienesProducidos to bienesProducidosDatos if not exists and update store in agregarBienesProducidos', () => {
    const mockBien: BienesProducidos = {
      bienProducido: 'Producto3',
      sector: 'Sector3',
      fraccion: 'Fraccion3',
      unidadMedida: 'Unidad3',
      claveSector: 'XV',
      totalBienesProducidos: '300',
      mercadoNacional: '200',
      exportaciones: '100',
    };
    component.bienesProducidos = mockBien;
    component.bienesProducidosDatos = [];
    const actualizarBienesProducidosDatosSpy = jest.spyOn(
      solicitud150102Store,
      'actualizarBienesProducidosDatos'
    );
    component.agregarBienesProducidos();
    expect(component.bienesProducidosDatos).toContain(mockBien);
    expect(actualizarBienesProducidosDatosSpy).toHaveBeenCalledWith([mockBien]);
  });

  it('should not add bienesProducidos if it already exists in bienesProducidosDatos in agregarBienesProducidos', () => {
    const mockBien: BienesProducidos = {
      bienProducido: 'Producto4',
      sector: 'Sector4',
      fraccion: 'Fraccion4',
      unidadMedida: 'Unidad4',
      claveSector: 'XVI',
      totalBienesProducidos: '400',
      mercadoNacional: '250',
      exportaciones: '150',
    };
    component.bienesProducidos = mockBien;
    component.bienesProducidosDatos = [mockBien];
    const actualizarBienesProducidosDatosSpy = jest.spyOn(
      solicitud150102Store,
      'actualizarBienesProducidosDatos'
    );
    component.agregarBienesProducidos();
    expect(component.bienesProducidosDatos.length).toBe(1);
    expect(actualizarBienesProducidosDatosSpy).toHaveBeenCalledWith([mockBien]);
  });

  it('should not update bienesProducidosDatos if bienesProducidos is undefined in agregarBienesProducidos', () => {
    component.bienesProducidos = undefined as any;
    component.bienesProducidosDatos = [];
    const actualizarBienesProducidosDatosSpy = jest.spyOn(
      solicitud150102Store,
      'actualizarBienesProducidosDatos'
    );
    component.agregarBienesProducidos();
    expect(component.bienesProducidosDatos).toEqual([]);
    expect(actualizarBienesProducidosDatosSpy).not.toHaveBeenCalled();
  });

  it('should update producidosDatos on obtenerProducidosDatos', () => {
    const mockData: BienesProducidos[] = [
      {
        bienProducido: 'Producto1',
        sector: 'Sector1',
        fraccion: 'Fraccion1',
        unidadMedida: 'Unidad1',
        claveSector: 'XIII',
        totalBienesProducidos: '100',
        mercadoNacional: '50',
        exportaciones: '50',
      },
    ];
    solicitudService.obtenerProducidosDatos.mockReturnValue(of(mockData));
    component.obtenerProducidosDatos();
    expect(solicitud150102Store.actualizarProducidosDatos).toHaveBeenCalledWith(
      mockData
    );
  });

  it('should update ventasTotales on obtenerVentasTotales', () => {
    const mockEvent = {
      target: { value: '1500' },
    } as unknown as Event;

    jest.spyOn(solicitud150102Store, 'actualizarVentasTotales');
    jest.spyOn(component, 'calcularReporteAnnual');

    component.obtenerVentasTotales(mockEvent);

    expect(solicitud150102Store.actualizarVentasTotales).toHaveBeenCalledWith(
      '1500'
    );
    expect(component.calcularReporteAnnual).toHaveBeenCalled();
  });

  it('should update totalExportaciones on obtenerTotalExportaciones', () => {
    const mockEvent = {
      target: { value: '700' },
    } as unknown as Event;

    jest.spyOn(solicitud150102Store, 'actualizarTotalExportaciones');
    jest.spyOn(component, 'calcularReporteAnnual');

    component.obtenerTotalExportaciones(mockEvent);

    expect(
      solicitud150102Store.actualizarTotalExportaciones
    ).toHaveBeenCalledWith('700');
    expect(component.calcularReporteAnnual).toHaveBeenCalled();
  });

  it('should update totalImportaciones on obtenerTotalImportaciones', () => {
    const mockEvent = {
      target: { value: '300' },
    } as unknown as Event;
    jest.spyOn(solicitud150102Store, 'actualizarTotalImportaciones');
    jest.spyOn(component, 'calcularReporteAnnual');
    component.obtenerTotalImportaciones(mockEvent);
    expect(
      solicitud150102Store.actualizarTotalImportaciones
    ).toHaveBeenCalledWith('300');
    expect(component.calcularReporteAnnual).toHaveBeenCalled();
  });

  it('should calculate and update saldo and porcentajeExportacion on calcularReporteAnnual', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '1000',
      totalExportaciones: '500',
      totalImportaciones: '200',
    });
    component.calcularReporteAnnual();
    expect(
      solicitud150102Store.actualizarPorcentajeExportacion
    ).toHaveBeenCalledWith('50');
    expect(solicitud150102Store.actualizarSaldo).toHaveBeenCalledWith('300');
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should return false and add validation message if ventasTotales is empty', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '',
      totalExportaciones: '100',
    });
    const result = component.validarTotalExportaciones();
    expect(result).toBe(false);
    expect(component.mensajesDeValidacion).toEqual(["(Ventas totales deben ser mayores o iguales a cero.) es un campo requerido"]);
  });

  it('should return false and add validation message if totalExportaciones is empty', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '500',
      totalExportaciones: '',
    });
    const result = component.validarTotalExportaciones();
    expect(result).toBe(false);
    expect(component.mensajesDeValidacion).toEqual(["(Total exportaciones deben ser mayores o iguales a cero.) es un campo requerido"]);
  });

  it('should return false and call abrirModal if totalExportaciones > ventasTotales', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '500',
      totalExportaciones: '600',
    });
    const modalSpy = jest.spyOn(component, 'abrirModal');
    const result = component.validarTotalExportaciones();
    expect(result).toBe(false);
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should return true if totalExportaciones <= ventasTotales and both are present', () => {
    component.formReporteAnnual.patchValue({
      ventasTotales: '1000',
      totalExportaciones: '500',
    });
    const result = component.validarTotalExportaciones();
    expect(result).toBe(true);
  });

  it('should reset bienesProducidosSelection if evento length > 0', () => {
    component.bienesProducidosSelection = 5;
    component.seleccionarBienesFilaDeEntrada([{ bienProducido: 'x' } as any]);
    expect(component.bienesProducidosSelection).toBe(-1);
  });

  it('should set nuevaNotificacion and elementoParaEliminar when abrirModal is called', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toEqual(
      expect.objectContaining({
        tipoNotificacion: 'alert',
        categoria: 'danger',
        mensaje: expect.stringContaining('Ventas Totales'),
        txtBtnAceptar: 'Aceptar',
      })
    );
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should remove pedimento at given index if borrar is true', () => {
    component.pedimentos = [
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos).toEqual([
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ]);
  });

  it('should not remove pedimento if borrar is false', () => {
    component.pedimentos = [
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(false);
    expect(component.pedimentos).toEqual([
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ]);
  });

  it('should remove pedimento at given index if borrar is true', () => {
    component.pedimentos = [
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos).toEqual([
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ]);
  });

  it('should not remove pedimento if borrar is false', () => {
    component.pedimentos = [
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(false);
    expect(component.pedimentos).toEqual([
      {
        patente: 1,
        pedimento: 1,
        aduana: 1,
        idTipoPedimento: 1,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
    ]);
  });

  it('should reset bienesProducidosSelection to -1', () => {
    component.bienesProducidosSelection = 3;
    component.eliminarBienesProducidos();
    expect(component.bienesProducidosSelection).toBe(-1);
  });
});
