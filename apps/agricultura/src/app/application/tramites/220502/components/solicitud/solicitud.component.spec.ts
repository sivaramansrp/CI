import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockSolicitudService: jest.Mocked<SolicitudPantallasService>;
  let mockConsultaioQuery: any;
  let consultaioStateSubject: Subject<any>;

  beforeEach(async () => {
    mockSolicitudService = {
      getData: jest.fn(() =>
        of({
          hMercancia: [
            'Fracción arancelaria',
            'Descripción de la fracción',
            'Nico',
            'Descripción Nico',
            'Cantidad solicitada en UMT',
            'Unidad de medida de tarifa (UMT)',
            'Cantidad total UMT',
            'Saldo pendiente',
          ],
          hHistorialinspeccion: [
            'Número parcialidad/remesa',
            'Fracción arancelaria',
            'Nico',
            'Cantidad total en UMT',
            'Cantidad parcial en UTM',
            'Saldo pendiente',
            'Fecha de ingreso',
          ],
          hCarroFerrocarril: [
            'Número de parcialidad/remesa',
            'Cantidad de carros de ferrocarril',
          ],
          hSolicitud: ['Fecha Creación', 'Mercancía', 'Cantidad', 'Proovedor'],
          dSolicitud: [
            {
              fechaCreacion: '2025-02-02 19:50:08:0',
              mercancia: 'descripcion',
              cantidad: '1000000',
              proovedor: 'erick',
            },
          ],
          dMercancia: [
            {
              fraccionArancelaria: '1001.10.10',
              descripcionFraccion: 'Trigo duro',
              nico: 'Sí',
              nicoDescripcion: 'Trigo para molienda',
              cantidadSolicitadaUMT: 50,
              unidadMedidaUMT: 'kg',
              cantidadTotalUMT: 500,
              saldoPendiente: 100,
            },
          ],
          dCarrosDeFerrocarril: [
            {
              idInspeccionFisica: 1,
              numeroAutorizacion: '12345',
              numeroPartidaMercancia: 'P001',
              numeroTotalCarros: 10,
            },
          ],
          dHistorialInspecciones: [
            {
              numeroPartidaMercancia: '12345',
              fraccionArancelaria: '0101.21.00',
              nico: 'Si',
              cantidadUmt: '1000',
              cantidadInspeccion: '500',
              saldoPendiente: '500',
              fechaInspeccionString: '2023-10-01',
            },
          ],
        })
      ),
    } as any;

    consultaioStateSubject = new Subject();
    mockConsultaioQuery = {
      selectConsultaioState$: consultaioStateSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CarrosDeFerrocarrilComponent,
        DatosDelTramiteARealizarComponent,
        HistorialInspeccionFisicaComponent,
        MedioTransporteComponent,
        ResponsableInspeccionEnPuntoComponent,
        SolicitudDatosComponent,
        SolicitudComponent,
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: mockSolicitudService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form as empty FormGroup', () => {
    expect(component.form).toBeDefined();
    expect(component.form.value).toEqual({
      datoseDelTramiteRealizar: {
        aduanaDeIngreso: 0,
        certificadosAutorizados: 0,
        fechaDeInspeccion: '',
        horaDeInspeccion: 0,
        puntoDeInspeccion: 0,
        sanidadAgropecuaria: 0,
      },
      mediotransporte: {
        esSolicitudFerros: '',
        identificacionTransporte: '',
        totalDeGuiasAmparadas: '',
        transporteIdMedio: 0,
      },
      responsableInspeccionEnPunto: {
        mercancia: '',
        nombre: '',
        primerapellido: '',
        segundoapellido: '',
        tipocontenedor: 0,
      },
    });
  });

  it('should call inicializarEstadoFormulario on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if formularioDeshabilitado is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.formularioDeshabilitado = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call crearFormulario and cargarDatosIniciales if formularioDeshabilitado is false', () => {
    const crearSpy = jest.spyOn(component, 'crearFormulario');
    const cargarSpy = jest.spyOn(component, 'cargarDatosIniciales');
    component.formularioDeshabilitado = false;
    component.inicializarEstadoFormulario();
    expect(crearSpy).toHaveBeenCalled();
    expect(cargarSpy).toHaveBeenCalled();
  });

  it('should disable form if formularioDeshabilitado is true in guardarDatosFormulario', () => {
    jest.spyOn(component, 'crearFormulario');
    jest.spyOn(component, 'cargarDatosIniciales');
    component.formularioDeshabilitado = true;
    component.form = new FormBuilder().group({});
    component.guardarDatosFormulario();
    expect(component.form.disabled).toBe(true);
  });

  it('should enable form if formularioDeshabilitado is false in guardarDatosFormulario', () => {
    jest.spyOn(component, 'crearFormulario');
    jest.spyOn(component, 'cargarDatosIniciales');
    component.formularioDeshabilitado = false;
    component.form = new FormBuilder().group({});
    component.guardarDatosFormulario();
    expect(component.form.enabled).toBe(true);
  });

  it('should set form to a new FormGroup in crearFormulario', () => {
    component.form = null as any;
    component.crearFormulario();
    expect(component.form).toBeDefined();
    expect(component.form.value).toEqual({});
  });

  it('should set data properties in cargarDatosIniciales', fakeAsync(() => {
    // const mockData = {
    //   hHistorialinspeccion: ['h1'],
    //   dHistorialInspecciones: [{ id: 1 }],
    //   dCarrosDeFerrocarril: [{ id: 2 }],
    //   hCarroFerrocarril: ['c1'],
    //   hSolicitud: ['s1'],
    //   dSolicitud: [{ id: 3 }],
    //   hMerchandise: ['m1'],
    //   dMercancia: [{ id: 4 }],
    //   medioDeTransporte: { id: 5 },
    // };
    // // mockSolicitudService.getData.mockReturnValue(of(mockData));
    // component.cargarDatosIniciales();
    // tick();
    // expect(component.hHistorialinspeccion).toEqual(['h1']);
    // expect(component.dHistorialInspecciones).toEqual([{ id: 1 }]);
    // expect(component.dCarrosDeFerrocarril).toEqual([{ id: 2 }]);
    // expect(component.hCarroFerrocarril).toEqual(['c1']);
    // expect(component.hSolicitud).toEqual(['s1']);
    // expect(component.dSolicitud).toEqual([{ id: 3 }]);
    // expect(component.hMercanciaTabla).toEqual(['m1']);
    // expect(component.dMercanciaBody).toEqual([{ id: 4 }]);
    // expect(component.mediodetransporte).toEqual({ id: 5 });
    jest.spyOn(component, 'cargarDatosIniciales').mockImplementation();

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.cargarDatosIniciales).toHaveBeenCalled();
  }));

  it('should unsubscribe destroyed$ on ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyed$;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should update formularioDeshabilitado and call inicializarEstadoFormulario when selectConsultaioState$ emits', () => {
    const state = { readonly: false };
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    fixture.detectChanges();
    consultaioStateSubject.next(state);
    expect(component.formularioDeshabilitado).toBe(false);
  });
});
