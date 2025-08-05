import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { of, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;

  const importacionMock = {
    unidad_de_medida: 'kg',
    partidas_tabla: [{ id: 1, descripcion: 'Item 1' }],
  };

  const tramiteQueryMock = {
    selectImportacion$: of(importacionMock),
  };

  const tramiteStoreMock = {
    setDynamicFieldValue: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaMercanciaComponent],
      providers: [
        { provide: Tramite130103Query, useValue: tramiteQueryMock },
        { provide: Tramite130103Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.consultaState = { readonly: false } as any;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar datosTabla en ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosTabla.length).toBeGreaterThan(0);
    expect(component.datosTabla[0].id).toBe(1);
  });

  it('debería agregar un nuevo elemento cuando se llama a agregar y el formulario es válido', () => {
    const ninoFormGroup = new FormGroup({
      partidas_cantidad: new FormControl(10),
      partidas_descripcion: new FormControl('Producto'),
      valor_partida_usd: new FormControl(500),
      seleccion_fraccion: new FormControl(1),
    });
    component.forma.setControl('ninoFormGroup', ninoFormGroup);
    component.importacionstate = importacionMock;
    component.datosTabla = [];

    component.agregar();

    expect(component.datosTabla.length).toBe(1);
    expect(tramiteStoreMock.setDynamicFieldValue).toHaveBeenCalledWith(
      'partidas_tabla',
      component.datosTabla
    );
  });

  it('debería retornar la descripción de la fracción arancelaria', () => {
    const ninoFormGroup = new FormGroup({
      seleccion_fraccion: new FormControl(1),
    });
    component.forma.setControl('ninoFormGroup', ninoFormGroup);
    const desc = component.obtenerFraccionArancelaria();
    expect(desc).toContain('Usados');
  });

  it('debería llamar al store con el valor correcto en establecerCambioDeValor', () => {
    component.establecerCambioDeValor({ campo: 'test', valor: 'value' });
    expect(tramiteStoreMock.setDynamicFieldValue).toHaveBeenCalledWith(
      'test',
      'value'
    );
  });

  it('debería establecer las filas seleccionadas y actualizar el formulario en onPartidasSeleccion', () => {
    const row = {
      id: 1,
      cantidad: 1,
      descripcion: 'desc',
      totalUsd: 10,
      fraccionArancelariaTigie: 'FRA',
    };
    component.modificarPartidaForm.setControl('cantidad_partidas', new FormControl(''));
    component.modificarPartidaForm.setControl('descripcion_partidas', new FormControl(''));
    component.modificarPartidaForm.setControl('valor_partidas_usd', new FormControl(''));
    component.modificarPartidaForm.setControl('fraccion_partidas', new FormControl(''));

    component.onPartidasSeleccion([row]);
    component.abrirModalEditar();

    expect(component.partidasSeleccionadas[0].id).toBe(1);
    expect(component.modificarPartidaForm.get('cantidad_partidas')?.value).toBe(1);
  });

  it('debería eliminar las partidas seleccionadas en eliminar', () => {
    const item = { id: 1 };
    component.datosTabla = [item];
    component.partidasSeleccionadas = [item];
    component.eliminar();
    expect(component.datosTabla.length).toBe(0);
    expect(tramiteStoreMock.setDynamicFieldValue).toHaveBeenCalled();
  });

  it('debería inicializar la instancia del modal en ngAfterViewInit', () => {
    const modalElement = document.createElement('div');
    modalElement.id = 'testModal';
    document.body.appendChild(modalElement);
    component['cargarArchivoModal'] = { nativeElement: modalElement } as any;
    component.ngAfterViewInit();
    expect(component['cargarArchivoInstance']).toBeDefined();
    modalElement.remove();
  });

  it('debería llamar a show en cargarArchivoInstance cuando se llama a cargarArchivo', () => {
    const showMock = jest.fn();
    component['cargarArchivoInstance'] = { show: showMock } as any;
    component.cargarArchivo();
    expect(showMock).toHaveBeenCalled();
  });

  it('debería llamar a hide en cargarArchivoInstance cuando se llama a cerrar', () => {
    const hideMock = jest.fn();
    component['cargarArchivoInstance'] = { hide: hideMock } as any;
    component.cerrar();
    expect(hideMock).toHaveBeenCalled();
  });

  it('debería no agregar un elemento cuando se llama a agregar y el formulario es inválido', () => {
    jest.clearAllMocks();
    const ninoFormGroup = new FormGroup({
      partidas_cantidad: new FormControl(null, Validators.required), // invalid: null
      partidas_descripcion: new FormControl('', Validators.required),
      valor_partida_usd: new FormControl(null, Validators.required),
      seleccion_fraccion: new FormControl(null, Validators.required),
    });
    component.forma.setControl('ninoFormGroup', ninoFormGroup);
    component.importacionstate = importacionMock;
    component.datosTabla = [];

    component.agregar();

    expect(component.datosTabla.length).toBe(0);
    expect(tramiteStoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
  });

  it('debería no actualizar el formulario cuando no hay fila seleccionada en onPartidasSeleccion', () => {
    const patchSpy = jest.spyOn(component.modificarPartidaForm, 'patchValue');
    component.onPartidasSeleccion([]);
    expect(component.partidasSeleccionadas.length).toBe(0);
    expect(patchSpy).not.toHaveBeenCalled();
  });

  it('debería actualizar el elemento seleccionado en guardarEdicion', () => {
    const partida = {
      id: 1,
      cantidad: 5,
      descripcion: 'Original',
      fraccionArancelariaTigie: 'Old',
      precioUnitario: '1.000',
      totalUsd: 100,
      unidadDeMedida: 'kg',
    };
    component.datosTabla = [partida];
    component.partidasSeleccionadas = [partida];

    component.modificarPartidaForm.setControl('cantidad_partidas', new FormControl(null));
    component.modificarPartidaForm.setControl('descripcion_partidas', new FormControl(''));
    component.modificarPartidaForm.setControl('valor_partidas_usd', new FormControl(null));
    component.modificarPartidaForm.setControl('fraccion_partidas', new FormControl(''));

    component.modificarPartidaForm.patchValue({
      cantidad_partidas: 10,
      descripcion_partidas: 'Updated',
      valor_partidas_usd: 200,
      fraccion_partidas: 'New',
    });

    const modalElement = document.createElement('div');
    modalElement.id = 'modalEditarPartida';
    document.body.appendChild(modalElement);

    component.guardarEdicion();

    expect(component.datosTabla[0].cantidad).toBe(10);
    expect(component.datosTabla[0].descripcion).toBe('Updated');
    expect(component.datosTabla[0].fraccionArancelariaTigie).toBe('New');
    modalElement.remove();
  });


  it('debería limpiar en ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(
      component['destroyNotifier$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
