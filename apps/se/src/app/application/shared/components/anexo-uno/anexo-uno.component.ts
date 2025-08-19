import { AlertComponent, Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import {
  AnexoDosConfiguartion,
  AnexoDosEncabezado,
  AnexoUnoConfiguartion,
  AnexoUnoEncabezado,
  RutaNombre,
} from '../../models/nuevo-programa-industrial.model';
import { Component, OnInit } from '@angular/core';
import { ANEXO_UNO_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo-uno',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  templateUrl: './anexo-uno.component.html',
  styleUrl: './anexo-uno.component.scss',
})
export class AnexoUnoComponent implements OnInit {
  public anexoUnoAlerta = ANEXO_UNO_ALERTA;
  public anexoUnoFormGroup!: FormGroup;
  public anexoDosFormGroup!: FormGroup;

  /**
   * Configuración de Anexo 1 y 3
   */
  @Input() anexoConfiguartion!: AnexoUnoConfiguartion<AnexoUnoEncabezado>;
  /**
   * Configuración de Anexo 1 y 3
   */
  @Input()
  anexoDosConfiguartion!: AnexoDosConfiguartion<AnexoDosEncabezado>;
  /**
   * Lista de tabla del Anexo Tres
   */
  @Input() anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
   * Lista de tabla del Anexo Dos
   */
  @Input() anexoDosTablaLista: AnexoDosEncabezado[] = [];

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Evento para devolver la llamada del Anexo Uno
   */
  @Output() obtenerAnexoUnoDevolverLaLlamada: EventEmitter<
    AnexoUnoEncabezado[]
  > = new EventEmitter<AnexoUnoEncabezado[]>(true);

  /**
   * Evento para devolver la llamada del Anexo Dos
   */
  @Output() obtenerAnexoDosDevolverLaLlamada: EventEmitter<
    AnexoDosEncabezado[]
  > = new EventEmitter<AnexoDosEncabezado[]>(true);

  /**
   * Evento para emitir la ruta de la fracción de complemento
   * @property {EventEmitter<RutaNombre>} rutaLaFraccionDeComplemento
   */
  @Output() rutaLaFraccionDeComplemento: EventEmitter<RutaNombre> =
    new EventEmitter<RutaNombre>();

  /**
   * Datos seleccionados de importación
   * @property {AnexoDosEncabezado | AnexoUnoEncabezado} datosImportacionSeleccionados
   */
  public datosImportacionSeleccionados!:
    | AnexoDosEncabezado
    | AnexoUnoEncabezado;

  /**
   * Datos seleccionados de exportación
   * @property {AnexoDosEncabezado | AnexoUnoEncabezado} datosExportacionSeleccionados
   */
  public datosExportacionSeleccionados!:
    | AnexoDosEncabezado
    | AnexoUnoEncabezado;

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaDosNotificacion!: Notificacion;

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaUnoNotificacion!: Notificacion;

  /**
   * Constructor de la clase AnexoUnoComponent
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos
   */
  constructor(private fb: FormBuilder) {
    this.crearFormularioAnexoUno();
    this.crearFormularioAnexoDos();
  }

    /**
   * Abre un modal con una notificación configurada para confirmar una acción de eliminación.
   * 
   * Este método inicializa un objeto de notificación con los siguientes parámetros:
   * - `tipoNotificacion`: Define el tipo de notificación como "alerta".
   * - `categoria`: Establece la categoría de la notificación como "peligro".
   * - `modo`: Configura el modo de la notificación como "acción".
   * - `titulo`: Campo para el título de la notificación (vacío por defecto).
   * - `mensaje`: Mensaje que se muestra en la notificación, en este caso,
   *   pregunta si el usuario está seguro de que desea eliminar.
   * - `cerrar`: Indica si la notificación puede cerrarse manualmente (true).
   * - `tiempoDeEspera`: Tiempo en milisegundos antes de que la notificación desaparezca automáticamente (2000 ms).
   * - `txtBtnAceptar`: Texto del botón de aceptación ("Aceptar").
   * - `txtBtnCancelar`: Texto del botón de cancelación (vacío por defecto).
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  abrirUnoModal(): void {
    this.nuevaUnoNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        '¿Estás seguro de que deseas eliminar?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
  /**
   * Abre un modal con una notificación configurada para confirmar una acción de eliminación.
   * 
   * Este método inicializa un objeto de notificación con los siguientes parámetros:
   * - `tipoNotificacion`: Define el tipo de notificación como "alerta".
   * - `categoria`: Establece la categoría de la notificación como "peligro".
   * - `modo`: Configura el modo de la notificación como "acción".
   * - `titulo`: Campo para el título de la notificación (vacío por defecto).
   * - `mensaje`: Mensaje que se muestra en la notificación, en este caso,
   *   pregunta si el usuario está seguro de que desea eliminar.
   * - `cerrar`: Indica si la notificación puede cerrarse manualmente (true).
   * - `tiempoDeEspera`: Tiempo en milisegundos antes de que la notificación desaparezca automáticamente (2000 ms).
   * - `txtBtnAceptar`: Texto del botón de aceptación ("Aceptar").
   * - `txtBtnCancelar`: Texto del botón de cancelación (vacío por defecto).
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  abrirDosModal(): void {
    this.nuevaDosNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        '¿Estás seguro de que deseas eliminar?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
  
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * deshabilita los grupos de formularios `anexoUnoFormGroup` y `anexoDosFormGroup`.
   */
  ngOnInit(): void {
        if (this.formularioDeshabilitado) {
      this.anexoUnoFormGroup.disable();
      this.anexoDosFormGroup.disable();
    }
  }

  /**
   * Crea el formulario del Anexo Uno
   * @returns {void}
   */
  crearFormularioAnexoUno(): void {
    this.anexoUnoFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
   * Crea el formulario del Anexo Uno
   */
  crearFormularioAnexoDos(): void {
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }
  /**
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoUno(): void {
    this.anexoUnoTablaLista = this.anexoUnoTablaLista.filter((idx) => {
      return idx !== this.datosImportacionSeleccionados;
    });
    this.obtenerAnexoUnoDevolverLaLlamada.emit(this.anexoUnoTablaLista);
  }

  /**
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoDos(): void {
    this.anexoDosTablaLista = this.anexoDosTablaLista.filter((idx) => {
      return idx !== this.datosExportacionSeleccionados;
    });
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Uno
   */
  agregarAnexoUno(): void {
    if (this.anexoUnoFormGroup.invalid) {
      this.anexoUnoFormGroup.markAllAsTouched();
      return;
    }

    const OBJECTO_IDX: AnexoUnoEncabezado = {
      encabezadoFraccion: this.anexoUnoFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcionComercial:
        this.anexoUnoFormGroup.get('descripcion')?.value,
      estatus: false,
      encabezadoFraccionArancelaria: '',
      encabezadoAnexoII: '',
      encabezadoTipo: '',
      encabezadoUmt: '',
      encabezadoCategoria: '',
      encabezadoValorEnMercado: '',
    };
    
    // Reinicia el formulario después de agregar el objeto
    // this.anexoUnoTablaLista.push(OBJECTO_IDX);
    this.anexoUnoTablaLista = [...this.anexoUnoTablaLista, OBJECTO_IDX];
    this.obtenerAnexoUnoDevolverLaLlamada.emit(this.anexoUnoTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Dos
   */
  agregarAnexoDos(): void {
    if (this.anexoDosFormGroup.invalid) {
      this.anexoDosFormGroup.markAllAsTouched();
      return;
    }

    const OBJECTO_IDX: AnexoDosEncabezado = {
      encabezadoFraccion: this.anexoDosFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcionComercial:
        this.anexoDosFormGroup.get('descripcion')?.value,
      encabezadoFraccionExportacion: '',
      encabezadoFraccionImportacion: '',
      estatus: false,
    };
    this.anexoDosFormGroup.reset();
    // Reinicia el formulario después de agregar el objeto
    // this.anexoDosTablaLista.push(OBJECTO_IDX);
    this.anexoDosTablaLista = [...this.anexoDosTablaLista, OBJECTO_IDX];
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Establece la lista de Anexo Uno y emite un evento con la lista seleccionada.
   *
   * @param {AnexoUnoEncabezado[]} event - La lista de encabezados de Anexo Uno.
   * Si no se proporciona, se utilizará una lista vacía.
   * @returns {void}
   */
  setAnexoUnoLista(event: AnexoUnoEncabezado): void {
    this.datosImportacionSeleccionados = event;
    //this.obtenerAnexoUnoDevolverLaLlamada.emit(LISTA_SELECCIONADA);
  }

  /**
   * Establece la lista de Anexo Dos y emite un evento con la lista seleccionada.
   *
   * @param {AnexoDosEncabezado[]} event - La lista de encabezados de importación de anexo.
   * Si no se proporciona, se utilizará una lista vacía.
   * @returns {void}
   */
  setAnexoDosLista(event: AnexoDosEncabezado): void {
    this.datosExportacionSeleccionados = event;
  }

  /**
   * Establece la ruta con el nombre proporcionado y emite el evento `rutaLaFraccionDeComplemento`.
   *
   * @param {string} nombre - El nombre de la categoría para establecer la ruta.
   * @returns {void}
   */
  setRuta(nombre: string, id: string): void {
    if (nombre) {
      const RUTA_NOMBRE: RutaNombre = {
        catagoria: nombre,
        id: id,
        datos:
          id === 'IMPORT'
            ? this.datosImportacionSeleccionados
            : this.datosExportacionSeleccionados,
      };
      this.rutaLaFraccionDeComplemento.emit(RUTA_NOMBRE);
    }
  }
}
