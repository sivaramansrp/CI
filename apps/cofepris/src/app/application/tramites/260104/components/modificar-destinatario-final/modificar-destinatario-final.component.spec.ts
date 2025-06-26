import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModificarDestinatarioFinalComponent } from './modificar-destinatario-final.component';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { Location } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { of } from 'rxjs';

describe('ModificarDestinatarioFinalComponent', () => {
  let component: ModificarDestinatarioFinalComponent;
  let tramiteStore: Tramite260104Store;
  let location: Location;

  beforeEach(() => {
    const tramiteStoreMock = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
      modifyDestinatarioFinalTablaDatos: jest.fn(),
    };
    const locationMock = { back: jest.fn() };
    const datosSolicitudServiceMock = {
      obtenerListaCodigosPostales: jest.fn(() => of([])),
      obtenerListaPaises: jest.fn(() => of([])),
      obtenerListaEstados: jest.fn(() => of([])),
      obtenerListaMunicipios: jest.fn(() => of([])),
      obtenerListaLocalidades: jest.fn(() => of([])),
      obtenerListaColonias: jest.fn(() => of([])),
    };
    const tercerosDataServiceMock = { destinatario$: of([]) };
    const tramiteQueryMock = { getDestinatarioFinalTablaDatos$: of([]) };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ModificarDestinatarioFinalComponent,
        FormBuilder,
        { provide: Tramite260104Store, useValue: tramiteStoreMock },
        { provide: Location, useValue: locationMock },
        { provide: DatosSolicitudService, useValue: datosSolicitudServiceMock },
        { provide: TercerosRelacionadosDestinoService, useValue: tercerosDataServiceMock },
        { provide: Tramite260104Query, useValue: tramiteQueryMock },
      ],
    });

    component = TestBed.inject(ModificarDestinatarioFinalComponent);
    tramiteStore = TestBed.inject(Tramite260104Store);
    location = TestBed.inject(Location);

    component.ngOnInit();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe guardar un nuevo destinatario y actualizar el store en guardarDestinatario', () => {
    component.modificarDestinatarioFinal.setValue({
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John',
      denominacionRazon: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      municipio: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: '',
    });

    component.guardarDestinatario();

    expect(component.destinatarios.length).toBe(1);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
    expect(location.back).toHaveBeenCalled();
  });

  it('debe actualizar el destinatario en la tabla en updateDestinatarioFinalTablaDatos', () => {
    component.destinatarioFinalTablaDatos = [{
      tipoPersona: 'FISICA',
      curp: '',
      rfc: 'XAXX010101000',
      nombres: 'John',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      estadoLocalidad: '1',
      municipioAlcaldia: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: ''}]

    component.selectedDestinario =  {
      tipoPersona: 'FISICA',
      curp: '',
      rfc: 'XAXX010101000',
      nombres: 'John',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      estadoLocalidad: '1',
      municipioAlcaldia: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: ''
    }

    const updatedDestinatario = [{
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John Updated',
      curp: '',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      estadoLocalidad: '1',
      localidad: '1',
      municipioAlcaldia: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: '',
    }];

    component.updateDestinatarioFinalTablaDatos(updatedDestinatario);

    expect(component.destinatarioFinalTablaDatos[0].nombres).toBe('John Updated');
    expect(tramiteStore.modifyDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarioFinalTablaDatos);
  });

  it('debe regresar cuando se llama cancelar', () => {
    component.cancelar();
    expect(location.back).toHaveBeenCalled();
  });

  it('debe establecer destinatarioFinalTablaDatos cuando se llama ngOnInit', () => {
    const tramiteQueryMock = TestBed.inject(Tramite260104Query) as any;
    const destinatarioFinalTablaDatos = [{
      tipoPersona: 'FISICA',
      curp: '',
      rfc: 'XAXX010101000',
      nombres: 'John',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      estadoLocalidad: '1',
      municipioAlcaldia: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: ''
    }];

    // Assign the observable directly
    tramiteQueryMock.getDestinatarioFinalTablaDatos$ = of(destinatarioFinalTablaDatos);

    component.ngOnInit();
    expect(component.destinatarioFinalTablaDatos).toEqual(destinatarioFinalTablaDatos);
  });

  it('debe actualizar descPais cuando se llama cambiaPais', () => {
    component.paisesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('pais')?.setValue(1);
    component.cambiaPais();
    expect(component.modificarDestinatarioFinal.get('descPais')?.value).toBe('Mexico');
  });

  it('debe actualizar descEstado cuando se llama cambiaEstado', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('estado')?.setValue(1);
    component.cambiaEstado();
    expect(component.modificarDestinatarioFinal.get('descEstado')?.value).toBe('Mexico');
  });

  it('debe actualizar descMunicipio cuando se llama cambiaMunicipio', () => {
    component.municipiosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('municipio')?.setValue(1);
    component.cambiaMunicipio();
    expect(component.modificarDestinatarioFinal.get('descMunicipio')?.value).toBe('Mexico');
  });

  it('debe actualizar descLocalidad cuando se llama cambiaLocalidad', () => {
    component.localidadesDatos = [{ id: 1, descripcion: 'Mexico' }]; // Correct array
    component.modificarDestinatarioFinal.get('localidad')?.setValue(1);
    component.cambiaLocalidad();
    expect(component.modificarDestinatarioFinal.get('descLocalidad')?.value).toBe('Mexico');
  });

  it('debe actualizar descCodigoPostal cuando se llama cambiaCodigoPostal', () => {
    component.codigosPostalesDatos = [{ id: 1, descripcion: 'Mexico' }]; // Correct array
    component.modificarDestinatarioFinal.get('codigoPostal')?.setValue(1);
    component.cambiaCodigoPostal();
    expect(component.modificarDestinatarioFinal.get('descCodigoPostal')?.value).toBe('Mexico');
  });

  it('debe desuscribirse en ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});