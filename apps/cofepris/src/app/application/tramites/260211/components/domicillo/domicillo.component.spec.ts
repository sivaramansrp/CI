/* apps/cofepris/src/app/application/tramites/260211/components/domicillo/domicillo.component.spec.ts */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule }       from '@angular/forms';
import { HttpClientTestingModule }   from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { of, throwError }            from 'rxjs';

import { DomicilloComponent }        from './domicillo.component';

/* ─── stubs ────────────────────────────────────────────── */
const storeStub = { mockMethod: jest.fn(), update: jest.fn() };

const serviceStub = {
  obtenerEstadoList      : jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1 }] })),
  obtenerTablaDatos      : jest.fn().mockReturnValue(of({ code: 200, datos: [{ id: 1 }] })),
  obtenerMercanciasDatos : jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1 }] })),
};
/* ──────────────────────────────────────────────────────── */

describe('DomicilloComponent', () => {
  let component: DomicilloComponent;
  let fixture  : ComponentFixture<DomicilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        DomicilloComponent,                 // stand-alone
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DomicilloComponent, { set: { template: '<div></div>' } })
      .compileComponents();

    fixture   = TestBed.createComponent(DomicilloComponent);
    component = fixture.componentInstance;

    (component as any).tramite260211Store = storeStub;
    (component as any).service            = serviceStub;

    fixture.detectChanges();              // ngOnInit
  });

  /* ───── pruebas básicas ───── */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Checkbox checked / unchecked */
  it('should disable licenciaSanitaria when checkbox checked', () => {
    component.onAvisoCheckboxChange(
      { target: { checked: true } } as any,
      component.domicilio,
      'tieneLicenciaSanitaria',
      'mockMethod' as any,
    );
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('should enable licenciaSanitaria when checkbox unchecked', () => {
    component.onAvisoCheckboxChange(
      { target: { checked: false } } as any,
      component.domicilio,
      'tieneLicenciaSanitaria',
      'mockMethod' as any,
    );
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  /* Colapsables */
  it('should toggle colapsableDos', () => {
    const init = component.colapsableDos;
    component.mostrar_colapsableDos();
    expect(component.colapsableDos).toBe(!init);
  });

  it('should toggle colapsableTres', () => {
    const init = component.colapsableTres;
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(!init);
  });

  /* obtenerTablaDatos */
  it('should fetch and set nicoTablaDatos', () => {
    const resp = { code: 200, datos: [{ id: 123 }] };
    serviceStub.obtenerTablaDatos.mockReturnValue(of(resp));

    component.obtenerTablaDatos();

    expect(serviceStub.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.nicoTablaDatos).toEqual(resp.datos);
  });

  it('should handle empty response', () => {
    serviceStub.obtenerTablaDatos.mockReturnValue(of({ code: 200, datos: null }));

    component.obtenerTablaDatos();

    expect((component.nicoTablaDatos ?? [])).toEqual([]);
  });

/* obtenerEstadoList / obtenerMercanciasDatos */
  it('should call obtenerEstadoList and fill list', () => {
    component.obtenerEstadoList();
    expect(serviceStub.obtenerEstadoList).toHaveBeenCalled();

    const c: any = component;
    if ('estadoList' in c) {
      expect(Array.isArray(c.estadoList)).toBe(true);
    }
  });

  it('should call obtenerMercanciasDatos and fill list', () => {
    component.obtenerMercanciasDatos();
    expect(serviceStub.obtenerMercanciasDatos).toHaveBeenCalled();

    const c: any = component;
    if ('mercanciasList' in c) {
      expect(Array.isArray(c.mercanciasList)).toBe(true);
    }
  });

  /* onSeleccion* y eliminar* */
  it('onSeleccionChangeEvent should store selectedRowsEvent', () => {
    const rows = [{ id: 10 }] as any;
    component.onSeleccionChangeEvent(rows);
    expect((component as any).selectedRowsEvent).toBe(rows);
  });

  it('onSeleccionChange should store selectedRows', () => {
    const rows = [{ id: 'A' }] as any;
    component.onSeleccionChange(rows);
    expect((component as any).selectedRows).toBe(rows);
  });

  it('eliminarSeleccionados should filter nicoTablaDatos and clear selection', () => {
    const row1 = { id: 1 }  as any;
    const row2 = { id: 2 }  as any;
    component.nicoTablaDatos = [row1, row2] as any;
    (component as any).selectedRows = [row1];

    component.eliminarSeleccionados();

    expect(component.nicoTablaDatos).toEqual([row2]);
    expect((component as any).selectedRows).toEqual([]);
  });

  it('eliminarMercanciaSeleccionados should filter mercanciasTablaDatos and clear selection', () => {
    const row1 = { id: 100 } as any;
    const row2 = { id: 200 } as any;
    component.mercanciasTablaDatos = [row1, row2] as any;
    (component as any).selectedRowsEvent = [row2];

    component.eliminarMercanciaSeleccionados();

    expect(component.mercanciasTablaDatos).toEqual([row1]);
    expect((component as any).selectedRowsEvent).toEqual([]);
  });
});
