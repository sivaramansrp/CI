import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

import { CatalogoSelectComponent, InputFechaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

// Use Jest's mocking system
jest.mock('../../estados/queries/tramite630104.query');
jest.mock('../../estados/tramites/tramite630104.store');
jest.mock('../../services/equipo-e-instrumentos-musicales.service');

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockTramite630104Store: jest.Mocked<Tramite630104Store>;
  let mockTramite630104Query: Partial<Tramite630104Query>;
  let mockEquipoEInstrumentosMusicalesService: jest.Mocked<EquipoEInstrumentosMusicalesService>;

  const mockAduanaDeIngreso = [
    { id: '1', descripcion: 'Aduana Ciudad de México' },
    { id: '2', descripcion: 'Aduana Monterrey' }
  ];

  const mockSeccionAduanera = [
    { id: '1', descripcion: 'Sección A' },
    { id: '2', descripcion: 'Sección B' }
  ];

  const mockProrroga = [
    { id: '1', descripcion: 'Prórroga 1' },
    { id: '2', descripcion: 'Prórroga 2' }
  ];

  const mockState = {
    cveAduana: '1',
    cveSeccionAduanera: '2',
    prorroga: '1'
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
      getAduanaDeIngreso: jest.fn().mockReturnValue(of(mockAduanaDeIngreso)),
      getSeccionAduanera: jest.fn().mockReturnValue(of(mockSeccionAduanera)),
      getProrroga: jest.fn().mockReturnValue(of(mockProrroga)),
    } as unknown as jest.Mocked<EquipoEInstrumentosMusicalesService>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDeLaSolicitudComponent
      ],
      providers: [
        { provide: Tramite630104Store, useValue: mockTramite630104Store },
        { provide: Tramite630104Query, useValue: mockTramite630104Query },
        { provide: EquipoEInstrumentosMusicalesService, useValue: mockEquipoEInstrumentosMusicalesService }
      ]
    }).compileComponents();

    // Mock the child components to prevent errors
    await TestBed.overrideComponent(DatosDeLaSolicitudComponent, {
      set: {
        imports: [CommonModule, ReactiveFormsModule],
        providers: [
          { provide: Tramite630104Store, useValue: mockTramite630104Store },
          { provide: Tramite630104Query, useValue: mockTramite630104Query },
          { provide: EquipoEInstrumentosMusicalesService, useValue: mockEquipoEInstrumentosMusicalesService }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
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
      const inizializarFormularioSpy = jest.spyOn(component, 'inizializarFormulario').mockImplementation();
      const getAduanaDeIngresoSpy = jest.spyOn(component, 'getAduanaDeIngreso').mockImplementation();
      const getSeccionAduaneraSpy = jest.spyOn(component, 'getSeccionAduanera').mockImplementation();
      const getProrrogaSpy = jest.spyOn(component, 'getProrroga').mockImplementation();

      component.ngOnInit();

      expect(getValorStoreSpy).toHaveBeenCalled();
      expect(inizializarFormularioSpy).toHaveBeenCalled();
      expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
      expect(getSeccionAduaneraSpy).toHaveBeenCalled();
      expect(getProrrogaSpy).toHaveBeenCalled();
    });
  });

  describe('inizializarFormulario', () => {
    test('should initialize form correctly', () => {
      const formBuilderSpy = jest.spyOn(component.fb, 'group');
      
      component.inizializarFormulario();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(component.datosImportacionTemporalFormulario).toBeDefined();
    });
  });

  describe('getAduanaDeIngreso', () => {
    test('should get aduanas and update formularioDatosSolicitud', () => {
      // Add a field with id 'cveAduana' to the formularioDatosSolicitud
      component.formularioDatosSolicitud = [{ id: 'cveAduana', opciones: [] } as any];
      
      component.getAduanaDeIngreso();
      
      expect(mockEquipoEInstrumentosMusicalesService.getAduanaDeIngreso).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockAduanaDeIngreso);
    });

    test('should handle case when cveAduana field is not found', () => {
      // Create a formularioDatosSolicitud without the cveAduana field
      component.formularioDatosSolicitud = [{ id: 'otroId', opciones: [] } as any];
      
      component.getAduanaDeIngreso();
      
      expect(mockEquipoEInstrumentosMusicalesService.getAduanaDeIngreso).toHaveBeenCalled();
      // Test passes if no error is thrown
    });
  });

  describe('getSeccionAduanera', () => {
    test('should get secciones aduaneras and update formularioDatosSolicitud', () => {
      // Add a field with id 'cveSeccionAduanera' to the formularioDatosSolicitud
      component.formularioDatosSolicitud = [{ id: 'cveSeccionAduanera', opciones: [] } as any];
      
      component.getSeccionAduanera();
      
      expect(mockEquipoEInstrumentosMusicalesService.getSeccionAduanera).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockSeccionAduanera);
    });

    test('should handle case when cveSeccionAduanera field is not found', () => {
      // Create a formularioDatosSolicitud without the cveSeccionAduanera field
      component.formularioDatosSolicitud = [{ id: 'otroId', opciones: [] } as any];
      
      component.getSeccionAduanera();
      
      expect(mockEquipoEInstrumentosMusicalesService.getSeccionAduanera).toHaveBeenCalled();
      // Test passes if no error is thrown
    });
  });

  describe('getProrroga', () => {
    test('should get prorroga options and update component property', () => {
      component.getProrroga();
      
      expect(mockEquipoEInstrumentosMusicalesService.getProrroga).toHaveBeenCalled();
      expect(component.prorrogaOpciones).toEqual(mockProrroga);
    });
  });

  describe('getValorStore', () => {
    test('should update estadoSeleccionado with store data', () => {
      component.getValorStore();
      expect(component.estadoSeleccionado).toEqual(mockState);
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