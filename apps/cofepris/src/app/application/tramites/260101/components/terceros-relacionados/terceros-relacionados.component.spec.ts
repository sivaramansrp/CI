import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Destinatario } from '../../models/destinatario.model';
import { Fabricante } from '../../models/fabricante.model';
import { Modal } from 'bootstrap';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn(),
      obtenerFabricanteListo: jest.fn(),
    };

    const solicitud260101StoreMock = {
      setDestinatarioDatos: jest.fn(),
      removeDestinatarioDato: jest.fn(),
    };

    const solicitud260101QueryMock = {
      seleccionarSolicitud$: of({
        destinatarioDatos: [],
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
      providers: [
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260101Store, useValue: solicitud260101StoreMock },
        { provide: Solicitud260101Query, useValue: solicitud260101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(SolicitudDatosService) as jest.Mocked<SolicitudDatosService>;
    solicitud260101Store = TestBed.inject(Solicitud260101Store) as jest.Mocked<Solicitud260101Store>;
    solicitud260101Query = TestBed.inject(Solicitud260101Query) as jest.Mocked<Solicitud260101Query>;

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty destinatarioDatos and subscribe to seleccionarSolicitud$', () => {
    expect(component.destinatarioDatos).toEqual([]);
    expect(solicitud260101Query.seleccionarSolicitud$).toBeDefined();
  });

  it('should call obtenerDestinatarioListo and set destinatarioDatos on service response', () => {
    const mockDestinatarios: Destinatario[] = [{ nombre: 'John Doe' }] as Destinatario[];
    solicitudDatosService.obtenerDestinatarioListo.mockReturnValue(of(mockDestinatarios));

    component.obtenerDestinatarioListo();

    expect(solicitudDatosService.obtenerDestinatarioListo).toHaveBeenCalled();
    expect(component.destinatarioDatos).toEqual(mockDestinatarios);
    expect(solicitud260101Store.setDestinatarioDatos).toHaveBeenCalledWith(mockDestinatarios);
  });

  it('should call obtenerFabricanteListo and set fabricanteDatos on service response', () => {
    const mockFabricantes: Fabricante[] = [{ nombre: 'ABC Corp' }] as Fabricante[];
    solicitudDatosService.obtenerFabricanteListo.mockReturnValue(of(mockFabricantes));

    component.obtenerFabricanteListo();

    expect(solicitudDatosService.obtenerFabricanteListo).toHaveBeenCalled();
    expect(component.fabricanteDatos).toEqual(mockFabricantes);
  });

  it('should open modal when openModificarMercancias is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'show');
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;

    component.openModificarMercancias();

    expect(modalSpy).toHaveBeenCalled();
  });

  it('should add destinatarioDatos to selectedDestinatario', () => {
    const mockDestinatarios: Fabricante[] = [{ nombre: 'Fabricante 1' }] as Fabricante[];
    component.getDestinatarioDatos(mockDestinatarios);
    expect(component.selectedDestinatario).toEqual(mockDestinatarios);
  });

  it('should call removeDestinatarioDato on eliminarMercancias if selectedDestinatario exists', () => {
    const mockDestinatario: Fabricante = { nombre: 'Fabricante 1' } as Fabricante;
    component.selectedDestinatario = [mockDestinatario];

    component.eliminarMercancias();

    expect(solicitud260101Store.removeDestinatarioDato).toHaveBeenCalledWith(mockDestinatario);
  });

  it('should not call removeDestinatarioDato on eliminarMercancias if selectedDestinatario is empty', () => {
    component.selectedDestinatario = [];

    component.eliminarMercancias();

    expect(solicitud260101Store.removeDestinatarioDato).not.toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
