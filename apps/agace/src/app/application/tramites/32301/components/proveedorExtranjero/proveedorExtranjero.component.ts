import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  NotificacionesComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { PROVEEDORES } from '../../enums/proveedorExtranjero.enum';
import { ProveedorExtranjero } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
/**
 * Componente para manejar la carga y gestión de proveedores extranjeros.
 * Este componente incluye un formulario reactivo para la carga de archivos y registros de proveedores.
 */
@Component({
  selector: 'app-proveedor-extranjero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    NotificacionesComponent,
  ],
  templateUrl: './proveedorExtranjero.component.html',
})
export class ProveedorExtranjeroComponent implements OnInit, OnDestroy {
  /** Título de la sección de proveedores existentes */
  seccionProveedoresExistentes: string = 'Sección de Proveedores Existentes';

  /** Título dinámico basado en el tipo de proveedor */
  ProveedoresTitulo!: string;

  /**
   * Declaración de la variable proveedores con el tipo de PROVEEDORES.
   * Se utiliza para almacenar y gestionar la lista de proveedores dentro del sistema.
   */
  proveedores!: typeof PROVEEDORES;

  /** Formulario reactivo para la carga de proveedores extranjeros */
  proveedorXtranjForm!: FormGroup;

  /** Datos del proveedor extranjero obtenidos desde el store */
  proveedorExtranjero!: ProveedorExtranjero;

  /** Tipo de proveedor, se recibe como input */
  @Input() proveedortype!: string;

  /** Objeto que maneja el ciclo de vida de los componentes, se usa para la destrucción de observables */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Declaración de la variable cargaExtranjeroNotificacion de tipo Notificacion.
   * Se utiliza para gestionar notificaciones relacionadas con la carga de datos de extranjeros.
   */
  public cargaExtranjeroNotificacion!: Notificacion;

  /**
   * Constructor del componente, inyecta las dependencias necesarias
   * @param fb - FormBuilder para la creación de formularios reactivos
   * @param store - Store para manejar el estado de los proveedores
   * @param Tramite32301Query - Query para obtener los datos del estado
   */
  constructor(
    private fb: FormBuilder,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query
  ) {
    //constructor
  }

  /**
   * Inicializa el componente, configura el título y el formulario reactivo,
   * y suscribe a los cambios en el estado del store.
   */
  ngOnInit(): void {
    this.ProveedoresTitulo =
      this.proveedortype === 'extranjero'
        ? 'Aviso de modificaciones de clientes y proveedores extranjeros'
        : 'Aviso de modificaciones de clientes y proveedores nacionales';

    this.inicializaProveedorExtranjer();

    // Suscripción a los cambios del estado del proveedor extranjero
    this.Tramite32301Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.proveedorExtranjero = state as unknown as ProveedorExtranjero;
        this.crearFormProveedorExtranjer();
      });
  }

  /**
   * Inicializa el estado del proveedor extranjero en el store.
   */
  inicializaProveedorExtranjer(): void {
    this.store.setRegistrosProveedoresExtranjeros({
      archivoExtranjero: [],
      registrosProveedoresExtranjeros: '0',
    });
  }

  /**
   * Crea el formulario reactivo para el proveedor extranjero con los datos del store.
   */
  crearFormProveedorExtranjer(): void {
    this.proveedorXtranjForm = this.fb.group({
      archivoExtranjero: [
        this.proveedorExtranjero?.archivoExtranjero,
        Validators.required,
      ],
      registrosProveedoresExtranjeros: [
        {
          value: this.proveedorExtranjero?.registrosProveedoresExtranjeros,
          disabled: true,
        },
      ],
    });
  }

  /**
   * Validador estático para asegurar que el archivo seleccionado es de tipo .xlsx.
   * @param control - Control del formulario
   * @returns Un objeto de error si el archivo no es válido, o null si es válido.
   */
  static fileValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const FILE = control.value;
    if (FILE && FILE.name.endsWith('.xlsx')) {
      return null; // El archivo es válido
    }
    return { invalidFileType: true }; // El archivo es inválido
  }

  /**
   * Maneja la selección de un archivo. Si se selecciona un archivo, lo agrega al formulario.
   * Si no se selecciona un archivo, abre el modal de carga.
   * @param event - Evento de selección de archivo
   */
  onFileSelected(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILET = INPUT?.files?.[0];

    if (FILET) {
      this.proveedorXtranjForm.patchValue({ archivoExtranjero: FILET });
      this.proveedorXtranjForm
        .get('archivoExtranjero')
        ?.updateValueAndValidity();
    } else {
      this.openCargaExtranjeroModel();
    }
  }

  /**
   * Carga el archivo a través de Ajax si el formulario es válido. Si no es válido, muestra el modal.
   */
  cargarArchivoAjax(): void {
    if (this.proveedorXtranjForm.valid) {
      this.store.setRegistrosProveedoresExtranjeros(
        this.proveedorXtranjForm.value
      );
    } else {
      this.openCargaExtranjeroModel();
    }
  }

  /**
   * Se llama cuando el componente es destruido para limpiar los recursos.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Abre el modal de carga de proveedores extranjeros.
   */
  openCargaExtranjeroModel(): void {
    this.cargaExtranjeroNotificacion = {
      /**
       * Tipo de notificación: alerta.
       */
      tipoNotificacion: 'alert',

      /**
       * Categoría de la notificación: peligro (danger).
       */
      categoria: 'success',

      /**
       * Modo de la notificación: acción requerida.
       */
      modo: 'action',

      /**
       * Título de la notificación (actualmente vacío).
       */
      titulo: '',

      /**
       * Mensaje de la notificación, indicando que El archivo debe contener almenos un registro.
       */
      mensaje: 'El archivo debe contener almenos un registro.',

      /**
       * Indica si la notificación debe cerrarse automáticamente (false = no se cerrará).
       */
      cerrar: false,

      /**
       * Tiempo de espera antes de cerrar la notificación (2000 milisegundos).
       */
      tiempoDeEspera: 2000,

      /**
       * Texto del botón de aceptación en la notificación.
       */
      txtBtnAceptar: 'Aceptar',

      /**
       * Texto del botón de cancelación en la notificación (actualmente vacío).
       */
      txtBtnCancelar: '',
    };
  }
}
