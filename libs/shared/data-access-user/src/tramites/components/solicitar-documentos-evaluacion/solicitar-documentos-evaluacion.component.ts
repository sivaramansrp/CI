import { Catalogo, CatalogoTipoDocumento, RespuestaDocuemntosRequeridos } from '../../../core/models/shared/catalogos.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { SolicitudDocumentosState, SolicitudDocumentosStore } from '../../../core/estados/solicitud-documentos.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_ENCABEZADO_DOCUMENTOS } from '../../../core/enums/solicitud-documentos.enum';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { SolicitudDocumentosQuery } from '../../../core/queries/solicitud-documentos.query';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '../../../core/enums/tabla-seleccion.enum';
import data from '@libs/shared/theme/assets/json/funcionario/cat-tipo-documento.json';
import dataDocuemtos from '@libs/shared/theme/assets/json/funcionario/lista-documentos-requeridos.json'

@Component({
  selector: 'app-solicitar-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogoSelectComponent, ReactiveFormsModule, NotificacionesComponent, TablaDinamicaComponent],
  templateUrl: './solicitar-documentos-evaluacion.component.html',
  styleUrl: './solicitar-documentos-evaluacion.component.scss',
})
export class SolicitarDocumentosEvaluacionComponent implements OnInit {
  /**
  * Declaración de variable para el formulario
  */
  formSolicitudDocumentos!: FormGroup;
  /**
   * Catálogo documento requerido
   */
  catTipoDocumento: Catalogo[] = [];
  /**
   * Lista documentos requeridos
   */
  exampleDocumentosRequeridos!: RespuestaDocuemntosRequeridos[];
  /**
   * Lista de documentos
   */
  public listadoDocumentos: CatalogoTipoDocumento[] = [];
  /**
   * Lista de documentos agregados a la tabla
   */
  public documentosSeleccionados: CatalogoTipoDocumento[] = [];
  /**
 * Variable para identificar el Id del tipo de documento
 */
  tipoDocumentoId!: number;
  /**
 * Variable para enviar el nombre del campo 
 */
  valor!: string;

  /** Indica si se debe mostrar la segunda tabla */
  @Input() isSegundaTabla : boolean = true;

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
     * Estado de la documentación.
     */
  public solicitudDocumentosState!: SolicitudDocumentosState;
  /**
   * Selecciona el tipo de documento que obtiene del catálogo documentos
   */
  selectedOption: Catalogo | undefined;
  /**
   * Obtiene el nombre de la opcion seleccionada del documento
   */
  description: string | undefined;

  /** Notificación a mostrar al usuario */
  public nuevaNotificacion!: Notificacion;

  /** Enum para la selección en la tabla */
  tablaSeleccion = TablaSeleccion;

  /**
   * Encabezado de tabla para agregar documentos
   */
  encabezadoDeTablaDocumentos = CONFIGURACION_ENCABEZADO_DOCUMENTOS;

  constructor(private fb: FormBuilder,
    private documentosStates: SolicitudDocumentosStore,
    private solicitudRequerimientoQuery: SolicitudDocumentosQuery
  ) {
    // do nothing.
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.catTipoDocumento = data;
    this.exampleDocumentosRequeridos = dataDocuemtos;
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudDocumentosState = seccionState;
          this.listadoDocumentos = this.solicitudDocumentosState.listaDocumentos;
        })
      )
      .subscribe();
    this.crearFormDocumentos();
  }
  /**
   * Método para crear el formulario para la solicitud de documentos
   */
  crearFormDocumentos(): void {
    this.formSolicitudDocumentos = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
    });
    this.documentosSeleccionados = this.solicitudDocumentosState.listaDocumentos;
  }
  /**
   * Metodo para agregar documento seleccionado a la tabla 
   */
  agregarDocumento(): void {
    if (this.formSolicitudDocumentos.invalid) {
      this.formSolicitudDocumentos.markAllAsTouched();
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'error',
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Debe seleccionar al menos una opción.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    this.tipoDocumentoId = this.formSolicitudDocumentos.get('tipoDocumento')?.value;
    if (!this.tipoDocumentoId || isNaN(this.tipoDocumentoId)) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'error',
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Debe seleccionar al menos una opción.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    const TIPO_DOCUMENTO_OBJ = this.catTipoDocumento.find(dep => dep.id === Number(this.tipoDocumentoId));
    const NUEVA_TABLA_LISTA_DOCUMENTOS = [...this.listadoDocumentos]

    NUEVA_TABLA_LISTA_DOCUMENTOS.push({
      id: this.tipoDocumentoId,
      description: TIPO_DOCUMENTO_OBJ?.descripcion || '',
    })
    if (this.listadoDocumentos.length === 0) {
      this.listadoDocumentos = [];
    }
    this.listadoDocumentos = NUEVA_TABLA_LISTA_DOCUMENTOS;
    this.documentosStates.setSolicitudDocumentos(this.listadoDocumentos);
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.formSolicitudDocumentos.reset({
      tipoDocumento: ''
    });
  }
  /**
   * Método para eliminar el documento de la tabla 
   */
  eliminarDocumento() {
    if (this.documentosSeleccionados.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: 'Advertencia',
        mensaje: 'No hay documentos para eliminar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    const IDS_TO_DELETE = this.documentosSeleccionados.map(documento => documento.id);
    this.listadoDocumentos = this.listadoDocumentos.filter(documento => !IDS_TO_DELETE.includes(documento.id));
    this.documentosStates.setSolicitudDocumentos(this.listadoDocumentos);
    this.documentosSeleccionados = [];
  }
  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof SolicitudDocumentosStore): void {
    this.valor = form.get(campo)?.value;
    (this.documentosStates[metodoNombre] as (value: string) => void)(this.valor);
  }
}
