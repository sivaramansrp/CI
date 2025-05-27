/**
 * @class RepresentacionFederalComponent
 * @description
 * Este componente gestiona la representación federal dentro de un formulario.
 * Permite al usuario seleccionar una entidad federativa y su respectiva representación federal.
 *
 * @since 1.0.0
 * @version 1.0.0
 * @license MIT
 *
 * @selector app-representacion-federal
 * @standalone true
 * @requires CommonModule
 * @requires ReactiveFormsModule
 * @requires CatalogoSelectComponent
 * @requires TituloComponent
 *
 * @templateUrl ./representacion-federal.component.html
 * @styleUrls ['./representacion-federal.component.scss']
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  RepresentacionFederalService,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { Subject, Subscription, map, takeUntil } from 'rxjs';

import { Tramite120402State, Tramite120402Store } from '../../estados/tramites/tramite120402.store';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

import { Tramite120402Query } from '../../estados/queries/tramite120402.query';


/**
 * @class RepresentacionFederalComponent
 * @description
 * Componente de Angular encargado de manejar la representación federal dentro de un formulario.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './representacion-federal.component.html',
  styleUrls: ['./representacion-federal.component.scss'],
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {

  /**
    * Indica si el formulario está en modo solo lectura.
    * Cuando es `true`, los campos del formulario no se pueden editar.
    */
    esFormularioSoloLectura: boolean = false;  
  
      /**
     * Subject para notificar la destrucción del componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
     /**
     * Suscripción a los cambios en el formulario react
     */
    private subscription: Subscription = new Subscription();
  
      /**
     * Estado de la solicitud de la sección 301.
     */
    public solicitudState!: Tramite120402State;

       /**
   * @property {FormGroup} representacionForm
   * @description
   * Formulario reactivo que maneja la selección de entidad federativa y representación federal.
   * Se inicializa en `ngOnInit()`.
   *
   * @access public
   */
  public representacionForm!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property {Catalogo[]} entidad
   * @description
   * Lista de entidades federativas cargadas desde un archivo JSON.
   * Se usa para poblar el select de entidades en el formulario.
   *
   * @access public
   */
  public entidad: Catalogo[] = [];

  /**
   * @property {Catalogo[]} representacion
   * @description
   * Lista de representaciones federales cargadas desde un archivo JSON.
   * Se usa para poblar el select de representaciones en el formulario.
   *
   * @access public
   */
  public representacion: Catalogo[] = [];

    /**
   * @property {Catalogo[]} allRepresentaciones
   * @description
   * Almacena todas las opciones de representaciones federales disponibles.
   * Se utiliza para filtrar y mostrar las representaciones según la entidad seleccionada.
   */
  public allRepresentaciones: Catalogo[] = [];

  /**
   * @constructor
   * @description
   * Constructor que inyecta `FormBuilder` para la creación del formulario reactivo.
   *
   * @param {FormBuilder} fb - Servicio de Angular para construir formularios reactivos.
   * @access public
   */
  constructor(
    private fb: FormBuilder,
    private service: RepresentacionFederalService,
    private tramite120402Store: Tramite120402Store,
    private tramite120402Query: Tramite120402Query,
    private consultaioQuery: ConsultaioQuery,
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
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

    /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.initializeForm();
    }  
    //this.getMercancia();
  }

     /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.initializeForm();
      if (this.esFormularioSoloLectura) {
        this.representacionForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.representacionForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }
    /**
   * @method ngOnInit
   * @description
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario reactivo, carga las entidades y representaciones federales,
   * y suscribe a los cambios en la selección de entidad para actualizar las opciones de representación.
   * Además, sincroniza los valores del formulario con los observables del store para mantener el estado actualizado.
   *
   * - Inicializa el formulario y carga los catálogos de entidad y representación.
   * - Escucha los cambios en el campo 'entidad' para filtrar las representaciones disponibles.
   * - Sincroniza los valores seleccionados desde el store con el formulario.
   *
   * @returns {void}
   */

 public ngOnInit(): void {
    this.initializeForm();
    this.loadEntidad();
    this.loadRepresentacion();
     this.inicializarEstadoFormulario();
    this.representacionForm.get('entidad')?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((entidad) => {
      this.updateRepresentacionOptions(entidad);
      this.representacionForm.get('representacion')?.setValue(''); // Reset representacion
    });
 
  }
 
  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * @method initializeForm
   * @description
   * Inicializa el formulario reactivo con los campos requeridos.
   * Se establecen valores vacíos por defecto.
   *
   * @returns {void}
   * @access private
   */
  private initializeForm(): void {
    this.subscription.add(
      this.tramite120402Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.representacionForm = this.fb.group({
      /**
       * @property {string} entidad
       * @description
       * Campo del formulario para la selección de la entidad federativa.
       * Se inicializa como una cadena vacía.
       */
      entidad: ['', [Validators.required]],

      /**
       * @property {string} representacion
       * @description
       * Campo del formulario para la selección de la representación federal.
       * Se inicializa como una cadena vacía.
       */
      representacion: ['', [Validators.required]],
    });
  }

 /**
   * @method loadEntidad
   * @description
   * Carga la información de las entidades federativas desde el servicio correspondiente
   * y la asigna a la propiedad local `entidad` para poblar el select en el formulario.
   * Utiliza un observable para manejar la suscripción y evitar fugas de memoria.
   *
   * @returns {void}
   */
  loadEntidad(): void {
    this.service
      .getEntidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.entidad = data;
       
       });
  }

   /**
   * @method loadRepresentacion
   * @description
   * Carga la información de las representaciones federales desde el servicio correspondiente
   * y la asigna a la propiedad local `allRepresentaciones` para mantener todas las opciones disponibles.
   * Posteriormente, actualiza las opciones de representación mostradas según la entidad seleccionada en el formulario.
   * Utiliza un observable para manejar la suscripción y evitar fugas de memoria.
   *
   * @returns {void}
   */
  loadRepresentacion(): void {
    this.service
      .getRepresentacion()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.allRepresentaciones = data; // Store all options
      this.updateRepresentacionOptions(this.representacionForm.get('entidad')?.value);
      });
  }
 
    /**
   * @method updateRepresentacionOptions
   * @description
   * Filtra y actualiza la lista de representaciones federales disponibles según la entidad seleccionada.
   * Si hay una entidad seleccionada, se muestran solo las representaciones relacionadas con dicha entidad.
   * Si no hay entidad seleccionada, la lista de representaciones se vacía.
   *
   * @param {Catalogo | null} selectedEntidad - Entidad federativa seleccionada en el formulario.
   * @returns {void}
   */
  public updateRepresentacionOptions(selectedEntidad: Catalogo | null): void {
    if (selectedEntidad) {
      this.representacion = this.allRepresentaciones.filter(
        (e => e.relacionadaUmtId === Number(selectedEntidad))
      );
    } else {
      this.representacion = [];
    }
  }
 
 
 
    /**
   * @method setValoresStore
   * @description
   * Actualiza el valor de un campo específico en el store utilizando el método correspondiente.
   * Obtiene el valor del campo del formulario y lo envía al método indicado del store para mantener sincronizado el estado global.
   *
   * @param {FormGroup} form - Formulario reactivo del cual se obtiene el valor.
   * @param {string} campo - Nombre del campo del formulario cuyo valor se actualizará en el store.
   * @param {keyof Tramite120402Store} metodoNombre - Nombre del método del store que se debe invocar para actualizar el valor.
   * @returns {void}
   */
   setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite120402Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite120402Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
 
 
  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param nombreControl - Nombre del control a verificar.
   * @returns True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.representacionForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite120402Query.selectSolicitud$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.solicitudState = data;
      }
    );
  }

     /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
   setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite120402Store.setTramite120402State({
      [control]: VALOR
    });
  }
}
