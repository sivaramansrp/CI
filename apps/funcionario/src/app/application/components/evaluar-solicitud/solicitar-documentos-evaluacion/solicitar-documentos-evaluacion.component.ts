import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import data from '../../../../../../../../libs/shared/theme/assets/json/funcionario/cat-tipo-documento.json';
import { DocumentosStates, SolicitudDocumentosState } from '../../../estados/evaluacion-solicitud/documentos.store';
import { SolicitudDocumentosQuery } from '../../../estados/queries/documentos.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-solicitar-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './solicitar-documentos-evaluacion.component.html',
  styleUrl: './solicitar-documentos-evaluacion.component.scss',
})
export class SolicitarDocumentosEvaluacionComponent {
   /**
   * Declaración de variable para el formulario
   */
  formSolicitudDocumentos!: FormGroup;
   /**
    * Catálogo documento requerido
    */
  catTipoDocumento!: Catalogo[];
  /**
   * Lista de documentos agregados a la tabla
   */
  documentosSeleccionados: string[] = [];
  /**
   * Documento seleccionado para agregar a requerimiento
   */
  documentoSeleccionado: string = '';
  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();
/**
   * Estado de la documentación.
   */
  public solicitudDocumentosState!: SolicitudDocumentosState;
  constructor(private fb: FormBuilder,
    private documentosStates: DocumentosStates,
    private solicitudRequerimientoQuery: SolicitudDocumentosQuery
  ) { }
/**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.catTipoDocumento = data;
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
  agregarDocumento() {
    if (this.documentosSeleccionados.length == 0) {
      this.documentosSeleccionados=[];
    }
    const tipoDocumentoId = this.formSolicitudDocumentos.get('tipoDocumento')?.value;
    const selectedOption = this.catTipoDocumento.find(option => option.id === +tipoDocumentoId);
    const description = selectedOption ? selectedOption.descripcion : 'No description found';
    if (description && !this.documentosSeleccionados.includes(description)) {
      this.documentosSeleccionados.push(description.toString());
    }
    this.documentosStates.setSolicitudDocumentos(this.documentosSeleccionados);
  }
/**
 * Método para eliminar el documento de la tabla 
 */
  eliminarDocumento(index: number) {
    this.documentosSeleccionados.splice(index, 1);
  }
 /**
    * Establece los valores en el store de tramite5701.
    *
    * @param {FormGroup} form - El formulario del cual se obtiene el valor.
    * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
    * @returns {void}
    */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DocumentosStates): void {
    const valor = form.get(campo)?.value;
    (this.documentosStates[metodoNombre] as (value: any) => void)(valor);
  }
}
