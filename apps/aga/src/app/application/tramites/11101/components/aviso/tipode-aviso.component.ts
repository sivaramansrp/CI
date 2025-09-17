import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { Tramite11101Store, Tramitenacionales11101State } from '../../estados/tramite11101.store';
import { CommonModule } from '@angular/common';
import { MercanciaComponent } from '../mercancia/mercancia.component';
import { Tramite11101Query } from '../../estados/tramite11101.query';
import { TramiteFolioService } from '../../service/servicios-extraordinarios.service';

/**
 * Componente Angular para gestionar el formulario de aviso en el trámite 11101.
 *
 * Este componente permite capturar y mostrar los datos del aviso, alternar entre los modos de carga masiva y manual,
 * y controlar el estado de solo lectura del formulario según el estado de la consulta.
 * Utiliza formularios reactivos para la validación y captura de datos, y se integra con servicios y stores para
 * manejar el estado global del trámite.
 *
 * @remarks
 * - El formulario puede estar en modo solo lectura, deshabilitando todos los controles para evitar modificaciones.
 * - Permite alternar entre los modos de carga masiva y manual, afectando la interfaz y la lógica del formulario.
 * - Se suscribe a los estados de consulta y trámite para mantener los datos sincronizados y evitar fugas de memoria.
 *
 * @example
 * ```html
 * <app-tipode-aviso></app-tipode-aviso>
 * ```
 *
 * @see Tramite11101Query
 * @see TramiteFolioService
 * @see Tramite11101Store
 * @see ConsultaioQuery
 */
@Component({
  selector: 'app-tipode-aviso',
  templateUrl: './tipode-aviso.component.html',
  styleUrls: ['./tipode-aviso.component.scss'],
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule, MercanciaComponent, CommonModule, CatalogoSelectComponent]
})
export class TipodeAvisoComponent implements OnInit, OnDestroy {

  /** 
   * Indica si la carga masiva está habilitada.
   * @type {boolean}
   */
  cargaMasiva: boolean = false;

  /**
   * Formulario reactivo para capturar los datos del aviso.
   * @type {FormGroup}
   */
  avisoForm!: FormGroup;

  /**
  * Subject para destruir notificador.
  */
  consultaDatos!: ConsultaioState;

  /**
  * Indica si el formulario se encuentra en modo solo lectura.
  * Si es `true`, los controles del formulario estarán deshabilitados para evitar modificaciones.
  */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si la opción manual está actualmente seleccionada.
   * Se utiliza para alternar elementos de la interfaz o lógica basada en el estado de selección manual.
   */
  isManualSelected: boolean = false;

  /**
   * Lista de catálogos disponibles para aduanas.
   */
  entidadadfederativa!: Catalogo[];

  /**
   * Lista de catálogos disponibles para alcadilamunicipio.
   */
  alcadilamunicipio!: Catalogo[];

  /**
   * Lista de catálogos disponibles para colonia.
   */
  colonia!: Catalogo[];

  /**
   * Constructor de la clase. Inicializa el FormBuilder.
   * @param {FormBuilder} formBuilder - Servicio para construir formularios reactivos.
   * @param {Tramite11101Query} query - Servicio para consultar el estado del trámite.
   * @param {TramiteFolioService} service - Servicio para manejar la lógica del trámite.
   * @param {Tramite11101Store} store - Almacén para manejar el estado del trámite.
   * @param {ConsultaioQuery} consultaioQuery - Servicio para consultar el estado de la consulta. 
   * @constructor
   * @description
   * Este constructor inyecta los servicios necesarios para manejar el estado del formulario y la consulta.
   * Utiliza `ConsultaioQuery` para obtener el estado de la consulta y configurar el formulario reactivo.
   * También inicializa el estado del formulario según si es de solo lectura o no.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private formBuilder: FormBuilder,
    private query: Tramite11101Query,
    private tramiteService: TramiteFolioService,
    private store: Tramite11101Store
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario()
        })
      )
      .subscribe()
  }
  /**
   * Estado de la solicitud que contiene los datos del formulario.
   * @type {Tramitenacionales11101State}
   */
  public solicitudState!: Tramitenacionales11101State;
  /**
   * Notificador para cancelar suscripciones activas al destruir el componente.
   * Se emite un valor y se completa en el método `ngOnDestroy` para evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject<void>();
  /**
   * Método de inicialización del componente.
   * Configura el formulario reactivo con los campos necesarios.
   */
  ngOnInit(): void {
    this.query.selectSeccionState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })).subscribe()
    this.donanteDomicilio();
    this.inicializaCatalogos();
  }

  /**
* Inicializa el estado del formulario según si es de solo lectura o no.
* Si es de solo lectura, guarda los datos del formulario; de lo contrario, inicializa el formulario con los datos del donante y domicilio.
*/
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.avisoForm.disable();
    } else {
      this.avisoForm.enable();
    }
  }

  /**
 * Inicializa el formulario reactivo para capturar los datos del aviso.
 * 
 * Asigna los valores iniciales desde `this.solicitudState` y aplica las validaciones requeridas
 * para cada campo del formulario. Al finalizar, llama a `inicializarEstadoFormulario()` para
 * ajustar el estado del formulario según el modo de solo lectura.
 */
  donanteDomicilio(): void {
    this.avisoForm = this.formBuilder.group({
      numeroderegistro: [
        this.solicitudState?.numeroderegistro,
        [Validators.required, Validators.maxLength(20)]
      ],
      NobmreDenominationRazonSocial: [
        this.solicitudState?.NobmreDenominationRazonSocial,
        [Validators.required, Validators.maxLength(100)]
      ],
      rfctaxid: [
        this.solicitudState?.rfctaxid,
        [Validators.required]
      ],
      Telefono: [
        this.solicitudState?.Telefono,
        [Validators.required, Validators.maxLength(15)]
      ],
      correoelectronico: [
        this.solicitudState?.correoelectronico,
        [Validators.required, Validators.email]
      ],
      entidadadfederativa: [
        this.solicitudState?.entidadadfederativa,
        [Validators.required]
      ],
      alcadilamunicipio: [
        this.solicitudState?.alcadilamunicipio,
        [Validators.required]
      ],
      colonia: [
        this.solicitudState?.colonia,
        [Validators.required]
      ],
      codigopostal: [
        this.solicitudState?.codigopostal,
        [Validators.required, Validators.maxLength(5)]
      ],
      calle: [
        this.solicitudState?.calle,
        [Validators.required]
      ],
      numeroletraexterior: [
        this.solicitudState?.numeroletraexterior,
        [Validators.required]
      ],
      numeroletrainterior: [
        this.solicitudState?.numeroletrainterior,
        [Validators.maxLength(30)]
      ],
      entrecalle: [
        this.solicitudState?.entrecalle,
        [Validators.maxLength(100)]
      ],
      ycalle: [
        this.solicitudState?.ycalle,
        [Validators.maxLength(100)]
      ]
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Maneja la selección de la aduana.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  entidadadFederativaSeleccion(): void {
    const ENTIDADFEDERATIVA = this.avisoForm.get('entidadadfederativa')?.value;
    this.store.setEntidadadfederativa(ENTIDADFEDERATIVA);
  }

  /**
   * Maneja la selección del alcadilamunicipio.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  alcadilamunicipioSeleccion(): void {
    const ALCADILAMUNICIPIO = this.avisoForm.get('alcadilamunicipio')?.value;
    this.store.setAlcadilamunicipio(ALCADILAMUNICIPIO);
  }

  /**
   * Maneja la selección de la colonia.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  coloniaSeleccion(): void {
    const COLONIA = this.avisoForm.get('colonia')?.value;
    this.store.setColonia(COLONIA);
  }

  /**
   * Inicializa los catálogos necesarios para el componente.
   */
  inicializaCatalogos(): void {
    const ENTIDADFEDERATIVA$ = this.tramiteService
      .getEntidadfederativa()
      .pipe(
        map((resp) => {
          this.entidadadfederativa = resp.data;
        })
      );

    const ALCADILAMUNICIPIO$ = this.tramiteService
      .getAlcadilamunicipio()
      .pipe(
        map((resp) => {
          this.alcadilamunicipio = resp.data;
        })
      );

    const COLONIA$ = this.tramiteService
      .getColonia()
      .pipe(
        map((resp) => {
          this.colonia = resp.data;
        })
      );

      merge(
        ENTIDADFEDERATIVA$,
        ALCADILAMUNICIPIO$,
        COLONIA$
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
    }

  /**
   * Cambia el modo entre manual y carga masiva.
   * @param {boolean} isManual - Indica si el modo manual debe ser seleccionado.
   */
  setManual(isManual: boolean): void {
    if (this.esFormularioSoloLectura) {
      this.isManualSelected = isManual;
      this.cargaMasiva = !isManual;
    }
  }

  /**
   * Establece los valores en el store.
   * @param form El formulario del cual se obtienen los valores.
   * @param campo El campo del formulario.
   * @param metodoNombre El nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}