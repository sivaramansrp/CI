/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnlaceComponent } from './enlace.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TableComponent, TituloComponent} from '@libs/shared/data-access-user/src';

jest.mock('@libs/shared/theme/assets/json/31601/enlace.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Col1', 'Col2'],
    tableBody: [{ Col1: 'A', Col2: 'B' }]
  }
}));

jest.mock('@libs/shared/theme/assets/json/31601/enlace-data.json', () => ({
  __esModule: true,
  default: {
    resigtro: '123',
    rfc: 'RFC123',
    nombre: 'Nombre',
    apellidoPaterno: 'ApellidoP',
    apellidoMaterno: 'ApellidoM',
    cuidad: 'Ciudad',
    cargo: 'Cargo',
    telefono: '55555555',
    correo: 'correo@mail.com'
  }
}));

fdescribe('EnlaceComponent', () => {
  let component: EnlaceComponent;
  let fixture: ComponentFixture<EnlaceComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        EnlaceComponent,
        TableComponent,
        TituloComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnlaceComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

it('debe inicializar el formulario en ngOnInit', () => {
  component.ngOnInit();
  expect(component.represtantante).toBeTruthy();
  expect(component.represtantante.controls['resigtroReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['rfcReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['nombreReprestante']).toBeTruthy();
  expect(component.represtantante.controls['apellidoPaterno']).toBeTruthy();
  expect(component.represtantante.controls['apellidoMaterno']).toBeTruthy();
  expect(component.represtantante.controls['cargo']).toBeTruthy();
  expect(component.represtantante.controls['cuidad']).toBeTruthy();
  expect(component.represtantante.controls['telefonoReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['correoReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['suplente']).toBeTruthy();
});

  it('debe deshabilitar controles específicos cuando se llama patchData', () => {
    component.ngOnInit();
    component.patchData();
    expect(
      component.represtantante.get('apellidoPaterno')?.disabled
    ).toBe(true);
    expect(
      component.represtantante.get('apellidoMaterno')?.disabled
    ).toBe(true);
    expect(component.represtantante.get('cuidad')?.disabled).toBe(true);
  });

  it('debe establecer el valor del modal en "show" cuando se llama abrirModal', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
  });

  it('debe llamar a getRegistroForm cuando se llama abrirModal', () => {
    jest.spyOn(component, 'getRegistroForm');
    component.abrirModal();
    expect(component.getRegistroForm).toHaveBeenCalled();
  });

  it('debe actualizar enlaceHeaderData cuando se llama getEnlace', () => {
    component.getEnlace();
    expect(component.enlaceHeaderData).toEqual(
      component.enlaceTableData.tableHeader
    );
  });

  it('debe renderizar los inputs y botones del formulario correctamente', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0); 
  });

  it('debe mostrar el modal cuando se hace clic en el botón "Abrir Modal"', () => {
    fixture.detectChanges();
    const modalButton: HTMLElement =
    fixture.nativeElement.querySelector('button');
    modalButton.click();
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });

describe('EnlaceComponent manejarFilaSeleccionada', () => {
  let component: EnlaceComponent;

  beforeEach(() => {
    component = new EnlaceComponent(
      {} as any, // FormBuilder
      { setEnlaceTablaDatos: jest.fn() } as any, // Tramite31601Store
      { selectSolicitud$: { pipe: () => ({ subscribe: () => {} }) } } as any, // Tramite31601Query
      { selectConsultaioState$: { pipe: () => ({ subscribe: () => {} }) } } as any // ConsultaioQuery
    );
    component.enableModficarBoton = false;
    component.enableEliminarBoton = false;
    component.listaFilaSeleccionadaEnlace = [];
    component.filaSeleccionadaEnlace = {} as any;
  });

  it('debe deshabilitar los botones si la fila está vacía', () => {
    component.enableModficarBoton = true;
    component.enableEliminarBoton = true;
    component.manejarFilaSeleccionada([]);
    expect(component.enableModficarBoton).toBe(false);
    expect(component.enableEliminarBoton).toBe(false);
  });

  it('debe establecer la selección y habilitar los botones si la fila no está vacía', () => {
    const fila = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' }
    ] as any[];

    component.manejarFilaSeleccionada(fila);

    expect(component.listaFilaSeleccionadaEnlace).toBe(fila);
    expect(component.filaSeleccionadaEnlace).toBe(fila[1]);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
  });
});

describe('EnlaceComponent confirmEliminarEnlaceItem', () => {
  let component: EnlaceComponent;

  beforeEach(() => {
    component = new EnlaceComponent(
      {} as any, // FormBuilder
      { setEnlaceTablaDatos: jest.fn() } as any, // Tramite31601Store
      { selectSolicitud$: { pipe: () => ({ subscribe: () => {} }) } } as any, // Tramite31601Query
      { selectConsultaioState$: { pipe: () => ({ subscribe: () => {} }) } } as any // ConsultaioQuery
    );
    component.listaFilaSeleccionadaEnlace = [];
    component.abrirElimninarConfirmationopup = jest.fn();
  });

  it('no debe hacer nada si listaFilaSeleccionadaEnlace está vacía', () => {
    component.confirmEliminarEnlaceItem();
    expect(component.abrirElimninarConfirmationopup).not.toHaveBeenCalled();
  });

  it('debe llamar a abrirElimninarConfirmationopup si listaFilaSeleccionadaEnlace no está vacía', () => {
    component.listaFilaSeleccionadaEnlace = [{ id: 1 } as any];
    component.confirmEliminarEnlaceItem();
    expect(component.abrirElimninarConfirmationopup).toHaveBeenCalled();
  });
});

describe('EnlaceComponent actualizarFilaSeleccionada', () => {
  let component: EnlaceComponent;

  beforeEach(() => {
    component = new EnlaceComponent(
      {} as any, 
      { setEnlaceTablaDatos: jest.fn() } as any, 
      { selectSolicitud$: { pipe: () => ({ subscribe: () => {} }) } } as any, 
      { selectConsultaioState$: { pipe: () => ({ subscribe: () => {} }) } } as any 
    );
    component.datosTablaEnlace = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' }
    ] as any[];
    component.filaSeleccionadaEnlace = { id: 2, name: 'old' } as any;
  });

  it('debe actualizar filaSeleccionadaEnlace si se encuentra', () => {
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaEnlace).toEqual({ id: 2, name: 'b' });
  });

  it('no debe actualizar filaSeleccionadaEnlace si no se encuentra', () => {
    component.filaSeleccionadaEnlace = { id: 3, name: 'c' } as any;
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaEnlace).toEqual({ id: 3, name: 'c' });
  });
});


describe('EnlaceComponent additional coverage', () => {
  let component: EnlaceComponent;

  beforeEach(() => {
    component = new EnlaceComponent(
      {} as any, 
      { setEnlaceTablaDatos: jest.fn(), setSomeField: jest.fn() } as any, 
      { selectSolicitud$: { pipe: () => ({ subscribe: () => {} }) } } as any, 
      { selectConsultaioState$: { pipe: () => ({ subscribe: () => {} }) } } as any 
    );
    component.listaFilaSeleccionadaEnlace = [];
    component.datosTablaEnlace = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' }
    ] as any[];
    component.filaSeleccionadaEnlace = { id: 2, name: 'b' } as any;
    component.enableModficarBoton = false;
    component.multipleSeleccionPopupAbierto = false;
    component.multipleSeleccionPopupCerrado = true;
    component.confirmEliminarPopupAbierto = false;
    component.confirmEliminarPopupCerrado = true;
    component.mostrarModalDatosMercancia = false;
    component.represtantante = new FormBuilder().group({
      resigtroReprestantante: [''],
      rfcReprestantante: [''],
      nombreReprestante: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      cargo: [''],
      cuidad: [''],
      telefonoReprestantante: [''],
      correoReprestantante: [''],
      suplente: [false]
    });
    component.closeModal = { nativeElement: { click: jest.fn() } } as any;
  });

  it('debe abrir el popup de selección múltiple si está habilitado', () => {
    component.enableModficarBoton = true;
    component.abrirMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(true);
  });

  it('debe cerrar el popup de selección múltiple', () => {
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
    expect(component.multipleSeleccionPopupCerrado).toBe(false);
  });

  it('debe abrir el popup de confirmación de eliminación', () => {
    component.abrirElimninarConfirmationopup();
    expect(component.confirmEliminarPopupAbierto).toBe(true);
  });

  it('debe cerrar el popup de confirmación de eliminación', () => {
    component.cerrarEliminarConfirmationPopup();
    expect(component.confirmEliminarPopupAbierto).toBe(false);
    expect(component.confirmEliminarPopupCerrado).toBe(false);
  });

  it('debe alternar mostrarModalDatosMercancia', () => {
    const initial = component.mostrarModalDatosMercancia;
    component.alternarModalMercancia();
    expect(component.mostrarModalDatosMercancia).toBe(!initial);
  });

  it('debe llamar a eliminarEnlaceItem y actualizar el store', () => {
    component.listaFilaSeleccionadaEnlace = [{ id: 2, name: 'b' } as any];
    component.datosTablaEnlace = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' }
    ] as any[];
    const storeSpy = jest.spyOn(component['tramite31601Store'], 'setEnlaceTablaDatos');
    const closeSpy = jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    component.eliminarEnlaceItem();
    expect(component.datosTablaEnlace).toEqual([{ id: 1, name: 'a' }]);
    expect(component.listaFilaSeleccionadaEnlace).toEqual([]);
    expect(storeSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('debe manejar modificarItemEnlace para selección simple', () => {
    component.listaFilaSeleccionadaEnlace = [{ id: 2, name: 'b' } as any];
    component.esOperacionDeActualizacion = false;
    component.abrirModal = jest.fn();
    component.alternarModalMercancia = jest.fn();
    component.actualizarFilaSeleccionada = jest.fn();
    component.modificarItemEnlace();
    expect(component.esOperacionDeActualizacion).toBe(true);
    expect(component.abrirModal).toHaveBeenCalled();
    expect(component.alternarModalMercancia).toHaveBeenCalled();
    expect(component.actualizarFilaSeleccionada).toHaveBeenCalled();
  });

  it('debe manejar modificarItemEnlace para selección múltiple', () => {
    component.listaFilaSeleccionadaEnlace = [{ id: 1 }, { id: 2 }] as any[];
    component.abrirMultipleSeleccionPopup = jest.fn();
    component.modificarItemEnlace();
    expect(component.abrirMultipleSeleccionPopup).toHaveBeenCalled();
  });

  it('debe guardar datos y limpiar el formulario en saveDatos', () => {
    component.datosTablaEnlace = [];
    component.represtantante.patchValue({
      resigtroReprestantante: 'reg',
      rfcReprestantante: 'rfc',
      nombreReprestante: 'nom',
      apellidoPaterno: 'ap',
      apellidoMaterno: 'am',
      cargo: 'cargo',
      cuidad: 'cd',
      telefonoReprestantante: 'tel',
      correoReprestantante: 'mail',
      suplente: true
    });
    const storeSpy = jest.spyOn(component['tramite31601Store'], 'setEnlaceTablaDatos');
    const closeSpy = jest.spyOn(component.closeModal.nativeElement, 'click');
    component.saveDatos();
    expect(component.datosTablaEnlace.length).toBe(1);
    expect(storeSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(component.represtantante.get('resigtroReprestantante')?.value).toBe('');
  });

it('debe llamar a setValoresStore con el valor correcto', () => {
  const store = component['tramite31601Store'];
  store.setNombreReprestante = jest.fn();
  component.represtantante.get('nombreReprestante')?.setValue('test');
  component.setValoresStore(component.represtantante, 'nombreReprestante', 'setNombreReprestante' as any);
  expect(store.setNombreReprestante).toHaveBeenCalledWith('test');
});

  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
});
