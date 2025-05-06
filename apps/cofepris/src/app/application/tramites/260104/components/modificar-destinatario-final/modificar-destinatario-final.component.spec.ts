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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a new destinatario and update the store in guardarDestinatario', () => {
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

  it('should update destinatario in the table in updateDestinatarioFinalTablaDatos', () => {
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
      nombres: 'John',
      curp:'',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      estadoLocalidad: '1',
      localidad:'1',
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
    expect(location.back).toHaveBeenCalled();
  }
  );
  it('should navigate back when cancelar is called', () => {
    component.cancelar();
    expect(location.back).toHaveBeenCalled();

  }
  );
  it('should set destinatarioFinalTablaDatos when ngOnInit is called', () => {
    const tramiteQueryMock = TestBed.inject(Tramite260104Query);
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
      descColonia: ''}];

    const destinatarioFinalTablaDatosSpy = jest.spyOn(tramiteQueryMock as any, 'getDestinatarioFinalTablaDatos$').mockReturnValue(of(destinatarioFinalTablaDatos));
    component.ngOnInit();
    expect(component.destinatarioFinalTablaDatos).toEqual(destinatarioFinalTablaDatos);
    expect(destinatarioFinalTablaDatosSpy).toHaveBeenCalled();
  }
  );
  it('should update descPais when cambiaPais is called', () => {
    component.paisesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('pais')?.setValue(1); // Ensure the value matches the id type
    component.cambiaPais();
    expect(component.modificarDestinatarioFinal.get('descPais')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaEstado is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('estado')?.setValue(1); // Ensure the value matches the id type
    component.cambiaEstado();
    expect(component.modificarDestinatarioFinal.get('descEstado')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaMunicipio is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('municipio')?.setValue(1); // Ensure the value matches the id type
    component.cambiaMunicipio();
    expect(component.modificarDestinatarioFinal.get('descMunicipio')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaLocalidad is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('localidad')?.setValue(1); // Ensure the value matches the id type
    component.cambiaLocalidad();
    expect(component.modificarDestinatarioFinal.get('descLocalidad')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaCodigoPostal is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('codigoPostal')?.setValue(1); // Ensure the value matches the id type
    component.cambiaCodigoPostal();
    expect(component.modificarDestinatarioFinal.get('descCodigoPostal')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaColonia is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('colonia')?.setValue(1); // Ensure the value matches the id type
    component.cambiaColonia();
    expect(component.modificarDestinatarioFinal.get('descColonia')?.value).toBe('Mexico');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  

  });
