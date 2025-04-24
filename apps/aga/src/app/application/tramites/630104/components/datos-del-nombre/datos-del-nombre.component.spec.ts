import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDelNombreComponent } from './datos-del-nombre.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

import { CatalogoSelectComponent, SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../domicilio-fiscal/domicilio-fiscal.component';

import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

// Use Jest's mocking system
jest.mock('../../estados/queries/tramite630104.query');
jest.mock('../../estados/tramites/tramite630104.store');
jest.mock('../../services/equipo-e-instrumentos-musicales.service');

describe('DatosDelNombreComponent', () => {
  let component: DatosDelNombreComponent;
  let fixture: ComponentFixture<DatosDelNombreComponent>;
  let mockTramite630104Store: jest.Mocked<Tramite630104Store>;
  let mockTramite630104Query: Partial<Tramite630104Query>;
  let mockEquipoEInstrumentosMusicalesService: jest.Mocked<EquipoEInstrumentosMusicalesService>;

  const mockConsultarPorRFC = [
    { id: '1', descripcion: 'Sí' },
    { id: '2', descripcion: 'No' }
  ];

  const mockTipoDeRepresentante = [
    { id: '1', descripcion: 'Representante Legal' },
    { id: '2', descripcion: 'Apoderado' }
  ];

  const mockPaises = [
    { id: '1', descripcion: 'México' },
    { id: '2', descripcion: 'Estados Unidos' }
  ];

  const mockState = {
    consultarPorRFC: '1',
    tipoDeRepresentante: '1',
    nombre: 'Juan',
    apellidoPaterno: 'Perez',
    apellidoMaterno: 'Gomez',
    razonSocial: 'Empresa SA de CV',
    rfc: 'RFC12345',
    rfcOptionado: 'RFCOP123',
    curp: 'CURP123456789',
    tipoDePropietario: '1'
  };

  beforeEach(async () => {
    // Reset all mocks between tests
    jest.clearAllMocks();

    // Create mock implementations
    mockTramite630104Store = {
      setTramite630104State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630104Store>;

    mockTramite630104Query = {
      selectTramite630104State$: of(mockState),
    };

    mockEquipoEInstrumentosMusicalesService = {
      getconsultarPorRFC: jest.fn().mockReturnValue(of(mockConsultarPorRFC)),
      getTipoDeRepresentante: jest.fn().mockReturnValue(of(mockTipoDeRepresentante)),
      getPais: jest.fn().mockReturnValue(of(mockPaises)),
    } as unknown as jest.Mocked<EquipoEInstrumentosMusicalesService>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDelNombreComponent
      ],
      providers: [
        { provide: Tramite630104Store, useValue: mockTramite630104Store },
        { provide: Tramite630104Query, useValue: mockTramite630104Query },
        { provide: EquipoEInstrumentosMusicalesService, useValue: mockEquipoEInstrumentosMusicalesService }
      ]
    }).compileComponents();

    // Mock the child components to prevent errors
    await TestBed.overrideComponent(DatosDelNombreComponent, {
      set: {
        imports: [CommonModule, ReactiveFormsModule],
        providers: [
          { provide: Tramite630104Store, useValue: mockTramite630104Store },
          { provide: Tramite630104Query, useValue: mockTramite630104Query },
          { provide: EquipoEInstrumentosMusicalesService, useValue: mockEquipoEInstrumentosMusicalesService }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    test('should initialize component properly', () => {
      // Use Jest's spyOn for methods on the component
      const getValorStoreSpy = jest.spyOn(component, 'getValorStore').mockImplementation();
      const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario').mockImplementation();
      const getconsultarPorRFCSpy = jest.spyOn(component, 'getconsultarPorRFC').mockImplementation();
      const getTipoDeRepresentanteSpy = jest.spyOn(component, 'getTipoDeRepresentante').mockImplementation();
      const getPaisSpy = jest.spyOn(component, 'getPais').mockImplementation();
      const ajustarValidadoresSegunValorSpy = jest.spyOn(component, 'ajustarValidadoresSegunValor').mockImplementation();

      component.ngOnInit();

      expect(getValorStoreSpy).toHaveBeenCalled();
      expect(inicializarFormularioSpy).toHaveBeenCalled();
      expect(getconsultarPorRFCSpy).toHaveBeenCalled();
      expect(getTipoDeRepresentanteSpy).toHaveBeenCalled();
      expect(getPaisSpy).toHaveBeenCalled();
      expect(ajustarValidadoresSegunValorSpy).toHaveBeenCalled();
    });
  });

  describe('inicializarFormulario', () => {
    test('should initialize form with values from state', () => {
      component.estadoSeleccionado = mockState;
      component.inicializarFormulario();

      expect(component.datisDelNombre.get('consultarPorRFC')?.value).toBe('1');
      expect(component.datisDelNombre.get('tipoDeRepresentante')?.value).toBe('1');
      expect(component.datisDelNombre.get('nombre')?.value).toBe('Juan');
      expect(component.datisDelNombre.get('apellidoPaterno')?.value).toBe('Perez');
      expect(component.datisDelNombre.get('apellidoMaterno')?.value).toBe('Gomez');
      expect(component.datisDelNombre.get('razonSocial')?.value).toBe('Empresa SA de CV');
      expect(component.datisDelNombre.get('rfc')?.value).toBe('RFC12345');
      expect(component.datisDelNombre.get('rfcOptionado')?.value).toBe('RFCOP123');
      expect(component.datisDelNombre.get('curp')?.value).toBe('CURP123456789');
    });

    test('should initialize form with empty values when state is empty', () => {
      component.estadoSeleccionado = {};
      component.inicializarFormulario();

      expect(component.datisDelNombre.get('consultarPorRFC')?.value).toBe('');
      expect(component.datisDelNombre.get('tipoDeRepresentante')?.value).toBe('');
      expect(component.datisDelNombre.get('nombre')?.value).toBe('');
      expect(component.datisDelNombre.get('apellidoPaterno')?.value).toBe('');
      expect(component.datisDelNombre.get('apellidoMaterno')?.value).toBe('');
      expect(component.datisDelNombre.get('razonSocial')?.value).toBe('');
      expect(component.datisDelNombre.get('rfc')?.value).toBe('');
      expect(component.datisDelNombre.get('rfcOptionado')?.value).toBe('');
      expect(component.datisDelNombre.get('curp')?.value).toBe('');
    });
  });

  describe('getValorStore', () => {
    test('should update estadoSeleccionado with store data', () => {
      component.getValorStore();
      expect(component.estadoSeleccionado).toEqual(mockState);
    });
  });

  describe('getconsultarPorRFC', () => {
    test('should get consultarPorRFC options from service', () => {
      component.getconsultarPorRFC();
      expect(mockEquipoEInstrumentosMusicalesService.getconsultarPorRFC).toHaveBeenCalled();
      expect(component.consultarPorRFC).toEqual(mockConsultarPorRFC);
    });
  });

  describe('getTipoDeRepresentante', () => {
    test('should get tipoDeRepresentante options from service', () => {
      component.getTipoDeRepresentante();
      expect(mockEquipoEInstrumentosMusicalesService.getTipoDeRepresentante).toHaveBeenCalled();
      expect(component.tipoDeRepresentanteOpciones).toEqual(mockTipoDeRepresentante);
    });
  });

  describe('getPais', () => {
    test('should get country options and update formularioDatosTipoPropietario', () => {
      // Mock the field to update
      component.formularioDatosTipoPropietario = [{ id: 'pais', opciones: [] } as any];
      
      component.getPais();
      
      expect(mockEquipoEInstrumentosMusicalesService.getPais).toHaveBeenCalled();
      expect(component.formularioDatosTipoPropietario[0].opciones).toEqual(mockPaises);
    });

    test('should handle case when pais field is not found', () => {
      // Create a formularioDatosTipoPropietario without the pais field
      component.formularioDatosTipoPropietario = [{ id: 'otroId', opciones: [] } as any];
      
      component.getPais();
      
      expect(mockEquipoEInstrumentosMusicalesService.getPais).toHaveBeenCalled();
      // The test passes if no error is thrown when the field isn't found
    });
  });

  describe('continuar', () => {
    test('should set consultarPorRFCOpcionseleccionada to true when consultarPorRFC is 1', () => {
      component.datisDelNombre.get('consultarPorRFC')?.setValue('1');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(true);
    });

    test('should set consultarPorRFCOpcionseleccionada to false when consultarPorRFC is 2', () => {
      component.datisDelNombre.get('consultarPorRFC')?.setValue('2');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(false);
    });

    test('should not change consultarPorRFCOpcionseleccionada for other values', () => {
      component.consultarPorRFCOpcionseleccionada = true;
      component.datisDelNombre.get('consultarPorRFC')?.setValue('3');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(true);
    });
  });

  describe('establecerCambioDeValor', () => {
    test('should set state with object value when event value is an object with id', () => {
      const event = { campo: 'testField', valor: { id: '123', name: 'Test' } };
      component.establecerCambioDeValor(event);
      expect(mockTramite630104Store.setTramite630104State).toHaveBeenCalledWith('testField', '123');
    });

    test('should set state with direct value when event value is not an object with id', () => {
      const event = { campo: 'testField', valor: 'testValue' };
      component.establecerCambioDeValor(event);
      expect(mockTramite630104Store.setTramite630104State).toHaveBeenCalledWith('testField', 'testValue');
    });

    test('should update consultarPorRFCOpcionseleccionada with form value', () => {
      component.datisDelNombre.get('consultarPorRFC')?.setValue('1');
      const event = { campo: 'someField', valor: 'someValue' };
      component.establecerCambioDeValor(event);
      expect(component.consultarPorRFCOpcionseleccionada).toBe('1');
    });
  });

  describe('establecerValidadores', () => {
    test('should set validators for the specified form fields', () => {
      component.inicializarFormulario(); // Initialize form first
      
      // Use Jest's spyOn for the form controls
      const updateSpy1 = jest.spyOn(component.datisDelNombre.get('nombre')!, 'updateValueAndValidity');
      const updateSpy2 = jest.spyOn(component.datisDelNombre.get('apellidoPaterno')!, 'updateValueAndValidity');
      const setValidatorsSpy1 = jest.spyOn(component.datisDelNombre.get('nombre')!, 'setValidators');
      const setValidatorsSpy2 = jest.spyOn(component.datisDelNombre.get('apellidoPaterno')!, 'setValidators');
      
      const validatorFn = jest.fn();
      component.establecerValidadores(['nombre', 'apellidoPaterno'], validatorFn);
      
      expect(setValidatorsSpy1).toHaveBeenCalledWith(validatorFn);
      expect(setValidatorsSpy2).toHaveBeenCalledWith(validatorFn);
      expect(updateSpy1).toHaveBeenCalled();
      expect(updateSpy2).toHaveBeenCalled();
    });
  });

  describe('limpiarValidadores', () => {
    test('should clear validators for the specified form fields', () => {
      component.inicializarFormulario(); // Initialize form first
      
      const clearSpy1 = jest.spyOn(component.datisDelNombre.get('nombre')!, 'clearValidators');
      const clearSpy2 = jest.spyOn(component.datisDelNombre.get('apellidoPaterno')!, 'clearValidators');
      const updateSpy1 = jest.spyOn(component.datisDelNombre.get('nombre')!, 'updateValueAndValidity');
      const updateSpy2 = jest.spyOn(component.datisDelNombre.get('apellidoPaterno')!, 'updateValueAndValidity');

      component.limpiarValidadores(['nombre', 'apellidoPaterno']);
      
      expect(clearSpy1).toHaveBeenCalled();
      expect(clearSpy2).toHaveBeenCalled();
      expect(updateSpy1).toHaveBeenCalled();
      expect(updateSpy2).toHaveBeenCalled();
    });
  });

  describe('ajustarValidadoresSegunValor', () => {
    beforeEach(() => {
      component.inicializarFormulario();
      jest.spyOn(component, 'limpiarValidadores').mockImplementation();
      jest.spyOn(component, 'establecerValidadores').mockImplementation();
    });

    test('should adjust validators when tipoDePropietario is 1', () => {
      component.datisDelNombre.get('tipoDePropietario')?.setValue('1');

      component.ajustarValidadoresSegunValor();

      expect(component.limpiarValidadores).toHaveBeenCalledWith(['razonSocial']);
      expect(component.establecerValidadores).toHaveBeenCalledWith(['nombre', 'apellidoPaterno'], expect.any(Function));
    });

    test('should adjust validators when tipoDePropietario is 2', () => {
      component.datisDelNombre.get('tipoDePropietario')?.setValue('2');

      component.ajustarValidadoresSegunValor();

      expect(component.limpiarValidadores).toHaveBeenCalledWith(['nombre', 'apellidoPaterno']);
      expect(component.establecerValidadores).toHaveBeenCalledWith(['razonSocial'], expect.any(Function));
    });

    test('should not change validators for other tipoDePropietario values', () => {
      component.datisDelNombre.get('tipoDePropietario')?.setValue('3');

      component.ajustarValidadoresSegunValor();

      expect(component.limpiarValidadores).not.toHaveBeenCalled();
      expect(component.establecerValidadores).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    test('should complete the destroyed$ subject', () => {
      const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});