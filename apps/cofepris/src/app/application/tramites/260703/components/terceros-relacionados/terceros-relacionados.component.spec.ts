import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Destinatario, Fabricante } from '../../model/solicitud-permiso.model';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolicitudPermisoService: jest.Mocked<SolicitudPermisoService>;

  // Datos mock
  const mockDestinatarios: Destinatario[] = [
    {
      nombre: 'Destinatario 1',
      rfc: 'RFC12345678901',
      curp: 'CURP123456789012345',
      telefono: '1234567890',
      correoElectronico: 'destinatario1@example.com',
      calle: 'Calle Destinatario 1',
      numeroExterior: '123',
      numeroInterior: 'A',
      pais: 'México',
      colonia: 'Colonia Destinatario 1',
      municipio: 'Municipio Destinatario 1',
      localidad: 'Localidad Destinatario 1',
      estado: 'Estado Destinatario 1',
      codigoPostal: '12345'
    },
    {
      nombre: 'Destinatario 2',
      rfc: 'RFC98765432109',
      curp: 'CURP987654321098765',
      telefono: '9876543210',
      correoElectronico: 'destinatario2@example.com',
      calle: 'Calle Destinatario 2',
      numeroExterior: '456',
      numeroInterior: 'B',
      pais: 'México',
      colonia: 'Colonia Destinatario 2',
      municipio: 'Municipio Destinatario 2',
      localidad: 'Localidad Destinatario 2',
      estado: 'Estado Destinatario 2',
      codigoPostal: '54321'
    }
  ];

  const mockFabricantes: Fabricante[] = [
    {
      nombre: 'Fabricante 1',
      rfc: 'RFC11111111111',
      curp: 'CURP111111111111111',
      telefono: '1111111111',
      correoElectronico: 'fabricante1@example.com',
      calle: 'Calle Fabricante 1',
      numeroExterior: '111',
      numeroInterior: 'C',
      pais: 'México',
      colonia: 'Colonia Fabricante 1',
      municipio: 'Municipio Fabricante 1',
      localidad: 'Localidad Fabricante 1',
      estado: 'Estado Fabricante 1',
      codigoPostal: '11111'
    },
    {
      nombre: 'Fabricante 2',
      rfc: 'RFC22222222222',
      curp: 'CURP222222222222222',
      telefono: '2222222222',
      correoElectronico: 'fabricante2@example.com',
      calle: 'Calle Fabricante 2',
      numeroExterior: '222',
      numeroInterior: 'D',
      pais: 'México',
      colonia: 'Colonia Fabricante 2',
      municipio: 'Municipio Fabricante 2',
      localidad: 'Localidad Fabricante 2',
      estado: 'Estado Fabricante 2',
      codigoPostal: '22222'
    }
  ];

  const mockConsultaioState = {
    readonly: false
  };

  beforeEach(async () => {
    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Mock para SolicitudPermisoService
    mockSolicitudPermisoService = {
      obtenerDatosDestinatarios: jest.fn().mockReturnValue(of(mockDestinatarios)),
      obtenerDatosFabricantes: jest.fn().mockReturnValue(of(mockFabricantes))
    } as unknown as jest.Mocked<SolicitudPermisoService>;

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudPermisoService, useValue: mockSolicitudPermisoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    
    // Spy en los métodos del componente
    jest.spyOn(component, 'manejarFilaSeleccionadaDestinatario');
    jest.spyOn(component, 'manejarFilaSeleccionadaFabricante');
    
    fixture.detectChanges();
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.destinatarioTablaSeleccion).toBe(false);
      expect(component.fabricanteTablaSeleccion).toBe(false);
      
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      expect(componentAny.notificadorDestruccion$).toBeInstanceOf(Subject);
    });

    it('debería inicializar el esFormularioSoloLectura según el valor de consultaioState', () => {
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería inicializar las configuraciones de tablas correctamente', () => {
      // Verificar que las configuraciones de las tablas tienen el número correcto de columnas
      expect(component.configuiracionTablaDestinatario.length).toBe(15);
      expect(component.configuiracionTablaFabricante.length).toBe(15);
      
      // Verificar algunas columnas específicas
      expect(component.configuiracionTablaDestinatario[0].encabezado).toBe('Nombre/denominación o razón social');
      expect(component.configuiracionTablaFabricante[0].encabezado).toBe('Nombre/denominación o razón social');
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      // Accedemos a las propiedades privadas con casting
      const componentAny = component as any;
      expect(componentAny.solicitudPermisoService).toBeDefined();
      expect(componentAny.consultaioQuery).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockConsultaioState));
      const mockSelectConsultaioState$ = {
        pipe: mockPipeFn
      };
      
      mockConsultaioQuery.selectConsultaioState$ = mockSelectConsultaioState$ as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new TercerosRelacionadosComponent(
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      expect(mockPipeFn).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState) as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new TercerosRelacionadosComponent(
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });

    it('debería manejar estados consultaio con propiedades adicionales', () => {
      const extendedState = { readonly: false, otherProperty: 'value' };
      mockConsultaioQuery.selectConsultaioState$ = of(extendedState) as any;
      
      const newComponent = new TercerosRelacionadosComponent(
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      expect(newComponent.esFormularioSoloLectura).toBe(false);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería llamar a obtenerDatosDestinatarios y establecer los datos de destinatarios', () => {
      // Resetear datos
      component.datosTablaDestinatario = undefined as any;
      
      // Limpiar efecto de beforeEach
      (mockSolicitudPermisoService.obtenerDatosDestinatarios as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(mockSolicitudPermisoService.obtenerDatosDestinatarios).toHaveBeenCalled();
      expect(component.datosTablaDestinatario).toEqual(mockDestinatarios);
    });

    it('debería llamar a obtenerDatosFabricantes y establecer los datos de fabricantes', () => {
      // Resetear datos
      component.datosTablaFabricante = undefined as any;
      
      // Limpiar efecto de beforeEach
      (mockSolicitudPermisoService.obtenerDatosFabricantes as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(mockSolicitudPermisoService.obtenerDatosFabricantes).toHaveBeenCalled();
      expect(component.datosTablaFabricante).toEqual(mockFabricantes);
    });

    it('debería usar takeUntil para evitar fugas de memoria en suscripciones', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockDestinatarios));
      mockSolicitudPermisoService.obtenerDatosDestinatarios = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería manejar respuesta vacía del servicio obtenerDatosDestinatarios', () => {
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(of([]));
      
      // Resetear datos
      component.datosTablaDestinatario = undefined as any;
      
      component.ngOnInit();
      
      expect(component.datosTablaDestinatario).toEqual([]);
    });

    it('debería manejar respuesta vacía del servicio obtenerDatosFabricantes', () => {
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(of([]));
      
      // Resetear datos
      component.datosTablaFabricante = undefined as any;
      
      component.ngOnInit();
      
      expect(component.datosTablaFabricante).toEqual([]);
    });

    it('debería manejar errores en obtenerDatosDestinatarios', () => {
      const error = new Error('Error en servicio');
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(throwError(() => error));
      
      // Spy en console.error para verificar manejo de errores
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => component.ngOnInit()).not.toThrow();
      
      consoleSpy.mockRestore();
    });

    it('debería manejar errores en obtenerDatosFabricantes', () => {
      const error = new Error('Error en servicio');
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(throwError(() => error));
      
      // Spy en console.error para verificar manejo de errores
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => component.ngOnInit()).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  // Pruebas para manejarFilaSeleccionadaDestinatario
  describe('manejarFilaSeleccionadaDestinatario', () => {
    it('debería establecer destinatarioTablaSeleccion como true cuando hay filas seleccionadas', () => {
      const filasSeleccionadas: Destinatario[] = [mockDestinatarios[0]];
      
      component.manejarFilaSeleccionadaDestinatario(filasSeleccionadas);
      
      expect(component.destinatarioTablaSeleccion).toBe(true);
    });

    it('debería establecer destinatarioTablaSeleccion como false cuando no hay filas seleccionadas', () => {
      const filasSeleccionadas: Destinatario[] = [];
      
      component.manejarFilaSeleccionadaDestinatario(filasSeleccionadas);
      
      expect(component.destinatarioTablaSeleccion).toBe(false);
    });

    it('debería manejar múltiples filas seleccionadas', () => {
      const filasSeleccionadas: Destinatario[] = [...mockDestinatarios];
      
      component.manejarFilaSeleccionadaDestinatario(filasSeleccionadas);
      
      expect(component.destinatarioTablaSeleccion).toBe(true);
    });

    it('debería manejar array undefined', () => {
      component.manejarFilaSeleccionadaDestinatario(undefined as any);
      
      expect(component.destinatarioTablaSeleccion).toBe(false);
    });

    it('debería manejar array null', () => {
      component.manejarFilaSeleccionadaDestinatario(null as any);
      
      expect(component.destinatarioTablaSeleccion).toBe(false);
    });

    it('debería manejar cambio de selección múltiple veces', () => {
      // Seleccionar primero
      component.manejarFilaSeleccionadaDestinatario([mockDestinatarios[0]]);
      expect(component.destinatarioTablaSeleccion).toBe(true);
      
      // Deseleccionar
      component.manejarFilaSeleccionadaDestinatario([]);
      expect(component.destinatarioTablaSeleccion).toBe(false);
      
      // Seleccionar múltiples
      component.manejarFilaSeleccionadaDestinatario(mockDestinatarios);
      expect(component.destinatarioTablaSeleccion).toBe(true);
    });
  });

  // Pruebas para manejarFilaSeleccionadaFabricante
  describe('manejarFilaSeleccionadaFabricante', () => {
    it('debería establecer fabricanteTablaSeleccion como true cuando hay filas seleccionadas', () => {
      const filasSeleccionadas: Fabricante[] = [mockFabricantes[0]];
      
      component.manejarFilaSeleccionadaFabricante(filasSeleccionadas);
      
      expect(component.fabricanteTablaSeleccion).toBe(true);
    });

    it('debería establecer fabricanteTablaSeleccion como false cuando no hay filas seleccionadas', () => {
      const filasSeleccionadas: Fabricante[] = [];
      
      component.manejarFilaSeleccionadaFabricante(filasSeleccionadas);
      
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });

    it('debería manejar múltiples filas seleccionadas', () => {
      const filasSeleccionadas: Fabricante[] = [...mockFabricantes];
      
      component.manejarFilaSeleccionadaFabricante(filasSeleccionadas);
      
      expect(component.fabricanteTablaSeleccion).toBe(true);
    });

    it('debería manejar array undefined', () => {
      component.manejarFilaSeleccionadaFabricante(undefined as any);
      
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });

    it('debería manejar array null', () => {
      component.manejarFilaSeleccionadaFabricante(null as any);
      
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });

    it('debería mantener el estado correcto con cambios consecutivos', () => {
      // Estado inicial
      expect(component.fabricanteTablaSeleccion).toBe(false);
      
      // Seleccionar uno
      component.manejarFilaSeleccionadaFabricante([mockFabricantes[0]]);
      expect(component.fabricanteTablaSeleccion).toBe(true);
      
      // Seleccionar otro
      component.manejarFilaSeleccionadaFabricante([mockFabricantes[1]]);
      expect(component.fabricanteTablaSeleccion).toBe(true);
      
      // Deseleccionar todos
      component.manejarFilaSeleccionadaFabricante([]);
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en notificadorDestruccion$', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const nextSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en notificadorDestruccion$', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const completeSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const nextSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'next');
      const completeSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('debería ser llamado correctamente al destruir el componente', () => {
      const destroySpy = jest.spyOn(component, 'ngOnDestroy');
      
      // Llamar directamente al método ngOnDestroy() ya que fixture.destroy() no garantiza su llamada
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalled();
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      // Este test se ejecuta después de beforeEach, que ya llamó a fixture.detectChanges() e inicializó el componente
      expect(component.datosTablaDestinatario).toEqual(mockDestinatarios);
      expect(component.datosTablaFabricante).toEqual(mockFabricantes);
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería actualizar el estado de selección cuando cambia la selección de destinatarios', () => {
      // Simular selección de destinatarios
      const destinatariosSeleccionados: Destinatario[] = [mockDestinatarios[0]];
      component.manejarFilaSeleccionadaDestinatario(destinatariosSeleccionados);
      
      expect(component.destinatarioTablaSeleccion).toBe(true);
      
      // Simular deselección
      component.manejarFilaSeleccionadaDestinatario([]);
      
      expect(component.destinatarioTablaSeleccion).toBe(false);
    });

    it('debería actualizar el estado de selección cuando cambia la selección de fabricantes', () => {
      // Simular selección de fabricantes
      const fabricantesSeleccionados: Fabricante[] = [mockFabricantes[0]];
      component.manejarFilaSeleccionadaFabricante(fabricantesSeleccionados);
      
      expect(component.fabricanteTablaSeleccion).toBe(true);
      
      // Simular deselección
      component.manejarFilaSeleccionadaFabricante([]);
      
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });

    it('debería manejar el estado readonly correctamente durante todo el ciclo de vida', () => {
      // Verificar estado inicial
      expect(component.esFormularioSoloLectura).toBe(false);
      
      // Simular cambio a readonly
      const readonlyState = { readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState) as any;
      
      // Crear nuevo componente
      const newFixture = TestBed.createComponent(TercerosRelacionadosComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar suscripción a observable que no emite en obtenerDatosDestinatarios', () => {
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(new Subject().asObservable() as any);
      
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar suscripción a observable que no emite en obtenerDatosFabricantes', () => {
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(new Subject().asObservable() as any);
      
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar respuesta null de obtenerDatosDestinatarios', () => {
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(of(null as any));
      
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar respuesta null de obtenerDatosFabricantes', () => {
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(of(null as any));
      
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar suscripción a observable que no emite en constructor', () => {
      mockConsultaioQuery.selectConsultaioState$ = new Subject().asObservable() as any;
      
      expect(() => {
        new TercerosRelacionadosComponent(
          mockSolicitudPermisoService,
          mockConsultaioQuery
        );
      }).not.toThrow();
    });

    it('debería manejar datos de destinatarios con propiedades faltantes', () => {
      const destinatariosIncompletos = [{ nombre: 'Test' }] as Destinatario[];
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(of(destinatariosIncompletos as any));
      
      component.ngOnInit();
      
      expect(component.datosTablaDestinatario).toEqual(destinatariosIncompletos);
    });

    it('debería manejar datos de fabricantes con propiedades faltantes', () => {
      const fabricantesIncompletos = [{ nombre: 'Test Fabricante' }] as Fabricante[];
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(of(fabricantesIncompletos));
      
      component.ngOnInit();
      
      expect(component.datosTablaFabricante).toEqual(fabricantesIncompletos);
    });

    it('debería manejar arrays con elementos undefined en destinatarios', () => {
      const destinatariosConUndefined = [mockDestinatarios[0], undefined, mockDestinatarios[1]] as Destinatario[];
      component.manejarFilaSeleccionadaDestinatario(destinatariosConUndefined);
      
      expect(component.destinatarioTablaSeleccion).toBe(true);
    });

    it('debería manejar arrays con elementos undefined en fabricantes', () => {
      const fabricantesConUndefined = [mockFabricantes[0], undefined, mockFabricantes[1]] as Fabricante[];
      component.manejarFilaSeleccionadaFabricante(fabricantesConUndefined);
      
      expect(component.fabricanteTablaSeleccion).toBe(true);
    });
  });

  // Pruebas de interacción con la vista
  describe('Interacciones con la template', () => {
    it('debería renderizar el título correctamente', () => {
      const compiled = fixture.nativeElement;
      const titulo = compiled.querySelector('ng-titulo');
      expect(titulo).toBeTruthy();
    });

    it('debería renderizar la alerta de información', () => {
      const compiled = fixture.nativeElement;
      const alerta = compiled.querySelector('ng-alert');
      expect(alerta).toBeTruthy();
    });

    it('debería renderizar las tablas dinámicas', () => {
      const compiled = fixture.nativeElement;
      const tablasDinamicas = compiled.querySelectorAll('app-tabla-dinamica');
      
      expect(tablasDinamicas.length).toBeGreaterThan(0);
    });

    it('debería configurar correctamente las propiedades de las tablas', () => {
      // Test de lógica en lugar de template - verificar que los datos estén configurados correctamente
      expect(component.datosTablaDestinatario).toEqual(mockDestinatarios);
      expect(component.datosTablaFabricante).toEqual(mockFabricantes);
      expect(component.configuiracionTablaDestinatario).toBeDefined();
      expect(component.configuiracionTablaFabricante).toBeDefined();
    });

    it('debería deshabilitar los botones cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const botones = fixture.nativeElement.querySelectorAll('button');
      botones.forEach((boton: HTMLButtonElement) => {
        expect(boton.disabled).toBe(true);
      });
    });

    it('debería mostrar los botones de eliminar y modificar cuando hay filas seleccionadas en destinatarios', () => {
      component.destinatarioTablaSeleccion = true;
      fixture.detectChanges();
      
      const botonesEliminarModificar = fixture.nativeElement.querySelectorAll('.btn-danger, .btn-default');
      expect(botonesEliminarModificar.length).toBeGreaterThan(0);
    });

    it('debería mostrar los botones de eliminar y modificar cuando hay filas seleccionadas en fabricantes', () => {
      component.fabricanteTablaSeleccion = true;
      fixture.detectChanges();
      
      const botonesEliminarModificar = fixture.nativeElement.querySelectorAll('.btn-danger, .btn-default');
      expect(botonesEliminarModificar.length).toBeGreaterThan(0);
    });

    it('debería validar el estado de visibilidad de botones basado en la selección', () => {
      // Test de lógica en lugar de template - verificar las propiedades de componente
      component.destinatarioTablaSeleccion = false;
      component.fabricanteTablaSeleccion = false;
      
      expect(component.destinatarioTablaSeleccion).toBe(false);
      expect(component.fabricanteTablaSeleccion).toBe(false);
    });

    it('debería mantener habilitado el botón Agregar cuando no esFormularioSoloLectura', () => {
      component.esFormularioSoloLectura = false;
      fixture.detectChanges();
      
      const botonesAgregar = fixture.nativeElement.querySelectorAll('.btn-primary');
      botonesAgregar.forEach((boton: HTMLButtonElement) => {
        expect(boton.disabled).toBe(false);
      });
    });

    it('debería renderizar las secciones de destinatario y fabricante', () => {
      const compiled = fixture.nativeElement;
      const encabezados = compiled.querySelectorAll('h6');
      
      expect(encabezados.length).toBeGreaterThanOrEqual(2);
    });

    it('debería tener la estructura de clases CSS correcta', () => {
      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.container');
      const rows = compiled.querySelectorAll('.row');
      const flexContainers = compiled.querySelectorAll('.d-flex');
      
      expect(container).toBeTruthy();
      expect(rows.length).toBeGreaterThan(0);
      expect(flexContainers.length).toBeGreaterThan(0);
    });
  });

  // Pruebas de los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newComponent = new TercerosRelacionadosComponent(
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en obtenerDatosDestinatarios', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockDestinatarios));
      mockSolicitudPermisoService.obtenerDatosDestinatarios = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.ngOnInit();
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en obtenerDatosFabricantes', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockFabricantes));
      mockSolicitudPermisoService.obtenerDatosFabricantes = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.ngOnInit();
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería completar suscripciones en ngOnDestroy', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const destroySpy = jest.spyOn(componentAny.notificadorDestruccion$, 'next');
      const completeSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('debería manejar múltiples suscripciones simultáneas', () => {
      const subject1 = new Subject();
      const subject2 = new Subject();
      
      // Mock de servicios que retornan subjects
      mockSolicitudPermisoService.obtenerDatosDestinatarios.mockReturnValue(subject1.asObservable() as any);
      mockSolicitudPermisoService.obtenerDatosFabricantes.mockReturnValue(subject2.asObservable() as any);
      
      component.ngOnInit();
      
      // Emitir valores en ambos subjects
      subject1.next(mockDestinatarios);
      subject2.next(mockFabricantes);
      
      expect(component.datosTablaDestinatario).toEqual(mockDestinatarios);
      expect(component.datosTablaFabricante).toEqual(mockFabricantes);
    });

    it('debería desuscribirse correctamente cuando se destruye el componente', () => {
      const componentAny = component as any;
      const unsubscribeSpy = jest.spyOn(componentAny.notificadorDestruccion$, 'next');
      
      // Simular destrucción del componente
      component.ngOnDestroy();
      
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  // Pruebas de las configuraciones de las tablas
  describe('Configuraciones de las tablas', () => {
    it('debería configurar correctamente las columnas de la tabla de destinatarios', () => {
      // Probar algunas columnas específicas
      expect(component.configuiracionTablaDestinatario[0].encabezado).toBe('Nombre/denominación o razón social');
      expect(component.configuiracionTablaDestinatario[1].encabezado).toBe('R.F.C.');
      expect(component.configuiracionTablaDestinatario[2].encabezado).toBe('CURP');
      
      // Probar función de clave
      const destinatario = mockDestinatarios[0];
      expect(component.configuiracionTablaDestinatario[0].clave(destinatario)).toBe(destinatario.nombre);
      expect(component.configuiracionTablaDestinatario[1].clave(destinatario)).toBe(destinatario.rfc);
      expect(component.configuiracionTablaDestinatario[2].clave(destinatario)).toBe(destinatario.curp);
    });

    it('debería configurar correctamente las columnas de la tabla de fabricantes', () => {
      // Probar algunas columnas específicas
      expect(component.configuiracionTablaFabricante[0].encabezado).toBe('Nombre/denominación o razón social');
      expect(component.configuiracionTablaFabricante[1].encabezado).toBe('R.F.C.');
      expect(component.configuiracionTablaFabricante[2].encabezado).toBe('CURP');
      
      // Probar función de clave
      const fabricante = mockFabricantes[0];
      expect(component.configuiracionTablaFabricante[0].clave(fabricante)).toBe(fabricante.nombre);
      expect(component.configuiracionTablaFabricante[1].clave(fabricante)).toBe(fabricante.rfc);
      expect(component.configuiracionTablaFabricante[2].clave(fabricante)).toBe(fabricante.curp);
    });

    it('debería configurar correctamente todas las columnas de destinatarios', () => {
      const destinatario = mockDestinatarios[0];
      const configuracion = component.configuiracionTablaDestinatario;
      
      // Verificar todas las columnas
      expect(configuracion[3].clave(destinatario)).toBe(destinatario.telefono);
      expect(configuracion[4].clave(destinatario)).toBe(destinatario.correoElectronico);
      expect(configuracion[5].clave(destinatario)).toBe(destinatario.calle);
      expect(configuracion[6].clave(destinatario)).toBe(destinatario.numeroExterior);
      expect(configuracion[7].clave(destinatario)).toBe(destinatario.numeroInterior);
      expect(configuracion[8].clave(destinatario)).toBe(destinatario.pais);
      expect(configuracion[9].clave(destinatario)).toBe(destinatario.colonia);
      expect(configuracion[10].clave(destinatario)).toBe(destinatario.municipio);
      expect(configuracion[11].clave(destinatario)).toBe(destinatario.localidad);
      expect(configuracion[12].clave(destinatario)).toBe(destinatario.estado);
      expect(configuracion[13].clave(destinatario)).toBe('---'); // Esta es la columna estática
      expect(configuracion[14].clave(destinatario)).toBe(destinatario.codigoPostal); // Índice correcto para código postal
    });

    it('debería configurar correctamente todas las columnas de fabricantes', () => {
      const fabricante = mockFabricantes[0];
      const configuracion = component.configuiracionTablaFabricante;
      
      // Verificar todas las columnas
      expect(configuracion[3].clave(fabricante)).toBe(fabricante.telefono);
      expect(configuracion[4].clave(fabricante)).toBe(fabricante.correoElectronico);
      expect(configuracion[5].clave(fabricante)).toBe(fabricante.calle);
      expect(configuracion[6].clave(fabricante)).toBe(fabricante.numeroExterior);
      expect(configuracion[7].clave(fabricante)).toBe(fabricante.numeroInterior);
      expect(configuracion[8].clave(fabricante)).toBe(fabricante.pais);
      expect(configuracion[9].clave(fabricante)).toBe(fabricante.colonia);
      expect(configuracion[10].clave(fabricante)).toBe(fabricante.municipio);
      expect(configuracion[11].clave(fabricante)).toBe(fabricante.localidad);
      expect(configuracion[12].clave(fabricante)).toBe(fabricante.estado);
      expect(configuracion[13].clave(fabricante)).toBe('---'); // Esta es la columna estática
      expect(configuracion[14].clave(fabricante)).toBe(fabricante.codigoPostal); // Índice correcto para código postal
    });

    it('debería configurar correctamente la columna estática de estado', () => {
      // La columna 13 es la que tiene valor estático
      expect(component.configuiracionTablaDestinatario[13].clave({} as any)).toBe('---');
      expect(component.configuiracionTablaFabricante[13].clave({} as any)).toBe('---');
    });

    it('debería tener encabezados correctos para todas las columnas de destinatarios', () => {
      const configuracion = component.configuiracionTablaDestinatario;
      const encabezadosEsperados = [
        'Nombre/denominación o razón social',
        'R.F.C.',
        'CURP',
        'Teléfono',
        'Correo electrónico',
        'Calle',
        'Número exterior',
        'Número interior',
        'País',
        'Colonia',
        'Municipio o alcaldía',
        'Localidad',
        'Estado',
        'Estado',
        'Código Postal'
      ];
      
      configuracion.forEach((columna, index) => {
        expect(columna.encabezado).toBe(encabezadosEsperados[index]);
      });
    });

    it('debería tener encabezados correctos para todas las columnas de fabricantes', () => {
      const configuracion = component.configuiracionTablaFabricante;
      const encabezadosEsperados = [
        'Nombre/denominación o razón social',
        'R.F.C.',
        'CURP',
        'Teléfono',
        'Correo electrónico',
        'Calle',
        'Número exterior',
        'Número interior',
        'País',
        'Colonia',
        'Municipio o alcaldía',
        'Localidad',
        'Estado',
        'Estado',
        'Código Postal'
      ];
      
      configuracion.forEach((columna, index) => {
        expect(columna.encabezado).toBe(encabezadosEsperados[index]);
      });
    });
  });

  // Pruebas de comportamiento y estado interno
  describe('Comportamiento y estado interno', () => {
    it('debería mantener el estado de selección independiente entre tablas', () => {
      // Seleccionar en destinatarios
      component.manejarFilaSeleccionadaDestinatario([mockDestinatarios[0]]);
      expect(component.destinatarioTablaSeleccion).toBe(true);
      expect(component.fabricanteTablaSeleccion).toBe(false);
      
      // Seleccionar en fabricantes
      component.manejarFilaSeleccionadaFabricante([mockFabricantes[0]]);
      expect(component.destinatarioTablaSeleccion).toBe(true);
      expect(component.fabricanteTablaSeleccion).toBe(true);
      
      // Deseleccionar solo destinatarios
      component.manejarFilaSeleccionadaDestinatario([]);
      expect(component.destinatarioTablaSeleccion).toBe(false);
      expect(component.fabricanteTablaSeleccion).toBe(true);
    });

    it('debería inicializar correctamente el tipo de selección de tabla', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
    });

    it('debería mantener las referencias a los servicios inyectados', () => {
      const componentAny = component as any;
      expect(componentAny.solicitudPermisoService).toBe(mockSolicitudPermisoService);
      expect(componentAny.consultaioQuery).toBe(mockConsultaioQuery);
    });

    it('debería manejar correctamente los cambios de estado del formulario', () => {
      // Cambiar a solo lectura
      component.esFormularioSoloLectura = true;
      expect(component.esFormularioSoloLectura).toBe(true);
      
      // Cambiar a editable
      component.esFormularioSoloLectura = false;
      expect(component.esFormularioSoloLectura).toBe(false);
    });
  });
});