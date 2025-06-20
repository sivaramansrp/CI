import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TercerosRelacionadosContenedoraComponent } from './terceros-relacionados-contenedora.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { AgregarDestinatarioFinalContenedoraComponent } from '../agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarProveedorContenedoraComponent } from '../agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('TercerosRelacionadosContenedoraComponent', () => {
  let component: TercerosRelacionadosContenedoraComponent;
  let fixture: ComponentFixture<TercerosRelacionadosContenedoraComponent>;
  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaQuery: any;
  let modalComponent: ModalComponent;

  beforeEach(async () => {
    mockTramiteQuery = {
      getDestinatarioFinalTablaDatos$: of([{ id: 1, nombre: 'Destino' }]),
      getProveedorTablaDatos$: of([{ id: 2, nombre: 'Proveedor' }])
    };
    mockTramiteStore = {};
    mockConsultaQuery = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TercerosRelacionadosContenedoraComponent
      ],
      providers: [
        { provide: 'Tramite240308Store', useValue: mockTramiteStore },
        { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(TercerosRelacionadosContenedoraComponent, {
        set: {
          providers: [
            { provide: 'Tramite240308Store', useValue: mockTramiteStore },
            { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
            { provide: 'ConsultaioQuery', useValue: mockConsultaQuery }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosContenedoraComponent);
    component = fixture.componentInstance;

    // Mock the modal component
    modalComponent = {
      abrir: jest.fn(),
      cerrar: jest.fn()
    } as any;
    component.modalComponent = modalComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to consultaQuery and set esSoloLectura', () => {
    expect(component.esSoloLectura).toBe(true);
  });

  it('should subscribe to getDestinatarioFinalTablaDatos$ and set destinatarioFinalTablaDatos', () => {
    expect(component.destinatarioFinalTablaDatos).toEqual([{ id: 1, nombre: 'Destino' }]);
  });

  it('should subscribe to getProveedorTablaDatos$ and set proveedorTablaDatos', () => {
    expect(component.proveedorTablaDatos).toEqual([{ id: 2, nombre: 'Proveedor' }]);
  });

  it('should open AgregarDestinatarioFinalContenedoraComponent modal', () => {
    component.openModal('agregar-destino-final');
    expect(modalComponent.abrir).toHaveBeenCalledWith(
      AgregarDestinatarioFinalContenedoraComponent,
      expect.objectContaining({ cerrarModal: expect.any(Function) })
    );
  });

  it('should open AgregarProveedorContenedoraComponent modal', () => {
    component.openModal('agregar-proveedor');
    expect(modalComponent.abrir).toHaveBeenCalledWith(
      AgregarProveedorContenedoraComponent,
      expect.objectContaining({ cerrarModal: expect.any(Function) })
    );
  });

  it('should call modalComponent.cerrar on cerrarModal', () => {
    component.cerrarModal();
    expect(modalComponent.cerrar).toHaveBeenCalled();
  });

  it('should clean up unsubscribe$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).unsubscribe$, 'next');
    const completeSpy = jest.spyOn((component as any).unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
