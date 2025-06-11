import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LISTA_DE_SECTORS, LISTA_DE_SECTORS_BAJA } from '../../constantes/constantes90303.enum';
import { ListaTabla, ListaTablaBaja } from '../../models/registro.model';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud90303State, Tramite90303Store } from '../../state/Tramite90303.store';
import { CatalogosService } from '../../service/catalogos.service';
import { CommonModule } from '@angular/common';
import { PlantasComponent } from "../../../../shared/components/plantas/plantas.component";
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';
import { SectorComponent } from "../../../../shared/components/sector/sector.component";
import { Tramite90303Query } from '../../state/Tramite90303.query';

/**
 * Componente para gestionar la modificación de datos en el trámite 90303.
 * Este componente incluye tablas dinámicas para sectores, plantas, mercancías y productores indirectos.
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, PlantasComponent, SectorComponent, ProducirMercanciasComponent, ProductorIndirectoComponent,ReactiveFormsModule],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit, OnDestroy, AfterViewInit {
   /**
     * Formulario de modificación
     * @type {FormGroup}
     */
    modificacionForm!: FormGroup;
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
  /**
   * ReplaySubject utilizado para gestionar la destrucción de observables.
   * Se emite un valor cuando el componente se destruye para cancelar las suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Indica si la tabla está en modo "Baja".
   */
  isBaja: boolean = true;

  /**
   * Enumeración que define las opciones de selección para las tablas dinámicas.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Lista de datos para la tabla de sectores activos.
   */
  public listaTabla = LISTA_DE_SECTORS;

  /**
   * Lista de datos para la tabla de sectores en baja.
   */
  public listaTablaBaja = LISTA_DE_SECTORS_BAJA;

  /**
   * Datos de la tabla de sectores activos.
   */
  listaTablaDatos: ListaTabla[] = [];

  /**
   * Datos de la tabla de sectores en baja.
   */
  listaTablaDatosBaja: ListaTablaBaja[] = [];

  /**
   * Datos de la tabla de plantas.
   */
  listaPlantasTabla: PlantasTabla[] = [];

  /**
   * Datos de la tabla de sectores.
   */
  listaSectorTabla: SectorTabla[] = [];

  /**
   * Datos de la tabla de mercancías.
   */
  listaTablaMercancia: Mercancias[] = [];

  /**
   * Datos de la tabla de productores indirectos.
   */
  listaTablaProductor: ProductorIndirecto[] = [];

  /**
   * Referencia a una función para encontrar elementos cercanos en el DOM.
   */
  findClose: any;
  /**
     * Estado actual de la solicitud.
     */
    public solicitudState!: Solicitud90303State;

  /**
   * Constructor del componente.
   * @param catalogo Servicio utilizado para obtener los datos de las tablas.
   * @param renderer Servicio para manipular el DOM.
   */
  constructor(private catalogo: CatalogosService, private renderer: Renderer2,
     private consultaioQuery: ConsultaioQuery,public fb: FormBuilder,
      public store: Tramite90303Store,
      private query: Tramite90303Query,
      private validacionesService: ValidacionesFormularioService,
  ) { 
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Método del ciclo de vida que se ejecuta después de que la vista se ha inicializado.
   * Configura un listener para manejar clics en el contenedor de la tabla.
   */
  ngAfterViewInit(): void {
    const CONTAINER = document.getElementById('tablecontainer');

    if (CONTAINER) {
      this.renderer.listen(CONTAINER, 'click', (event: Event) => {
        const BUTTON = this.findClose(event.target as HTMLElement);
        if (BUTTON) {
          const BUTTON_TEXT = BUTTON.textContent?.trim().toUpperCase();
          if (BUTTON_TEXT === 'BAJA' || BUTTON_TEXT === 'ACTIVAR') {
            this.isBaja = BUTTON_TEXT === 'BAJA';
            BUTTON.textContent = this.isBaja ? 'Activar' : 'BAJA';
          }
        }
      });
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener los datos de las tablas.
   */
  ngOnInit(): void {
     this.obtenerTablaLista();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
    this.obtenerTablaListaBaja();
    this.inicializarEstadoFormulario();

     this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
  }
/**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }
   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.modificacionForm.disable();
    } else {
      this.modificacionForm.enable();
    }
  }
  /**
   * Obtiene los datos de la tabla de sectores activos desde el servicio.
   */
  public obtenerTablaLista(): void {
    this.catalogo
      .obtenerTablaLista()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatos = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de sectores en baja desde el servicio.
   */
  public obtenerTablaListaBaja(): void {
    this.catalogo
      .obtenerTablaListaBaja()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatosBaja = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de plantas desde el servicio.
   */
  public obtenerTablaPlantas(): void {
    this.catalogo
      .obtenerTablaPlantas()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaPlantasTabla = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de sectores desde el servicio.
   */
  public obtenerTablaSector(): void {
    this.catalogo
      .obtenerTablaSector()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaSectorTabla = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de mercancías desde el servicio.
   */
  public obtenerTablaMercancia(): void {
    this.catalogo
      .obtenerTablaMercancia()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaMercancia = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de productores indirectos desde el servicio.
   */
  public obtenerTablaProductor(): void {
    this.catalogo
      .obtenerTablaProductor()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaProductor = data;
      });
  }

  /**
   * Maneja el evento de clic en una fila de la tabla.
   * @param event Evento de clic.
   */
  onFilaClic(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    if (TARGET.tagName === 'BUTTON' && TARGET.textContent?.trim() === 'BAJA') {
      this.isBaja = false;
      TARGET.textContent = 'Activar';
    }
    TARGET.textContent = 'Activar';
  }

   /**
   * Valida el formulario del destinatario.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.modificacionForm.invalid) {
      this.modificacionForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a validar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
   /**
     * Establece valores en el estado de la tienda.
     * @param form Formulario reactivo.
     * @param campo Nombre del campo del formulario.
     * @param metodoNombre Método de la tienda para actualizar el estado.
     */
    setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof Tramite90303Store
    ): void {
      const VALOR = form.get(campo)?.value;
      (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
   
  /**
   * Configura el formulario de modificación con los datos del donante y lo deshabilita.
   * Utiliza los valores del estado de la solicitud para inicializar el formulario.
   */
donanteDomicilio(): void {
    this.modificacionForm = this.fb.group({
       registroFederalContribuyentes: [{ value: this.solicitudState?.registroFederalContribuyentes, disabled: true }, [Validators.required]],
  representacionFederal: [{ value: this.solicitudState?.representacionFederal, disabled: true }, [Validators.required]],
  tipoModificacion: [{ value: this.solicitudState?.tipoModificacion, disabled: true }, [Validators.required]],
  modificacionPrograma: [{ value: this.solicitudState?.modificacionPrograma, disabled: true }, [Validators.required]],
  });
  }
  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Emite un valor en `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}