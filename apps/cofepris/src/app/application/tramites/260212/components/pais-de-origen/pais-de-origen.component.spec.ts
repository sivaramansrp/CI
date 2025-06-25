import { TestBed } from '@angular/core/testing';
import { PaisDeOrigenComponent } from './pais-de-origen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';

describe('PaisDeOrigenComponent', () => {
  let component: PaisDeOrigenComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CommonModule, CrosslistComponent, PaisDeOrigenComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(PaisDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería alternar plegable cuando se llama mostrar_plegable', () => {
    const estadoInicial = component.plegable;
    component.mostrar_plegable();
    expect(component.plegable).toBe(!estadoInicial);
  });

  it('debería agregar todos los elementos a fechasSeleccionadas cuando se llama agregar con "t"', () => {
    component.selectRangoDias = ['2023-01-01', '2023-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(component.selectRangoDias);
    expect(component.fechasDatos.length).toBe(0);
  });

  it('debería eliminar todos los elementos de fechasSeleccionadas cuando se llama quitar con "t"', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.quitar('t');
    expect(component.fechasSeleccionadas.length).toBe(0);
    expect(component.fechasDatos).toEqual(['2023-01-01', '2023-01-02']);
  });

  it('debería tener los valores iniciales correctamente establecidos', () => {
    expect(component.plegable).toBe(false);
    expect(component.selectRangoDias ?? []).toEqual([]);
    expect(component.fechasSeleccionadas ?? []).toEqual([]);
    expect(component.fechasDatos ?? []).toEqual([]);
  });

  it('debería alternar plegable varias veces', () => {
    component.mostrar_plegable();
    expect(component.plegable).toBe(true);
    component.mostrar_plegable();
    expect(component.plegable).toBe(false);
  });

  it('no debería hacer nada si se llama agregar con un valor distinto de "t"', () => {
    component.selectRangoDias = ['2023-01-01'];
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    (component as any).fecha = { value: [] };
    expect(() => component.agregar('x')).not.toThrow();
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

it('debería manejar agregar con selectRangoDias vacío', () => {
    component.selectRangoDias = [];
    component.fechasSeleccionadas = [];
    component.fechasDatos = ['2023-01-01'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

  it('debería manejar quitar con fechasSeleccionadas vacío', () => {
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    component.quitar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

});
 
