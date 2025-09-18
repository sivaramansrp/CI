import { TestBed } from '@angular/core/testing';
import { AgregarFabricanteSanitarioComponent } from './agregar-fabricante-sanitario.component';
import { FormBuilder } from '@angular/forms';


const mockTramite260601Store = {
  setTipoProducto: jest.fn(),
  setTercerosNacionalidadFabricante: jest.fn(),
  setTipoPersonaFabricante: jest.fn(),
  setMostrarRfcFabricanteBuscarBoton: jest.fn(),
  setMostrarCurpFabricanteBuscarBoton: jest.fn(),
  setInhabilitarPaisFabricante: jest.fn(),
  setRfcFabricanteInhabilitar: jest.fn(),
  setCurpFabricanteInhabilitar: jest.fn(),
  setFabricanteNombre: jest.fn(),
  setFabricantePrimerApellido: jest.fn(),
  setFabricanteSegundoApellido: jest.fn(),
  setFabricanteRazonSocial: jest.fn(),
  setFabricanteNombreInhabilitar: jest.fn(),
  setFabricantePrimerApellidoInhabilitar: jest.fn(),
  setFabricanteSegundoApellidoInhabilitar: jest.fn(),
  setFabricanteRazonSocialInhabilitar: jest.fn(),
  setPaisFabricante: jest.fn(),
  setEstadoFabricante: jest.fn(),
  setAlcaldiaFabricante: jest.fn(),
  setLocalidadFabricante: jest.fn(),
  setCodigoPostalFabricante: jest.fn(),
  setColoniaFabricante: jest.fn(),
  setCalleFabricante: jest.fn(),
  setNumeroExteriorFabricante: jest.fn(),
  setNumeroInteriorFabricante: jest.fn(),
  setLadaFabricante: jest.fn(),
  setTelefonoFabricante: jest.fn(),
  setCorreoElectronicoFabricante: jest.fn(),
  setPaisFabricanteInhabilitar: jest.fn(),
  setEstadoFabricanteInhabilitar: jest.fn(),
  setAlcaldiaFabricanteInhabilitar: jest.fn(),
  setLocalidadFabricanteInhabilitar: jest.fn(),
  setCodigoPostalInhabilitar: jest.fn(),
  setColoniaFabricanteInhabilitar: jest.fn(),
  setCalleFabricanteInhabilitar: jest.fn(),
  setNumeroExteriorFabricanteInhabilitar: jest.fn(),
  setNumeroInteriorFabricanteInhabilitar: jest.fn(),
  setLadaFabricanteInhabilitar: jest.fn(),
  setTelefonoFabricanteInhabilitar: jest.fn(),
  setCorreoElectronicoFabricanteInhabilitar: jest.fn(),
  updateFabricanteTablaDatos: jest.fn(),
};

import { of } from 'rxjs';

const mockTramite260601Query = {
  selectSeccionState$: of({})
};

const mockAvisoSanitarioService = {
  getProductoClasificacion: jest.fn().mockReturnValue(of({}))
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({})
};

describe('AgregarFabricanteSanitarioComponent', () => {
  let component: AgregarFabricanteSanitarioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: 'Tramite260601Store', useValue: mockTramite260601Store },
        { provide: 'Tramite260601Query', useValue: mockTramite260601Query },
        { provide: 'AvisoSanitarioService', useValue: mockAvisoSanitarioService },
        { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
      ]
    });

    component = new AgregarFabricanteSanitarioComponent(
      TestBed.inject(FormBuilder),
      mockTramite260601Store as any,
      mockTramite260601Query as any,
      mockAvisoSanitarioService as any,
      mockConsultaioQuery as any
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should call destruirNotificador$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});