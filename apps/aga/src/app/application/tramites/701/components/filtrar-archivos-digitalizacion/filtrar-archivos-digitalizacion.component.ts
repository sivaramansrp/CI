/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SelectCatalogosComponent, SharedModule } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { RegistroDigitalizarDocumentosService } from '../../services/registro-digitalizar-documentos.service';
// import { TipoDocumento } from '@libs/shared/data-access-user/src/core/models/701/tipo-documento.model';

import { TipoDocumentoStore } from '../../state/store';
import { TipoDocumentoQuery } from '../../state/query';
/**
 * Componente para filtrar archivos de digitalización.
 */
@Component({
  selector: 'app-filtrar-archivos-digitalizacion',
  templateUrl: './filtrar-archivos-digitalizacion.component.html',
  styleUrls: ['./filtrar-archivos-digitalizacion.component.scss'],
  standalone: true,
  imports: [SelectCatalogosComponent, CommonModule, FormsModule,SharedModule],
})
export class FiltrarArchivosDigitalizacionComponent implements OnInit {
  /**
   * Formulario para los tipos de documentos.
   */
  tipoDocumentosForm: FormGroup;

  /**
   * Lista de documentos tipo.
   */
  TipoDocumento: TipoDocumentoStore[] = [];


  /**
   * Documento seleccionado.
   */
  documentoSeleccionado!: Catalogo;

  /**
   * Tamaño máximo del documento en megabytes.
   */
  tamMaximo: number = 0;

  /**
   * Tipos de documentos disponibles.
   */
  tiposDocumentos!: CatalogosSelect;
  /**
   * RFC para consulta.
   */
  rfcParaConsulta: string = '';

  /**
   * Nombre del solicitante.
   */
  nombre: string = '';

  /**
   * Lista de documentos específicos.
   */
  documentosEspecificos: TipoDocumentoStore[] = [];
  TipoDocumentoStore: any;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios.
   * @param catalogosServices Servicio para obtener catálogos.
   * @param toastr Servicio para mostrar notificaciones.
   * @param http Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService,
    private toastr: ToastrService,
    private http: HttpClient,
    private registrodigitalizar: RegistroDigitalizarDocumentosService,
    private store: TipoDocumentoStore,
    private query: TipoDocumentoQuery
  ) {
    this.tipoDocumentosForm = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
        esNuevo: [''],
      }),
      tipoDocumento: [''],
      elementoWizard: this.fb.group({
        anteriorTmp: [''],
      }),
    });
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.getDocumentos();
  }

  /**
   * Verifica si hay documentos cargados.
   * @returns {boolean} `true` si hay documentos cargados, de lo contrario `false`.
   */
  get docCargados(): boolean {
    return this.TipoDocumento.length > 0;
  }

  /**
   * Determina si el botón de carga debe estar desactivado.
   * @returns {boolean} `true` si no hay un documento seleccionado, de lo contrario `false`.
   */
  get btnDesactivado(): boolean {
    return !(this.documentoSeleccionado && this.documentoSeleccionado.id !== 0);
  }

  /**
   * Obtiene los documentos desde un archivo JSON.
   * @returns {Observable<TipoDocumento[]>} Un observable con la lista de documentos.
   */
  getDocumentos() {
   
     return this.registrodigitalizar.getDocumentoSelect();
  
  }

  /**
   * Maneja la selección de un documento.
   * @param {Catalogo} e - El documento seleccionado.
   */
  docSeleccionado(e: Catalogo): void {
    this.documentoSeleccionado = e;
    this.tamMaximo = this.documentoSeleccionado.tam
      ? this.convertirKilobytesAMegabytes(
          parseInt(this.documentoSeleccionado.tam, 10)
        )
      : 0;
  }

  /**
   * Convierte kilobytes a megabytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en megabytes.
   */
  public convertirKilobytesAMegabytes(kilobytes: number): number {
    return Math.round(kilobytes / 1024);
  }

  /**
   * Obtiene los tipos de documentos disponibles.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.tiposDocumentos = {
              labelNombre: 'Tipo de documento',
              required: true,
              primerOpcion: 'Selecciona un tipo de documento',
              catalogos: resp,
            };
          }
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }

  /**
   * Agrega un documento específico a la lista de documentos.
   */
  addDoctoEspecifico(): void {
    if (this.documentoSeleccionado) {
    this.registrodigitalizar.getDocumentoSelect()

        .subscribe({
          next: (data) => {

            const selectedDocument = data.find(
              (doc) =>
                doc['tipoDocumento']?.descripcion ===
                this.documentoSeleccionado?.descripcion
            );
            if (selectedDocument) {
              this.TipoDocumentoStore.push(selectedDocument);
              this.toastr.success('Documento agregado exitosamente');
              this.tipoDocumentosForm.get('tipoDocumento')?.reset();
            } else {
              this.toastr.error('Documento no encontrado en el archivo JSON');
            }
          },
          error: () => {
           
            this.toastr.error('Error al agregar el documento');
          },
        });
    } else {
      this.toastr.error('Por favor seleccione un tipo de documento');
    }
  }

  /**
   * Elimina los documentos seleccionados de la lista.
   */
  eliminarDoctoEspecifico(): void {
    const selectedDocs = this.TipoDocumento.filter((doc) => doc.selected);
    if (selectedDocs.length === 0) {
      this.toastr.error(
        'Por favor seleccione al menos un documento para eliminar'
      );
      return;
    }
    this.TipoDocumento = this.TipoDocumento.filter((doc) => !doc.selected);
    this.toastr.success('Documentos seleccionados eliminados exitosamente');
  }

  /**
   * Selecciona o deselecciona todos los documentos de la lista.
   * @param {Event} event - El evento de cambio del checkbox.
   */
  SeleccioneTodo(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.TipoDocumento.forEach((doc) => (doc.selected = checked));
  }
}
