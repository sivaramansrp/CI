import { Component, OnInit } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ImportadorExportadorService } from 'libs/shared/data-access-user/src/core/services/10301/importador-exportador.service';
import { TEXTOS, CATALOGOS_ID } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
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
  styleUrls: ['./paso-dos.component.scss'],
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

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param catalogosServices Servicio de catálogos.
   * @param importarExportar Servicio de importador/exportador.
   */
  constructor(
    private catalogosServices: CatalogosService,
    private importarExportar: ImportadorExportadorService
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
        const response = resp.data;

        this.tipodocumento = {
          labelNombre: 'Tipo de documento',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
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
  enDocumentSelect(index: number): void {
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
    const file = event.target.files[0];
    if (file) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 3) {
        alert('File size must be less than 3 MB');
        event.target.value = '';
        this.fileSizes[index] = null;
        this.resolucions[index] = '';
        this.nombresArchivosSubidos[index] = '';
        return;
      } else {
        this.fileSizes[index] = parseFloat(sizeMB.toFixed(2));
        this.nombresArchivosSubidos[index] = file.name;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          this.resolucions[index] = `${img.width}x${img.height}`;
        };
        img.onerror = () => {
          this.resolucions[index] = 'N/A';
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Método para adjuntar archivos.
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
   * Método para cerrar el proceso.
   */
  cerrarProceso(): void {
    this.mostrarTabla = false;
    this.mostrarTablaArchivosSubidos = false;

    this.procesoCompletado = true;
  }
}
