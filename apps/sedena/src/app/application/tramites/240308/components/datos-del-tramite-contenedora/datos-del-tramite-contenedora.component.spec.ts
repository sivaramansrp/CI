import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { DatosMercanciaContenedoraComponent } from '../datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDelTramiteContenedoraComponent', () => {
  let component: DatosDelTramiteContenedoraComponent;
  let fixture: ComponentFixture<DatosDelTramiteContenedoraComponent>;
  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaQuery: any;
  let modalComponent: ModalComponent;

  beforeEach(async () => {
    mockTramiteQuery = {
      getMercanciaTablaDatos$: of([{ id: 1, nombre: 'Mercancia' }]),
      getDatosDelTramite$: of({ campo: 'valor' }),
      getJustificacionTramite$: of({ just: 'valor' })
    };
    mockTramiteStore = {
      updateDatosDelTramiteFormState: jest.fn(),
      updateJustificacionFormulario: jest.fn()
    };
    mockConsultaQuery = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DatosDelTramiteContenedoraComponent],
      providers: [
        { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
        { provide: 'Tramite240308Store', useValue: mockTramiteStore },
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(DatosDelTramiteContenedoraComponent, {
      set: {
        providers: [
          { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
          { provide: 'Tramite240308Store', useValue: mockTramiteStore },
          { provide: 'ConsultaioQuery', useValue: mockConsultaQuery }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteContenedoraComponent);
    component = fixture.componentInstance;

    // Mock the modal component
    modalComponent = {
      abrir: jest.fn(),
      cerrar: jest.fn()
    } as any;
    component.modalComponent = modalComponent;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería suscribirse a consultaQuery y establecer esSoloLectura', () => {
    expect(component.esSoloLectura).toBe(true);
  });

  it('debería suscribirse a getMercanciaTablaDatos$ y establecer datosMercanciaTabla', () => {
    expect(component.datosMercanciaTabla).toEqual([{ id: 1, nombre: 'Mercancia' }]);
  });

  it('debería suscribirse a getDatosDelTramite$ y establecer datosDelTramiteFormState', () => {
    expect(component.datosDelTramiteFormState).toEqual({ campo: 'valor' });
  });

  it('debería suscribirse a getJustificacionTramite$ y establecer justificacionTramiteFormState', () => {
    expect(component.justificacionTramiteFormState).toEqual({ just: 'valor' });
  });

  it('debería llamar a updateDatosDelTramiteFormState en updateDatosDelTramiteFormulario', () => {
    const event = {
      permisoGeneral: 'permiso1',
      usoFinal: 'uso1',
      aduanasSeleccionadas: [],
      paisDestino: 'pais1',
      campo: 'nuevo'
    };
    component.updateDatosDelTramiteFormulario(event);
    expect(mockTramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(event);
  });

  it('debería llamar a updateJustificacionFormulario en updateJustificacionFormulario', () => {
    const event = { justificacion: 'nuevo' };
    component.updateJustificacionFormulario(event);
    expect(mockTramiteStore.updateJustificacionFormulario).toHaveBeenCalledWith(event);
  });

  it('debería abrir el modal DatosMercanciaContenedoraComponent al llamar openModal("Datosmercancia")', () => {
    component.openModal('Datosmercancia');
    expect(modalComponent.abrir).toHaveBeenCalledWith(
      DatosMercanciaContenedoraComponent,
      expect.objectContaining({ cerrarModal: expect.any(Function) })
    );
  });

  it('debería llamar a modalComponent.cerrar al ejecutar cerrarModal', () => {
    component.cerrarModal();
    expect(modalComponent.cerrar).toHaveBeenCalled();
  });

  it('debería limpiar unsubscribe$ al ejecutar ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).unsubscribe$, 'next');
    const completeSpy = jest.spyOn((component as any).unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});