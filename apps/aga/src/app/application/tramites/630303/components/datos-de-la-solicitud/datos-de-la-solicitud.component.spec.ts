import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  let mockRetornoService: any;
  let mockStore: any;
  let mockQuery: any;

  const mockCatalogData = [
    { id: '1', descripcion: 'Opción 1' },
    { id: '2', descripcion: 'Opción 2' }
  ];

  const initialState = {
    fechaLimiteRetorno: '2025-12-31',
    cuentaProrroga: 'Sí'
  };

  beforeEach(async () => {
    mockRetornoService = {
      getAduanaDeIngreso: jest.fn().mockReturnValue(of(mockCatalogData)),
      getSeccionAduanera: jest.fn().mockReturnValue(of(mockCatalogData)),
      getProrroga: jest.fn().mockReturnValue(of(mockCatalogData))
    };

    mockStore = {
      setTramite630303State: jest.fn()
    };

    mockQuery = {
      selectTramite630303State$: of(initialState)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLaSolicitudComponent],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoService },
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery }
      ],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with state values', () => {
    expect(component.datosImportacionTemporalFormulario).toBeDefined();
    const form = component.datosImportacionTemporalFormulario.value;
    expect(form.fechaLimiteRetorno).toBe('2025-12-31');
    expect(form.cuentaProrroga).toBe('Sí');
  });

  it('should load Aduana de Ingreso options', () => {
    component.getAduanaDeIngreso();
    expect(mockRetornoService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduana = component.formularioDatosSolicitud.find(f => f.id === 'cveAduana');
    expect(aduana?.opciones).toEqual(mockCatalogData);
  });

  it('should load Sección Aduanera options', () => {
    component.getSeccionAduanera();
    expect(mockRetornoService.getSeccionAduanera).toHaveBeenCalled();
    const seccion = component.formularioDatosSolicitud.find(f => f.id === 'cveSeccionAduanera');
    expect(seccion?.opciones).toEqual(mockCatalogData);
  });

  it('should load Prórroga options', () => {
    component.getProrroga();
    expect(mockRetornoService.getProrroga).toHaveBeenCalled();
    expect(component.prorrogaOpciones).toEqual(mockCatalogData);
  });

  it('should update store when establecerCambioDeValor is called with an object with id', () => {
    component.establecerCambioDeValor({ campo: 'cveAduana', valor: { id: 5, descripcion: 'test' } });
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cveAduana', '5');
  });

  it('should update store when establecerCambioDeValor is called with primitive', () => {
    component.establecerCambioDeValor({ campo: 'cuentaProrroga', valor: 'No' });
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cuentaProrroga', 'No');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
