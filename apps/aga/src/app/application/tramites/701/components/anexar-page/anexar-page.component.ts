/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
/* eslint-disable no-multi-spaces */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';
import { AlertComponent, CATALOGOS_ID, TituloComponent } from '@ng-mf/data-access-user';

// eslint-disable-next-line no-multi-spaces
import { TEXTOS } from  '@ng-mf/data-access-user';
// eslint-disable-next-line no-multi-spaces
import { Catalogo } from  '@ng-mf/data-access-user';
import { CatalogosSelect } from  '@ng-mf/data-access-user';
import { CatalogosService } from  '@ng-mf/data-access-user';
import { RegistroDigitalizarDocumentosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
/**
 * Constante de texto de alerta para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"';

/**
 * Constante de texto de instrucciones para adjuntar documentos.
 */
const TERCEROS_TEXTO_DE_ADJUNTAR =
  'Para poder adjuntar tu documento, deberá cumplir las siguientes características:<br> <b>&#8226;</b> Debe ser formato PDF que no contenga formularios, objetos OLE incrustrados, código JavaScript, etc.<br><b>&#8226;</b> No debe contener páginas en blanco.';

/**
 * Componente para la página de anexar documentos.
 */
@Component({
  selector: 'app-anexar-page',
  templateUrl: './anexar-page.component.html',
  styleUrl: './anexar-page.component.scss',
  standalone: true,
  imports: [CommonModule,TituloComponent,FormsModule,ReactiveFormsModule,AlertComponent],
})
export class AnexarPageComponent implements OnInit {
  /**
   * Constantes de textos.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase de alerta para la información.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Tipo de documento seleccionado.
   */
  TipoDocumento!: CatalogosSelect;

  /**
   * Texto de alerta para la interfaz de usuario.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Texto de instrucciones para adjuntar documentos.
   */
  TEXTO_DE_ADJUNTAR: string = TERCEROS_TEXTO_DE_ADJUNTAR;

  /**
   * Indicador de carga.
   */
  cargando = false;

  /**
   * Progreso de la carga de archivos.
   */
  progreso = 0;

  /**
   * Indicador para mostrar la tabla de archivos subidos.
   */
  mostrarTablaArchivosSubidos = false;

  /**
   * Indicador de proceso completado.
   */
  procesoCompletado = false;

  /**
   * Tipos de documentos disponibles.
   */
  tiposDeDocumentos: string[] = ['Pago de Derechos*:'];

  /**
   * Nombres de los archivos subidos.
   */
  nombresArchivosSubidos: string[] = new Array(this.tiposDeDocumentos.length).fill('');

  /**
   * Indicador para mostrar el modal.
   */
  mostrarModal: boolean = false;
  

  /**
   * URL de vista previa del documento.
   */
  URLdevistapreviadeldocumento: SafeResourceUrl | null = null;
  
  /**
   * Documentos disponibles para selección.
   */
  disponiblesDocumentos: any[] = ['Document A'];
  
  /**
   * Documentos seleccionados por el usuario.
   */
  documentosSeleccion: string[] = new Array(this.tiposDeDocumentos.length).fill('');
  
  
  /**
   * Indicador para mostrar la tabla.
   */
  mostrarTabla = false;

  /**
   * Tamaños de los archivos subidos.
   */
  Tamanosdearchivo: (number | null)[] = new Array(this.tiposDeDocumentos.length).fill(null);

  /**
   * Resoluciones de los archivos subidos.
   */
  resoluciones: string[] = new Array(this.tiposDeDocumentos.length).fill('');
  getTiposDocumentosSubscription: any;
  getTipoDocumentoSubscription: any;

  
  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener catálogos.
   * @param registrodigitalizar Servicio para registrar y digitalizar documentos.
   * @param sanitizer Servicio para sanitizar URLs.
   */
  constructor(
    private catalogosServices: CatalogosService,
    private registrodigitalizar: RegistroDigitalizarDocumentosService,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.getTipoDocumento();
  }

  /**
   * Obtiene los tipos de documentos del catálogo.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (): void => {},
      });
  }

  /**
   * Obtiene el tipo de documento del servicio de registro y digitalización.
   */
  getTipoDocumento(): void {
    this.registrodigitalizar.getTipoDocumento().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.TipoDocumento = {
          labelNombre: 'Tipo de documento',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        }
      }
      
    });
    
  }

  /**
   * Verifica si todos los documentos han sido seleccionados.
   * @returns Verdadero si todos los documentos han sido seleccionados, falso en caso contrario.
   */
  todosDocumentos(): boolean {
    return this.documentosSeleccion.every((doc) => doc !== '');
  }

  /**
   * Maneja la selección de un documento.
   * @param index Índice del documento seleccionado.
   */
  enDocumentSelect(index: number): void {
    
  }

  /**
   * Muestra la vista previa del documento.
   * @param index Índice del documento a visualizar.
   */
  verDocument(index: number): void {
    if (this.nombresArchivosSubidos[index]) {
      const documentUrl = this.nombresArchivosSubidos[index];
      this.URLdevistapreviadeldocumento =
        this.sanitizer.bypassSecurityTrustResourceUrl(documentUrl);
      const modalElement = document.getElementById('documentPreviewModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found');
      }
    }
  }

  /**
   * Maneja el cambio de archivo.
   * @param event Evento de cambio de archivo.
   * @param index Índice del archivo cambiado.
   */
  cambioArchivo(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      const fileViewer = document.getElementById(
        'fileViewer'
      ) as HTMLIFrameElement;
      fileViewer.src = fileURL;
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 3) {
        console.error('File size must be less than 3 MB');
        input.value = '';
        this.Tamanosdearchivo[index] = null;
        this.resoluciones[index] = '';
        this.nombresArchivosSubidos[index] = '';
        return;
      }
      this.Tamanosdearchivo[index] = parseFloat(sizeMB.toFixed(2));
      this.nombresArchivosSubidos[index] = file.name;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const img = new Image();
        img.onload = (): void => {
          this.resoluciones[index] = `${img.width}x${img.height}`;
        };
        img.onerror = (): void => {
          this.resoluciones[index] = 'N/A';
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Adjunta los archivos seleccionados.
   */
  adjuntarArchivos(): void {
    this.cargando = true;
    this.progreso = 0;

    const interval = setInterval(() => {
      this.progreso += 10;
      if (this.progreso >= 100) {
        this.progreso = 100;
        clearInterval(interval);
        this.cargando = false;

        this.mostrarTablaArchivosSubidos = true;
      }
    }, 200);
  }

  /**
   * Cierra el proceso de adjuntar archivos.
   */
  cerrarProceso(): void {
    this.mostrarTabla = false;
    this.mostrarTablaArchivosSubidos = false;
    this.procesoCompletado = true;
  }

  ngOnDestroy(): void {
    if (this.getTiposDocumentosSubscription) {
      this.getTiposDocumentosSubscription.unsubscribe();
    }
    if (this.getTipoDocumentoSubscription) {
      this.getTipoDocumentoSubscription.unsubscribe();
    }
  }
}
