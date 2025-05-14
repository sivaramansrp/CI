import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Destinatario, Fabricante } from '../../model/solicitud-permiso.model';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudPermisoServiceMock: any;

  beforeEach(async () => {
    // Mock the SolicitudPermisoService
    solicitudPermisoServiceMock = {
      obtenerDatosDestinatarios: jest.fn().mockReturnValue(of([
        { nombre: 'Destinatario 1', rfc: 'RFC1', curp: 'CURP1', telefono: '1234567890', correoElectronico: 'email1@test.com', calle: 'Calle 1', numeroExterior: '1', numeroInterior: 'A', pais: 'México', colonia: 'Colonia 1', municipio: 'Municipio 1', localidad: 'Localidad 1', estado: 'Estado 1', codigoPostal: '12345' },
      ])),
      obtenerDatosFabricantes: jest.fn().mockReturnValue(of([
        { nombre: 'Fabricante 1', rfc: 'RFC2', curp: 'CURP2', telefono: '0987654321', correoElectronico: 'email2@test.com', calle: 'Calle 2', numeroExterior: '2', numeroInterior: 'B', pais: 'México', colonia: 'Colonia 2', municipio: 'Municipio 2', localidad: 'Localidad 2', estado: 'Estado 2', codigoPostal: '54321' },
      ])),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
      providers: [
        { provide: SolicitudPermisoService, useValue: solicitudPermisoServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosTablaDestinatario on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosTablaDestinatario).toEqual([
      { nombre: 'Destinatario 1', rfc: 'RFC1', curp: 'CURP1', telefono: '1234567890', correoElectronico: 'email1@test.com', calle: 'Calle 1', numeroExterior: '1', numeroInterior: 'A', pais: 'México', colonia: 'Colonia 1', municipio: 'Municipio 1', localidad: 'Localidad 1', estado: 'Estado 1', codigoPostal: '12345' },
    ]);
    expect(solicitudPermisoServiceMock.obtenerDatosDestinatarios).toHaveBeenCalled();
  });

  it('should initialize datosTablaFabricante on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosTablaFabricante).toEqual([
      { nombre: 'Fabricante 1', rfc: 'RFC2', curp: 'CURP2', telefono: '0987654321', correoElectronico: 'email2@test.com', calle: 'Calle 2', numeroExterior: '2', numeroInterior: 'B', pais: 'México', colonia: 'Colonia 2', municipio: 'Municipio 2', localidad: 'Localidad 2', estado: 'Estado 2', codigoPostal: '54321' },
    ]);
    expect(solicitudPermisoServiceMock.obtenerDatosFabricantes).toHaveBeenCalled();
  });

  it('should handle row selection for destinatarios', () => {
    const destinatariosSeleccionados: Destinatario[] = [
      { nombre: 'Destinatario 1', rfc: 'RFC1', curp: 'CURP1', telefono: '1234567890', correoElectronico: 'email1@test.com', calle: 'Calle 1', numeroExterior: '1', numeroInterior: 'A', pais: 'México', colonia: 'Colonia 1', municipio: 'Municipio 1', localidad: 'Localidad 1', estado: 'Estado 1', codigoPostal: '12345' },
    ];
    component.manejarFilaSeleccionadaDestinatario(destinatariosSeleccionados);
    expect(component.destinatarioTablaSeleccion).toBe(true);
  });

  it('should handle empty row selection for destinatarios', () => {
    component.manejarFilaSeleccionadaDestinatario([]);
    expect(component.destinatarioTablaSeleccion).toBe(false);
  });

  it('should handle row selection for fabricantes', () => {
    const fabricantesSeleccionados: Fabricante[] = [
      { nombre: 'Fabricante 1', rfc: 'RFC2', curp: 'CURP2', telefono: '0987654321', correoElectronico: 'email2@test.com', calle: 'Calle 2', numeroExterior: '2', numeroInterior: 'B', pais: 'México', colonia: 'Colonia 2', municipio: 'Municipio 2', localidad: 'Localidad 2', estado: 'Estado 2', codigoPostal: '54321' },
    ];
    component.manejarFilaSeleccionadaFabricante(fabricantesSeleccionados);
    expect(component.fabricanteTablaSeleccion).toBe(true);
  });

  it('should handle empty row selection for fabricantes', () => {
    component.manejarFilaSeleccionadaFabricante([]);
    expect(component.fabricanteTablaSeleccion).toBe(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});