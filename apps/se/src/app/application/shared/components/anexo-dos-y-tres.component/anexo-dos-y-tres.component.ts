import { AlertComponent, Notificacion, NotificacionesComponent } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { ANEXO_TRES_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { Anexo1y3Configuartion } from '../../models/nuevo-programa-industrial.model';
import { AnexoEncabezado } from '../../models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo-dos-y-tres',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
    NotificacionesComponent
  ],
  templateUrl: './anexo-dos-y-tres.component.html',
  styleUrl: './anexo-dos-y-tres.component.scss',
})
/**
 * Componente AnexoDosYTresComponent
 */
export class AnexoDosYTresComponent implements OnInit {
  /**
   * Formulario del Anexo Dos
   */
  public anexoDosFormGroup!: FormGroup;

  /**
   * Formulario del Anexo Tres
   */
  public anexoTresFormGroup!: FormGroup;

  /**
   * Lista de anexos
   */
  public anexoLista = [];

  /**
   * Alerta del Anexo Tres
   */
  public anexoTresAlerta = ANEXO_TRES_ALERTA;

  /**
   * Configuración de Anexo 1 y 3
   */
  @Input() anexo1y3Configuartion!: Anexo1y3Configuartion<AnexoEncabezado>;

  /**
   * Lista de tabla del Anexo Dos
   */
  @Input() anexoDosTablaLista: AnexoEncabezado[] = [];

  /**
   * Lista de tabla del Anexo Tres
   */
  @Input() anexoTresTablaLista: AnexoEncabezado[] = [];

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Evento para devolver la llamada del Anexo Dos
   */
  @Output() obtenerAnexoDosDevolverLaLlamada: EventEmitter<AnexoEncabezado[]> =
    new EventEmitter<AnexoEncabezado[]>(true);

  /**
   * Evento para devolver la llamada del Anexo Tres
   */
  @Output() obtenerAnexoTresDevolverLaLlamada: EventEmitter<AnexoEncabezado[]> =
    new EventEmitter<AnexoEncabezado[]>(true);

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
  public nuevaTresNotificacion!: Notificacion;

  /** Inventarios seleccionados por el usuario */
  public seleccionarDosTablaData: AnexoEncabezado[] = [] as AnexoEncabezado[];

  /** Inventarios seleccionados por el usuario */
  public seleccionarTresTablaData: AnexoEncabezado[] = [] as AnexoEncabezado[];

  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios
   */
  constructor(private fb: FormBuilder) {
    this.crearFormularioAnexoDos();
    this.crearFormularioAnexoTres();
  }
  
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * deshabilita los grupos de formularios `anexoDosFormGroup` y `anexoTresFormGroup`.
   */
  ngOnInit(): void {
    if( this.formularioDeshabilitado ) {
      this.anexoDosFormGroup.disable();
      this.anexoTresFormGroup.disable();
    }
  }
  /**
   * Crea el formulario del Anexo Dos
   */
  crearFormularioAnexoDos(): void {
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
   * Crea el formulario del Anexo Tres
   */
  crearFormularioAnexoTres(): void {
    this.anexoTresFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
   * Elimina elementos del Anexo Dos que no tienen estatus
   */
  eliminarAnexoDos(): void {
  this.anexoDosTablaLista = this.anexoDosTablaLista.filter((idx) => {
    return !idx.estatus;
  });
  if (this.nuevaDosNotificacion) {
    this.nuevaDosNotificacion.cerrar = false;
  }


   if (this.seleccionarDosTablaData.length > 0) {

      this.anexoDosTablaLista = this.anexoDosTablaLista.filter(item => {

        return !this.seleccionarDosTablaData.some(selectedItem =>
          selectedItem.encabezadoFraccion === item.encabezadoFraccion &&
          selectedItem.encabezadoDescripcion === item.encabezadoDescripcion
        );
      });

      this.seleccionarDosTablaData = [];
     this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
    }
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
   * Agrega un nuevo elemento al Anexo Dos
   */
  agregarAnexoDos(): void {
    const OBJECTO_IDX: AnexoEncabezado = {
      encabezadoFraccion: this.anexoDosFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcion: this.anexoDosFormGroup.get('descripcion')?.value,
      estatus: false,
    };
    if(OBJECTO_IDX.encabezadoFraccion.trim() === '' || OBJECTO_IDX.encabezadoDescripcion.trim() === '') {
      return; // No agregar si los campos están vacíos
    }
    this.anexoDosTablaLista = [...this.anexoDosTablaLista, OBJECTO_IDX];
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
    this.anexoDosFormGroup.reset();
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
  abrirTresModal(): void {
    this.nuevaTresNotificacion = {
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
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoTres(): void {
 this.anexoTresTablaLista = this.anexoTresTablaLista.filter((idx) => {
    return !idx.estatus;
  });
  if (this.nuevaTresNotificacion) {
    this.nuevaTresNotificacion.cerrar = false;
  }


   if (this.seleccionarTresTablaData.length > 0) {

      this.anexoTresTablaLista = this.anexoTresTablaLista.filter(item => {

        return !this.seleccionarTresTablaData.some(selectedItem =>
          selectedItem.encabezadoFraccion === item.encabezadoFraccion &&
          selectedItem.encabezadoDescripcion === item.encabezadoDescripcion
        );
      });

      this.seleccionarTresTablaData = [];
     this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
    }

    this.anexoTresTablaLista = this.anexoTresTablaLista.filter((idx) => {
      return !idx.estatus;
    });
    this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Tres
   */
  agregarAnexoTres(): void {
    const OBJECTO_IDX: AnexoEncabezado = {
      encabezadoFraccion: this.anexoTresFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcion: this.anexoTresFormGroup.get('descripcion')?.value,
      estatus: false,
    };
    if(OBJECTO_IDX.encabezadoFraccion.trim() === '' || OBJECTO_IDX.encabezadoDescripcion.trim() === '') {
      return; // No agregar si los campos están vacíos
    }
   this.anexoTresTablaLista = [...this.anexoTresTablaLista, OBJECTO_IDX]
    this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
    this.anexoTresFormGroup.reset();
  }

  /**
   * Establece la lista del Anexo Dos
   * @param event Lista de encabezados del Anexo Dos
   */
  setAnexoDosLista(event: AnexoEncabezado[]): void {
 this.seleccionarDosTablaData = event;
 this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Establece la lista del Anexo Tres
   * @param event Lista de encabezados del Anexo Tres
   */
  setAnexoTresLista(event: AnexoEncabezado[]): void {
 this.seleccionarTresTablaData = event;
  this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
  }
}
