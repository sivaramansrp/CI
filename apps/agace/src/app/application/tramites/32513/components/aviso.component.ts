import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery, ConsultaioState, Notificacion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud32513Query } from '../estados/solicitud32513.query';
import { Solicitud32513State, Solicitud32513Store } from '../estados/solicitud32513.store';
import { SOLICITUD_32513_ENUM } from '../constantes/anexo'

@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
})
export class AvisoComponent {
  
  /**
   * Formulario reactivo utilizado para capturar los datos del aviso.
   * Se inicializa en el método ngOnInit.
   */
  avisoForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32513State;

  /**
   * Subject utilizado para destruir los observables al destruir el componente.
   * Evita fugas de memoria al usar operadores como takeUntil.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Etiqueta del archivo seleccionado.
   */
  elgirDeArchivo: string = SOLICITUD_32513_ENUM.ELGIR_DE_ARCHIVO;

  /**
   * Elemento de entrada de archivo HTML.
   *
   * @type {HTMLInputElement}
   */
  elgirArchivo!: HTMLInputElement;

  /**
   * Archivo de medicamentos seleccionado.
   */
  archivoMedicamentos: File | null = null;

  mostrarMensajeArchivoValido = false;
  mensajeArchivoValido = SOLICITUD_32513_ENUM.MESAJE_ARCHIVO;

  /**
   * Constructor del componente AvisoComponent.
   * Se encarga de inyectar los servicios y stores necesarios para la gestión del formulario
   * y los datos asociados a la solicitud 32513.
   */
  constructor(
    private fb: FormBuilder,
    public solicitud32513Store: Solicitud32513Store,
    public solicitud32513Query: Solicitud32513Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // Llamada para inicializar datos de catálogo al cargar el componente
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.solicitud32513Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.inicializarEstadoFormulario();
  }

  inicializarFormulario(): void {
    this.avisoForm = this.fb.group({
      descripcionMercancia: [this.solicitudState?.descripcionMercancia, Validators.required],
      porcentajeDesperdicio: [this.solicitudState?.porcentajeDesperdicio, Validators.required],
    });
  }

  /**
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura.
  * 
  * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
  * En caso contrario, habilita los controles del formulario
  * 
  * @returns {void}
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.avisoForm?.disable();
    } else {
      this.avisoForm?.enable();
    }
  }

  /**
   * Método para cargar un archivo de proveedores.
   * Valida que el archivo sea de formato Excel (.xls o .xlsx) y verifica el número de columnas.
   * Si el archivo es válido, muestra un modal de confirmación; de lo contrario, muestra un modal de error.
   */
  cargarProveedores(): void {
    const FILE_INPUT = document.getElementById('archivoMedicamentos') as HTMLInputElement;
    const FILE = FILE_INPUT?.files?.[0];
    if (FILE) {
      const EXT_FILE = FILE.name.toLowerCase().endsWith('.xlsx');
      if (EXT_FILE) {
        this.mostrarMensajeArchivoValido = true;
      } else {
        this.mostrarMensajeArchivoValido = false;
      }
    }
  }

  /**
   * Maneja el cambio de archivo en el input de archivo.
   *
   * @param event Evento de cambio de archivo.
   *
   * @returns {void}
   */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.files && TARGET.files.length > 0) {
      this.archivoMedicamentos = TARGET.files[0];
      this.elgirDeArchivo = this.archivoMedicamentos.name;
    } else {
      this.elgirDeArchivo = this.elgirArchivo?.value;
    }
  }

  /**
   * Activa la selección del archivo de medicamentos.
   * @returns {void}
   */
  activarSeleccionArchivo(): void {
    this.elgirArchivo = document.getElementById(
      'archivoMedicamentos'
    ) as HTMLInputElement;
    if (this.elgirArchivo) {
      this.elgirArchivo.click();
    }
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param {string} id El nombre del control del formulario.
   * @returns {boolean} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(id: string): boolean {
    const CONTROL = this.avisoForm.get(id);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario del cual se obtiene el valor.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud32513Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud32513Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   *
   * Se ejecuta automáticamente cuando el componente se destruye.
   *
   * - Emite un valor al `destroyNotifier$` para cancelar todas las suscripciones activas.
   * - Libera recursos y evita fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
