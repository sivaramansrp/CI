import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDerechosComponent } from './pago-derechos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { provideHttpClient } from '@angular/common/http';
import { Catalogo, TituloComponent, CatalogoSelectComponent, InputFechaComponent } from '@libs/shared/data-access-user/src';

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock: jest.Mocked<SolicitudDatosService> = {
      obtenerPagoDerechos: jest.fn().mockReturnValue(of({})),
    } as any;

    const solicitud260910StoreMock: jest.Mocked<Solicitud260910Store> = {
      setClaveDeReferencia: jest.fn(),
      setCadenaDeDependencia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn()
    } as any;

    const solicitud260910QueryMock: jest.Mocked<Solicitud260910Query> = {
      seleccionarSolicitud$: of({
        claveDeReferencia: '',
        cadenaDeDependencia: '',
        banco: '',
        liaveDePago: '',
        fechaDePago: '',
        importeDePago: '',
      })
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PagoDerechosComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputFechaComponent
      ],
      providers: [
        FormBuilder,
        provideHttpClient(),
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

  function mockInputEvent(value: string): Event {
    return {
      target: { value } as HTMLInputElement
    } as unknown as Event;
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pagoDeDerechosForm).toBeDefined();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call setClaveDeReferencia with input value', () => {
    const event = mockInputEvent('ABC123');
    component.setClaveDeReferencia(event);
    expect(solicitud260910Store.setClaveDeReferencia).toHaveBeenCalledWith('ABC123');
  });

  it('should call setCadenaDeDependencia with input value', () => {
    const event = mockInputEvent('DEP123');
    component.setCadenaDeDependencia(event);
    expect(solicitud260910Store.setCadenaDeDependencia).toHaveBeenCalledWith('DEP123');
  });

  it('should call setBanco with catalog id', () => {
    const catalogo: Catalogo = { id: 1, descripcion: 'Banco 123' } as Catalogo;
    component.setBanco(catalogo);
    expect(solicitud260910Store.setBanco).toHaveBeenCalledWith(1);
  });

  it('should call setLiaveDePago with input value', () => {
    const event = mockInputEvent('PAGO123');
    component.setLiaveDePago(event);
    expect(solicitud260910Store.setLiaveDePago).toHaveBeenCalledWith('PAGO123');
  });

  it('should call seleccionarFechaInicio with date string', () => {
    component.seleccionarFechaInicio('2025-09-16');
    expect(solicitud260910Store.setFechaDePago).toHaveBeenCalledWith('2025-09-16');
  });

  it('should call setImporteDePago with input value', () => {
    const event = mockInputEvent('1000');
    component.setImporteDePago(event);
    expect(solicitud260910Store.setImporteDePago).toHaveBeenCalledWith('1000');
  });
});