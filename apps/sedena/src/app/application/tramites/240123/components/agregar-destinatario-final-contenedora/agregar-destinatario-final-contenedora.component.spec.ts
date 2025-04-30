import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let datosSolicitudServiceMock: any;
  let tramiteStoreMock: any;
  let locationMock: any;

  // Constantes en mayúsculas
  const CODIGOS_POSTALES = 'obtenerListaCodigosPostales';
  const PAISES = 'obtenerListaPaises';
  const ESTADOS = 'obtenerListaEstados';
  const MUNICIPIOS = 'obtenerListaMunicipios';
  const LOCALIDADES = 'obtenerListaLocalidades';
  const COLONIAS = 'obtenerListaColonias';

  beforeEach(() => {
    datosSolicitudServiceMock = {
      [CODIGOS_POSTALES]: jest.fn().mockReturnValue(of([])),
      [PAISES]: jest.fn().mockReturnValue(of([])),
      [ESTADOS]: jest.fn().mockReturnValue(of([])),
      [MUNICIPIOS]: jest.fn().mockReturnValue(of([])),
      [LOCALIDADES]: jest.fn().mockReturnValue(of([])),
      [COLONIAS]: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
    };

    locationMock = {
      back: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, AgregarDestinatarioFinalContenedoraComponent],
      providers: [
        { provide: DatosSolicitudService, useValue: datosSolicitudServiceMock },
        { provide: Tramite240123Store, useValue: tramiteStoreMock },
        { provide: Tramite240123Query, useValue: {} },
        { provide: Location, useValue: locationMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    component.crearFormaulario();
    expect(component.agregarDestinatarioFinal).toBeDefined();
    expect(component.agregarDestinatarioFinal.get('tipoPersona')).toBeTruthy();
  });

  it('debería cargar los datos de catálogos correctamente', fakeAsync(() => {
    component.cargarDatos();
    tick(); 
    fixture.detectChanges();

    expect(datosSolicitudServiceMock[CODIGOS_POSTALES]).toHaveBeenCalledWith();
    expect(datosSolicitudServiceMock[PAISES]).toHaveBeenCalled();
    expect(datosSolicitudServiceMock[ESTADOS]).toHaveBeenCalled();
    expect(datosSolicitudServiceMock[MUNICIPIOS]).toHaveBeenCalled();
    expect(datosSolicitudServiceMock[LOCALIDADES]).toHaveBeenCalled();
    expect(datosSolicitudServiceMock[COLONIAS]).toHaveBeenCalled();
  }));

  it('debería cambiar las validaciones de los campos según campoObligatorio', () => {
    component.campoObligatorio = true;
    component.campoObligatorioChange();
    const COLONIA = component.agregarDestinatarioFinal.get('colonia');
    const CALLE = component.agregarDestinatarioFinal.get('calle');
    const NUMEROEXTERIOR = component.agregarDestinatarioFinal.get('numeroExterior');
    expect(COLONIA?.validator).toBeNull();
    expect(CALLE?.validator).toBeTruthy();
    expect(NUMEROEXTERIOR?.validator).toBeTruthy();
  });

  it('debería guardar un nuevo destinatario y actualizar el store', () => {
    component.agregarDestinatarioFinal.patchValue({
      nombres: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'López',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'juan.perez@example.com',
      calle: 'Calle 1',
      numeroExterior: '123',
      pais: 'México',
      colonia: 'Colonia 1',
      municipio: 'Municipio 1',
      localidad: 'Localidad 1',
      estado: 'Estado 1',
      codigoPostal: '12345',
    });

    component.guardarDestinatario();
    expect(component.destinatarios.length).toBe(1);
    expect(tramiteStoreMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('debería navegar hacia atrás al cancelar', () => {
    component.cancelar();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('debería actualizar el valor de tipoPersona en el formulario', () => {
    component.tipoPersonaCambioDeValor('Fisica');
    expect(component.agregarDestinatarioFinal.get('tipoPersona')?.value).toBe('Fisica');
  });

  it('debería limpiar el formulario correctamente', () => {
    component.agregarDestinatarioFinal.patchValue({ nombres: 'Juan' });
    component.limpiarFormulario();
    expect(component.agregarDestinatarioFinal.get('nombres')?.value).toBeNull();
  });

  it('debería actualizar el valor de nacionalidad en el formulario', () => {
    component.terecerosNacionalidadCambioDeValor('Mexicana');
    expect(component.agregarDestinatarioFinal.get('nacionalidad')?.value).toBe('Mexicana');
  });
});
