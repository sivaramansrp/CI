import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, Notificacion, NotificacionesComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, merge, takeUntil } from 'rxjs';

import {
  Solicitud90201State,
  Tramite90201Store,
} from '../../../../estados/tramites/tramite90201.store';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { ExpansionDeProductoresService } from '@libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';

import { FRACCION_TABLA, SECTORES_TABLA } from '@libs/shared/data-access-user/src/core/enums/90201/productor-indirecto-tabla.enum';
import { MercanciasTabla, SectoresTabla } from '@libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { SECTORESY } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite90201Query } from '../../../../estados/queries/tramite90201.query';
import mercancia from '@libs/shared/theme/assets/json/90201/mercancia-tabla.json';
import sectoresTabla from '@libs/shared/theme/assets/json/90201/sectores-tabla.json';

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
    AlertComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    NotificacionesComponent
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
   * Representa una nueva notificación que será utilizada en el componente.
   * 
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Objeto de notificación utilizado para manejar la eliminación de una mercancía.
   * Esta propiedad debe ser asignada con una instancia del tipo `Notificacion`,
   * que encapsula los detalles y el estado de la notificación relacionada con
   * la eliminación de una entrada de mercancía dentro del componente.
   */
  public eliminarMercanciaNotificacion!: Notificacion;
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
   * El contenido se importa del módulo `SECTORESY`.
   */
  public TEXTOS = SECTORESY;

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false;

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
   * Configuración de la tabla utilizada para mostrar los sectores y mercancías.
   * 
   * Esta propiedad almacena la configuración de columnas, estilos y opciones
   * específicas para la tabla de sectores y mercancías, utilizando la constante
   * `SECTORES_TABLA`.
   */
  public configuracionTabla = SECTORES_TABLA;
  /**
   * Configuración de la tabla utilizada para mostrar las fracciones.
   * 
   * Esta propiedad almacena la configuración de columnas, estilos y opciones
   * específicas para la tabla de fracciones, utilizando la constante `FRACCION_TABLA`.
   */
 public configuracionFraccion = FRACCION_TABLA;
  

  /**
   * Un array de objetos `SectoresTabla` que representa los sectores.
   */
  public sectores: SectoresTabla[] = sectoresTabla;

 /**
  * Arreglo de sectores y mercancías que se utiliza para almacenar los datos de los sectores y mercancías.
  * Este arreglo se inicializa con los datos de `sectoresTabla`, que es un arreglo
  */
  public mercancias: MercanciasTabla[] = mercancia;

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
 * Arreglo que almacena los datos seleccionados de la tabla de sectores.
 * Este arreglo se utiliza para almacenar los sectores seleccionados por el usuario en la tabla.
*/
  public seleccionadoDatos: SectoresTabla[] = [];
/**
 * Arreglo que almacena los datos seleccionados de la tabla de mercancías.
 * Este arreglo se utiliza para almacenar las mercancías seleccionadas por el usuario en la tabla.
 */
  public seleccionadoMercancia: MercanciasTabla[] = [];
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

  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa los catálogos necesarios y realiza la consulta inicial.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.inicializarConsulta();
  }

  /**
   * Inicializa la consulta y el formulario asociado.
   * 
   * Suscribe al estado de consulta utilizando un observable, actualizando la propiedad
   * `esFormularioSoloLectura` según el estado de solo lectura (`readonly`) recibido.
   * Además, inicializa el formulario llamando a `inicializarFormulario()`.
   * 
   * @remarks
   * La suscripción se mantiene activa hasta que se emite un valor en `destroyNotifier$`,
   * lo que previene fugas de memoria.
   */
  inicializarConsulta(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
    this.inicializarFormulario();
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
  inicializarFormulario(): void {
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
    if (this.esFormularioSoloLectura) {
      this.sectoresForm.disable();
    }
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
  public sectorSeleccion(): void {
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
    (this.tramite90201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Muestra una notificación de confirmación solicitando al usuario que confirme la eliminación
   * del sector seleccionado. La notificación incluye botones personalizables para
   * aceptar y cancelar, y está estilizada como una alerta de peligro.
   * @returns void
   */
  public eliminarSector():void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Está seguro que desea eliminar el sector seleccionado?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  }

  /**
   * Maneja la selección de una fila en la tabla agregando los datos de la fila seleccionada al arreglo `seleccionadoDatos`.
   * @param event - Los datos de la fila seleccionada de tipo `SectoresTabla`.
   */
  public seleccionDeFilaDeTabla(event: SectoresTabla): void {
    this.seleccionadoDatos.push(event);
  }
  /**
   * Maneja la selección de una fila en la tabla de mercancías agregando los datos de la fila seleccionada al arreglo `seleccionadoMercancia`.
   * @param event - Los datos de la fila seleccionada de tipo `MercanciasTabla`.
   */
  public seleccionDeFilaDeTablaMercancias(event: MercanciasTabla): void { 
    this.seleccionadoMercancia.push(event);
  }
  /**
   * Elimina un "pedimento" (documento aduanal) seleccionado del arreglo `sectores` si la bandera `borrar` es verdadera.
   *
   * @param borrar - Bandera booleana que indica si se debe eliminar el pedimento seleccionado.
   *
   * El método busca el índice del elemento seleccionado en el arreglo `sectores` comparando las propiedades `claveDel` y `sectores`
   * con el primer elemento del arreglo `seleccionadoDatos`. Si lo encuentra, elimina el elemento del arreglo.
   */
  public eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      const INDEX = this.sectores.findIndex((sector: SectoresTabla) => sector.claveDel === this.seleccionadoDatos[0].claveDel && sector.sectores === this.seleccionadoDatos[0].sectores);
      this.sectores.splice(INDEX, 1);
    }
  }
 /**
  * 
  * @param borrar - Bandera booleana que indica si se debe eliminar la mercancía seleccionada.
  * El método busca el índice del elemento seleccionado en el arreglo `mercancias` comparando las propiedades `claveDel` y `fraccion`
  * con el primer elemento del arreglo `seleccionadoMercancia`. Si lo encuentra, elimina el elemento del arreglo.
  */
    public eliminarPedimentoMercancia(borrar: boolean): void {
    if (borrar) { 
      const INDEX = this.mercancias.findIndex((sector: MercanciasTabla) => sector.claveDel === this.seleccionadoMercancia[0].claveDel && sector.fraccion === this.seleccionadoMercancia[0].fraccion);
      this.mercancias.splice(INDEX, 1);
    }
  }
  /**
   * Agrega un nuevo sector al arreglo `sectores` utilizando el valor del control 'sector' del formulario `sectoresForm`.
   * Si el control 'sector' tiene un valor, se crea un nuevo objeto con la clave 'IV' y el sector proporcionado,
   * y se agrega al arreglo `sectores`. Luego, se resetea el formulario
   */
   agregarSector(): void {
    const SECTOR = this.sectoresForm.get('sector')?.value;

      if (SECTOR) {
      this.sectores.push({
        sectores: SECTOR,
        claveDel: 'IV'
      });
      this.sectoresForm.reset();
    } 
    }
/**
 * Agrega una nueva mercancía al arreglo `sectores` utilizando el valor del control 'fraccion' del formulario `sectoresForm`.
 * Si el control 'fraccion' tiene un valor, se crea un nuevo objeto con la
 * clave 'IV' y la fracción proporcionada, y se agrega al arreglo `sectores`.
 * Luego, se resetea el formulario.
 */
    agregarMercancia(): void {
      const FRACCION = this.sectoresForm.get('fraccion')?.value;
      if (FRACCION) {
        this.mercancias.push({
          fraccion: FRACCION,
          claveDel: 'IV'
        });
        this.sectoresForm.reset();
      }
    }
  /**
   * Muestra una notificación solicitando al usuario que seleccione la fracción que desea eliminar.
   * Asigna a la propiedad `eliminarMercanciaNotificacion` una notificación de alerta de tipo 'danger',
   * incluyendo un mensaje, título y texto de los botones. La notificación no puede ser cerrada por el usuario y
   * desaparecerá automáticamente después de 2000 milisegundos.
   */
  public eliminarMercancia(): void {
    this.eliminarMercanciaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Seleccione la fraccion que desea eliminar.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  } 
}
