import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConsultaioQuery, CrossListLable } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260605State, Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
/**
 * Componente para gestionar el formulario de información aduanera.
 * 
 * @export
 * @class AduanerasInformacionesComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
/**
 * Componente para gestionar la información aduanera en el formulario de trámites.
 * 
 * Este componente permite seleccionar, agregar y remover aduanas disponibles,
 * así como gestionar el estado del formulario reactivo relacionado con la información aduanera.
 * 
 * @export
 * @class AduanerasInformacionesComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-aduaneras-informaciones',
  standalone: true,
  templateUrl: './aduaneras-informaciones.component.html',
  styleUrls: ['./aduaneras-informaciones.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CrosslistComponent]
})
export class AduanerasInformacionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la información aduanera.
   * 
   * @type {FormGroup}
   * @memberof AduanerasInformacionesComponent
   */
  aduanerasInformacionesForm!: FormGroup;


  /**
    * Lista de componentes Crosslist disponibles en la vista.
    * Utilizado para gestionar las listas de países en diferentes secciones.
    */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Aduanas seleccionadas.
   * 
   * @type {{ id: number; name: string }[]}
   * @memberof AduanerasInformacionesComponent
   */
  aduanasSeleccionadas: { id: number; name: string }[] = [];

  /**
   * Aduanas disponibles.
   * 
   * @type {{ id: number; name: string }[]}
   * @memberof AduanerasInformacionesComponent
   */
  aduanasDisponibles: string[] = [];
  /**
    * Etiquetas para la lista cruzada de países de origen.
    */
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles:',
    derecha: 'Aduanas seleccionadas*:'
  };

  /**
    * Botones para gestionar la lista cruzada de países de procedencia.
    */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Arreglo que contiene los identificadores de las aduanas seleccionadas por el usuario.
   * 
   * Cada elemento del arreglo representa una aduana disponible que ha sido seleccionada.
   */
  aduanasDisponiblesSeleccionadas: string[] = [];

  /**
  * Maneja el cambio de selección de países de origen.
  * @param events Lista de países seleccionados.
  */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.aduanasDisponiblesSeleccionadas = events;
  }

  /**
   * Índice seleccionado para agregar o remover aduanas.
   * 
   * @type {number}
   * @memberof AduanerasInformacionesComponent
   */
  indiceSeleccionado: number = 0;

  /**
   * Índice para remover aduanas.
   * 
   * @type {number}
   * @memberof AduanerasInformacionesComponent
   */
  indiceRemover: number = 0;



  /**
   * Sujeto para notificar la destrucción del componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof AduanerasInformacionesComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud.
   * 
   * @type {Solicitud260605State}
   * @memberof AduanerasInformacionesComponent
   */
  public solicitudState!: Solicitud260605State;

  /**
   * Indica si el formulario es válido.
   * 
   * @type {boolean}
   * @memberof AduanerasInformacionesComponent
   */
  esFormularioValido: boolean = false;

  /**
    * Indica si el formulario está en modo solo lectura.
    * Cuando es `true`, los campos del formulario no se pueden editar.
    */
  public esFormularioSoloLectura: boolean = false;
  /**
   * Crea una instancia de AduanerasInformacionesComponent.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder.
   * @param {Tramite260605Store} tramite260605Store - Store para gestionar el estado.
   * @param {Tramite260605Query} tramite260605Query - Query para obtener el estado.
   * @memberof AduanerasInformacionesComponent
   */
  constructor(
    private fb: FormBuilder,
    private tramite260605Store: Tramite260605Store,
    private tramite260605Query: Tramite260605Query,
    private modificatNoticeService: ModificatNoticeService,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
      * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
      *
      * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
      * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
      * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
      */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario reactivo `aduanerasInformacionesForm` con los valores actuales del estado de la solicitud.
   * 
   * Suscribe al observable `selectSolicitud$` para obtener el estado más reciente de la solicitud y lo asigna a `solicitudState`.
   * Luego, crea el formulario utilizando los valores de `solicitudState` y aplica las validaciones requeridas.
   * 
   * @remarks
   * - Utiliza el operador `takeUntil` para limpiar la suscripción cuando el componente se destruye.
   * - Los campos del formulario incluyen `numeroDePermiso` y `cstumbresAtuales`, ambos requeridos.
   */
  inicializarFormulario(): void {
    this.tramite260605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.aduanerasInformacionesForm = this.fb.group({
      numeroDePermiso: [this.solicitudState?.numeroDePermiso, Validators.required],
      cstumbresAtuales: [this.solicitudState?.costumbresActuales, Validators.required],
    });
  }

  /**
    * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
    * Luego reinicializa el formulario con los valores actualizados desde el store.
    */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.esFormularioValido = true;
      this.aduanerasInformacionesForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.aduanerasInformacionesForm.enable();
    }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }




  /**
   * Inicializa el componente.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obteneraduanasDisponiblesdatos();
  }


  /**
   * Obtiene la lista de aduanas disponibles desde el servicio `modificatNoticeService`
   * y actualiza la propiedad `aduanasDisponibles` con la respuesta obtenida.
   *
   * @returns {void} No retorna ningún valor.
   */
  public obteneraduanasDisponiblesdatos(): void {
    this.modificatNoticeService.obteneraduanasDisponiblesdatos().subscribe((response) => {
      this.aduanasDisponibles = response;
    });
  }


  /**
   * Método ejecutado cuando se envía el formulario.
   * Establece la variable `esFormularioValido` a `true`.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  enEnviar(): void {
    this.esFormularioValido = true;
  }

  /**
   * Establece valores en el store.
   * 
   * @param {FormGroup} form - El grupo de formularios.
   * @param {string} campo - El nombre del campo.
   * @param {keyof Tramite260605Store} metodoNombre - El nombre del método del store.
   * @memberof AduanerasInformacionesComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260605Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260605Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Establece el índice seleccionado.
   * 
   * @param {number} indice - El índice a establecer.
   * @param {string} tipo - El tipo de operación ('add' o 'remove').
   * @memberof AduanerasInformacionesComponent
   */
  setIndiceSeleccionado(indice: number, tipo: string): void {
    if (tipo === 'add') {
      this.indiceSeleccionado = indice;
    } else if (tipo === 'remove') {
      this.indiceRemover = indice;
    }
  }



  /**
   * Establece las aduanas seleccionadas en el store.
   * 
   * @param {keyof Tramite260605Store} metodoNombre - El nombre del método del store.
   * @param {{ id: number; name: string }[]} values - Las aduanas seleccionadas.
   * @memberof AduanerasInformacionesComponent
   */
  setAduanasSeleccionadas(metodoNombre: keyof Tramite260605Store, values: { id: number; name: string }[]): void {
    (this.tramite260605Store[metodoNombre] as (value: { id: number; name: string }[]) => void)(values);
  }

  /**
   * Destruye el componente.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}