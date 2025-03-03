import {AlertComponent,  
  CATALOGOS_ID,  
  Catalogo,  
  CatalogoSelectComponent,  
  CatalogosSelect,  
  CatalogosService,  
  TEXTOS,  
  TituloComponent   } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportadorExportadorService } from '@ng-mf/data-access-user';
/**
 * Texto de adjuntar para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"';
/**
 * Texto de adjuntar para terceros.
 */
const TERCEROS_TEXTO_DE_ADJUNTAR =
  'Para poder adjuntar tu documento, deberá cumplir las siguientes características:<br> <b>&#8226;</b> Debe ser formato PDF que no contenga formularios, objetos OLE incrustrados, código JavaScript, etc.<br><b>&#8226;</b> No debe contener páginas en blanco.';

/**
 * Componente que representa el paso dos del trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styles: [`.p {
    font-size: medium;
  }
  
  .th-center {
    text-align: center;
  }
  
  .btn-list {
    max-width: 40rem;
    max-height: 15rem;
    text-align: justify !important;
    font-size: 16px;
    white-space: normal;
  }
  
  .grey-column {
    background-color: rgb(156, 155, 155);
  }
  
  .visually-hidden-file {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  
  .custome-file-label {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    color: #212529;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }
  .custome-file-label:hover {
    background-color: #a5a8ab;
    border-color: #a5a8ab;
  }
  
  /* Modal backdrop for the loading pop-up */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Modal content styling */
  .custom-modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  .adjuntar-button:hover {
    background-color: #611232;
    color: white;
  }
  .adjuntar-button {
    color: #611232;
    border-color: #611232;
  }
  `],
  standalone: true,
  imports: [TituloComponent, AlertComponent, CatalogoSelectComponent, FormsModule,ReactiveFormsModule, CommonModule]
})
export class PasoDosComponent implements OnInit {
  /**
   * Constantes de texto.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase de alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Documentos seleccionados.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Tipo de documento.
   */
  tipodocumento!: CatalogosSelect;

  /**
   * Texto de alerta para terceros.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Texto de adjuntar para terceros.
   */
  TEXTO_DE_ADJUNTAR: string = TERCEROS_TEXTO_DE_ADJUNTAR;

  /**
   * Indica si se está cargando.
   */
  cargando = false;

  /**
   * Progreso de la carga.
   */
  progreso = 0;

  /**
   * Indica si se debe mostrar la tabla de archivos subidos.
   */
  mostrarTablaArchivosSubidos = false;

  /**
   * Indica si el proceso se ha completado.
   */
  procesoCompletado = false;

  /**
   * Tipos de documentos.
   */
  tiposDeDocumentos: string[] = [
    'Traducción de la carta de donación en caso de que se presente en idioma distinto al español.*:',
    'Cuando el donante sea una persona física, documento que acredite que es extranjero.*:',
    'Otro.*:',
    'Carta de donación emitida por el donante a favor del interesado, en la que conste: La descripción detallada de la mercancía objeto de la donación, cantidad, tipo, y en su caso marca, año-modelo y numero de serie.*:',
    'Documento emitido por el SAT que acredite la autorización de donataria para recibir donatives deducibles del impuesto sobre la renta.*:',
  ];

  /**
   * Nombres de los archivos subidos.
   */
  nombresArchivosSubidos: string[] = new Array(this.tiposDeDocumentos.length).fill('');

  /**
   * Documentos disponibles.
   */
  disponiblesDocumentos: string[] = ['Document A', 'Document B', 'Document C'];

  /**
   * Documentos seleccionados.
   */
  documentosSeleccion: string[] = new Array(this.tiposDeDocumentos.length).fill('');

  /**
   * Indica si se debe mostrar la tabla.
   */
  mostrarTabla = false;

  /**
   * Tamaños de los archivos.
   */
  fileSizes: (number | null)[] = new Array(this.tiposDeDocumentos.length).fill(null);

  /**
   * Resoluciones de los archivos.
   */
  resolucions: string[] = new Array(this.tiposDeDocumentos.length).fill('');
  ngOnDestroy!: () => void;

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param catalogosServices Servicio de catálogos.
   * @param importarExportar Servicio de importador/exportador.
   */
  constructor(
    public catalogosServices: CatalogosService,
    public importarExportar: ImportadorExportadorService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.getTipoDocumento();
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía',
      },
      {
        id: 2,
        descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
      },
    ];
  }

  /**
   * Obtiene los tipos de documentos.
   */
  getTiposDocumentos(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe({
      next: (resp): void => {
        if (resp.length > 0) {
          this.catalogoDocumentos = resp;
        }
      },
    });
  }

  /**
   * Obtiene el tipo de documento.
   */
  getTipoDocumento(): void {
    this.importarExportar.getTipoDocumento().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.tipodocumento = {
          labelNombre: 'Tipo de documento',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Verifica si todos los documentos están seleccionados.
   * @returns Verdadero si todos los documentos están seleccionados, falso en caso contrario.
   */
  todosDocumentos(): boolean {
    return this.documentosSeleccion.every((doc) => doc !== '');
  }

  /**
   * Método que se llama cuando se selecciona un documento en la lista.
   * @param index Índice del documento seleccionado.
   */
  static enDocumentSelect(index: number): void {
    // Este método se llama cuando se selecciona un documento en la lista.
    // Aquí se puede agregar la lógica para manejar la selección del documento.
  }

  /**
   * Método para ver un documento seleccionado.
   * @param index Índice del documento seleccionado.
   */
  verDocument(index: number): void {
    if (this.documentosSeleccion[index]) {
      // Lógica para ver el documento seleccionado
    }
  }

  /**
   * Método para manejar el cambio de archivo.
   * @param event Evento de cambio de archivo.
   * @param index Índice del archivo.
   */
  cambioArchivo(event: any, index: number): void {
    const FILE = event.target.files[0];
    if (FILE) {
      const SIZE_MB = FILE.size / (1024 * 1024);
      if (SIZE_MB > 3) {
        alert('File size must be less than 3 MB');
        event.target.value = '';
        this.fileSizes[index] = null;
        this.resolucions[index] = '';
        this.nombresArchivosSubidos[index] = '';
        return;
      } else {
        this.fileSizes[index] = parseFloat(SIZE_MB.toFixed(2));
        this.nombresArchivosSubidos[index] = FILE.name;
      }

      const READER = new FileReader();
      READER.onload = (e: any) => {
        const IMG = new Image();
        IMG.onload = () => {
          this.resolucions[index] = `${IMG.width}x${IMG.height}`;
        };
        IMG.onerror = () => {
          this.resolucions[index] = 'N/A';
        };
        IMG.src = e.target.result;
      };
      READER.readAsDataURL(FILE);
    }
  }

  /**
   * Método para adjuntar archivos.
   */
  adjuntarArchivos(): void {
    this.cargando = true;
    this.progreso = 0;

    const INTERVAL = setInterval(() => {
      this.progreso += 10;
      if (this.progreso >= 100) {
        this.progreso = 100;
        clearInterval(INTERVAL);
        this.cargando = false;

        this.mostrarTablaArchivosSubidos = true;
      }
    }, 200);
  }

  /**
   * Método para cerrar el proceso.
   */
  cerrarProceso(): void {
    this.mostrarTabla = false;
    this.mostrarTablaArchivosSubidos = false;

    this.procesoCompletado = true;
  }
}
