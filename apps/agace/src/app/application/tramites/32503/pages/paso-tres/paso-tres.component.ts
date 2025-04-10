import { AlertComponent, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { AnexosLista, ArchivoDocumentos, Documentos, DocumentosAnexos, DocumentosLista } from "../../models/aviso-traslado.model";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TEXTOS, TIPO_DOCUMENTO_TAMANO } from "../../constants/aviso-traslado.enum";
import { Tramite32503State, Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
import { CommonModule } from "@angular/common";
import { Modal } from "bootstrap";
import { Subject } from "rxjs";
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { map } from "rxjs";
import { takeUntil } from "rxjs";

/**
 * Componente para gestionar el paso tres del trámite 32503.
 * 
 * Este componente permite al usuario cargar y gestionar documentos relacionados con el trámite,
 * incluyendo la selección de documentos, la carga de archivos y la visualización de anexos.
 */
@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule, AlertComponent, CatalogoSelectComponent, TituloComponent, FormsModule, ReactiveFormsModule,
    TablaDinamicaComponent
  ],
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent implements OnInit, OnDestroy {
  /**
   * Estado actual del trámite 32503.
   */
  public tramiteState!: Tramite32503State;

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo para gestionar los tipos de documentos.
   */
  tipoDocumentoFormulario!: FormGroup;

  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles.
   */
  tiposDeDocumentos: Documentos[] = [];

  /**
   * Referencia al modal para adjuntar documentos.
   */
  @ViewChild('modalAdjuntar') modalAdjuntar!: ElementRef;

  /**
   * Referencia al modal para visualizar anexos.
   */
  @ViewChild('modalAnexos') modalAnexos!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Lista de tamaños de archivos relacionados con los documentos.
   */
  tamanosDeArchivos: ArchivoDocumentos[] = [];

  /**
   * Progreso de la carga de archivos en porcentaje.
   */
  progreso: number = 0;

  /**
   * Indicador de si se está cargando un archivo.
   */
  cargando: boolean = false;

  /**
   * Configuración de la tabla de datos para los anexos.
   */
  tablaDeDatos: {
    encabezadas: {
      encabezado: string,
      clave: (ele: DocumentosAnexos) => string,
      orden: number
    }[],
    datos: DocumentosAnexos[],
  } = {
      encabezadas: [
        { encabezado: 'Documento', clave: (ele: DocumentosAnexos) => ele.documentos, orden: 1 },
        {
          encabezado: 'Estatus',
          clave: (ele: DocumentosAnexos) => ele.estatus,
          orden: 2,
        },
        {
          encabezado: 'Mensajes',
          clave: (ele: DocumentosAnexos) => ele.mensajes,
          orden: 3,
        }
      ],
      datos: []
    };

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite32503Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32503Query} tramiteQuery - Query para consultar el estado del trámite.
   * @param {AvisoTrasladoService} avisoTrasladoService - Servicio para obtener datos relacionados con el aviso de traslado.
   */
  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Configura el formulario, carga los datos iniciales y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarTipoDocumentoSeleccionado();
    this.cargarAnexos();
  }

  /**
   * Inicializa el formulario con los datos del estado del trámite.
   */
  inicializarFormulario(): void {
    this.tipoDocumentoFormulario = this.fb.group({
      documentos: this.fb.array([])
    });
  }

  /**
   * Obtiene el array de documentos del formulario.
   * 
   * @returns {FormArray} El array de documentos.
   */
  get documentos(): FormArray {
    return this.tipoDocumentoFormulario.get('documentos') as FormArray;
  }

  /**
   * Agrega los documentos al formulario y actualiza los tamaños de archivos.
   */
  agregarDocumentos(): void {
    this.tiposDeDocumentos.forEach((item, i) => {
      this.documentos.push(this.fb.control(this.tramiteState?.valorSeleccionado[i], Validators.required));
      this.tamanosDeArchivos.push(this.tramiteState?.documentosDesplegable[i] ?? JSON.parse(JSON.stringify(TIPO_DOCUMENTO_TAMANO)));
    });
    this.actualizarDesplegable();
  }

  /**
   * Carga los tipos de documentos seleccionados desde el servicio.
   */
  public cargarTipoDocumentoSeleccionado(): void {
    this.avisoTrasladoService
      .obtenerTipoDocumentoSeleccionado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: DocumentosLista) => {
          this.tiposDeDocumentos = datos.datos;
          this.agregarDocumentos();
        }
      );
  }

  /**
   * Carga los anexos desde el servicio.
   */
  public cargarAnexos(): void {
    this.avisoTrasladoService
      .obtenerAnexos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: AnexosLista) => {
          this.tablaDeDatos.datos = datos.datos;
        }
      );
  }

  /**
   * Actualiza los desplegables con los tamaños de archivos.
   */
  actualizarDesplegable(): void {
    this.tiposDeDocumentos.forEach((tipoDocumento, index) => {
      tipoDocumento.archivoDisponible[0].descripcion = this.tamanosDeArchivos[index].nombreDelArchivo;
    });
  }

  /**
   * Actualiza el estado del store con los valores seleccionados en el formulario.
   */
  valorSeleccion(): void {
    this.store.setValorSeleccionado(this.tipoDocumentoFormulario.value.documentos);
  }

  /**
   * Maneja el cambio de archivo en el formulario.
   * 
   * @param {Event} event - Evento del cambio de archivo.
   * @param {number} index - Índice del archivo en el formulario.
   */
  cambioArchivo(event: Event, index: number): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files?.[0];
    if (FILE) {
      const SIZE_MB = FILE.size / (1024 * 1024);
      if (SIZE_MB > 3) {
        // eslint-disable-next-line no-alert
        alert('File size must be less than 3 MB');
        INPUT.value = '';
        this.tamanosDeArchivos[index] = JSON.parse(JSON.stringify(TIPO_DOCUMENTO_TAMANO));
        return;
      }
      this.tamanosDeArchivos[index].tamano = parseFloat(SIZE_MB.toFixed(2));
      this.tamanosDeArchivos[index].nombreDelArchivo = FILE.name;

      const READER = new FileReader();
      READER.onload = (e: ProgressEvent<FileReader>): void => {
        const IMG = new Image();
        IMG.onload = (): void => {
          this.tamanosDeArchivos[index].resolucion = `${IMG.width}x${IMG.height}`;
        };
        IMG.onerror = (): void => {
          this.tamanosDeArchivos[index].resolucion = 'N/A';
        };
        IMG.src = e?.target?.result as string;
      };
      this.store.setDocumentosDesplegable(this.tamanosDeArchivos);
      READER.readAsDataURL(FILE);
    }
  }

  /**
   * Adjunta los archivos y simula el progreso de carga.
   */
  adjuntarArchivos(): void {
    this.cargando = true;
    this.progreso = 0;
    this.modeloCercano();
    this.actualizarDesplegable();
    const INTERVAL = setInterval(() => {
      this.progreso += 10;
      if (this.progreso >= 100) {
        this.progreso = 100;
        clearInterval(INTERVAL);
        this.cargando = false;
        this.abiertoAnexos();
      }
    }, 200);
  }

  /**
   * Abre el modal para adjuntar documentos.
   */
  adjuntarDocumentos(): void {
    if (this.modalAdjuntar) {
      const MODAL_INSTANCE = new Modal(this.modalAdjuntar.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal actual.
   */
  modeloCercano(): void {
    this.closeModal.nativeElement.click();
  }

  /**
   * Abre el modal de anexos.
   */
  abiertoAnexos(): void {
    if (this.modalAnexos) {
      const MODAL_INSTANCE = new Modal(this.modalAnexos.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}