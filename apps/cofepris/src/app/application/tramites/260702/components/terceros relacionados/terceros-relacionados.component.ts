// Angular Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Third-party libraries
import { map, takeUntil } from 'rxjs/operators';
import { Modal } from 'bootstrap';
import { ReplaySubject } from 'rxjs';

// Shared/Internal Libraries - @libs
import {
  AlertComponent,
  CatalogoSelectComponent,
  
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import{ConsultaioQuery} from '@ng-mf/data-access-user';
// Shared/Internal Libraries - @ng-mf
import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user';

// Components
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';

// Constants
import {
  TEXTOS,
  TIPO_PERSONA_RADIO_OPTIONS,
} from '../../constants/constantes.enum';
import { DESTINATARIO_CONFIGURACION_TABLA } from '../../constants/column-config.enum';

// Models
import { Destinatario } from '../../models/destinatario.model';

// Services
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';

// State Management
import {
  Solicitud260702State,
  Solicitud260702Store,
} from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

/**
 * Componente para gestionar los terceros relacionados en el trámite.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TercerosRelacionadosComponent,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    NotificacionesComponent,
    InputRadioComponent,
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosrelacionadosComponent implements OnInit, OnDestroy {
  /** Constantes de texto utilizadas en el componente */
  TEXTOS = TEXTOS;

  /** Formulario reactivo para gestionar los datos del destinatario */
  destinatarioForm!: FormGroup;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Conjunto de filas seleccionadas en la tabla */
  filasSeleccionadas: Set<number> = new Set();

  /** Fila seleccionada actualmente */
  selectedRow: Destinatario | null = null;

  /** Estado del destinatario que se está agregando */
  agregarDestinatarioState!: Solicitud260702State;

  /** Configuración para la selección de filas en la tabla */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Lista de destinatarios seleccionados */
  selectedDestinatario: Destinatario[] = [];

  /** Indica si el formulario es visible */
  esFormularioVisible = false;

  /** Datos del catálogo de países */
  public paisData: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Variable para almacenar el tipo de persona seleccionada (por ejemplo, 'fisica' o 'moral').
   */
  tipoPersonaSeleccionada: string = '';

  /**
   * Variable para almacenar el tipo de público.
   */
  tipoDePublicos: string = '';
  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOptions = TIPO_PERSONA_RADIO_OPTIONS;
  /**
   * Notificación actual que se mostrará en el componente.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Índice del elemento que se eliminará de la lista.
   */
  elementoParaEliminar!: number;
/** 
 * Conjunto de filas seleccionadas en la tabla de fabricantes.
 */
filasSeleccionadasFabricante: Set<number> = new Set();

/** 
 * Conjunto de filas seleccionadas en la tabla de destinatarios.
 */
filasSeleccionadasDestinatario: Set<number> = new Set();
  /**
   * Lista de pedimentos gestionados en el componente.
   */
  pedimentos: Array<Pedimento> = [];
  /** Datos de la tabla de destinatarios */
  tableData2: Destinatario[] = [];

  /** Configuración de las columnas de la tabla */
  destinatarioConfiguracionTabla = DESTINATARIO_CONFIGURACION_TABLA;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /** Datos de los pedimentos */
   tablaActual: string = '';

  /** Datos de los pedimentos */
   formTitle: string = ''; 

  /** Datos de los destinatarios para 260702 */
  destinatarioDatos: Destinatario[] = [];

  /** Datos de los fabricantes para 260702 */
  fabricanteDatos: Destinatario[] = [];
  

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param registrarsolicitudmcp Servicio para registrar solicitudes MCP.
   * @param solicitud260702Store Almacén de estado para el trámite 260702.
   * @param solicitud260702Query Consulta de estado para el trámite 260702.
   */
  constructor(
    private fb: FormBuilder,
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
    private solicitud260702Store: Solicitud260702Store,
    private solicitud260702Query: Solicitud260702Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.crearFormTransporte();
  }

  /**
   * Crea el formulario reactivo para gestionar los datos del destinatario.
   */
  crearFormTransporte(): void {
    this.destinatarioForm = this.fb.group({
      agregarDestinatario: this.fb.group({
        tipoPersona: [
          this.agregarDestinatarioState?.tipoPersona,
          Validators.required,
        ],
      }),
      datosPersonales: this.fb.group({
        nombre: [this.agregarDestinatarioState?.nombre, Validators.required],
        primerApellido: [
          this.agregarDestinatarioState?.primerApellido,
          Validators.required,
        ],
        segundoApellido: [
          this.agregarDestinatarioState?.segundoApellido,
          Validators.required,
        ],
        denominacion: [
          this.agregarDestinatarioState?.denominacion,
          Validators.required,
        ],
        pais: [this.agregarDestinatarioState?.pais, Validators.required],
        domicilio: [
          this.agregarDestinatarioState?.domicilio,
          Validators.required,
        ],
        estado: [this.agregarDestinatarioState?.estado, Validators.required],
        codigopostal: [
          this.agregarDestinatarioState?.codigopostal,
          Validators.required,
        ],
        calle: [this.agregarDestinatarioState?.calle, Validators.required],
        numeroExterior: [
          this.agregarDestinatarioState?.numeroExterior,
          Validators.required,
        ],
        numeroInterior: [
          this.agregarDestinatarioState?.numeroInterior,
          Validators.required,
        ],
        lada: [this.agregarDestinatarioState?.lada],
        telefono: [this.agregarDestinatarioState?.telefono],
        correoElectronico: [this.agregarDestinatarioState?.correoElectronico],
      }),
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.solicitud260702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
         map((seccionState) => {
          this.agregarDestinatarioState = seccionState;
          if (this.esFormularioSoloLectura && seccionState.tableData2) {
            this.tableData2 = [...seccionState.tableData2];
          } else if (seccionState.tableData2) {
            this.tableData2 = [...seccionState.tableData2];
          }
        })
      )
      .subscribe();
    this.crearFormTransporte();
    this.getPaisData();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.destinatarioForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.destinatarioForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Elimina un pedimento de la lista.
   * @param borrar Indica si se debe proceder con la eliminación.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
      this.eliminarMercancias(); // Call the deletion logic
      this.abrirModal(0, true);
    }
  }
  /**
   * Abre un modal para mostrar una notificación.
   * @param i Índice del elemento seleccionado (por defecto 0).
   * @param isDeleted Indica si se debe mostrar la notificación de éxito tras la eliminación.
   */
  abrirModal(i: number = 0, isDeleted: boolean = false): void {
    if (isDeleted) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'success',
        modo: 'action',
        titulo: '',
        mensaje: 'Datos eliminados correctamente',
        cerrar: true,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else if (this.filasSeleccionadas && this.filasSeleccionadas.size > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: '¿Confirma la eliminación?',
        cerrar: false,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.elementoParaEliminar = i;
    }
  }

  /**
   * Obtiene los datos del catálogo de países.
   */
  getPaisData(): void {
    this.registrarsolicitudmcp
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.paisData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Getter para obtener el tipo de persona seleccionado.
   */
  get selectedTipoPersona(): string | undefined {
    return this.agregarDestinatario.get('tipoPersona')?.value;
  }

  /**
   * Getter para obtener el formulario de agregar destinatario.
   */
  get agregarDestinatario(): FormGroup {
    return this.destinatarioForm.get('agregarDestinatario') as FormGroup;
  }

  /**
   * Guarda los datos del formulario en la tabla.
   */
onGuardar(): void {
  const FORM_DATA = this.destinatarioForm.value;

  /** Manejar únicamente las tablas de 'fabricante' y 'destinatario' */
  let targetTable: Destinatario[] = [];
  switch (this.tablaActual) {
    case 'fabricante':
      targetTable = this.fabricanteDatos;
      break;
    case 'destinatario':
      targetTable = this.destinatarioDatos;
      break;
    default:
      console.error('Invalid table selection');
      return;
  }

  /** Actualizar la fila existente si una fila está seleccionada */
  if (this.selectedRow) {
    const INDEX = targetTable.findIndex((row) => row.id === this.selectedRow?.id);
    if (INDEX !== -1) {
      const UPDATED_ROW = {
        ...targetTable[INDEX],
        ...FORM_DATA.agregarDestinatario,
        ...FORM_DATA.datosPersonales,
      };
      targetTable[INDEX] = UPDATED_ROW;

      if (this.tablaActual === 'fabricante') {
        this.fabricanteDatos = [...targetTable];
      } else if (this.tablaActual === 'destinatario') {
        this.destinatarioDatos = [...targetTable];
      }
    }
  } else {
    /** Agregar nueva fila si no se seleccionó ninguna fila */
    const NEW_ID =
      targetTable.length > 0
        ? Math.max(...targetTable.map((row) => row.id || 0)) + 1
        : 1;
    const NEW_ROW = {
      id: NEW_ID,
      ...FORM_DATA.agregarDestinatario,
      ...FORM_DATA.datosPersonales,
    };

    if (this.tablaActual === 'fabricante') {
      this.fabricanteDatos = [...this.fabricanteDatos, NEW_ROW];
    } else if (this.tablaActual === 'destinatario') {
      this.destinatarioDatos = [...this.destinatarioDatos, NEW_ROW];
    }
  }

  /** Restablecer el formulario y ocultarlo. */
  this.destinatarioForm.reset();
  this.esFormularioVisible = false;
  this.selectedRow = null;
}
  /**
   * Obtiene el nombre del país a partir de su ID.
   * @param paisId ID del país.
   * @returns Nombre del país o 'N/A' si no se encuentra.
   */
  private getPaisName(paisId: string): string {
    const PAIS_ENCONTRADO = this.paisData.catalogos.find(
      (catalogo) => catalogo.id === Number(paisId)
    );
    return PAIS_ENCONTRADO ? PAIS_ENCONTRADO.descripcion : 'N/A';
  }

  /**
   * Maneja el cambio de filas seleccionadas en la tabla.
   * @param filasSeleccionadas Filas seleccionadas.
   */
 enCambioDeFilasSeleccionadas(filasseleccionadas: Destinatario[], tableName: string): void {
  this.tablaActual = tableName;
  switch (tableName) {
    case 'fabricante':
      this.filasSeleccionadasFabricante = new Set(filasseleccionadas.map((row) => row.id));
      break;
    case 'destinatario':
      this.filasSeleccionadasDestinatario = new Set(filasseleccionadas.map((row) => row.id));
      break;
    default:
      console.error('Invalid table name. Only "fabricante" and "destinatario" are allowed.');
  }
}

  /**
 * Elimina la mercancía seleccionada de la tabla.
 */
eliminarMercancias(): void {
  let filasseleccionadas: Set<number>;

  /* Determinar las filas seleccionadas y la tabla objetivo según la tabla actual. */
  switch (this.tablaActual) {
    case 'fabricante':
      filasseleccionadas = this.filasSeleccionadasFabricante;
      this.fabricanteDatos = this.fabricanteDatos.filter(
        (row) => !filasseleccionadas.has(row.id)
      );
      break;
    case 'destinatario':
      filasseleccionadas = this.filasSeleccionadasDestinatario;
      this.destinatarioDatos = this.destinatarioDatos.filter(
        (row) => !filasseleccionadas.has(row.id)
      );
      break;
    default:
      console.error('Invalid table selection:', this.tablaActual);
      return;
  }

  /** Limpiar las filas seleccionadas */
  filasseleccionadas.clear();

  /** Mostrar una notificación de éxito */
  this.nuevaNotificacion = {
    tipoNotificacion: 'alert',
    categoria: 'success',
    modo: 'action',
    titulo: '',
    mensaje: 'Datos eliminados correctamente',
    cerrar: false,
    tiempoDeEspera: 0,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };
}
editingRowId: number | null = null;
  /**
   * Abre el formulario para modificar las mercancías seleccionadas.
   */
openModificarMercancias(): void {
  let filasseleccionadas: Set<number>;

  switch (this.tablaActual) {
    case 'fabricante':
      filasseleccionadas = this.filasSeleccionadasFabricante;
      break;
    case 'destinatario':
      filasseleccionadas = this.filasSeleccionadasDestinatario;
      break;
    default:
      console.error('Invalid table selection:', this.tablaActual);
      return;
  }

  if (filasseleccionadas.size === 1) {
    const SELECTED_ID = Array.from(filasseleccionadas)[0];
    const SELECTED_ROW_DATA = this.tablaActual === 'fabricante'
      ? this.fabricanteDatos.find((row) => row.id === SELECTED_ID)
      : this.destinatarioDatos.find((row) => row.id === SELECTED_ID);

    if (SELECTED_ROW_DATA) {
      this.destinatarioForm.patchValue({
        agregarDestinatario: {
          tipoPersona: SELECTED_ROW_DATA.tipoPersona,
        },
        datosPersonales: {
          nombre: SELECTED_ROW_DATA.nombre,
          primerApellido: SELECTED_ROW_DATA.primerApellido,
          segundoApellido: SELECTED_ROW_DATA.segundoApellido,
          denominacion: SELECTED_ROW_DATA.denominacion,
          pais: SELECTED_ROW_DATA.pais,
          domicilio: SELECTED_ROW_DATA.domicilio,
          estado: SELECTED_ROW_DATA.estado,
          codigopostal: SELECTED_ROW_DATA.codigopostal,
          calle: SELECTED_ROW_DATA.calle,
          numeroExterior: SELECTED_ROW_DATA.numeroExterior,
          numeroInterior: SELECTED_ROW_DATA.numeroInterior,
          lada: SELECTED_ROW_DATA.lada,
          telefono: SELECTED_ROW_DATA.telefono,
          correoElectronico: SELECTED_ROW_DATA.correoElectronico,
        },
      });

      this.selectedRow = SELECTED_ROW_DATA; 
      this.esFormularioVisible = true;
    } 
  } 
}
  /**
   * Abre el formulario para agregar nuevas mercancías.
   */
agregarMercancias(tableName: string, title: string): void {
  /* Validar el nombre de la tabla para permitir solo 'fabricante' y 'destinatario' */
  if (!['fabricante', 'destinatario'].includes(tableName)) {
    return;
  }

  /** Establecer la tabla actual y el título del formulario */
  this.tablaActual = tableName;
  this.formTitle = title;

  /** Restablecer el formulario y hacerlo visible */
  this.esFormularioVisible = true;
  this.destinatarioForm.reset();

  this.selectedRow = null; 
  
}

  /**
   * Cancela la visualización del formulario.
   */
  cancelarFormulario(): void {
    this.esFormularioVisible = false;
  }

  /**
   * Confirma la eliminación de las mercancías seleccionadas.
   */
  onConfirmarEliminacion(): void {
    this.eliminarMercancias();
    const MODAL_ELEMENT = document.getElementById('datoseliminadosModal');
    if (MODAL_ELEMENT) {
      const DATOS_ELIMINADOS_MODAL = new Modal(MODAL_ELEMENT);
      DATOS_ELIMINADOS_MODAL.show();
    }
    this.abrirModal();
  }

  /**
   * Limpia los datos del formulario.
   */
  limpiarFormulario(): void {
    this.destinatarioForm.reset();
  }

  /**
   * Maneja la acción de eliminación de las filas seleccionadas.
   * Si hay filas seleccionadas, abre un modal para confirmar la eliminación.
   */
/**
 * Elimina las filas seleccionadas de la tabla actual (fabricante o destinatario).
 */
enEliminado(tableName: string): void {
  this.tablaActual = tableName;

  let filasseleccionadas: Set<number>;
  switch (this.tablaActual) {
    case 'fabricante':
      filasseleccionadas = this.filasSeleccionadasFabricante;
      break;
    case 'destinatario':
      filasseleccionadas = this.filasSeleccionadasDestinatario;
      break;
    default:
      console.error('Invalid table selection:', this.tablaActual);
      return;
  }

  if (filasseleccionadas.size > 0) {
     

  this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: '¿Confirma la eliminación?',
        cerrar: false,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
       this.elementoParaEliminar = 0; 

  } else {
    console.warn('No rows selected for deletion.');
  }
}
  /**
   * Establece valores en el store a partir del formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud260702Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Establece el tipo de persona seleccionado.
   * @param value Valor seleccionado (cadena o número).
   */
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
