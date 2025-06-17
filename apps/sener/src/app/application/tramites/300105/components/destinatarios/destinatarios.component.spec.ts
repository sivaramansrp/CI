import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DestinatariosComponent } from './destinatarios.component';
import {
  ConsultaioQuery,
  ConsultaioState,
  Catalogo,
  CrosslistComponent,
  CategoriaMensaje,
  TipoNotificacionEnum,
  TablaSeleccion
} from '@ng-mf/data-access-user';
import { 
  DestinatarioConfiguracionItem,
  MercanciaConfiguracionItem 
} from '../../enum/destinatario-tabla.enum';
import { CrosslistBoton } from '../../enum/botons.enum';
import { Tramite300105State, Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';

describe('DestinatariosComponent', () => {
  let component: DestinatariosComponent;
  let fixture: ComponentFixture<DestinatariosComponent>;
  let mockAutorizacionDeRayosXService: jest.Mocked<AutorizacionDeRayosXService>;
  let mockTramite300105Store: jest.Mocked<Tramite300105Store>;
  let mockTramite300105Query: jest.Mocked<Tramite300105Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockCrosslistComponent: jest.Mocked<CrosslistComponent>;
  let formBuilder: FormBuilder;

  // Datos mock
  const MOCK_PAIS: Catalogo[] = [
    { id: 1, descripcion: 'México' },
    { id: 2, descripcion: 'Estados Unidos'}
  ];

  const MOCK_TIPO_MERCANCIA: Catalogo[] = [
    { id: 1, descripcion: 'Electrónicos'},
    { id: 2, descripcion: 'Textiles'  }
  ];

  const MOCK_FRACCION_ARANCELARIA_DESCRIPCION: Catalogo[] = [
    { id: 1, descripcion: 'Descripción Fracción 1' },
    { id: 2, descripcion: 'Descripción Fracción 2' }
  ];

  const MOCK_DESTINATARIO_DATOS: DestinatarioConfiguracionItem[] = [
    {
      id: 1,
      denominacionRazon: 'Empresa Test S.A.',
      domicilio: 'Calle Test 123',
      pais: 'México',
      correo: 'test@empresa.com',
      paginaWeb: 'www.test.com',
      tipoMercancia: 'Electrónicos'
    },
    {
      id: 2,
      denominacionRazon: 'Otra Empresa S.A.',
      domicilio: 'Avenida Prueba 456',
      pais: 'Estados Unidos',
      correo: 'contacto@otra.com',
      paginaWeb: 'www.otra.com',
      tipoMercancia: 'Textiles'
    }
  ];

  const MOCK_TRAMITE300105_STATE: Tramite300105State = {
    destinatarioTablaDatos: MOCK_DESTINATARIO_DATOS,
    // Agregar otras propiedades según sea necesario
  } as Tramite300105State;

  const MOCK_CONSULTAIO_STATE: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  const MOCK_CROSSLIST_BOTONES: CrosslistBoton[] = [
    { btnNombre: 'Agregar', class: 'btn-agregar', funcion: () => console.log('Agregar botón clicado') },
    { btnNombre: 'Eliminar', class: 'btn-eliminar', funcion: () => console.log('Eliminar botón clicado') }
  ];

  beforeEach(async () => {
    // Mock para AutorizacionDeRayosXService
    mockAutorizacionDeRayosXService = {
      pais: MOCK_PAIS,
      tipoMercancia: MOCK_TIPO_MERCANCIA,
      fraccionArancelariaDescripcion: MOCK_FRACCION_ARANCELARIA_DESCRIPCION,
      inicializaMercanciaDatosCatalogos: jest.fn()
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    // Mock para Tramite300105Store
    mockTramite300105Store = {
      setDestinatarioTablaDatos: jest.fn()
    } as unknown as jest.Mocked<Tramite300105Store>;

    // Mock para Tramite300105Query
    mockTramite300105Query = {
      selectTramite300105$: of(MOCK_TRAMITE300105_STATE)
    } as unknown as jest.Mocked<Tramite300105Query>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Mock para CrosslistComponent
    mockCrosslistComponent = {
      // Propiedades necesarias del componente
    } as unknown as jest.Mocked<CrosslistComponent>;

    // Mock para OBTENER_BOTONES_CROSSLIST
    jest.doMock('../../enum/botons.enum', () => ({
      OBTENER_BOTONES_CROSSLIST: jest.fn(() => MOCK_CROSSLIST_BOTONES)
    }));

    await TestBed.configureTestingModule({
      declarations: [DestinatariosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AutorizacionDeRayosXService, useValue: mockAutorizacionDeRayosXService },
        { provide: Tramite300105Store, useValue: mockTramite300105Store },
        { provide: Tramite300105Query, useValue: mockTramite300105Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatariosComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.listaOriginalAduanas).toEqual([]);
      expect(component.listaSeleccionadaAduanas).toEqual([]);
      expect(component.listaOriginalMovimientos).toEqual([]);
      expect(component.listSeleccionadaMovimientos).toEqual([]);
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.enableModficarBoton).toBe(false);
      expect(component.mostrarModalDatosMercancia).toBe(false);
      expect(component.mostrarPopupSeleccionMultiple).toBe(false);
      expect(component.multipleSeleccionPopupAbierto).toBe(false);
      expect(component.multipleSeleccionPopupCerrado).toBe(true);
      expect(component.confirmEliminarPopupAbierto).toBe(false);
      expect(component.confirmEliminarPopupCerrado).toBe(true);
      expect(component.enableEliminarBoton).toBe(false);
      expect(component.esOperacionDeActualizacion).toBe(false);
      expect(component.relacionMercanciaPopupAbierto).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component['notificadorDestruccion$']).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component.autorizacionDeRayosXService).toBeDefined();
      expect(component['tramite300105Store']).toBeDefined();
      expect(component['tramite300105Query']).toBeDefined();
      expect(component['formBuilder']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const SPY = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const NEW_FIXTURE = TestBed.createComponent(DestinatariosComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(SPY).toHaveBeenCalled();
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true); // readonly || true
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const READONLY_STATE = { ...MOCK_CONSULTAIO_STATE, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(READONLY_STATE);
      
      const NEW_FIXTURE = TestBed.createComponent(DestinatariosComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse al estado del trámite y actualizar datos', () => {
      component.ngOnInit();
      
      expect(component.estadoSolicitud300105).toEqual(MOCK_TRAMITE300105_STATE);
      expect(component.datosTablaDestinatario).toEqual(MOCK_DESTINATARIO_DATOS);
    });

    it('debería configurar los botones de movimientos', () => {
      component.ngOnInit();
      
      expect(component.botonesMovimientos).toEqual(MOCK_CROSSLIST_BOTONES);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE300105_STATE));
      mockTramite300105Query.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      component.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas para crearNuevoFormularioMercancia
  describe('crearNuevoFormularioMercancia', () => {
    it('debería crear formulario con datos por defecto cuando no se proporcionan datos', () => {
      component.crearNuevoFormularioMercancia();
      
      expect(component.formularioMercancia).toBeDefined();
      expect(component.formularioMercancia.get('id')?.value).toBe(0);
      expect(component.formularioMercancia.get('denominacionRazon')?.value).toBe('');
      expect(component.formularioMercancia.get('domicilio')?.value).toBe('');
      expect(component.formularioMercancia.get('pais')?.value).toBe('');
      expect(component.formularioMercancia.get('correo')?.value).toBe('');
      expect(component.formularioMercancia.get('paginaWeb')?.value).toBe('');
      expect(component.formularioMercancia.get('tipoMercancia')?.value).toBe('');
    });

    it('debería crear formulario con datos proporcionados', () => {
      const DATOS_PRUEBA: DestinatarioConfiguracionItem = {
        id: 5,
        denominacionRazon: 'Test Empresa',
        domicilio: 'Test Dirección',
        pais: 'Test País',
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 'Test Mercancía'
      };
      
      component.crearNuevoFormularioMercancia(DATOS_PRUEBA);
      
      expect(component.formularioMercancia.get('id')?.value).toBe(5);
      expect(component.formularioMercancia.get('denominacionRazon')?.value).toBe('Test Empresa');
      expect(component.formularioMercancia.get('domicilio')?.value).toBe('Test Dirección');
      expect(component.formularioMercancia.get('pais')?.value).toBe('Test País');
      expect(component.formularioMercancia.get('correo')?.value).toBe('test@test.com');
      expect(component.formularioMercancia.get('paginaWeb')?.value).toBe('www.test.com');
      expect(component.formularioMercancia.get('tipoMercancia')?.value).toBe('Test Mercancía');
    });

    it('debería establecer validadores requeridos para todos los campos', () => {
      component.crearNuevoFormularioMercancia();
      
      const CAMPOS_REQUERIDOS = [
        'denominacionRazon', 'domicilio', 'pais', 'correo', 'paginaWeb', 'tipoMercancia'
      ];
      
      CAMPOS_REQUERIDOS.forEach(CAMPO => {
        const CONTROL = component.formularioMercancia.get(CAMPO);
        CONTROL?.setValue('');
        expect(CONTROL?.hasError('required')).toBe(true);
      });
    });

    it('debería combinar datos por defecto con datos proporcionados', () => {
      const DATOS_PARCIALES = {
        denominacionRazon: 'Solo Nombre',
        correo: 'solo@email.com'
      };
      
      component.crearNuevoFormularioMercancia(DATOS_PARCIALES as any);
      
      expect(component.formularioMercancia.get('denominacionRazon')?.value).toBe('Solo Nombre');
      expect(component.formularioMercancia.get('correo')?.value).toBe('solo@email.com');
      expect(component.formularioMercancia.get('domicilio')?.value).toBe(''); // Valor por defecto
      expect(component.formularioMercancia.get('id')?.value).toBe(0); // Valor por defecto
    });
  });

  // Pruebas para manejarCambioFraccionArancelaria
  describe('manejarCambioFraccionArancelaria', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería actualizar fraccionDescripcion cuando encuentra la fracción', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Descripción Fracción 1');
    });

    it('debería manejar cuando no encuentra la fracción arancelaria', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 999,
        descripcion: '999'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBeUndefined();
    });

    it('debería manejar descripción como string numérico', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 2,
        descripcion: '2'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Descripción Fracción 2');
    });

    it('no debería fallar si fraccionDescripcion control no existe', () => {
      // Crear formulario sin fraccionDescripcion
      component.formularioMercancia = formBuilder.group({
        otroCampo: ['']
      });
      
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1'
      };
      
      expect(() => component.manejarCambioFraccionArancelaria(EVENT_CATALOGO)).not.toThrow();
    });
  });

  // Pruebas para manejarFilaSeleccionada
  describe('manejarFilaSeleccionada', () => {
    it('debería deshabilitar botones cuando no hay filas seleccionadas', () => {
      component.manejarFilaSeleccionada([]);
      
      expect(component.enableModficarBoton).toBe(false);
      expect(component.enableEliminarBoton).toBe(false);
    });

    it('debería habilitar botones y actualizar datos cuando hay una fila seleccionada', () => {
      const FILA_SELECCIONADA = [MOCK_DESTINATARIO_DATOS[0]];
      
      component.manejarFilaSeleccionada(FILA_SELECCIONADA);
      
      expect(component.enableModficarBoton).toBe(true);
      expect(component.enableEliminarBoton).toBe(true);
      expect(component.listaFilaSeleccionadaMercancia).toEqual(FILA_SELECCIONADA);
      expect(component.filaSeleccionadaMercancia).toEqual(MOCK_DESTINATARIO_DATOS[0]);
    });

    it('debería seleccionar la última fila cuando hay múltiples filas', () => {
      component.manejarFilaSeleccionada(MOCK_DESTINATARIO_DATOS);
      
      expect(component.filaSeleccionadaMercancia).toEqual(MOCK_DESTINATARIO_DATOS[1]); // Última fila
      expect(component.listaFilaSeleccionadaMercancia).toEqual(MOCK_DESTINATARIO_DATOS);
    });

    it('debería mantener todas las filas seleccionadas en la lista', () => {
      const FILAS_MULTIPLES = [MOCK_DESTINATARIO_DATOS[0], MOCK_DESTINATARIO_DATOS[1]];
      
      component.manejarFilaSeleccionada(FILAS_MULTIPLES);
      
      expect(component.listaFilaSeleccionadaMercancia).toEqual(FILAS_MULTIPLES);
      expect(component.listaFilaSeleccionadaMercancia.length).toBe(2);
    });
  });

  // Pruebas para actualizarFilaSeleccionada
  describe('actualizarFilaSeleccionada', () => {
    beforeEach(() => {
      component.datosTablaDestinatario = MOCK_DESTINATARIO_DATOS;
      component.filaSeleccionadaMercancia = { ...MOCK_DESTINATARIO_DATOS[0] };
    });

    it('debería actualizar la fila seleccionada con datos más recientes', () => {
      // Modificar datos en la tabla
      component.datosTablaDestinatario[0].denominacionRazon = 'Nombre Actualizado';
      
      component.actualizarFilaSeleccionada();
      
      expect(component.filaSeleccionadaMercancia.denominacionRazon).toBe('Nombre Actualizado');
    });

    it('no debería actualizar si no encuentra la fila', () => {
      component.filaSeleccionadaMercancia = { id: 999 } as any;
      const ORIGINAL_FILA = { ...component.filaSeleccionadaMercancia };
      
      component.actualizarFilaSeleccionada();
      
      expect(component.filaSeleccionadaMercancia).toEqual(ORIGINAL_FILA);
    });

    it('debería crear una copia independiente de los datos', () => {
      component.actualizarFilaSeleccionada();
      
      // Modificar la fila seleccionada no debería afectar los datos originales
      component.filaSeleccionadaMercancia.denominacionRazon = 'Modificado';
      
      expect(component.datosTablaDestinatario[0].denominacionRazon).not.toBe('Modificado');
    });
  });

  // Pruebas para modificarItemMercancia
  describe('modificarItemMercancia', () => {
    beforeEach(() => {
      component.datosTablaDestinatario = MOCK_DESTINATARIO_DATOS;
      jest.spyOn(component, 'actualizarFilaSeleccionada');
      jest.spyOn(component, 'crearNuevoFormularioMercancia');
      jest.spyOn(component, 'alternarModalMercancia');
      jest.spyOn(component, 'abrirMultipleSeleccionPopup');
    });

    it('debería modificar item cuando hay una sola fila seleccionada', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_DESTINATARIO_DATOS[0]];
      component.filaSeleccionadaMercancia = MOCK_DESTINATARIO_DATOS[0];
      
      component.modificarItemMercancia();
      
      expect(component.actualizarFilaSeleccionada).toHaveBeenCalled();
      expect(component.esOperacionDeActualizacion).toBe(true);
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalled();
      expect(component.alternarModalMercancia).toHaveBeenCalled();
    });

    it('debería abrir popup de selección múltiple cuando hay múltiples filas', () => {
      component.listaFilaSeleccionadaMercancia = MOCK_DESTINATARIO_DATOS;
      
      component.modificarItemMercancia();
      
      expect(component.abrirMultipleSeleccionPopup).toHaveBeenCalled();
      expect(component.esOperacionDeActualizacion).toBe(false);
    });

    it('debería convertir correctamente los índices de catálogos', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_DESTINATARIO_DATOS[0]];
      component.filaSeleccionadaMercancia = MOCK_DESTINATARIO_DATOS[0];
      
      component.modificarItemMercancia();
      
      // Verificar que se llamó con los datos convertidos
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalledWith(
        expect.objectContaining({
          denominacionRazon: MOCK_DESTINATARIO_DATOS[0].denominacionRazon,
          domicilio: MOCK_DESTINATARIO_DATOS[0].domicilio,
          pais: expect.any(String), // Índice convertido
          correo: MOCK_DESTINATARIO_DATOS[0].correo,
          paginaWeb: MOCK_DESTINATARIO_DATOS[0].paginaWeb,
          tipoMercancia: MOCK_DESTINATARIO_DATOS[0].tipoMercancia
        })
      );
    });

    it('debería manejar cuando no encuentra el país en el catálogo', () => {
      const FILA_CON_PAIS_INEXISTENTE = {
        ...MOCK_DESTINATARIO_DATOS[0],
        pais: 'País Inexistente'
      };
      component.listaFilaSeleccionadaMercancia = [FILA_CON_PAIS_INEXISTENTE];
      component.filaSeleccionadaMercancia = FILA_CON_PAIS_INEXISTENTE;
      
      component.modificarItemMercancia();
      
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalledWith(
        expect.objectContaining({
          pais: '0' // findIndex devuelve -1, +1 = 0
        })
      );
    });
  });

  // Pruebas para confirmEliminarMercanciaItem
  describe('confirmEliminarMercanciaItem', () => {
    beforeEach(() => {
      jest.spyOn(component, 'abrirElimninarConfirmationopup');
    });

    it('debería abrir popup de confirmación cuando hay filas seleccionadas', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_DESTINATARIO_DATOS[0]];
      
      component.confirmEliminarMercanciaItem();
      
      expect(component.abrirElimninarConfirmationopup).toHaveBeenCalled();
    });

    it('no debería hacer nada cuando no hay filas seleccionadas', () => {
      component.listaFilaSeleccionadaMercancia = [];
      
      component.confirmEliminarMercanciaItem();
      
      expect(component.abrirElimninarConfirmationopup).not.toHaveBeenCalled();
    });
  });

  // Pruebas para eliminarMercanciaItem
  describe('eliminarMercanciaItem', () => {
    beforeEach(() => {
      component.datosTablaDestinatario = [...MOCK_DESTINATARIO_DATOS];
      component.listaFilaSeleccionadaMercancia = [MOCK_DESTINATARIO_DATOS[0]];
      jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    });

    it('debería eliminar los items seleccionados de la tabla', () => {
      component.eliminarMercanciaItem();
      
      expect(component.datosTablaDestinatario.length).toBe(1);
      expect(component.datosTablaDestinatario[0]).toEqual(MOCK_DESTINATARIO_DATOS[1]);
    });

    it('debería actualizar el store con los datos filtrados', () => {
      component.eliminarMercanciaItem();
      
      expect(mockTramite300105Store.setDestinatarioTablaDatos).toHaveBeenCalledWith(
        component.datosTablaDestinatario
      );
    });

    it('debería limpiar la lista de filas seleccionadas', () => {
      component.eliminarMercanciaItem();
      
      expect(component.listaFilaSeleccionadaMercancia).toEqual([]);
    });

    it('debería cerrar el popup de confirmación', () => {
      component.eliminarMercanciaItem();
      
      expect(component.cerrarEliminarConfirmationPopup).toHaveBeenCalled();
    });

    it('debería eliminar múltiples items', () => {
      component.listaFilaSeleccionadaMercancia = MOCK_DESTINATARIO_DATOS;
      
      component.eliminarMercanciaItem();
      
      expect(component.datosTablaDestinatario.length).toBe(0);
    });
  });

  // Pruebas para métodos de popup
  describe('Métodos de gestión de popups', () => {
    describe('abrirMultipleSeleccionPopup', () => {
      it('debería configurar notificación y abrir popup cuando modificar está habilitado', () => {
        component.enableModficarBoton = true;
        
        component.abrirMultipleSeleccionPopup();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ERROR,
          modo: 'modal',
          titulo: 'Aviso',
          mensaje: 'Selecciona sólo un registro para modificar.',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        });
        expect(component.multipleSeleccionPopupAbierto).toBe(true);
      });

      it('no debería abrir popup cuando modificar está deshabilitado', () => {
        component.enableModficarBoton = false;
        
        component.abrirMultipleSeleccionPopup();
        
        expect(component.multipleSeleccionPopupAbierto).toBe(false);
      });
    });

    describe('cerrarMultipleSeleccionPopup', () => {
      it('debería cerrar el popup de selección múltiple', () => {
        component.cerrarMultipleSeleccionPopup();
        
        expect(component.multipleSeleccionPopupAbierto).toBe(false);
        expect(component.multipleSeleccionPopupCerrado).toBe(false);
      });
    });

    describe('abrirElimninarConfirmationopup', () => {
      it('debería configurar notificación y abrir popup de confirmación', () => {
        component.abrirElimninarConfirmationopup();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ERROR,
          modo: 'modal',
          titulo: 'Aviso',
          mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: 'Cancelar',
        });
        expect(component.confirmEliminarPopupAbierto).toBe(true);
      });
    });

    describe('cerrarEliminarConfirmationPopup', () => {
      it('debería cerrar el popup de confirmación de eliminación', () => {
        component.cerrarEliminarConfirmationPopup();
        
        expect(component.confirmEliminarPopupAbierto).toBe(false);
        expect(component.confirmEliminarPopupCerrado).toBe(false);
      });
    });
  });

  // Pruebas para alternarModalMercancia y mostrarFormularioMercanciaModal
  describe('Gestión de modal de mercancía', () => {
    describe('alternarModalMercancia', () => {
      it('debería alternar la visibilidad del modal', () => {
        const ESTADO_INICIAL = component.mostrarModalDatosMercancia;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(!ESTADO_INICIAL);
      });

      it('debería cambiar de false a true', () => {
        component.mostrarModalDatosMercancia = false;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(true);
      });

      it('debería cambiar de true a false', () => {
        component.mostrarModalDatosMercancia = true;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(false);
      });
    });

    describe('mostrarFormularioMercanciaModal', () => {
      beforeEach(() => {
        jest.spyOn(component, 'crearNuevoFormularioMercancia');
        jest.spyOn(component, 'alternarModalMercancia');
      });

      it('debería configurar modo de creación y mostrar modal', () => {
        component.mostrarFormularioMercanciaModal();
        
        expect(component.esOperacionDeActualizacion).toBe(false);
        expect(mockAutorizacionDeRayosXService.inicializaMercanciaDatosCatalogos).toHaveBeenCalled();
        expect(component.crearNuevoFormularioMercancia).toHaveBeenCalled();
        expect(component.alternarModalMercancia).toHaveBeenCalled();
      });
    });
  });

  // Pruebas para esControlInvalido
  describe('esControlInvalido', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería retornar true cuando el control es inválido y touched', () => {
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      const RESULTADO = component.esControlInvalido('denominacionRazon');
      
      expect(RESULTADO).toBe(true);
    });

    it('debería retornar true cuando el control es inválido y dirty', () => {
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('');
      CONTROL?.markAsDirty();
      
      const RESULTADO = component.esControlInvalido('denominacionRazon');
      
      expect(RESULTADO).toBe(true);
    });

    it('debería retornar false cuando el control es válido', () => {
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('Nombre válido');
      CONTROL?.markAsTouched();
      
      const RESULTADO = component.esControlInvalido('denominacionRazon');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería retornar false cuando el control es inválido pero no touched ni dirty', () => {
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('');
      
      const RESULTADO = component.esControlInvalido('denominacionRazon');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería retornar false cuando el control no existe', () => {
      const RESULTADO = component.esControlInvalido('controlInexistente');
      
      expect(RESULTADO).toBe(false);
    });
  });

  // Pruebas para enviarFormularioMercancia
  describe('enviarFormularioMercancia', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
      component.datosTablaDestinatario = [...MOCK_DESTINATARIO_DATOS];
      jest.spyOn(component, 'mostrarNotificacionRelacionMercancia');
      jest.spyOn(component, 'alternarModalMercancia');
    });

    it('debería marcar todos los controles como touched', () => {
      const MARK_ALL_AS_TOUCHED_SPY = jest.spyOn(component.formularioMercancia, 'markAllAsTouched');
      
      component.enviarFormularioMercancia();
      
      expect(MARK_ALL_AS_TOUCHED_SPY).toHaveBeenCalled();
    });

    it('debería retornar temprano si el formulario es inválido', () => {
      // Hacer el formulario inválido
      component.formularioMercancia.get('denominacionRazon')?.setValue('');
      
      component.enviarFormularioMercancia();
      
      expect(mockTramite300105Store.setDestinatarioTablaDatos).not.toHaveBeenCalled();
    });

    it('debería crear nuevo registro cuando no es actualización ni guardar', () => {
      // Llenar formulario válido
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Nueva Empresa',
        domicilio: 'Nueva Dirección',
        pais: 1,
        correo: 'nuevo@email.com',
        paginaWeb: 'www.nuevo.com',
        tipoMercancia: 1
      });
      component.esOperacionDeActualizacion = false;
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaDestinatario.length).toBe(3); // 2 originales + 1 nuevo
      expect(component.mostrarNotificacionRelacionMercancia).toHaveBeenCalled();
      expect(mockTramite300105Store.setDestinatarioTablaDatos).toHaveBeenCalled();
    });

    it('debería actualizar registro existente cuando es operación de actualización', () => {
      // Configurar para actualización
      component.esOperacionDeActualizacion = true;
      component.formularioMercancia.patchValue({
        id: 1,
        denominacionRazon: 'Empresa Actualizada',
        domicilio: 'Dirección Actualizada',
        pais: 1,
        correo: 'actualizado@email.com',
        paginaWeb: 'www.actualizado.com',
        tipoMercancia: 1
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaDestinatario[0].denominacionRazon).toBe('Empresa Actualizada');
      expect(component.datosTablaDestinatario.length).toBe(2); // No se agrega nuevo
    });

    it('debería resetear formulario y cerrar modal cuando isGuardar es true', () => {
      const RESET_SPY = jest.spyOn(component.formularioMercancia, 'reset');
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Test',
        domicilio: 'Test',
        pais: 1,
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 1
      });
      
      component.enviarFormularioMercancia(true);
      
      expect(RESET_SPY).toHaveBeenCalled();
      expect(component.alternarModalMercancia).toHaveBeenCalled();
      expect(component.mostrarNotificacionRelacionMercancia).not.toHaveBeenCalled();
    });

    it('debería convertir correctamente los índices de catálogos a descripciones', () => {
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Test',
        domicilio: 'Test',
        pais: 1, // Índice 1 = MOCK_PAIS[0]
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 2 // Índice 2 = MOCK_TIPO_MERCANCIA[1]
      });
      
      component.enviarFormularioMercancia(false);
      
      const NUEVO_REGISTRO = component.datosTablaDestinatario[component.datosTablaDestinatario.length - 1];
      expect(NUEVO_REGISTRO.pais).toBe('México'); // MOCK_PAIS[0].descripcion
      expect(NUEVO_REGISTRO.tipoMercancia).toBe('Textiles'); // MOCK_TIPO_MERCANCIA[1].descripcion
    });

    it('debería manejar índices fuera de rango en catálogos', () => {
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Test',
        domicilio: 'Test',
        pais: 999, // Índice fuera de rango
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 999 // Índice fuera de rango
      });
      
      component.enviarFormularioMercancia(false);
      
      const NUEVO_REGISTRO = component.datosTablaDestinatario[component.datosTablaDestinatario.length - 1];
      expect(NUEVO_REGISTRO.pais).toBe(''); // Valor por defecto cuando no encuentra
      expect(NUEVO_REGISTRO.tipoMercancia).toBe(''); // Valor por defecto cuando no encuentra
    });
  });

  // Pruebas para notificaciones de relación de mercancía
  describe('Notificaciones de relación de mercancía', () => {
    describe('mostrarNotificacionRelacionMercancia', () => {
      it('debería configurar notificación de éxito y abrir popup', () => {
        component.mostrarNotificacionRelacionMercancia();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.EXITO,
          modo: 'modal',
          titulo: '',
          mensaje: 'Relación agregada',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        });
        expect(component.relacionMercanciaPopupAbierto).toBe(true);
      });
    });

    describe('cerrarRelacionMercanciaPopup', () => {
      it('debería cerrar el popup de relación de mercancía', () => {
        component.cerrarRelacionMercanciaPopup();
        
        expect(component.relacionMercanciaPopupAbierto).toBe(false);
      });
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en notificadorDestruccion$', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalled();
    });

    it('debería llamar complete() en notificadorDestruccion$', () => {
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalledTimes(1);
      expect(COMPLETE_SPY).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      component.ngOnInit();
      
      expect(component.estadoSolicitud300105).toBeDefined();
      expect(component.datosTablaDestinatario).toEqual(MOCK_DESTINATARIO_DATOS);
      expect(component.botonesMovimientos).toEqual(MOCK_CROSSLIST_BOTONES);
    });

    it('debería manejar el flujo completo de agregar nuevo destinatario', () => {
      jest.spyOn(component, 'alternarModalMercancia');
      
      // Mostrar modal
      component.mostrarFormularioMercanciaModal();
      expect(component.mostrarModalDatosMercancia).toBe(true);
      expect(component.esOperacionDeActualizacion).toBe(false);
      
      // Llenar y enviar formulario
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Nueva Empresa',
        domicilio: 'Nueva Dirección',
        pais: 1,
        correo: 'nuevo@email.com',
        paginaWeb: 'www.nuevo.com',
        tipoMercancia: 1
      });
      
      const LONGITUD_INICIAL = component.datosTablaDestinatario.length;
      component.enviarFormularioMercancia(true);
      
      expect(component.datosTablaDestinatario.length).toBe(LONGITUD_INICIAL + 1);
      expect(component.alternarModalMercancia).toHaveBeenCalled();
    });

    it('debería manejar el flujo completo de modificar destinatario', () => {
      // Seleccionar fila
      component.manejarFilaSeleccionada([MOCK_DESTINATARIO_DATOS[0]]);
      expect(component.enableModficarBoton).toBe(true);
      
      // Modificar item
      component.modificarItemMercancia();
      expect(component.esOperacionDeActualizacion).toBe(true);
      
      // Actualizar y guardar
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Empresa Modificada'
      });
      component.enviarFormularioMercancia(true);
      
      expect(component.datosTablaDestinatario[0].denominacionRazon).toBe('Empresa Modificada');
    });

    it('debería manejar el flujo completo de eliminar destinatarios', () => {
      // Seleccionar filas
      component.manejarFilaSeleccionada(MOCK_DESTINATARIO_DATOS);
      expect(component.enableEliminarBoton).toBe(true);
      
      // Confirmar eliminación
      component.confirmEliminarMercanciaItem();
      expect(component.confirmEliminarPopupAbierto).toBe(true);
      
      // Ejecutar eliminación
      component.eliminarMercanciaItem();
      expect(component.datosTablaDestinatario.length).toBe(0);
      expect(mockTramite300105Store.setDestinatarioTablaDatos).toHaveBeenCalled();
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar observables que no emiten en constructor', () => {
      const EMPTY_SUBJECT = new Subject();
      mockConsultaioQuery.selectConsultaioState$ = EMPTY_SUBJECT.asObservable() as Observable<ConsultaioState>;
      
      expect(() => {
        const NEW_FIXTURE = TestBed.createComponent(DestinatariosComponent);
      }).not.toThrow();
    });

    it('debería manejar observables que no emiten en ngOnInit', () => {
      const EMPTY_SUBJECT = new Subject();
      mockTramite300105Query.selectTramite300105$ = EMPTY_SUBJECT.asObservable() as Observable<Tramite300105State>;
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar formulario undefined en esControlInvalido', () => {
      component.formularioMercancia = undefined as any;
      
      const RESULTADO = component.esControlInvalido('denominacionRazon');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería manejar datosTablaDestinatario vacío en enviarFormularioMercancia', () => {
      component.datosTablaDestinatario = [];
      component.crearNuevoFormularioMercancia();
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Test',
        domicilio: 'Test',
        pais: 1,
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 1
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaDestinatario.length).toBe(1);
      expect(component.datosTablaDestinatario[0].id).toBe(1); // 0 + 1
    });

    it('debería manejar catálogos vacíos en manejarCambioFraccionArancelaria', () => {
      mockAutorizacionDeRayosXService.fraccionArancelariaDescripcion = [];
      component.crearNuevoFormularioMercancia();
      
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1'
      };
      
      expect(() => component.manejarCambioFraccionArancelaria(EVENT_CATALOGO)).not.toThrow();
    });

    it('debería manejar filaSeleccionadaMercancia undefined en actualizarFilaSeleccionada', () => {
      component.filaSeleccionadaMercancia = undefined as any;
      component.datosTablaDestinatario = MOCK_DESTINATARIO_DATOS;
      
      expect(() => component.actualizarFilaSeleccionada()).not.toThrow();
    });

    it('debería manejar listaFilaSeleccionadaMercancia null en eliminarMercanciaItem', () => {
      component.listaFilaSeleccionadaMercancia = null as any;
      component.datosTablaDestinatario = MOCK_DESTINATARIO_DATOS;
      
      expect(() => component.eliminarMercanciaItem()).not.toThrow();
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const COMPILED = fixture.nativeElement;
      const TITULO = COMPILED.querySelector('ng-titulo');
      expect(TITULO).toBeTruthy();
    });

    it('debería renderizar el formulario principal', () => {
      const COMPILED = fixture.nativeElement;
      const FORM = COMPILED.querySelector('form[formGroup]');
      expect(FORM).toBeTruthy();
    });

    it('debería renderizar la tabla dinámica', () => {
      const COMPILED = fixture.nativeElement;
      const TABLA = COMPILED.querySelector('app-tabla-dinamica');
      expect(TABLA).toBeTruthy();
    });

    it('debería renderizar los botones de acción', () => {
      const COMPILED = fixture.nativeElement;
      const BOTONES = COMPILED.querySelectorAll('button');
      expect(BOTONES.length).toBeGreaterThan(0);
    });

    it('debería deshabilitar botones cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const BOTON_AGREGAR = COMPILED.querySelector('button[disabled]');
      expect(BOTON_AGREGAR).toBeTruthy();
    });

    it('debería mostrar el modal cuando mostrarModalDatosMercancia es true', () => {
      component.mostrarModalDatosMercancia = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MODAL = COMPILED.querySelector('app-modal');
      expect(MODAL).toBeTruthy();
    });

    it('no debería mostrar el modal cuando mostrarModalDatosMercancia es false', () => {
      component.mostrarModalDatosMercancia = false;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MODAL = COMPILED.querySelector('app-modal');
      expect(MODAL).toBeFalsy();
    });

    it('debería mostrar notificaciones cuando los popups están abiertos', () => {
      component.confirmEliminarPopupAbierto = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const NOTIFICACIONES = COMPILED.querySelectorAll('lib-notificaciones');
      expect(NOTIFICACIONES.length).toBeGreaterThan(0);
    });

    it('debería renderizar el formulario de mercancía en el modal', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const FORM_MERCANCIA = COMPILED.querySelector('form[formGroup] input[formControlName="denominacionRazon"]');
      expect(FORM_MERCANCIA).toBeTruthy();
    });

    it('debería aplicar clases de validación en campos inválidos', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      
      // Hacer campo inválido
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const INPUT_INVALIDO = COMPILED.querySelector('input.is-invalid');
      expect(INPUT_INVALIDO).toBeTruthy();
    });

    it('debería mostrar mensajes de error para campos inválidos', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      
      // Hacer campo inválido
      const CONTROL = component.formularioMercancia.get('denominacionRazon');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MENSAJE_ERROR = COMPILED.querySelector('.text-danger small');
      expect(MENSAJE_ERROR?.textContent?.trim()).toBe('Este campo es obligatorio.');
    });
  });

  // Pruebas de gestión de suscripciones
  describe('Gestión de suscripciones', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_CONSULTAIO_STATE));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: MOCK_PIPE
      } as any;
      
      const NEW_FIXTURE = TestBed.createComponent(DestinatariosComponent);
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE300105_STATE));
      mockTramite300105Query.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      component.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });

    it('debería cancelar todas las suscripciones al destruir', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalled();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });
  });

  // Pruebas de validación de formularios
  describe('Validación de formularios', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería validar campos requeridos', () => {
      const CAMPOS_REQUERIDOS = [
        'denominacionRazon', 'domicilio', 'pais', 'correo', 'paginaWeb', 'tipoMercancia'
      ];
      
      CAMPOS_REQUERIDOS.forEach(CAMPO => {
        const CONTROL = component.formularioMercancia.get(CAMPO);
        CONTROL?.setValue('');
        expect(CONTROL?.hasError('required')).toBe(true);
        
        CONTROL?.setValue('valor válido');
        expect(CONTROL?.hasError('required')).toBe(false);
      });
    });

    it('debería marcar el formulario como válido cuando todos los campos están completos', () => {
      component.formularioMercancia.patchValue({
        denominacionRazon: 'Empresa Test',
        domicilio: 'Dirección Test',
        pais: 'País Test',
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 'Mercancía Test'
      });
      
      expect(component.formularioMercancia.valid).toBeTruthy();
    });

    it('debería marcar el formulario como inválido cuando faltan campos requeridos', () => {
      component.formularioMercancia.patchValue({
        denominacionRazon: '', // Campo requerido vacío
        domicilio: 'Dirección Test',
        pais: 'País Test',
        correo: 'test@test.com',
        paginaWeb: 'www.test.com',
        tipoMercancia: 'Mercancía Test'
      });
      
      expect(component.formularioMercancia.valid).toBeFalsy();
    });
  });
});