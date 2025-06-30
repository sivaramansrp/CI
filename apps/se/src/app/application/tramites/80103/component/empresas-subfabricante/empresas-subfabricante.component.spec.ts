import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { INITIAL_AMPLIACION_SERVICIOS_STATE, Tramite80101Store } from '../../estados/tramite80101.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosSubcontratista, PlantasSubfabricante } from '../../../../shared/models/empresas-subfabricanta.model';

describe('EmpresasSubfabricanteComponent (Jest)', () => {
  let component: EmpresasSubfabricanteComponent;
  let fixture: ComponentFixture<EmpresasSubfabricanteComponent>;
  let mockStore: Partial<Tramite80101Store>;
  let mockQuery: Partial<Tramite80101Query>;
  let mockService: Partial<NuevoProgramaIndustrialService>;
  const mockRouter = { navigate: jest.fn() };

  const DATOS_SUBCONTRATISTA_MOCK: DatosSubcontratista = {
    rfc: 'XAXX010101000',
    estado: '1',
  };

  const PLANTAS_MOCK: PlantasSubfabricante[] = [
    {
      calle: 'Reforma',
      numExterior: 1,
      numInterior: 0,
      codigoPostal: 12345,
      colonia: 'Centro',
    },
  ];

  beforeEach(async () => {
   mockQuery = {
  selectSolicitud$: of(INITIAL_AMPLIACION_SERVICIOS_STATE),
  datosSubcontratistaEstado$: of(DATOS_SUBCONTRATISTA_MOCK),
  plantasBuscadas$: of(PLANTAS_MOCK),
  plantasSubfabricantesAgregar$: of([]),
};


    mockStore = {
      setFormValida: jest.fn(),
      setDatosSubcontratista: jest.fn(),
      setPlantasBuscadas: jest.fn(),
      setPlantasSubfabricantesAgregar: jest.fn(),
      eliminarPlantas: jest.fn(),
      setPlantasPorCompletar: jest.fn(),
      setindicePrevioRuta: jest.fn(),
    };

    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'CDMX' }] })),
      getSubfabricantesDisponibles: jest.fn().mockReturnValue(of(PLANTAS_MOCK)),
    };

    await TestBed.configureTestingModule({
      imports: [EmpresasSubfabricanteComponent, ReactiveFormsModule],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: NuevoProgramaIndustrialService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
    component = fixture.componentInstance;
    component.inicializarFormularioDatosSubcontratista(); // Ensure form initialized before detectChanges
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form and call setFormValida on datosSubcontratistaEstado$', () => {
    expect(component.formularioDatosSubcontratista.value).toEqual(DATOS_SUBCONTRATISTA_MOCK);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({
      esDatosSubcontratistaValido: true,
    });
  });

  it('should update datosTablaSubfabricantesDisponibles on plantasBuscadas$', () => {
    expect(component.datosTablaSubfabricantesDisponibles).toEqual(PLANTAS_MOCK);
  });

  it('should clear datosSubfabricanteParaSerAgregados if empty response', () => {
    expect(component.datosSubfabricanteParaSerAgregados).toEqual([]);
  });

  it('should update estado on enEstadoSeleccionado()', () => {
    const estado: Catalogo = { id: 33, descripcion: 'Nuevo León' };
    component.enEstadoSeleccionado(estado);
    expect(component.formularioDatosSubcontratista.value.estado).toBe('33');
    expect(mockStore.setDatosSubcontratista).toHaveBeenCalled();
  });

  it('should update store on alCambiarRFC()', () => {
    const datos: DatosSubcontratista = { rfc: 'RFC123', estado: '2' };
    component.alCambiarRFC(datos);
    expect(mockStore.setDatosSubcontratista).toHaveBeenCalledWith(datos);
  });

  it('should update estadoCatalogo on obtenerListaEstado()', () => {
    component.obtenerListaEstado();
    expect(component.estadoCatalogo).toEqual([{ id: 1, descripcion: 'CDMX' }]);
  });

  it('should call store.setPlantasBuscadas on obtenerSubfabricantesDisponibles()', () => {
    component.obtenerSubfabricantesDisponibles();
    expect(mockStore.setPlantasBuscadas).toHaveBeenCalledWith(PLANTAS_MOCK);
  });

  it('should assign selected plants on obtenerRegistroSeleccionado()', () => {
    component.obtenerRegistroSeleccionado(PLANTAS_MOCK);
    expect(component.datosDelSubfabricanteSeleccionado).toEqual(PLANTAS_MOCK);
  });

  it('should call obtenerSubfabricantesDisponibles() when form is valid on realizarBusqueda()', () => {
    const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
    component.formularioDatosSubcontratista.patchValue({ rfc: 'RFC', estado: '10' });
    component.realizarBusqueda();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call obtenerSubfabricantesDisponibles() when form is invalid on realizarBusqueda()', () => {
    const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
    component.formularioDatosSubcontratista.patchValue({ rfc: '', estado: '' });
    component.realizarBusqueda();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call store.setPlantasSubfabricantesAgregar on agregarPlantas()', () => {
    component.agregarPlantas(PLANTAS_MOCK);
    expect(mockStore.setPlantasSubfabricantesAgregar).toHaveBeenCalledWith(PLANTAS_MOCK);
  });

  it('should assign list on datosDelSubfabricantePorEliminar()', () => {
    component.datosDelSubfabricantePorEliminar(PLANTAS_MOCK);
    expect(component.listaDeSubfabricantesPorEliminar).toEqual(PLANTAS_MOCK);
  });

  it('should call eliminarPlantas() on eliminarPlantas()', () => {
    component.eliminarPlantas(PLANTAS_MOCK);
    expect(mockStore.eliminarPlantas).toHaveBeenCalledWith(PLANTAS_MOCK);
  });

  it('should call store and router on complementarPlantas()', () => {
    component.tabIndex = 2;
    component.complementarPlantas(PLANTAS_MOCK);
    expect(mockStore.setPlantasPorCompletar).toHaveBeenCalledWith(PLANTAS_MOCK);
    expect(mockStore.setindicePrevioRuta).toHaveBeenCalledWith(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../complementar-plantas'], { relativeTo: {} });
  });

  it('should call destroyNotifier$ on ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
