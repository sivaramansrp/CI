import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite630103Query } from '../../estados/tramite630103.query';
import { Tramite630103Store } from '../../estados/tramite630103.store';
import { AutorizacionImportacionTemporalService } from '../../services/autorizacion-importacion-temporal.service';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockTramite630103Store: jest.Mocked<Tramite630103Store>;
  let mockTramite630103Query: Partial<Tramite630103Query>;
  let mockAutorizacionImportacionTemporalService: jest.Mocked<AutorizacionImportacionTemporalService>;
  let destroyed$: Subject<void>;

  const mockAduanaDeIngreso = [
    { id: '1', descripcion: 'Aduana Ciudad de México' },
    { id: '2', descripcion: 'Aduana Monterrey' }
  ];

  const mockSeccionAduanera = [
    { id: '1', descripcion: 'Sección A' },
    { id: '2', descripcion: 'Sección B' }
  ];

  const mockState = {
    cveAduana: '1',
    cveSeccionAduanera: '2'
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    mockTramite630103Store = {
      setTramite630103State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630103Store>;

    mockTramite630103Query = {
      selectTramite630103State$: of(mockState),
    };

    mockAutorizacionImportacionTemporalService = {
      getAduanaDeIngreso: jest.fn().mockReturnValue(of(mockAduanaDeIngreso)),
      getSeccionAduanera: jest.fn().mockReturnValue(of(mockSeccionAduanera)),
    } as unknown as jest.Mocked<AutorizacionImportacionTemporalService>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormasDinamicasComponent,
        DatosDeLaSolicitudComponent // Add the standalone component here
      ],
      providers: [
        FormBuilder,
        { provide: Tramite630103Store, useValue: mockTramite630103Store },
        { provide: Tramite630103Query, useValue: mockTramite630103Query },
        { provide: AutorizacionImportacionTemporalService, useValue: mockAutorizacionImportacionTemporalService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería inicializar el componente correctamente', () => {
      const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
      const inizializarFormularioSpy = jest.spyOn(component, 'inizializarFormulario');
      const getAduanaDeIngresoSpy = jest.spyOn(component, 'getAduanaDeIngreso');
      const getSeccionAduaneraSpy = jest.spyOn(component, 'getSeccionAduanera');

      component.ngOnInit();

      expect(getValorStoreSpy).toHaveBeenCalled();
      expect(inizializarFormularioSpy).toHaveBeenCalled();
      expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
      expect(getSeccionAduaneraSpy).toHaveBeenCalled();
    });
  });

  describe('inizializarFormulario', () => {
    it('debería inicializar el formulario correctamente', () => {
      component.inizializarFormulario();
      expect(component.datosImportacionTemporalFormulario).toBeDefined();
    });
  });

  describe('getAduanaDeIngreso', () => {
    it('debería obtener las aduanas y actualizar formularioDatosSolicitud', () => {
      component.formularioDatosSolicitud = [{ id: 'cveAduana', opciones: [] } as any];

      component.getAduanaDeIngreso();

      expect(mockAutorizacionImportacionTemporalService.getAduanaDeIngreso).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockAduanaDeIngreso);
    });
  });

  describe('getSeccionAduanera', () => {
    it('debería obtener las secciones aduaneras y actualizar formularioDatosSolicitud', () => {
      component.formularioDatosSolicitud = [{ id: 'cveSeccionAduanera', opciones: [] } as any];

      component.getSeccionAduanera();

      expect(mockAutorizacionImportacionTemporalService.getSeccionAduanera).toHaveBeenCalled();
      expect(component.formularioDatosSolicitud[0].opciones).toEqual(mockSeccionAduanera);
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
      expect(mockTramite630103Store.setTramite630103State).toHaveBeenCalledWith('testField', '123');
    });

    it('debería establecer el estado con valor directo cuando el valor del evento no tiene id', () => {
      const event = { campo: 'testField', valor: 'testValue' };
      component.establecerCambioDeValor(event);
      expect(mockTramite630103Store.setTramite630103State).toHaveBeenCalledWith('testField', 'testValue');
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