import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('EmpresasSubfabricanteComponent', () => {
  let component: EmpresasSubfabricanteComponent;
  let fixture: ComponentFixture<EmpresasSubfabricanteComponent>;
  let mockQuery: Partial<Tramite80101Query>;
  let mockStore: Partial<Tramite80101Store>;
  let mockService: Partial<NuevoProgramaIndustrialService>;

  beforeEach(async () => {
    mockQuery = {
      datosSubcontratistaEstado$: of({ rfc: 'ABC123', estado: '1' }),
      plantasBuscadas$: of([]),
      plantasSubfabricantesAgregar$: of([])
    };

    mockStore = {
      setFormValida: jest.fn(),
      setDatosSubcontratista: jest.fn(),
      setPlantasBuscadas: jest.fn(),
      setPlantasSubfabricantesAgregar: jest.fn(),
      eliminarPlantas: jest.fn(),
      setPlantasPorCompletar: jest.fn(),
      setindicePrevioRuta: jest.fn()
    };

    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Estado 1' }] })),
      getSubfabricantesDisponibles: jest.fn().mockReturnValue(of([]))
    };
    
    await TestBed.configureTestingModule({
      imports: [EmpresasSubfabricanteComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: NuevoProgramaIndustrialService, useValue: mockService },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with rfc and estado fields', () => {
    expect(component.formularioDatosSubcontratista.contains('rfc')).toBeTruthy();
    expect(component.formularioDatosSubcontratista.contains('estado')).toBeTruthy();
  });

  it('should call obtenerDatosDelAlmacen and obtenerListaEstado on ngOnInit', () => {
    const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosDelAlmacen');
    const obtenerListaSpy = jest.spyOn(component, 'obtenerListaEstado');
    component.ngOnInit();
    expect(obtenerDatosSpy).toHaveBeenCalled();
    expect(obtenerListaSpy).toHaveBeenCalled();
  });

  it('should call service and update store when performing busqueda', () => {
    component.formularioDatosSubcontratista.setValue({ rfc: 'ABC123', estado: '1' });
    component.realizarBusqueda();
    expect(mockService.getSubfabricantesDisponibles).toHaveBeenCalled();
  });

  it('should store plantas to agregar', () => {
    const spy = jest.spyOn(component['store'], 'setPlantasSubfabricantesAgregar');
    const mockPlantas = [{ calle: 'X', numExterior: 1, numInterior: 2, codigoPostal: 1111, colonia: 'Centro' }];
    component.agregarPlantas(mockPlantas as any);
    expect(spy).toHaveBeenCalledWith(mockPlantas);
  });

  it('should call eliminarPlantas on store', () => {
    const spy = jest.spyOn(component['store'], 'eliminarPlantas');
    const plantas = [{ calle: 'X', numExterior: 1, numInterior: 2, codigoPostal: 1111, colonia: 'Centro' }];
    component.eliminarPlantas(plantas as any);
    expect(spy).toHaveBeenCalledWith(plantas);
  });

  it('should set plantas por completar and navigate on complementarPlantas()', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    const setPlantasPorCompletarSpy = jest.spyOn(component['store'], 'setPlantasPorCompletar');
    const setIndicePrevioRutaSpy = jest.spyOn(component['store'], 'setindicePrevioRuta');

    const plantas = [{ calle: 'A', numExterior: 1, numInterior: 1, codigoPostal: 1234, colonia: 'Roma' }];
    component.tabIndex = 3;
    component.complementarPlantas(plantas as any);

    expect(setPlantasPorCompletarSpy).toHaveBeenCalledWith(plantas);
    expect(setIndicePrevioRutaSpy).toHaveBeenCalledWith(3);
    expect(navigateSpy).toHaveBeenCalled();
  });

   it('should clean up destroy$ on ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
function done() {
  throw new Error('Function not implemented.');
}

