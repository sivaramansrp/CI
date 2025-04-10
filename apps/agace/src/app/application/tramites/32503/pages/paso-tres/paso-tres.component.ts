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
  public tramiteState!: Tramite32503State;
  public destroyNotifier$: Subject<void> = new Subject();
  tipoDocumentoFormulario!: FormGroup;
  TEXTOS = TEXTOS;
  tiposDeDocumentos: Documentos[] = [];
  @ViewChild('modalAdjuntar') modalAdjuntar!: ElementRef;
  @ViewChild('modalAnexos') modalAnexos!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  tamanosDeArchivos: ArchivoDocumentos[] = [];
  progreso: number = 0;
  cargando: boolean = false;
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

  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
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
  inicializarFormulario(): void {
    this.tipoDocumentoFormulario = this.fb.group({
      documentos: this.fb.array([])
    });
  }
  get documentos(): FormArray {
    return this.tipoDocumentoFormulario.get('documentos') as FormArray;
  }
  agregarDocumentos(): void {
    this.tiposDeDocumentos.forEach((item, i) => {
      this.documentos.push(this.fb.control(this.tramiteState?.valorSeleccionado[i], Validators.required));
      this.tamanosDeArchivos.push(this.tramiteState?.documentosDesplegable[i] ?? JSON.parse(JSON.stringify(TIPO_DOCUMENTO_TAMANO)));
    });
    this.actualizarDesplegable();
  }
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
  actualizarDesplegable(): void {
    this.tiposDeDocumentos.forEach((tipoDocumento, index) => {
      tipoDocumento.archivoDisponible[0].descripcion = this.tamanosDeArchivos[index].nombreDelArchivo;
    });
  }
  valorSeleccion(): void {
    this.store.setValorSeleccionado(this.tipoDocumentoFormulario.value.documentos);
  }
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
  adjuntarDocumentos(): void {
    if (this.modalAdjuntar) {
      const MODAL_INSTANCE = new Modal(this.modalAdjuntar.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  modeloCercano(): void {
    this.closeModal.nativeElement.click();
  }
  abiertoAnexos(): void {
    if (this.modalAnexos) {
      const MODAL_INSTANCE = new Modal(this.modalAnexos.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}