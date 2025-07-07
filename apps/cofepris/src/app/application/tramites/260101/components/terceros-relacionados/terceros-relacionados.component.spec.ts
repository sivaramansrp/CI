import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { Destinatario } from '../../models/destinatario.model';
import { Fabricante } from '../../models/fabricante.model';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModificarDestinatarioComponent } from '../modificar-destinatario/modificar-destinatario.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Mock bootstrap modal
jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn().mockReturnValue(of([{ nombre: 'Test Destinatario' } as Destinatario])),
      obtenerFabricanteListo: jest.fn().mockReturnValue(of([{ nombre: 'Test Fabricante' } as Fabricante])),
    };

    const solicitud260101StoreMock = {
      setDestinatarioDatos: jest.fn(),
      removeDestinatarioDato: jest.fn(),
    };

    const solicitud260101QueryMock = {
      seleccionarSolicitud$: of({ destinatarioDatos: [{ nombre: 'Query Destinatario' } as Destinatario] }),
    };

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent,
        ReactiveFormsModule,
        CommonModule,
         TablaDinamicaComponent,
              AlertComponent,
              TituloComponent,
              ModificarDestinatarioComponent,
              HttpClientTestingModule
      ],
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
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDestinatarioListo and obtenerFabricanteListo in constructor', () => {
    expect(solicitudDatosService.obtenerDestinatarioListo).toHaveBeenCalled();
    expect(solicitudDatosService.obtenerFabricanteListo).toHaveBeenCalled();
  });

  it('should subscribe to seleccionarSolicitud$ and update state and destinatarioDatos on ngOnInit', () => {
    const destinatarioMock = [{ nombre: 'Destinatario Prueba' } as Destinatario];

    // Create a controlled Subject instead of the default observable
    const seleccionarSolicitudSubject = new Subject<Solicitud260101State>();
    solicitud260101Query.seleccionarSolicitud$ = seleccionarSolicitudSubject.asObservable();

    component.ngOnInit();

    // Emit a mock state
    const mockState: Solicitud260101State = {
      destinatarioDatos: destinatarioMock,
    } as Solicitud260101State;

    seleccionarSolicitudSubject.next(mockState);

    expect(component.solicitud260101State).toEqual(mockState);
    expect(component.destinatarioDatos).toEqual(destinatarioMock);
  });

  it('should open modal when agregarMercancias is called', () => {
    const modalElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    component.modalElement = modalElementRef;
    component.agregarMercancias();
    expect(Modal).toHaveBeenCalledWith(modalElementRef.nativeElement);
  });

  it('should open modal when openModificarMercancias is called', () => {
    const modalElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    component.modalElement = modalElementRef;
    component.openModificarMercancias();
    expect(Modal).toHaveBeenCalledWith(modalElementRef.nativeElement);
  });

  it('should update selectedDestinatario on getDestinatarioDatos', () => {
    const evento = [{ nombre: 'Selected' } as Fabricante];
    component.getDestinatarioDatos(evento);
    expect(component.selectedDestinatario).toEqual(evento);
  });

  it('should remove first selected destinatario on eliminarMercancias', () => {
    const selected = [{ nombre: 'Selected' } as Fabricante];
    component.selectedDestinatario = selected;
    component.eliminarMercancias();
    expect(solicitud260101Store.removeDestinatarioDato).toHaveBeenCalledWith(selected[0]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
