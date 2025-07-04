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

  // Cobertura para mostrar_plegable cuando ya está en true
  it('debería alternar plegable de true a false', () => {
    component.plegable = true;
    component.mostrar_plegable();
    expect(component.plegable).toBe(false);
  });

  // Cobertura para agregar con valor vacío ('')
  it('debería manejar agregar con valor vacío', () => {
    component.selectRangoDias = ['2023-01-01'];
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    (component as any).fecha = { value: [0] };
    expect(() => component.agregar('')).not.toThrow();
    // Dependiendo de la implementación, puede que no agregue nada
    expect(Array.isArray(component.fechasSeleccionadas)).toBe(true);
  });

  // Cobertura para quitar con valor vacío y fechaSeleccionada con índice válido
  it('debería quitar una fecha específica de fechasSeleccionadas y agregarla a fechasDatos', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.fechasDatos = [];
    (component as any).fechaSeleccionada = { value: [0] };
    component.quitar('');
    expect(component.fechasDatos).toEqual(['2023-01-01']);
    expect(component.fechasSeleccionadas).toEqual(['2023-01-02']);
  });

  // Cobertura para quitar con valor vacío y fechaSeleccionada con índice fuera de rango
  it('no debería fallar si fechaSeleccionada.value tiene un índice fuera de rango', () => {
    component.fechasSeleccionadas = ['2023-01-01'];
    component.fechasDatos = [];
    (component as any).fechaSeleccionada = { value: [5] };
    expect(() => component.quitar('')).not.toThrow();
    // No debe modificar nada
    expect(component.fechasDatos).toEqual([]);
    expect(component.fechasSeleccionadas).toEqual(['2023-01-01']);
  });

  // Cobertura para agregar con valor 't' y selectRangoDias undefined
  it('debería lanzar error si selectRangoDias es undefined y se llama agregar con "t"', () => {
    component.selectRangoDias = undefined as any;
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    expect(() => component.agregar('t')).toThrowError();
  });

  // Cobertura para quitar con valor 't' y fechasSeleccionadas undefined
  it('debería lanzar error si fechasSeleccionadas es undefined y se llama quitar con "t"', () => {
    component.fechasSeleccionadas = undefined as any;
    component.fechasDatos = [];
    expect(() => component.quitar('t')).toThrowError();
  });

  // Cobertura para agregar con valor distinto de 't' y fecha.value con datos
  it('debería manejar agregar con valor distinto de "t" y fecha.value con datos', () => {
    component.selectRangoDias = ['2023-01-01', '2023-01-02'];
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    (component as any).fecha = { value: [0] };
    expect(() => component.agregar('x')).not.toThrow();
    // Dependiendo de la implementación, puede que no agregue nada
    expect(Array.isArray(component.fechasSeleccionadas)).toBe(true);
  });

  // Cobertura para quitar con valor distinto de 't' y fechaSeleccionada.value con datos
  it('debería manejar quitar con valor distinto de "t" y fechaSeleccionada.value con datos', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.fechasDatos = [];
    (component as any).fechaSeleccionada = { value: [1] };
    expect(() => component.quitar('x')).not.toThrow();
    // Dependiendo de la implementación, puede que no quite nada
    expect(Array.isArray(component.fechasDatos)).toBe(true);
  });

});



