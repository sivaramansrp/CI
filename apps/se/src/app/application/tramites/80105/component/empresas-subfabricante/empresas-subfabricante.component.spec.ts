import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('EmpresasSubfabricanteComponent', () => {
  let component: EmpresasSubfabricanteComponent;
  let fixture: ComponentFixture<EmpresasSubfabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasSubfabricanteComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatosDelAlmacen and obtenerListaEstado on ngOnInit', () => {
    const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosDelAlmacen');
    const obtenerListaSpy = jest.spyOn(component, 'obtenerListaEstado');
    component.ngOnInit();
    expect(obtenerDatosSpy).toHaveBeenCalled();
    expect(obtenerListaSpy).toHaveBeenCalled();
  });

   it('should clean up destroy$ on ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize the subcontratista form with default empty values and required validators', () => {
  expect(component.formularioDatosSubcontratista).toBeDefined();
  const form = component.formularioDatosSubcontratista;
  expect(form.get('rfc')?.value).toBe('');
  expect(form.get('estado')?.value).toBe('');
  expect(form.get('rfc')?.valid).toBe(false);
  expect(form.get('estado')?.valid).toBe(false);
  expect(form.valid).toBe(false);
});

it('should patch estado in form and update store on enEstadoSeleccionado', () => {
  const patchSpy = jest.spyOn(component.formularioDatosSubcontratista, 'patchValue');
  const storeSpy = jest.spyOn(component['store'], 'setDatosSubcontratista');
  const mockEstado = { id: 1, descripcion: 'Estado Test' };

  component.enEstadoSeleccionado(mockEstado);

  expect(patchSpy).toHaveBeenCalledWith({ estado: '1' });
  expect(storeSpy).toHaveBeenCalledWith(component.formularioDatosSubcontratista.value);
});


it('should call store.setDatosSubcontratista with provided data in alCambiarRFC', () => {
  const storeSpy = jest.spyOn(component['store'], 'setDatosSubcontratista');
  const mockData = { rfc: 'RFC123', estado: '1' };
  component.alCambiarRFC(mockData);
  expect(storeSpy).toHaveBeenCalledWith(mockData);
});

it('should update datosDelSubfabricanteSeleccionado if event has length', () => {
  const mockData = [{ calle: 'A', codigoPostal: 12345, colonia: 'X', numExterior: 1, numInterior: 1 }];
  component.obtenerRegistroSeleccionado(mockData);
  expect(component.datosDelSubfabricanteSeleccionado).toEqual(mockData);
});

it('should NOT call obtenerSubfabricantesDisponibles when rfc or estado is empty', () => {
  const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
  component.formularioDatosSubcontratista.setValue({ rfc: '', estado: '' });
  component.realizarBusqueda();
  expect(spy).not.toHaveBeenCalled();
});

it('should call store.setPlantasSubfabricantesAgregar in agregarPlantas', () => {
  const spy = jest.spyOn(component['store'], 'setPlantasSubfabricantesAgregar');
  const plantas = [{ calle: 'A', codigoPostal: 12345, colonia: 'X', numExterior: 1, numInterior: 1 }];
  component.agregarPlantas(plantas);
  expect(spy).toHaveBeenCalledWith(plantas);
});


it('should call obtenerSubfabricantesDisponibles only when form has rfc and estado', () => {
  const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
  component.formularioDatosSubcontratista.setValue({ rfc: 'RFC123', estado: '1' });
  component.realizarBusqueda();
  expect(spy).toHaveBeenCalled();
});


});
