import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDerechosComponent } from './pago-derechos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { provideHttpClient } from '@angular/common/http';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';

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
      imports: [FormsModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent],
      providers: [
        FormBuilder, SolicitudDatosService, Solicitud260910Store, Solicitud260910Query, provideHttpClient()
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

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
