import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { Solicitud } from '../../models/solicitud-datos.model';
import { Catalogo, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';

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
      declarations: [SolicitudDatosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260910Store, useValue: solicitud260910StoreMock },
        { provide: Solicitud260910Query, useValue: solicitud260910QueryMock },
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
    expect(solicitud260910Store.setEstado).toHaveBeenCalledWith(
      mockCatalogo.id
    );
  });

  it('should set licencia sanitaria in store', () => {
    const evento = { target: { value: 'Licencia' } } as unknown as Event;
    component.setLicenciaSanitaria(evento);
    expect(solicitud260910Store.setLicenciaSanitaria).toHaveBeenCalledWith(
      'Licencia'
    );
  });

  it('should set RFC in store', () => {
    const evento = { target: { value: 'RFC' } } as unknown as Event;
    component.setRFC(evento);
    expect(solicitud260910Store.setRfc).toHaveBeenCalledWith('RFC');
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
