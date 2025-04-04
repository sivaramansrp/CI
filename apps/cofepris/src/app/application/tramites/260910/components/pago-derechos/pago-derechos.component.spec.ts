import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDerechosComponent } from './pago-derechos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerPagoDerechos: jest.fn(),
    };

    const solicitud260910StoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaDeDependencia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
    };

    const solicitud260910QueryMock = {
      seleccionarSolicitud$: of({
        claveDeReferencia: '',
        cadenaDeDependencia: '',
        banco: '',
        liaveDePago: '',
        fechaDePago: '',
        importeDePago: '',
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDerechosComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260910Store, useValue: solicitud260910StoreMock },
        { provide: Solicitud260910Query, useValue: solicitud260910QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(SolicitudDatosService) as jest.Mocked<SolicitudDatosService>;
    solicitud260910Store = TestBed.inject(Solicitud260910Store) as jest.Mocked<Solicitud260910Store>;
    solicitud260910Query = TestBed.inject(Solicitud260910Query) as jest.Mocked<Solicitud260910Query>;

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pagoDeDerechosForm).toBeDefined();
  });

  it('should call obtenerPagoDerechos on initialization', () => {
    solicitudDatosService.obtenerPagoDerechos.mockReturnValue(
      of({
        labelNombre: 'Banco',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          { id: 1, descripcion: 'Banco 1' },
          { id: 2, descripcion: 'Banco 2' },
        ],
      })
    );
    component.obtenerPagoDerechos();
    expect(solicitudDatosService.obtenerPagoDerechos).toHaveBeenCalled();
  });

  it('should update bancoCatalogo on obtenerPagoDerechos', () => {
    const catalogo = {
      labelNombre: 'Banco',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: 'Banco 1' },
        { id: 2, descripcion: 'Banco 2' },
      ],
    };
    solicitudDatosService.obtenerPagoDerechos.mockReturnValue(of(catalogo));
    component.obtenerPagoDerechos();
    expect(component.bancoCatalogo).toEqual(catalogo);
  });

  it('should update store on setClaveDeReferencia', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    component.setClaveDeReferencia(evento);
    expect(solicitud260910Store.setClaveDeReferencia).toHaveBeenCalledWith('test');
  });

  it('should update store on setCadenaDeDependencia', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    component.setCadenaDeDependencia(evento);
    expect(solicitud260910Store.setCadenaDeDependencia).toHaveBeenCalledWith('test');
  });



  it('should update store on setBanco', () => {
    const catalogo = { id: 1, descripcion: 'test'} as any;
    component.setBanco(catalogo);
    expect(solicitud260910Store.setBanco).toHaveBeenCalledWith(1);
  });

  it('should update store on setLiaveDePago', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    component.setLiaveDePago(evento);
    expect(solicitud260910Store.setLiaveDePago).toHaveBeenCalledWith('test');
  });

  it('should update store on seleccionarFechaInicio', () => {
    component.seleccionarFechaInicio('2023-01-01');
    expect(solicitud260910Store.setFechaDePago).toHaveBeenCalledWith('2023-01-01');
  });

  it('should update store on setImporteDePago', () => {
    const evento = { target: { value: '100' } } as unknown as Event;
    component.setImporteDePago(evento);
    expect(solicitud260910Store.setImporteDePago).toHaveBeenCalledWith('100');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
