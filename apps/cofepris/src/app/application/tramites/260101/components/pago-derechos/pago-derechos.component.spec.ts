import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDerechosComponent } from './pago-derechos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerPagoDerechos: jest.fn(),
    };

    const solicitud260101StoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaDeDependencia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
    };

    const solicitud260101QueryMock = {
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
        { provide: Solicitud260101Store, useValue: solicitud260101StoreMock },
        { provide: Solicitud260101Query, useValue: solicitud260101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(SolicitudDatosService) as jest.Mocked<SolicitudDatosService>;
    solicitud260101Store = TestBed.inject(Solicitud260101Store) as jest.Mocked<Solicitud260101Store>;
    solicitud260101Query = TestBed.inject(Solicitud260101Query) as jest.Mocked<Solicitud260101Query>;

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
    expect(solicitud260101Store.setClaveDeReferencia).toHaveBeenCalledWith('test');
  });

  it('should update store on setCadenaDeDependencia', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    component.setCadenaDeDependencia(evento);
    expect(solicitud260101Store.setCadenaDeDependencia).toHaveBeenCalledWith('test');
  });



  it('should update store on setBanco', () => {
    const catalogo = { id: 1, descripcion: 'test'} as any;
    component.setBanco(catalogo);
    expect(solicitud260101Store.setBanco).toHaveBeenCalledWith(1);
  });

  it('should update store on setLiaveDePago', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    component.setLiaveDePago(evento);
    expect(solicitud260101Store.setLiaveDePago).toHaveBeenCalledWith('test');
  });

  it('should update store on seleccionarFechaInicio', () => {
    component.seleccionarFechaInicio('2023-01-01');
    expect(solicitud260101Store.setFechaDePago).toHaveBeenCalledWith('2023-01-01');
  });

  it('should update store on setImporteDePago', () => {
    const evento = { target: { value: '100' } } as unknown as Event;
    component.setImporteDePago(evento);
    expect(solicitud260101Store.setImporteDePago).toHaveBeenCalledWith('100');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
