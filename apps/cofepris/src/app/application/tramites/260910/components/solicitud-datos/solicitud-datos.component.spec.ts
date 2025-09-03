import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { InputCheckComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ModificarMercanciasComponent } from '../../components/mercancias-datos/mercancias-datos.component';
import { provideHttpClient } from '@angular/common/http';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    // Implementaciones de servicios simulados
    const solicitudDatosServiceMock = {
      obtenerSolicitud: jest.fn(),
      obtenerEstadoCatalogo: jest.fn(),
      obtenerDatosDeSolicitud: jest.fn(),
      obtenerMercanciaListo: jest.fn(),
      obtenerRegimenDestinaraListo: jest.fn(),
      obtenerAduanaListo: jest.fn(),
    };

    const solicitud260910StoreMock = {
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setLegalRazonSocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMeterno: jest.fn(),
      setMercanciasDatos: jest.fn(),
      setEstado: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setHacerlos: jest.fn(),
      setRfc: jest.fn(),
      removeMercanciaDatos: jest.fn(),
      setLiveFreshFrozen: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setManifesto: jest.fn(),
    };

    const solicitud260910QueryMock = {
      seleccionarSolicitud$: of({} as Solicitud260910State),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudDatosComponent, ModificarMercanciasComponent],
      imports: [ReactiveFormsModule, InputRadioComponent, TituloComponent, TablaDinamicaComponent, InputFechaComponent, AlertComponent, CatalogoSelectComponent,
        InputCheckComponent
      ],
      providers: [
        FormBuilder, SolicitudDatosService, Solicitud260910Store, Solicitud260910Query, provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260910Store = TestBed.inject(
      Solicitud260910Store
    ) as jest.Mocked<Solicitud260910Store>;
    solicitud260910Query = TestBed.inject(
      Solicitud260910Query
    ) as jest.Mocked<Solicitud260910Query>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should toggle colapsable state', () => {
    component.colapsable = true;
    component.mostrarColapsable();
    expect(component.colapsable).toBe(false);
    component.mostrarColapsable();
    expect(component.colapsable).toBe(true);
  });

  

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'next'
    );
    const destroyNotifierCompleteSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
