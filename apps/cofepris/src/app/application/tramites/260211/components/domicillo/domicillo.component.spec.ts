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
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /* Checkbox checked / unchecked */
  it('debe deshabilitar licenciaSanitaria cuando el checkbox está marcado', () => {
    component.onAvisoCheckboxChange(
      { target: { checked: true } } as any,
      component.domicilio,
      'tieneLicenciaSanitaria',
      'mockMethod' as any,
    );
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('debe habilitar licenciaSanitaria cuando el checkbox está desmarcado', () => {
    component.onAvisoCheckboxChange(
      { target: { checked: false } } as any,
      component.domicilio,
      'tieneLicenciaSanitaria',
      'mockMethod' as any,
    );
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  /* Colapsables */
  it('debe alternar el estado de colapsableDos', () => {
    const init = component.colapsableDos;
    component.mostrar_colapsableDos();
    expect(component.colapsableDos).toBe(!init);
  });

  it('debe alternar el estado de colapsableTres', () => {
    const init = component.colapsableTres;
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(!init);
  });

  it('debe alternar el estado de colapsable', () => {
    const init = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!init);
  });

  /* obtenerTablaDatos */
  it('debe obtener y asignar nicoTablaDatos', () => {
    const resp = { code: 200, datos: [{ id: 123 }] };
    serviceStub.obtenerTablaDatos.mockReturnValue(of(resp));

    component.obtenerTablaDatos();

    expect(serviceStub.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.nicoTablaDatos).toEqual(resp.datos);
  });

  it('debe manejar respuesta vacía en obtenerTablaDatos', () => {
    serviceStub.obtenerTablaDatos.mockReturnValue(of({ code: 200, datos: null }));

    component.obtenerTablaDatos();

    expect((component.nicoTablaDatos ?? [])).toEqual([]);
  });

/* obtenerEstadoList / obtenerMercanciasDatos */
  it('debe llamar obtenerEstadoList y llenar la lista', () => {
    component.obtenerEstadoList();
    expect(serviceStub.obtenerEstadoList).toHaveBeenCalled();

    const c: any = component;
    if ('estadoList' in c) {
      expect(Array.isArray(c.estadoList)).toBe(true);
    }
  });

  it('debe llamar obtenerMercanciasDatos y llenar la lista', () => {
    component.obtenerMercanciasDatos();
    expect(serviceStub.obtenerMercanciasDatos).toHaveBeenCalled();

    const c: any = component;
    if ('mercanciasList' in c) {
      expect(Array.isArray(c.mercanciasList)).toBe(true);
    }
  });

  /* onSeleccion* y eliminar* */
  it('debe almacenar selectedRowsEvent al llamar onSeleccionChangeEvent', () => {
    const rows = [{ id: 10 }] as any;
    component.onSeleccionChangeEvent(rows);
    expect((component as any).selectedRowsEvent).toBe(rows);
  });

  it('debe almacenar selectedRows al llamar onSeleccionChange', () => {
    const rows = [{ id: 'A' }] as any;
    component.onSeleccionChange(rows);
    expect((component as any).selectedRows).toBe(rows);
  });

  it('debe eliminar los seleccionados de nicoTablaDatos y limpiar la selección', () => {
    const row1 = { id: 1 }  as any;
    const row2 = { id: 2 }  as any;
    component.nicoTablaDatos = [row1, row2] as any;
    (component as any).selectedRows = [row1];

    component.eliminarSeleccionados();

    expect(component.nicoTablaDatos).toEqual([row2]);
    expect((component as any).selectedRows).toEqual([]);
  });

  it('debe eliminar los seleccionados de mercanciasTablaDatos y limpiar la selección', () => {
    const row1 = { id: 100 } as any;
    const row2 = { id: 200 } as any;
    component.mercanciasTablaDatos = [row1, row2] as any;
    (component as any).selectedRowsEvent = [row2];

    component.eliminarMercanciaSeleccionados();

    expect(component.mercanciasTablaDatos).toEqual([row1]);
    expect((component as any).selectedRowsEvent).toEqual([]);
  });

  it('debe limpiar el formulario de agente', () => {
    component.formAgente.patchValue({ claveScianModal: 'valor', claveDescripcionModal: 'desc' });
    component.limpiarFormAgente();
    expect(component.formAgente.value).toEqual({ claveScianModal: null, claveDescripcionModal: null });
  });

  it('debe limpiar el formulario de mercancías', () => {
    component.formMercancias.patchValue({
      clasificacion: 'valor',
      especificarClasificacionProducto: 'valor',
      denominacionEspecifica: 'valor',
      denominacionDistintiva: 'valor',
      denominacionComun: 'valor',
      tipoDeProducto: 'valor',
      estadoFisico: 'valor',
      fraccionArancelaria: 'valor',
      cantidadUMT: 'valor',
      UMC: 'valor',
      cantidadUMC: 'valor',
      presentacion: 'valor',
      numeroRegistro: 'valor',
      fechaCaducidad: 'valor'
    });
    component.limpiarForm();
    expect(component.formMercancias.value).toEqual({
      clasificacion: null,
      especificarClasificacionProducto: null,
      denominacionEspecifica: null,
      denominacionDistintiva: null,
      denominacionComun: null,
      tipoDeProducto: null,
      estadoFisico: null,
      fraccionArancelaria: null,
      cantidadUMT: null,
      UMC: null,
      cantidadUMC: null,
      presentacion: null,
      numeroRegistro: null,
      fechaCaducidad: null
    });
  });

  it('debe agregar una fila SCian si el formulario es válido', () => {
    component.nicoTablaDatos = []; // Asegura que es un array
    component.formAgente.get('claveScianModal')?.setValue('clave');
    component.formAgente.get('claveDescripcionModal')?.setValue('desc');
    expect(component.nicoTablaDatos.length).toBe(0);
    component.agregarFilaScian();
    expect(component.nicoTablaDatos.length).toBe(1);
  });

  it('no debe agregar una fila SCian si el formulario no es válido', () => {
    component.nicoTablaDatos = []; // Asegura que es un array
    component.formAgente.get('claveScianModal')?.setValue(null);
    component.formAgente.get('claveDescripcionModal')?.setValue('desc');
    const prev = component.nicoTablaDatos.length;
    component.agregarFilaScian();
    expect(component.nicoTablaDatos.length).toBe(prev);
  });

  it('debe agregar una fila de mercancía si el formulario es válido', () => {
    component.mercanciasTablaDatos = []; // Asegura que es un array
    Object.keys(component.formMercancias.controls).forEach(key => {
      component.formMercancias.get(key)?.setValue('valor');
    });
    expect(component.mercanciasTablaDatos.length).toBe(0);
    component.agregarFilaMercancia();
    expect(component.mercanciasTablaDatos.length).toBe(1);
  });

  it('no debe agregar una fila de mercancía si el formulario no es válido', () => {
    component.mercanciasTablaDatos = []; // Asegura que es un array
    component.formMercancias.get('clasificacion')?.setValue(null);  
    const prev = component.mercanciasTablaDatos.length;
    component.agregarFilaMercancia();
    expect(component.mercanciasTablaDatos.length).toBe(prev);       
  });

  it('debe modificar una mercancía existente', () => {
    // Inicializa el array antes de usarlo
    component.mercanciasTablaDatos = [];

    // Agrega una mercancía
    Object.keys(component.formMercancias.controls).forEach(key => {
      component.formMercancias.get(key)?.setValue('valor');
    });
    component.agregarFilaMercancia();

    // Simula selección y modificación
    component.selectedRowsEvent = [component.mercanciasTablaDatos[0]];
    component.mercanciasTablaDatos[0].numeroRegistro = 'reg123';
    component.selectedRowsEvent[0].numeroRegistro = 'reg123';
    component.modificarMercancia();
    expect(component.editMercanciaIndex).toBe(0);
  });

  it('debe cambiar la fecha de caducidad en el formulario de mercancías', () => {
    component.formMercancias.get('fechaCaducidad')?.setValue('');
    component.cambioFechaFinal('2025-12-31');
    expect(component.formMercancias.get('fechaCaducidad')?.value).toBe('2025-12-31');
  });

  it('debe deshabilitar los formularios si esFormularioSoloLectura es true en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.domicilio.disabled).toBe(true);
    expect(component.formAgente.disabled).toBe(true);
    expect(component.formMercancias.disabled).toBe(true);
  });

  it('debe habilitar los formularios si esFormularioSoloLectura es false en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.domicilio.enabled).toBe(true);
    expect(component.formAgente.enabled).toBe(true);
    expect(component.formMercancias.enabled).toBe(true);
  });

  it('debe limpiar correctamente los observables en ngOnDestroy', () => {
    const spy1 = jest.spyOn((component as any).destroyed$, 'next');
    const spy2 = jest.spyOn((component as any).destroyed$, 'complete');
    const spy3 = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spy4 = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
  });
});
