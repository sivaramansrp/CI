import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  let mockRetornoService: any;
  let mockStore: any;
  let mockQuery: any;

  const MOCK_CATALOG_DATA = [
    { id: '1', descripcion: 'Opción 1' },
    { id: '2', descripcion: 'Opción 2' }
  ];

  const INITIAL_STATE = {
    fechaLimiteRetorno: '2025-12-31',
    cuentaProrroga: 'Sí'
  };

  beforeEach(async () => {
    mockRetornoService = {
      getAduanaDeIngreso: jest.fn().mockReturnValue(of(MOCK_CATALOG_DATA)),
      getSeccionAduanera: jest.fn().mockReturnValue(of(MOCK_CATALOG_DATA)),
      getProrroga: jest.fn().mockReturnValue(of(MOCK_CATALOG_DATA))
    };

    mockStore = {
      setTramite630307State: jest.fn()
    };

    mockQuery = {
      selectTramite630307State$: of(INITIAL_STATE)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitudComponent],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoService },
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery }
      ],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los valores del estado', () => {
    expect(component.datosImportacionTemporalFormulario).toBeDefined();
    const form = component.datosImportacionTemporalFormulario.value;
    expect(form.fechaLimiteRetorno).toBe('2025-12-31');
    expect(form.cuentaProrroga).toBe('Sí');
  });

  it('debería cargar las opciones de Aduana de Ingreso', () => {
    component.getAduanaDeIngreso();
    expect(mockRetornoService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduana = component.formularioDatosSolicitud.find(f => f.id === 'cveAduana');
    expect(aduana?.opciones).toEqual(MOCK_CATALOG_DATA);
  });

  it('debería cargar las opciones de Sección Aduanera', () => {
    component.getSeccionAduanera();
    expect(mockRetornoService.getSeccionAduanera).toHaveBeenCalled();
    const seccion = component.formularioDatosSolicitud.find(f => f.id === 'cveSeccionAduanera');
    expect(seccion?.opciones).toEqual(MOCK_CATALOG_DATA);
  });

  it('debería cargar las opciones de Prórroga', () => {
    component.getProrroga();
    expect(mockRetornoService.getProrroga).toHaveBeenCalled();
    expect(component.prorrogaOpciones).toEqual(MOCK_CATALOG_DATA);
  });

  it('debería actualizar el store cuando establecerCambioDeValor es llamado con un objeto con id', () => {
    component.establecerCambioDeValor({ campo: 'cveAduana', valor: { id: 5, descripcion: 'test' } });
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith('cveAduana', '5');
  });

  it('debería actualizar el store cuando establecerCambioDeValor es llamado con un valor primitivo', () => {
    component.establecerCambioDeValor({ campo: 'cuentaProrroga', valor: 'No' });
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith('cuentaProrroga', 'No');
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
