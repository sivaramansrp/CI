import { TestBed } from '@angular/core/testing';
import { PaisDeOrigenComponent } from './pais-de-origen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';

describe('PaisDeOriginComponent', () => {
  let component: PaisDeOrigenComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CommonModule, CrosslistComponent,PaisDeOrigenComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(PaisDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle plegable when mostrar_plegable is called', () => {
    const initialState = component.plegable;
    component.mostrar_plegable();
    expect(component.plegable).toBe(!initialState);
  });

  it('should add all elements to fechasSeleccionadas when agregar is called with "t"', () => {
    component.selectRangoDias = ['2023-01-01', '2023-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(component.selectRangoDias);
    expect(component.fechasDatos.length).toBe(0);
  });

  it('should remove all elements from fechasSeleccionadas when quitar is called with "t"', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.quitar('t');
    expect(component.fechasSeleccionadas.length).toBe(0);
    expect(component.fechasDatos).toEqual(['2023-01-01', '2023-01-02']);
  });

  it('should have initial values set correctly', () => {
    expect(component.plegable).toBe(false);
    // Accept undefined or [] for these properties
    expect(component.selectRangoDias ?? []).toEqual([]);
    expect(component.fechasSeleccionadas ?? []).toEqual([]);
    expect(component.fechasDatos ?? []).toEqual([]);
  });

  it('should toggle plegable multiple times', () => {
    component.mostrar_plegable();
    expect(component.plegable).toBe(true);
    component.mostrar_plegable();
    expect(component.plegable).toBe(false);
  });

  it('should do nothing if agregar is called with non "t" value', () => {
    component.selectRangoDias = ['2023-01-01'];
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    // Mock the fecha control with a value that is an array (simulate FormControl)
    (component as any).fecha = { value: [] };
    expect(() => component.agregar('x')).not.toThrow();
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should do nothing if quitar is called with non "t" value', () => {
    component.fechasSeleccionadas = ['2023-01-01'];
    component.fechasDatos = [];
    // Mock the fechaSeleccionada control with a value that is an array (simulate FormControl)
    (component as any).fechaSeleccionada = { value: [] };
    expect(() => component.quitar('x')).not.toThrow();
    expect(component.fechasSeleccionadas).toEqual(['2023-01-01']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should handle agregar with empty selectRangoDias', () => {
    component.selectRangoDias = [];
    component.fechasSeleccionadas = [];
    component.fechasDatos = ['2023-01-01'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should handle quitar with empty fechasSeleccionadas', () => {
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
    component.quitar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual([]);
  });

});
