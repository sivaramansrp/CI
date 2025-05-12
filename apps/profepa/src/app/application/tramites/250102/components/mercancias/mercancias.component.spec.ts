import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasComponent } from './mercancias.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite250102State, Tramite250102Store } from '../../estados/tramite250102.store';
import { Tramite250102Query } from '../../estados/tramite250102.query';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Detalle, Producto } from '../../models/flora-fauna.models';

describe('MercanciasComponent', () => {
  let component: MercanciasComponent;
  let fixture: ComponentFixture<MercanciasComponent>;
  let tramite250102StoreMock: Partial<Tramite250102Store>;
  let tramite250102QueryMock: Partial<Tramite250102Query>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    // Crear mocks para los servicios
    tramite250102StoreMock = {
      establecerDatos: jest.fn()
    };

    tramite250102QueryMock = {
      selectTramiteState$: of({
        descripcion: 'Descripción de prueba',
        fraccion: 'Fracción de prueba',
        arancelaria: 'Arancelaria de prueba',
        cantidad: 'Cantidad de prueba',
        medida: 'Medida de prueba',
        genero: 'Género de prueba',
        especie: 'Especie de prueba',
        comun: 'Común de prueba',
        origen: 'Origen de prueba',
        procedencia: 'Procedencia de prueba',
        productos: [],
        detalles: [],
        tipoMovimiento: null,
        tipoAduana: null,
        tipoInspectoria: null,
        tipoMunicipio: null,
      } as unknown as Tramite250102State)
    };


    await TestBed.configureTestingModule({
      imports: [
        MercanciasComponent,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite250102Store, useValue: tramite250102StoreMock },
        { provide: Tramite250102Query, useValue: tramite250102QueryMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar errores de componentes hijos
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(MercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del componente', () => {
    it('debería inicializar el formulario correctamente', () => {
      expect(component.formMercancias).toBeDefined();
      expect(component.formMercancias.get('descripcion')).toBeDefined();
      expect(component.formMercancias.get('fraccion')).toBeDefined();
      expect(component.formMercancias.get('arancelaria')).toBeDefined();
      expect(component.formMercancias.get('cantidad')).toBeDefined();
      expect(component.formMercancias.get('medida')).toBeDefined();
      expect(component.formMercancias.get('genero')).toBeDefined();
      expect(component.formMercancias.get('especie')).toBeDefined();
      expect(component.formMercancias.get('comun')).toBeDefined();
      expect(component.formMercancias.get('origen')).toBeDefined();
      expect(component.formMercancias.get('procedencia')).toBeDefined();
    });

    it('debería deshabilitar el campo arancelaria', () => {
      expect(component.formMercancias.get('arancelaria')?.disabled).toBe(true);
    });

    it('debería cargar los catálogos correctamente', () => {
      expect(component.descripcion).toBeDefined();
      expect(component.fraccion).toBeDefined();
      expect(component.medida).toBeDefined();
      expect(component.genero).toBeDefined();
      expect(component.especie).toBeDefined();
      expect(component.comun).toBeDefined();
      expect(component.origen).toBeDefined();
      expect(component.procedencia).toBeDefined();
    });

    it('debería inicializar las propiedades correctamente', () => {
      expect(component.fraccionData).toEqual([]);
      expect(component.producto).toEqual([]);
      expect(component.productoSeleccionado).toBeNull();
      expect(component.mapaDetalles).toBeDefined();
      expect(component.mostrarModalMercancias).toBe(false);
    });
  });

  describe('Métodos del componente', () => {
    it('debería obtener datos anidados correctamente con obtenerDatosAnidados', () => {
      // Crear un producto de prueba
      const producto: Producto = { id: 1, descripcion: 'Producto de prueba' };

      // Caso 1: Producto sin detalles
      expect(component.obtenerDatosAnidados(producto)).toEqual([]);

      // Caso 2: Producto con detalles
      const detalles: Detalle[] = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.mapaDetalles.set(1, detalles);
      expect(component.obtenerDatosAnidados(producto)).toEqual(detalles);

      // Caso 3: Producto sin ID
      const productoSinId = { descripcion: 'Producto sin ID' } as Producto;
      expect(component.obtenerDatosAnidados(productoSinId)).toEqual([]);

      // Caso 4: Producto con ID pero sin detalles en el mapa
      const productoSinDetalles: Producto = { id: 2, descripcion: 'Producto sin detalles' };
      expect(component.obtenerDatosAnidados(productoSinDetalles)).toEqual([]);
    });

    it('debería manejar el caso de producto nulo o indefinido en obtenerDatosAnidados', () => {
      // Caso con producto nulo
      const resultado = component.obtenerDatosAnidados(null as unknown as Producto);
      expect(resultado).toEqual([]);
    });

    it('debería seleccionar un producto correctamente con alSeleccionarProducto', () => {
      const producto: Producto = { id: 1, descripcion: 'Producto de prueba' };
      component.alSeleccionarProducto(producto);
      expect(component.productoSeleccionado).toEqual(producto);
    });

    it('debería agregar un detalle correctamente con agregarDetalle', () => {
      // Configurar el formulario con valores válidos
      component.formMercancias.patchValue({
        fraccion: '1',
        cantidad: '10',
        medida: '1',
        genero: '1',
        comun: '1',
        origen: '1',
        procedencia: '1'
      });

      // Espiar el método push del array fraccionData
      const pushSpy = jest.spyOn(component.fraccionData, 'push');

      // Llamar al método
      component.agregarDetalle();

      // Verificar que se llamó al método push
      expect(pushSpy).toHaveBeenCalled();
      expect(component.fraccionData.length).toBe(1);
    });

    it('no debería agregar un detalle si el formulario no es válido', () => {
      // Configurar el formulario con valores inválidos
      component.formMercancias.reset();
      component.formMercancias.setErrors({ 'invalid': true });

      // Espiar el método push del array fraccionData
      const pushSpy = jest.spyOn(component.fraccionData, 'push');

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.agregarDetalle();

      // Verificar que no se llamó al método push
      expect(pushSpy).not.toHaveBeenCalled();
      expect(component.fraccionData.length).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('debería establecer valores en el store correctamente con establecerValoresStore', () => {
      // Configurar el formulario con un valor
      component.formMercancias.patchValue({
        descripcion: 'Valor de prueba'
      });

      // Llamar al método
      component.establecerValoresStore(component.formMercancias, 'descripcion');

      // Verificar que se llamó al método establecerDatos del store
      expect(tramite250102StoreMock.establecerDatos).toHaveBeenCalledWith({
        descripcion: 'Valor de prueba'
      });
    });

    it('no debería llamar a establecerDatos si el valor es undefined', () => {
      // Crear un formulario con un control que no existe
      const formGroup = formBuilder.group({
        otroControl: ['']
      });

      // Llamar al método con un campo que no existe
      component.establecerValoresStore(formGroup, 'campoInexistente');

      // Verificar que no se llamó al método establecerDatos del store
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();
    });

    it('debería cancelar el detalle correctamente con cancelarDetalle', () => {
      // Agregar datos al array fraccionData
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];

      // Establecer el modal como visible
      component.mostrarModalMercancias = true;

      // Espiar el método reset del formulario
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');

      // Llamar al método
      component.cancelarDetalle();

      // Verificar que se llamó al método reset y se limpiaron los datos
      expect(resetSpy).toHaveBeenCalled();
      expect(component.fraccionData).toEqual([]);
      expect(component.mostrarModalMercancias).toBe(false);
    });

    it('debería guardar el detalle correctamente con guardarDetalle', () => {
      // Configurar datos para la prueba
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.formMercancias.patchValue({
        descripcion: '1'
      });

      // Espiar métodos
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');
      const generarIdSpy = jest.spyOn(component as any, 'generarId').mockReturnValue(123);

      // Llamar al método
      component.guardarDetalle();

      // Verificar resultados
      expect(resetSpy).toHaveBeenCalled();
      expect(generarIdSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(1);
      expect(component.mapaDetalles.has(123)).toBe(true);
      expect(component.fraccionData).toEqual([]);
      expect(component.mostrarModalMercancias).toBe(false);
      expect(tramite250102StoreMock.establecerDatos).toHaveBeenCalled();
    });

    it('no debería guardar el detalle si no hay datos en fraccionData', () => {
      // Configurar datos vacíos
      component.fraccionData = [];

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.guardarDetalle();

      // Verificar que no se guardó nada
      expect(consoleSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(0);
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('no debería guardar el detalle si no hay descripción seleccionada', () => {
      // Configurar datos con descripción vacía
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.formMercancias.patchValue({
        descripcion: ''
      });

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.guardarDetalle();

      // Verificar que no se guardó nada
      expect(consoleSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(0);
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('debería abrir el modal de mercancías correctamente con abrirModalMercancias', () => {
      // Espiar el método reset del formulario
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');
      // Verificar estado inicial
      expect(component.mostrarModalMercancias).toBe(false);

      // Llamar al método
      component.abrirModalMercancias();

      // Verificar que se abrió el modal y se reseteó el formulario
      expect(component.mostrarModalMercancias).toBe(true);
      expect(resetSpy).toHaveBeenCalled();
      expect(component.fraccionData).toEqual([]);

      // Llamar al método de nuevo
      resetSpy.mockClear();
      component.abrirModalMercancias();

      // Verificar que se cerró el modal y no se reseteó el formulario
      expect(component.mostrarModalMercancias).toBe(false);
      expect(resetSpy).not.toHaveBeenCalled();
    });

    it('debería generar un ID único con generarId', () => {
      // Espiar Date.now y Math.random
      const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000);
      const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      // Llamar al método
      const id = (component as any).generarId();

      // Verificar el resultado
      expect(id).toBe(1500); // 1000 + Math.floor(0.5 * 1000)

      // Restaurar los espías
      dateNowSpy.mockRestore();
      mathRandomSpy.mockRestore();
    });

    it('debería limpiar las suscripciones al destruir el componente', () => {
      // Espiar el método next y complete del Subject
      const nextSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

      // Llamar a ngOnDestroy
      component.ngOnDestroy();

      // Verificar que se llamaron los métodos
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería obtener datos anidados correctamente con obtenerDatosAnidados', () => {
      // Crear un producto de prueba
      const producto: Producto = { id: 1, descripcion: 'Producto de prueba' };

      // Caso 1: Producto sin detalles
      expect(component.obtenerDatosAnidados(producto)).toEqual([]);

      // Caso 2: Producto con detalles
      const detalles: Detalle[] = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.mapaDetalles.set(1, detalles);
      expect(component.obtenerDatosAnidados(producto)).toEqual(detalles);

      // Caso 3: Producto sin ID
      const productoSinId = { descripcion: 'Producto sin ID' } as Producto;
      expect(component.obtenerDatosAnidados(productoSinId)).toEqual([]);

      // Caso 4: Producto con ID pero sin detalles en el mapa
      const productoSinDetalles: Producto = { id: 2, descripcion: 'Producto sin detalles' };
      expect(component.obtenerDatosAnidados(productoSinDetalles)).toEqual([]);
    });

    it('debería manejar el caso de producto nulo o indefinido en obtenerDatosAnidados', () => {
      // Caso con producto nulo
      const resultado = component.obtenerDatosAnidados(null as unknown as Producto);
      expect(resultado).toEqual([]);
    });

    it('debería seleccionar un producto correctamente con alSeleccionarProducto', () => {
      const producto: Producto = { id: 1, descripcion: 'Producto de prueba' };
      component.alSeleccionarProducto(producto);
      expect(component.productoSeleccionado).toEqual(producto);
    });

    it('debería agregar un detalle correctamente con agregarDetalle', () => {
      // Configurar el formulario con valores válidos
      component.formMercancias.patchValue({
        fraccion: '1',
        cantidad: '10',
        medida: '1',
        genero: '1',
        comun: '1',
        origen: '1',
        procedencia: '1'
      });

      // Espiar el método push del array fraccionData
      const pushSpy = jest.spyOn(component.fraccionData, 'push');

      // Llamar al método
      component.agregarDetalle();

      // Verificar que se llamó al método push
      expect(pushSpy).toHaveBeenCalled();
      expect(component.fraccionData.length).toBe(1);
    });

    it('no debería agregar un detalle si el formulario no es válido', () => {
      // Configurar el formulario con valores inválidos
      component.formMercancias.reset();
      component.formMercancias.setErrors({ 'invalid': true });

      // Espiar el método push del array fraccionData
      const pushSpy = jest.spyOn(component.fraccionData, 'push');

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.agregarDetalle();

      // Verificar que no se llamó al método push
      expect(pushSpy).not.toHaveBeenCalled();
      expect(component.fraccionData.length).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('debería establecer valores en el store correctamente con establecerValoresStore', () => {
      // Configurar el formulario con un valor
      component.formMercancias.patchValue({
        descripcion: 'Valor de prueba'
      });

      // Llamar al método
      component.establecerValoresStore(component.formMercancias, 'descripcion');

      // Verificar que se llamó al método establecerDatos del store
      expect(tramite250102StoreMock.establecerDatos).toHaveBeenCalledWith({
        descripcion: 'Valor de prueba'
      });
    });

    it('no debería llamar a establecerDatos si el valor es undefined', () => {
      // Crear un formulario con un control que no existe
      const formGroup = formBuilder.group({
        otroControl: ['']
      });

      // Llamar al método con un campo que no existe
      component.establecerValoresStore(formGroup, 'campoInexistente');

      // Verificar que no se llamó al método establecerDatos del store
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();
    });

    it('debería cancelar el detalle correctamente con cancelarDetalle', () => {
      // Agregar datos al array fraccionData
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];

      // Establecer el modal como visible
      component.mostrarModalMercancias = true;

      // Espiar el método reset del formulario
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');

      // Llamar al método
      component.cancelarDetalle();

      // Verificar que se llamó al método reset y se limpiaron los datos
      expect(resetSpy).toHaveBeenCalled();
      expect(component.fraccionData).toEqual([]);
      expect(component.mostrarModalMercancias).toBe(false);
    });

    it('debería guardar el detalle correctamente con guardarDetalle', () => {
      // Configurar datos para la prueba
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.formMercancias.patchValue({
        descripcion: '1'
      });

      // Espiar métodos
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');
      const generarIdSpy = jest.spyOn(component as any, 'generarId').mockReturnValue(123);

      // Llamar al método
      component.guardarDetalle();

      // Verificar resultados
      expect(resetSpy).toHaveBeenCalled();
      expect(generarIdSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(1);
      expect(component.mapaDetalles.has(123)).toBe(true);
      expect(component.fraccionData).toEqual([]);
      expect(component.mostrarModalMercancias).toBe(false);
      expect(tramite250102StoreMock.establecerDatos).toHaveBeenCalled();
    });

    it('no debería guardar el detalle si no hay datos en fraccionData', () => {
      // Configurar datos vacíos
      component.fraccionData = [];

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.guardarDetalle();

      // Verificar que no se guardó nada
      expect(consoleSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(0);
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('no debería guardar el detalle si no hay descripción seleccionada', () => {
      // Configurar datos con descripción vacía
      component.fraccionData = [{
        fraccionArancelaria: 'Fracción 1',
        cantidad: '10',
        unidadMedida: 'KG',
        nombreCientifico: 'Nombre científico',
        nombreComun: 'Nombre común',
        paisOrigen: 'País origen',
        paisProcedencia: 'País procedencia'
      }];
      component.formMercancias.patchValue({
        descripcion: ''
      });

      // Espiar console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Llamar al método
      component.guardarDetalle();

      // Verificar que no se guardó nada
      expect(consoleSpy).toHaveBeenCalled();
      expect(component.producto.length).toBe(0);
      expect(tramite250102StoreMock.establecerDatos).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('debería abrir el modal de mercancías correctamente con abrirModalMercancias', () => {
      // Espiar el método reset del formulario
      const resetSpy = jest.spyOn(component.formMercancias, 'reset');

      // Verificar estado inicial
      expect(component.mostrarModalMercancias).toBe(false);

      // Llamar al método
      component.abrirModalMercancias();

      // Verificar que se abrió el modal y se reseteó el formulario
      expect(component.mostrarModalMercancias).toBe(true);
      expect(resetSpy).toHaveBeenCalled();
      expect(component.fraccionData).toEqual([]);

      // Llamar al método de nuevo
      resetSpy.mockClear();
      component.abrirModalMercancias();

      // Verificar que se cerró el modal y no se reseteó el formulario
      expect(component.mostrarModalMercancias).toBe(false);
      expect(resetSpy).not.toHaveBeenCalled();
    });

    it('debería generar un ID único con generarId', () => {
      // Espiar Date.now y Math.random
      const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000);
      const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      // Llamar al método
      const id = (component as any).generarId();

      // Verificar el resultado
      expect(id).toBe(1500); // 1000 + Math.floor(0.5 * 1000)

      // Restaurar los espías
      dateNowSpy.mockRestore();
      mathRandomSpy.mockRestore();
    });
  });

  describe('Interacciones con el DOM', () => {
    it('debería mostrar el modal cuando mostrarModalMercancias es true', () => {
      // Establecer el modal como visible
      component.mostrarModalMercancias = true;
      fixture.detectChanges();

      // Verificar que el modal está visible
      const modal = fixture.debugElement.query(By.css('app-modal'));
      expect(modal).toBeTruthy();
    });

    it('debería ocultar el modal cuando mostrarModalMercancias es false', () => {
      // Establecer el modal como oculto
      component.mostrarModalMercancias = false;
      fixture.detectChanges();

      // Verificar que el modal está oculto o tiene la propiedad active=false
      const modal = fixture.debugElement.query(By.css('app-modal[active=false]'));
      expect(modal).toBeTruthy();
    });
  });
});

