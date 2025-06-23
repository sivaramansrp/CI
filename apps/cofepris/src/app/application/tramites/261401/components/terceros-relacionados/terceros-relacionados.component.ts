/**
 * Importaciones necesarias para el componente de terceros relacionados.
 * Incluye módulos y servicios para gestionar la tabla dinámica de destinatarios relacionados.
 */
import { AlertComponent, Catalogo, CatalogosSelect, Notificacion, REGEX_CORREO_ELECTRONICO, REGEX_NOMBRE, REGEX_TELEFONO_DIGITOS, TablaDinamicaComponent, TipoPersona, TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud261401State, Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DESTINATARIO_ENCABEZADO_DE_TABLA } from '../../enums/destinatario.enum';
import { Destinatario } from '../../enums/destinatario.enum';
import { MENSAJE_TABLA_OBLIGATORIA } from '../../../../shared/models/terceros-relacionados.model';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';
import { Subject } from 'rxjs';
import { TIPO_PERSONA_RADIO_OPTIONS } from '../../constants/constantes.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente que representa la sección de terceros relacionados.
 * Este componente es standalone y utiliza CommonModule, AlertComponent, TituloComponent y TablaDinamicaComponent.
 * Gestiona la tabla dinámica de destinatarios relacionados y actualiza el estado del store.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Mensaje de alerta obligatorio para la tabla.
   */
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * Tipo de alerta que se muestra en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Configuración de las columnas de la tabla de destinatarios finales.
   */
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] = DESTINATARIO_ENCABEZADO_DE_TABLA;

  /**
   * Tipo de selección utilizado en la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de destinatarios obtenidos.
   */
  destinatarioDatos: Destinatario[] = [];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Conjunto de IDs de las filas seleccionadas en la tabla dinámica.
   */
  selectedRows: Set<number> = new Set();
  /**
   * Formulario reactivo para gestionar la información de los destinatarios.
   */
  destinatarioForm!: FormGroup;
  /**
   * Estado actual de la solicitud para agregar destinatarios.
   */
  agregarDestinatarioState!: Solicitud261401State;
    /**
     * Configuración para el selector de países.
     */
    public paisData: CatalogosSelect = {
    /**
     * Etiqueta para el selector de países.
     */
    labelNombre: 'Pais',
    /**
     * Indica si el selector de países es un campo requerido.
     */
    required: true,
    /**
     * Texto de la primera opción mostrada en el selector.
     */
    primerOpcion: 'Selecciona un medio de transporte',
    /**
     * Array de catálogos (países) para el selector.
     */
    catalogos: [],
  };
  /**
   * Datos que se muestran en la tabla dinámica de destinatarios.
   */
  tableData: Destinatario[] = [];
  /**
   * Opciones para el selector de tipo de persona (física o moral).
   */
  tipoPersonaRadioOptions = TIPO_PERSONA_RADIO_OPTIONS;
  /**
   * Variable para almacenar el tipo de público seleccionado.
   */
  tipoDePublicos: string = '';
  /**
   * Variable para almacenar el tipo de persona seleccionado.
   */
  tipoPersonaSeleccionada: string = '';
  /**
   * Booleano que indica si el formulario para agregar/modificar destinatarios es visible.
   */
  esFormularioVisible = false;
  /**
   * Objeto para configurar las notificaciones mostradas al usuario.
   */
  public nuevaNotificacion!: Notificacion;
    /**
     * ID del elemento que se va a eliminar.
     */
  elementoParaEliminar!: number;

   /**
   * Enum expuesto al template para comparar el tipo de persona seleccionado (física o moral)
   * sin necesidad de hardcodear los valores en la vista.
   */
  public TipoPersonaEnum = TipoPersona;
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param solicitudDatosService Servicio para obtener los datos de los destinatarios.
   * @param tramite261401Store Store para gestionar el estado del trámite.
   * @param tramite261401Query Query para obtener datos del estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    public solicitudDatosService: SolicitudModificacionPermisoSalidaTerritorioService,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene la lista de destinatarios relacionados.
   */
  ngOnInit(): void {
    

    this.crearFormTransporte();
    this.getPaisData();
    this.obtenerDestinatarioListo();
  }

  /**
   * Obtiene la lista de destinatarios desde el servicio y actualiza el estado del store.
   */
  obtenerDestinatarioListo(): void {
    this.solicitudDatosService
      .obtenerDestinatarioListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Destinatario[]) => {
          this.destinatarioDatos = respuesta;
          this.tramite261401Store.setDestinatarioDatos(respuesta);
        },
      });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del destinatario.
   * Inicializa los controles del formulario con los valores actuales del estado
   * y aplica las validaciones necesarias para cada campo.
   * 
   * Los campos incluyen tipo de persona, nombre, apellidos, denominación, país,
   * domicilio, estado, código postal, calle, número exterior/interior, lada,
   * teléfono y correo electrónico.
   */
   crearFormTransporte(): void {
    this.obtenerEstadoSolicitud();
    this.destinatarioForm = this.fb.group({
     
        tipoPersona: [
          this.agregarDestinatarioState?.tipoPersona,
          Validators.required,
        ],
    
        nombre: [this.agregarDestinatarioState?.nombre, [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
        primerApellido: [
          this.agregarDestinatarioState?.primerApellido,
          [Validators.required, Validators.pattern(REGEX_NOMBRE)]
        ],
        segundoApellido: [
          this.agregarDestinatarioState?.segundoApellido,
          [Validators.pattern(REGEX_NOMBRE)]
        ],
        denominacion: [
          this.agregarDestinatarioState?.denominacion,
          [Validators.required, Validators.pattern(REGEX_NOMBRE)],
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
        telefono: [this.agregarDestinatarioState?.telefono, [Validators.pattern(REGEX_TELEFONO_DIGITOS)]],
        correoElectronico: [this.agregarDestinatarioState?.correoElectronico,[Validators.pattern(REGEX_CORREO_ELECTRONICO)]],
      })
      

  }    
  
  /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
      this.crearFormTransporte();
  }
  /**
   * Suscribe al observable `selectSolicitud$` del query para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
   this.tramite261401Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.agregarDestinatarioState = seccionState;
        })
      )
     
  }
    /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.crearFormTransporte();
}
   /**
   * Guarda los datos del formulario en la tabla.
   */
  onGuardar() :void{
    const FORM_DATA = this.destinatarioForm.value;
    if (FORM_DATA.agregarDestinatario) {
      const DESTINARIO = {
        ...FORM_DATA.agregarDestinatario,
        ...FORM_DATA.datosPersonales, // Combina objetos anidados en una estructura plana
        pais: this.getPaisName(FORM_DATA.datosPersonales.pais), // Mapea el id de `pais` a su descripción
      };
      this.tableData.push(DESTINARIO);
    }
    this.destinatarioForm.reset();
  }

  /**
   * Obtiene el nombre del país a partir de su ID.
   * @param paisId ID del país.
   * @returns Nombre del país o 'N/A' si no se encuentra.
   */
  private getPaisName(paisId: string): string {
    const PAIS = this.paisData.catalogos.find(
      (catalogo) => catalogo.id === Number(paisId)
    );
    return PAIS ? PAIS.descripcion : 'N/A';
  }


  /**
   * Obtiene los datos del catálogo de países.
   */
  getPaisData() :void{
    this.solicitudDatosService
      .getPaisData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.paisData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Establece el tipo de persona seleccionado.
   * Valor seleccionado (cadena o número).
   */
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }

    /**
   * Cancela la visualización del formulario y lo oculta.
   */
  cancelarFormulario(): void {
    this.esFormularioVisible = false;
  }

  /**
   * Limpia todos los campos del formulario de destinatario.
   */
  limpiarFormulario(): void {
    this.destinatarioForm.reset();
  }
   /**
   * Getter para obtener el tipo de persona seleccionado.
   */
  get selectedTipoPersona(): string | null{
    return this.destinatarioForm.get('tipoPersona')?.value;
  }
  /**
   * Getter para obtener el formulario de agregar destinatario.
   */
  get agregarDestinatario(): FormGroup {
    return this.destinatarioForm.get('agregarDestinatario') as FormGroup;
  }

  /**
   * Maneja el cambio de filas seleccionadas en la tabla.
   * @param selectedRows Filas seleccionadas.
   */
  onSelectedRowsChange(selectedRows: Destinatario[]): void {
    this.selectedRows = new Set(selectedRows.map((row) => row.id));
    this.esFormularioVisible = false;
  }
   /**
   * Abre el formulario para modificar las mercancías seleccionadas.
   */
  openModificarMercancias(): void {
    if (this.selectedRows.size === 1) {
      const SELECTED_ID = Array.from(this.selectedRows)[0];
      const SELECTED_ROW_DATA = this.tableData.find(
        (row) => row.id === SELECTED_ID
      );

      if (SELECTED_ROW_DATA) {
        this.destinatarioForm.patchValue({
            tipoPersona: SELECTED_ROW_DATA.tipoPersona,
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
        
        });

        this.esFormularioVisible = true;
      }
    }
  }

    /**
   * Maneja la acción de eliminación de las filas seleccionadas.
   * Si hay filas seleccionadas, abre un modal para confirmar la eliminación.
   */
  onEliminar(): void {
    if (this.selectedRows.size > 0) {
      this.abrirModal();
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
        cerrar: false,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else if (this.selectedRows && this.selectedRows.size > 0) {
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
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.destinatarioForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

    /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite261401Store.actualizarEstado({ [campo]: VALOR });
    
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}