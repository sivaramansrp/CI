import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud } from '../../models/solicitud-datos.model';
import { Catalogo, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

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

    const solicitud260101StoreMock = {
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

    const solicitud260101QueryMock = {
      seleccionarSolicitud$: of({} as Solicitud260101State),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudDatosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260101Store, useValue: solicitud260101StoreMock },
        { provide: Solicitud260101Query, useValue: solicitud260101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260101Store = TestBed.inject(
      Solicitud260101Store
    ) as jest.Mocked<Solicitud260101Store>;
    solicitud260101Query = TestBed.inject(
      Solicitud260101Query
    ) as jest.Mocked<Solicitud260101Query>;

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

  it('should call obtenerSolicitud on ngOnInit', () => {
    solicitudDatosService.obtenerSolicitud.mockReturnValue(of({} as Solicitud));
    component.ngOnInit();
    expect(solicitudDatosService.obtenerSolicitud).toHaveBeenCalled();
  });

  it('should call obtenerEstadoCatalogo on ngOnInit', () => {
    solicitudDatosService.obtenerEstadoCatalogo.mockReturnValue(
      of({} as CatalogosSelect)
    );
    component.ngOnInit();
    expect(solicitudDatosService.obtenerEstadoCatalogo).toHaveBeenCalled();
  });

  it('should open modal for modifying mercancías', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'show');
    component.modalElement = {
      nativeElement: document.createElement('div'),
    } as any;
    component.openModificarMercancias();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should set estado in store', () => {
    const mockCatalogo: Catalogo = {
      id: 1,
      descripcion: 'estado 1',
    };
    component.setEstado(mockCatalogo);
    expect(solicitud260101Store.setEstado).toHaveBeenCalledWith(
      mockCatalogo.id
    );
  });

  it('should set licencia sanitaria in store', () => {
    const evento = { target: { value: 'Licencia' } } as unknown as Event;
    component.setLicenciaSanitaria(evento);
    expect(solicitud260101Store.setLicenciaSanitaria).toHaveBeenCalledWith(
      'Licencia'
    );
  });

  it('should set RFC in store', () => {
    const evento = { target: { value: 'RFC' } } as unknown as Event;
    component.setRFC(evento);
    expect(solicitud260101Store.setRfc).toHaveBeenCalledWith('RFC');
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
