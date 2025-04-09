import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ModificarDestinatarioComponent } from './modificar-destinatario.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { provideHttpClient } from '@angular/common/http';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

describe('ModificarDestinatarioComponent', () => {
  let component: ModificarDestinatarioComponent;
  let fixture: ComponentFixture<ModificarDestinatarioComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerDestinatarioCatalogos: jest.fn(),
      obtenerDestinatarioRadio: jest.fn(),
      obtenerDestinatarioImitar: jest.fn(),
    };

    const solicitud260910StoreMock = {
      setDomicilioPais: jest.fn(),
      setTipoPersona: jest.fn(),
      setModificarRFC: jest.fn(),
      setDenominacion: jest.fn(),
      setDomicilioEstado: jest.fn(),
      setDomicilioMunicipio: jest.fn(),
      setDomicilioLocalidad: jest.fn(),
      setDomicilioCodigo: jest.fn(),
      setDomicilioColonia: jest.fn(),
      setDomicilioCalle: jest.fn(),
      setDomicilioNumeroExterior: jest.fn(),
      setDomicilioNumeroInterior: jest.fn(),
      setDomicilioLada: jest.fn(),
      setDomicilioTelefono: jest.fn(),
      setDomicilioCorreoElectronico: jest.fn(),
      addDestinatarioDato: jest.fn(),
    };

    const solicitud260910QueryMock = {
      seleccionarSolicitud$: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ModificarDestinatarioComponent],
      imports: [ReactiveFormsModule, TituloComponent, InputRadioComponent, CatalogoSelectComponent],
      providers: [SolicitudDatosService,Solicitud260910Store, Solicitud260910Query, provideHttpClient()]
    }).compileComponents();

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260910Store = TestBed.inject(
      Solicitud260910Store
    ) as jest.Mocked<Solicitud260910Store>;
    solicitud260910Query = TestBed.inject(
      Solicitud260910Query
    ) as jest.Mocked<Solicitud260910Query>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificarDestinatarioForm).toBeDefined();
  });

  it('should reset form on limpiarDestinatario', () => {
    component.limpiarDestinatario();
    expect(component.modificarDestinatarioForm.pristine).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
