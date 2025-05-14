import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { CatalogoSelectComponent, InputRadioComponent } from '@ng-mf/data-access-user';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { TIPO_PERSONA_OPCIONES, TERCEROS_NACIONALIDAD_OPCIONES } from '../../../../shared/constants/datos-solicitud.enum';

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let datosSolicitudServiceMock: Partial<DatosSolicitudService>;
  let tramiteStoreMock: Partial<Tramite240123Store>;
  let tramiteQueryMock: Partial<Tramite240123Query>;
  let locationMock: Partial<Location>;

  const CODIGOS_POSTALES = [
    { nombre: 'Código Postal 1', id: 1 },
    { nombre: 'Código Postal 2', id: 2 },
  ];

  const PAISES = [
    { nombre: 'México', id: 1 },
    { nombre: 'Estados Unidos', id: 2 },
  ];

  const ESTADOS = [
    { nombre: 'Jalisco', id: 1 },
    { nombre: 'CDMX', id: 2 },
  ];

  const MUNICIPIOS = [
    { nombre: 'Guadalajara', id: 1 },
    { nombre: 'Tlaquepaque', id: 2 },
  ];

  const LOCALIDADES = [
    { nombre: 'Centro', id: 1 },
    { nombre: 'Sur', id: 2 },
  ];

  const COLONIAS = [
    { nombre: 'Colonia 1', id: 1 },
    { nombre: 'Colonia 2', id: 2 },
  ];

  beforeEach(async () => {
    datosSolicitudServiceMock = {
      obtenerListaCodigosPostales: jest.fn().mockReturnValue(of(CODIGOS_POSTALES)),
      obtenerListaPaises: jest.fn().mockReturnValue(of(PAISES)),
      obtenerListaEstados: jest.fn().mockReturnValue(of(ESTADOS)),
      obtenerListaMunicipios: jest.fn().mockReturnValue(of(MUNICIPIOS)),
      obtenerListaLocalidades: jest.fn().mockReturnValue(of(LOCALIDADES)),
      obtenerListaColonias: jest.fn().mockReturnValue(of(COLONIAS)),
    };

    tramiteStoreMock = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
    };
    tramiteQueryMock = {};

    locationMock = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioFinalContenedoraComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent],
      providers: [
        { provide: DatosSolicitudService, useValue: datosSolicitudServiceMock },
        { provide: Tramite240123Store, useValue: tramiteStoreMock },
        { provide: Tramite240123Query, useValue: tramiteQueryMock },
        { provide: Location, useValue: locationMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.agregarDestinatarioFinal).toBeDefined();
    expect(component.agregarDestinatarioFinal.valid).toBeFalsy();
  });

  it('debería cargar los datos de los catálogos correctamente', () => {
    component.cargarDatos();
    expect(component.codigosPostalesDatos.length).toBeGreaterThan(0);
    expect(component.paisesDatos.length).toBeGreaterThan(0);
    expect(component.estadosDatos.length).toBeGreaterThan(0);
    expect(component.municipiosDatos.length).toBeGreaterThan(0);
    expect(component.localidadesDatos.length).toBeGreaterThan(0);
    expect(component.coloniasDatos.length).toBeGreaterThan(0);
  });

  it('debería cambiar las validaciones del formulario cuando `campoObligatorio` es verdadero', () => {
    component.campoObligatorio = true;
    component.campoObligatorioChange();
    expect(component.agregarDestinatarioFinal.get('colonia')?.validator).toBeNull();
    expect(component.agregarDestinatarioFinal.get('calle')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.agregarDestinatarioFinal.get('numeroExterior')?.hasValidator(Validators.required)).toBeTruthy();
  });

  it('debería cambiar las validaciones del formulario cuando `campoObligatorio` es falso', () => {
    component.campoObligatorio = false;
    component.campoObligatorioChange();
    expect(component.agregarDestinatarioFinal.get('colonia')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.agregarDestinatarioFinal.get('calle')?.validator).toBeNull();
    expect(component.agregarDestinatarioFinal.get('numeroExterior')?.validator).toBeNull();
  });

  it('debería guardar un destinatario final correctamente', () => {
    component.agregarDestinatarioFinal.patchValue({
      nombres: 'Juan',
      primerApellido: 'Pérez',
      rfc: 'JUAP001122',
      curp: 'JUAP901101HDFRRL08',
      lada: '33',
      telefono: '123456789',
      correoElectronico: 'juan.perez@example.com',
      calle: 'Av. Reforma',
      numeroExterior: '123',
      colonia: 'Colonia 1',
      municipio: 'Guadalajara',
      localidad: 'Centro',
      estado: 'Jalisco',
      codigoPostal: '12345',
    });

    component.guardarDestinatario();

    expect(component.destinatarios.length).toBe(1);
    expect(locationMock.back).toHaveBeenCalled();
    expect(tramiteStoreMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
  });

  it('debería cancelar y regresar correctamente', () => {
    component.cancelar();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('debería manejar correctamente el cambio de tipo de persona', () => {
    component.tipoPersonaCambioDeValor('Persona Física');
    expect(component.agregarDestinatarioFinal.get('tipoPersona')?.value).toBe('Persona Física');
  });

  it('debería limpiar el formulario correctamente', () => {
    component.limpiarFormulario();
    expect(component.agregarDestinatarioFinal.value).toEqual({
      tipoPersona: null,
      nacionalidad: null,
    });
  });

  it('debería manejar correctamente el cambio de nacionalidad de terceros', () => {
    component.terecerosNacionalidadCambioDeValor('Mexicana');
    expect(component.agregarDestinatarioFinal.get('nacionalidad')?.value).toBe('Mexicana');
  });
});
