import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CatalogoSelectComponent, InputFechaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

// Usar el sistema de mocking de Jest
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
    // Restablecer todos los mocks entre pruebas
    jest.clearAllMocks();

    // Crear implementaciones simuladas
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
        DatosDeLaSolicitudComponent,
        FormasDinamicasComponent
      ],
      providers: [
        { provide: Tramite630104Store, useValue: mockTramite630104Store },
        { provide: Tramite630104Query, useValue: mockTramite630104Query },
        { provide: EquipoEInstrumentosMusicalesService, useValue: mockEquipoEInstrumentosMusicalesService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agregar esta línea
    }).compileComponents();

    // Simular los componentes hijos para evitar errores
    await TestBed.overrideComponent(DatosDeLaSolicitudComponent, {
      set: {
        imports: [CommonModule, ReactiveFormsModule, TituloComponent, FormasDinamicasComponent],
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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería inicializar el componente correctamente', () => {
      const getValorStoreSpy = jest.spyOn(component, 'getValorStore').mockImplementation();
      const inizializarFormularioSpy = jest.spyOn(component, 'inizializarFormulario').mockImplementation();
      const getAduanaDeIngresoSpy = jest.spyOn(component, 'getAduanaDeIngreso').mockImplementation();
      const getSeccionAduaneraSpy = jest.spyOn(component, 'getSeccionAduanera').mockImplementation();

      component.ngOnInit();

      expect(getValorStoreSpy).toHaveBeenCalled();
      expect(inizializarFormularioSpy).toHaveBeenCalled();
      expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
      expect(getSeccionAduaneraSpy).toHaveBeenCalled();
    });
  });

  describe('inizializarFormulario', () => {
    it('debería inicializar el formulario correctamente', () => {
      const formBuilderSpy = jest.spyOn(component.fb, 'group');
      
      component.inizializarFormulario();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(component.datosImportacionTemporalFormulario).toBeDefined();
    });
  });

  describe('getAduanaDeIngreso', () => {
    it('debería obtener las aduanas y actualizar formularioDatosSolicitud', () => {
      component.formularioDatosSolicitud = [{ id: 'cveAduana', opciones: [] } as any];
      
      component.getAduanaDeIngreso();
      
      expect(mockEquipoEInstrumentosMusicalesService.getAduanaDeIngreso).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockAduanaDeIngreso);
    });

    it('debería manejar el caso cuando no se encuentra el campo cveAduana', () => {
      component.formularioDatosSolicitud = [{ id: 'otroId', opciones: [] } as any];
      
      component.getAduanaDeIngreso();
      
      expect(mockEquipoEInstrumentosMusicalesService.getAduanaDeIngreso).toHaveBeenCalled();
    });
  });

  describe('getSeccionAduanera', () => {
    it('debería obtener las secciones aduaneras y actualizar formularioDatosSolicitud', () => {
      component.formularioDatosSolicitud = [{ id: 'cveSeccionAduanera', opciones: [] } as any];
      
      component.getSeccionAduanera();
      
      expect(mockEquipoEInstrumentosMusicalesService.getSeccionAduanera).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockSeccionAduanera);
    });

    it('debería manejar el caso cuando no se encuentra el campo cveSeccionAduanera', () => {
      component.formularioDatosSolicitud = [{ id: 'otroId', opciones: [] } as any];
      
      component.getSeccionAduanera();
      
      expect(mockEquipoEInstrumentosMusicalesService.getSeccionAduanera).toHaveBeenCalled();
    });
  });

  describe('getValorStore', () => {
    it('debería actualizar estadoSeleccionado con datos del store', () => {
      component.getValorStore();
      expect(component.estadoSeleccionado).toEqual(mockState);
    });
  });

  describe('establecerCambioDeValor', () => {
    it('debería establecer el estado con valor de objeto cuando el valor del evento tiene id', () => {
      const event = { campo: 'testField', valor: { id: '123', name: 'Test' } };
      component.establecerCambioDeValor(event);
      expect(mockTramite630104Store.setTramite630104State).toHaveBeenCalledWith('testField', '123');
    });

    it('debería establecer el estado con valor directo cuando el valor del evento no tiene id', () => {
      const event = { campo: 'testField', valor: 'testValue' };
      component.establecerCambioDeValor(event);
      expect(mockTramite630104Store.setTramite630104State).toHaveBeenCalledWith('testField', 'testValue');
    });
  });

  describe('ngOnDestroy', () => {
    it('debería completar el subject destroyed$', () => {
      const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
