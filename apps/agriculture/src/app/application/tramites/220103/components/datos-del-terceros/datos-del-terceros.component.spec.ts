import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTercerosComponent } from './datos-del-terceros.component';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-tabla-dinamica', template: '' })
class MockTablaDinamicaComponent {
  @Input() configuracionTabla: any;
  @Input() datos: any;
  @Input() tipoSeleccionTabla: any;
  @Output() listaDeFilaSeleccionada = new EventEmitter<any>();
}

@Component({ selector: 'app-agregar-destinatario', template: '' })
class MockAgregarDestinatarioComponent {
  @Input() esModoInstalacion?: boolean;
  @Output() cerrarModal = new EventEmitter<void>();
}

@Component({ selector: 'ng-titulo', template: '' })
class MockNgTitulo {
  @Input() titulo: string = '';
}

@Component({ selector: 'ng-alert', template: '' })
class MockNgAlert {
  @Input() CONTENIDO: any;
}

jest.mock('bootstrap', () => ({
  Modal: {
    getInstance: jest.fn(),
  },
}));

describe('DatosDelTercerosComponent', () => {
  let component: DatosDelTercerosComponent;
  let fixture: ComponentFixture<DatosDelTercerosComponent>;
  let TRAMITE_QUERY_MOCK: Partial<Tramite220103Query>;

  const MOCK_MODAL_INSTANCE = { hide: jest.fn() };

  beforeEach(async () => {
    TRAMITE_QUERY_MOCK = {
      selectTramite220103State$: of({
        tablaDestinatario: [{
          nombre: 'Juan Pérez',
          primerApellido: 'Pérez',
          segundoApellido: 'García',
          razonSocial: 'Empresa X',
          telefono: '1234567890',
          correoElectronico: 'juan.perez@example.com',
          direccion: 'Calle Falsa 123',
          codigoPostal: '54321',
          ciudad: 'Ciudad Y',
          estado: 'Estado Y',
          pais: 'Pais Y',
          tipoPersona: 'Física',
          rfc: 'RFC123456789',
          curp: 'CURP123456789',
          lada: '123',
          calle: 'Calle Principal',
          numeroExterior: '456',
          numeroInterior: 'B',
          municipioAlcaldia: 'Municipio Z',
          colonia: 'Colonia Z',
        }],
        tablaInstalacion: [{
          nombre: 'Planta Industrial X',
          primerApellido: 'Apellido1',
          segundoApellido: 'Apellido2',
          telefono: '1234567890',
          correoElectronico: 'example@example.com',
          direccion: 'Direccion X',
          codigoPostal: '12345',
          ciudad: 'Ciudad X',
          estado: 'Estado X',
          pais: 'Pais X',
          tipoInstalacion: 'Tipo X',
          capacidad: '1000',
          unidadMedida: 'kg',
          calle: 'Calle X',
          numeroExterior: '123',
          numeroInterior: 'A',
          municipio: 'Municipio X',
          referencia: 'Referencia X',
          colonia: 'Colonia X',
          lada: '123',
        }],
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        DatosDelTercerosComponent,
        HttpClientTestingModule,
      ],
      declarations: [
        MockTablaDinamicaComponent,
        MockAgregarDestinatarioComponent,
        MockNgTitulo,
        MockNgAlert,
      ],
      providers: [
        { provide: Tramite220103Query, useValue: TRAMITE_QUERY_MOCK },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTercerosComponent);
    component = fixture.componentInstance;

    component.elementoModal = { nativeElement: {} } as ElementRef;
    component.elementoModalInstalaci = { nativeElement: {} } as ElementRef;

    (Modal.getInstance as jest.Mock).mockReturnValue(MOCK_MODAL_INSTANCE);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load state data into the tables', () => {
    expect(component.datosTabla.length).toBe(1);
    expect(component.datosTablaInstalacion.length).toBe(1);
  });

  it('should update selected recipients list', () => {
    const SELECCIONADOS = [component.datosTabla[0]];
    component.obtenerDestinatarioSeleccionadas(SELECCIONADOS);
    expect(component.destinatariosSeleccionados).toEqual(SELECCIONADOS);
  });

  it('should update selected installations list', () => {
    const SELECCIONADOS = [component.datosTablaInstalacion[0]];
    component.obtenerInstalaciSeleccionadas(SELECCIONADOS);
    expect(component.instalacionesSeleccionadas).toEqual(SELECCIONADOS);
  });

  it('should close recipient modal if instance exists', () => {
    component.cerrarModal();
    expect(Modal.getInstance).toHaveBeenCalledWith(component.elementoModal.nativeElement);
    expect(MOCK_MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should close installation modal if instance exists', () => {
    component.cerrarModalInstalacion();
    expect(Modal.getInstance).toHaveBeenCalledWith(component.elementoModalInstalaci.nativeElement);
    expect(MOCK_MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should not throw if Modal.getInstance returns null (recipient)', () => {
    (Modal.getInstance as jest.Mock).mockReturnValueOnce(null);
    expect(() => component.cerrarModal()).not.toThrow();
    expect(component['instanciaModal']).toBeUndefined();
  });

  it('should not throw if Modal.getInstance returns null (installation)', () => {
    (Modal.getInstance as jest.Mock).mockReturnValueOnce(null);
    expect(() => component.cerrarModalInstalacion()).not.toThrow();
    expect(component['instanciaModalInstalaci']).toBeUndefined();
  });

  it('should clean up subscriptions on destroy', () => {
    const SPY_NEXT = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const SPY_COMPLETE = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(SPY_NEXT).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });

  it('should render recipient table component', () => {
    const TABLAS = fixture.nativeElement.querySelectorAll('app-tabla-dinamica');
    expect(TABLAS[0]).toBeTruthy();
  });

  it('should render installation table component', () => {
    const TABLAS = fixture.nativeElement.querySelectorAll('app-tabla-dinamica');
    expect(TABLAS[1]).toBeTruthy();
  });

  it('should render "Agregar" button for recipient modal', () => {
    const BOTONES = fixture.nativeElement.querySelectorAll('button[name="agregar"]');
    expect(BOTONES[0]).toBeTruthy();
    expect(BOTONES[0].textContent).toContain('Agregar');
  });

  it('should render "Agregar" button for installation modal', () => {
    const BOTONES = fixture.nativeElement.querySelectorAll('button[name="agregar"]');
    expect(BOTONES[1]).toBeTruthy();
    expect(BOTONES[1].textContent).toContain('Agregar');
  });

  it('should render both modals in the DOM', () => {
    const MODAL_DEST = fixture.nativeElement.querySelector('#modalDestinatario');
    const MODAL_INST = fixture.nativeElement.querySelector('#modalInstalaci');
    expect(MODAL_DEST).toBeTruthy();
    expect(MODAL_INST).toBeTruthy();
  });
});