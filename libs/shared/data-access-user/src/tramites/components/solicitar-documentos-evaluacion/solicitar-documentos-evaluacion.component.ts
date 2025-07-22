import { Catalogo, RespuestaDocuemntosRequeridos } from '../../../core/models/shared/catalogos.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { SolicitudDocumentosState, SolicitudDocumentosStore } from '../../../core/estados/solicitud-documentos.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
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

  listadoDocumentos: string[] = [];
  /**
   * Lista de documentos agregados a la tabla
   */
  documentosSeleccionados: string[] = [];
  /**
   * Documento seleccionado para agregar a requerimiento
   */
  documentoSeleccionado: string = '';
  /**
 * Variable para identificar el Id del tipo de documento
 */
  tipoDocumentoId!: number;
  /**
 * Variable para enviar el nombre del campo 
 */
  valor!: string;
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

  encabezadoDeTablaCapturistas: ConfiguracionColumna<string>[] = [
    {
      encabezado: 'Nombre del documento',
      clave: (row) => row,
      orden: 1
    }
  ];

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
    this.documentosSeleccionados = this.solicitudDocumentosState.documentosSeleccionados;
  }
  /**
   * Metodo para agregar documento seleccionado a la tabla 
   */
  agregarDocumento(): void {
    if (this.formSolicitudDocumentos.invalid) {
      this.formSolicitudDocumentos.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'error',
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Aun no ha seleccionado una opción.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    this.tipoDocumentoId = this.formSolicitudDocumentos.get('tipoDocumento')?.value;

    // Validación: asegurarse que tipoDocumentoId tenga un valor numérico válido
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
    if (this.documentosSeleccionados.length === 0) {
      this.documentosSeleccionados = [];
    }
    this.tipoDocumentoId = this.formSolicitudDocumentos.get('tipoDocumento')?.value;
    this.selectedOption = this.catTipoDocumento?.find(option => option.id === Number(this.tipoDocumentoId));
    this.description = this.selectedOption ? this.selectedOption.descripcion : 'No description found';
    if (this.description && !this.documentosSeleccionados.includes(this.description)) {
      this.documentosSeleccionados.push(this.description.toString());
    }
    this.documentosStates.setSolicitudDocumentos(this.documentosSeleccionados);
  }
  /**
   * Método para eliminar el documento de la tabla 
   */
  eliminarDocumento(): void {
    this.listadoDocumentos.forEach((documento) => {
      const INDEX = this.documentosSeleccionados.indexOf(documento);
      if (INDEX > -1) {
        this.documentosSeleccionados.splice(INDEX, 1);
      }
    });
    this.documentosStates.setSolicitudDocumentos(this.documentosSeleccionados);
    this.listadoDocumentos = [];
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
