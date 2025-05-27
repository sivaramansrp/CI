
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { map, merge, Subject, Subscription, takeUntil } from 'rxjs';
import { Sectoresy } from '@libs/shared/data-access-user/src';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import sectoresTabla from 'libs/shared/theme/assets/json/90201/sectores-tabla.json';
import { SectoresTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud90201State,
  Tramite90201Store,
} from '../../../../estados/tramites/tramite90201.store';
import { Tramite90201Query } from '../../../../estados/queries/tramite90201.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

/**
 * Componente SectoresYMercancias que se utiliza para mostrar y gestionar los SectoresYMercancias.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * CatalogoSelectComponent,TablaDinamicaComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 *
 * @component
 */
@Component({
  selector: 'app-sectores-y-mercancias',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.scss',
})
export class SectoresYMercanciasComponent implements OnInit, OnDestroy {
  /**
   * Una instancia de FormGroup que representa el formulario para sectores.
   * Este formulario se utiliza para gestionar y validar los datos de entrada relacionados con sectores y mercancías.
   */
  public sectoresForm!: FormGroup;
  /**
   * Indica si un elemento está seleccionado.
   *
   * @type {boolean}
   */
  public seleccion: boolean = false;
  /**
   * Un array de objetos Catalogo que representa el catálogo de sectores.
   * Este array está inicialmente vacío y puede ser poblado con elementos Catalogo.
   */
  public sectorCatalogo: Catalogo[] = [];
  /**
   * Una propiedad pública que contiene el contenido de texto para el componente Sectores y Mercancias.
   * El contenido se importa del módulo `Sectoresy`.
   */
  public TEXTOS = Sectoresy;

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Representa el estado actual de la solicitud 90201.
   * 
   * @type {Solicitud90201State}
   * @public
   */
  public solicitudState!: Solicitud90201State;

   /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * 
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones a observables y evitar fugas de memoria.
   * 
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración para las columnas de la tabla.
   *
   * Este array define las columnas para una tabla, incluyendo el nombre del encabezado,
   * la clave para acceder a los datos en cada fila y el orden de las columnas.
   *
   * @type {ConfiguracionColumna<any>[]}
   *
   * @property {string} encabezado - El nombre del encabezado de la columna.
   * @property {Function} clave - Una función que toma un elemento y devuelve el valor para la columna.
   * @property {number} orden - El orden de la columna en la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Lista de sectores',
      clave: (item: any) => item.sectores,
      orden: 1,
    },
    {
      encabezado: 'Clave del sector',
      clave: (item: any) => item.claveDel,
      orden: 2,
    },
  ];

  /**
   * Un array de objetos `SectoresTabla` que representa los sectores.
   */
  public sectores: SectoresTabla[] = sectoresTabla;
  /**
   * Representa la selección de radio del enumerado TablaSeleccion.
   * Esta propiedad se utiliza para gestionar el estado de selección del botón de radio en el componente.
   */
  public radio = TablaSeleccion.RADIO;

  /**
   * Una instancia de Subscription que se utiliza para manejar la suscripción a eventos y liberar recursos.
   * Esta propiedad se utiliza para gestionar la suscripción a eventos y liberar recursos cuando el componente se destruye.
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();
 
  /**
   * Constructor del componente SectoresYMercanciasComponent.
   * 
   * @param _expansionDesvc Servicio para la expansión de productores.
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param tramite90201Store Store para el manejo del estado del trámite 90201.
   * @param tramite90201Query Query para consultar el estado del trámite 90201.
   * @param consultaioQuery Query para consultar el estado de consulta IO.
   * 
   * Al inicializar el componente, se suscribe al observable `selectConsultaioState$` para actualizar
   * la propiedad `esFormularioSoloLectura` y establecer el formulario de sectores según el estado de la sección.
   */
  constructor(
    private _expansionDesvc: ExpansionDeProductoresService,
    private fb: FormBuilder,
    private tramite90201Store: Tramite90201Store,
    private tramite90201Query: Tramite90201Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.establecerFormSectores();
      })
    )
    .subscribe()
  }

  
    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Inicializa el estado del formulario y carga los catálogos necesarios para el componente.
     */
    ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.inicializaCatalogos();
  }
 
  /**
   * Inicializa el formulario para el trámite 90201.
   * 
   * Este método suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   * y lo asigna a la propiedad `solicitudState`. Además, asegura que la suscripción se cancele correctamente
   * cuando el componente se destruya utilizando `takeUntil` con `destroyNotifier$`.
   * 
   * Posteriormente, llama al método `establecerFormSectores` para configurar los sectores del formulario.
   * 
   * @returns {void} No retorna ningún valor.
   */
  inicializarFormulario(): void{
       this.tramite90201Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;

           })
           
          ).subscribe()

          this.establecerFormSectores();
        }

  /**
   * Inicializa el estado del formulario según el modo de operación.
   *
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es verdadero),
   * guarda los datos actuales del formulario llamando a `guardarDatosFormulario()`.
   * En caso contrario, inicializa el formulario llamando a `inicializarFormulario()`.
   */
   inicializarEstadoFormulario(): void {

    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario();
    }  
  }

    /**
     * Guarda los datos del formulario de sectores y mercancías.
     * 
     * - Inicializa el formulario antes de realizar cualquier acción.
     * - Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), deshabilita todos los controles del formulario.
     * - Si el formulario no está en modo solo lectura, habilita todos los controles del formulario.
     * 
     * @remarks
     * Este método se utiliza para asegurar que el formulario tenga el estado correcto (habilitado o deshabilitado)
     * según el modo de solo lectura antes de guardar los datos.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.sectoresForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.sectoresForm.enable();
      } else {
      }
  }

  /**
   * Inicializa el `sectoresForm` con valores predeterminados y validadores.
   *
   * El formulario contiene los siguientes controles:
   * - `sector`: Un control de cadena inicializado con una cadena vacía.
   * - `fraccion`: Un control de cadena inicializado con una cadena vacía y un validador de longitud máxima de 8 caracteres.
   */
  public establecerFormSectores(): void {
    this.sectoresForm = this.fb.group({
      sector: [this.solicitudState?.sector],
      fraccion: [this.solicitudState?.fraccion, Validators.maxLength(8)],
    });
  }

  /**
   * Inicializa los datos del catálogo obteniendo el catálogo de sectores del servicio.
   * Los datos obtenidos se asignan a la propiedad `sectorCatalogo`.
   *
   * Este método utiliza operadores de RxJS para manejar la obtención de datos asíncronos y
   * su transformación.
   *
   * @private
   */
  private inicializaCatalogos(): void {
    const CATALOGO$ = this._expansionDesvc.getSectorCatalog().pipe(
      map((resp) => {
        this.sectorCatalogo = resp.data;
      })
    );

    this.subscription.add(merge(CATALOGO$).subscribe());
  }

  /**
   * Establece la propiedad `seleccion` a `true`.
   * Este método se utiliza para indicar que se ha seleccionado un sector.
   */
  public sectorSeleccion() {
    this.seleccion = true;
  }

  /**
   * Establece la propiedad `seleccion` a `false`.
   * Este método se utiliza para indicar que no se ha seleccionado un sector.
   */
  ngOnDestroy(): void {
   this.destroyNotifier$.next();
   this.destroyNotifier$.complete();
  }

  /**
   * Establece los valores del formulario en el store.
   * Este método se utiliza para actualizar los valores del formulario en el store.
   * @param form
   * @param campo
   * @param metodoNombre
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite90201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite90201Store[metodoNombre] as (value: any) => void)(VALOR);
  }
}
