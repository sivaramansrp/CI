import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx'; // Importa XLSX para leer archivos Excel
import {
  AlertComponent,
  InputCheckComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  TituloComponent,
  VALID_FILE_REGEX,
} from '@libs/shared/data-access-user/src';
import { SOLICITUD_32201_ENUM } from '../../constantes/anexo';
import { Tramite32201Query } from '../../estados/tramite32201.query';
import { Solicitud32201State, Tramite32201Store } from '../../estados/tramite32201.store';

/**
 * Componente que representa la funcionalidad de la solicitud del trámite 32201.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    AlertComponent,
    InputCheckComponent,
    NotificacionesComponent
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /**
   * Formulario reactivo para datos.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32201State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = SOLICITUD_32201_ENUM;

  /**
   * Etiqueta del archivo seleccionado.
   */
  elgirDeArchivo: string = this.TEXTOS.ELGIR_DE_ARCHIVO;

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

  /**
   * Evento de salida que emite cuando se hace clic en el botón continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Representa una confirmar instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public confirmarNotificacion!: Notificacion;

  /**
   * Representa una error instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public errorNotificacion!: Notificacion;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite32201Store - Store para manejar el estado del trámite.
   * @param tramite32201Query - Query para obtener datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite32201Store: Tramite32201Store,
    private tramite32201Query: Tramite32201Query
  ) {
    // Constructor no vacío para evitar el error de ESLint.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit(): void {
    this.tramite32201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Inicializa el formulario reactivo con los valores del estado.
    this.solicitudForm = this.fb.group({
      regimen_0: [this.solicitudState?.regimen_0],
      regimen_1: [this.solicitudState?.regimen_1],
      regimen_2: [this.solicitudState?.regimen_2],
      regimen_3: [this.solicitudState?.regimen_3],
      manifiesto: [this.solicitudState?.manifiesto],
    });
  }

  /**
   * Método para cargar un archivo de proveedores.
   * Valida que el archivo sea de formato Excel (.xls o .xlsx) y verifica el número de columnas.
   * Si el archivo es válido, muestra un modal de confirmación; de lo contrario, muestra un modal de error.
   */
  cargarProveedores(): void {
    const FILE_INPUT = document.getElementById(
      'cargarProveedores'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      if (VALID_FILE_REGEX.test(FILE.name)) {
        const READER = new FileReader();
        READER.onload = (e): void => {
          const DATA = new Uint8Array(e.target?.result as ArrayBuffer);
          const WORKBOOK = XLSX.read(DATA, { type: 'array' });
          const JSON_DATA = XLSX.utils.sheet_to_json(
            WORKBOOK.Sheets[WORKBOOK.SheetNames[0]],
            { header: 1 }
          );

          const EXPECTED_COLUMNS = 5;  // Agregue aquí el número requerido de columnas o lógica 
          const FIRST_ROW = JSON_DATA[0] as string[];
          if (FIRST_ROW.length === EXPECTED_COLUMNS) {
            this.confirmarModal(); // Abre el modal de confirmación
          } else {
            this.errorModal(); // Abre el modal de error
          }
        };

        READER.readAsArrayBuffer(FILE);
      }
    }
  }

  public confirmarModal(): void {
    this.confirmarNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Los registros se realizaron correctamente',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  public errorModal(): void {
    this.errorNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Mensajes',
      mensaje: 'El número de columnas del archivo es incorrecto',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * Activa la selección del archivo de medicamentos.
   * @returns {void}
   */
  activarSeleccionArchivo(): void {
    this.elgirArchivo = document.getElementById('archivoMedicamentos') as HTMLInputElement;
    if (this.elgirArchivo) {
      this.elgirArchivo.click();
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
   * Emite el evento continuar.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  guardar(): void {
    // updateOtrosTablaDatos([this.agregarDatosForm.value]);
    // this.tramite32201Store.setSolicitud(this.solicitudForm.value);
    // this.tramite32201Store.setMedicamentos(this.archivoMedicamentos);
    // this.tramite32201Store.setManifiesto(this.solicitudForm.value.manifiesto);
      
  }

  /**
   * Establece el valor de un campo en el store de Tramite32201.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32201Store
  ): void {
    const FIELD_VALUE = form.get(campo)?.value;
    (this.tramite32201Store[metodoNombre] as (value: unknown) => void)(FIELD_VALUE);
  }
}
