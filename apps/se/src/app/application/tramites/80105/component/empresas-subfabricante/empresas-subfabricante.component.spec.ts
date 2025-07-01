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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a obtenerDatosDelAlmacen y obtenerListaEstado en ngOnInit', () => {
    const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosDelAlmacen');
    const obtenerListaSpy = jest.spyOn(component, 'obtenerListaEstado');
    component.ngOnInit();
    expect(obtenerDatosSpy).toHaveBeenCalled();
    expect(obtenerListaSpy).toHaveBeenCalled();
  });

   it('debe limpiar destroy$ en ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe inicializar el formulario de subcontratista con valores vacíos por defecto y validadores requeridos', () => {
  expect(component.formularioDatosSubcontratista).toBeDefined();
  const form = component.formularioDatosSubcontratista;
  expect(form.get('rfc')?.value).toBe('');
  expect(form.get('estado')?.value).toBe('');
  expect(form.get('rfc')?.valid).toBe(false);
  expect(form.get('estado')?.valid).toBe(false);
  expect(form.valid).toBe(false);
});

it('debe actualizar el estado en el formulario y la tienda en enEstadoSeleccionado', () => {
  const patchSpy = jest.spyOn(component.formularioDatosSubcontratista, 'patchValue');
  const storeSpy = jest.spyOn(component['store'], 'setDatosSubcontratista');
  const mockEstado = { id: 1, descripcion: 'Estado Test' };

  component.enEstadoSeleccionado(mockEstado);

  expect(patchSpy).toHaveBeenCalledWith({ estado: '1' });
  expect(storeSpy).toHaveBeenCalledWith(component.formularioDatosSubcontratista.value);
});


it('debe llamar a store.setDatosSubcontratista con los datos proporcionados en alCambiarRFC', () => {
  const storeSpy = jest.spyOn(component['store'], 'setDatosSubcontratista');
  const mockData = { rfc: 'RFC123', estado: '1' };
  component.alCambiarRFC(mockData);
  expect(storeSpy).toHaveBeenCalledWith(mockData);
});

it('debe actualizar datosDelSubfabricanteSeleccionado si el evento tiene longitud', () => {
  const mockData = [{ calle: 'A', codigoPostal: 12345, colonia: 'X', numExterior: 1, numInterior: 1 }];
  component.obtenerRegistroSeleccionado(mockData);
  expect(component.datosDelSubfabricanteSeleccionado).toEqual(mockData);
});

it('no debe llamar a obtenerSubfabricantesDisponibles cuando rfc o estado están vacíos', () => {
  const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
  component.formularioDatosSubcontratista.setValue({ rfc: '', estado: '' });
  component.realizarBusqueda();
  expect(spy).not.toHaveBeenCalled();
});

it('debe llamar a store.setPlantasSubfabricantesAgregar en agregarPlantas', () => {
  const spy = jest.spyOn(component['store'], 'setPlantasSubfabricantesAgregar');
  const plantas = [{ calle: 'A', codigoPostal: 12345, colonia: 'X', numExterior: 1, numInterior: 1 }];
  component.agregarPlantas(plantas);
  expect(spy).toHaveBeenCalledWith(plantas);
});


it('debe llamar a obtenerSubfabricantesDisponibles solo cuando el formulario tiene rfc y estado', () => {
  const spy = jest.spyOn(component, 'obtenerSubfabricantesDisponibles');
  component.formularioDatosSubcontratista.setValue({ rfc: 'RFC123', estado: '1' });
  component.realizarBusqueda();
  expect(spy).toHaveBeenCalled();
});


});
