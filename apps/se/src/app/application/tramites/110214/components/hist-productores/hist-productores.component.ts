import { Catalogo, HistoricoColumnas, SeleccionadasTabla } from '../../models/validar-inicialmente-certificado.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110214State, Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HistoricoProductoresComponent } from '../../../../shared/components/historico-productores/historico-productores.component';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
@Component({
  selector: 'app-hist-productores',
  standalone: true,
  imports: [
    CommonModule,
    HistoricoProductoresComponent
  ],
  templateUrl: './hist-productores.component.html',
  styleUrl: './hist-productores.component.scss',
})
export class HistProductoresComponent implements OnInit, OnDestroy {

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: { [key: string]: unknown };

  /**
   * Solicitud actual del trámite.
   */
  public solicitudState!: Tramite110214State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

   /**
   * @public
   * @property
   * @type { [key: string]: unknown}
   * @comando
   * Este objeto debe ser inicializado antes de su uso para evitar errores.
   */
  public agregarDatosProductor!: { [key: string]: unknown };

  /**
   * Lista de productores disponibles para el exportador.
   */
  public productoresExportador: HistoricoColumnas[] = [];

  /**
   * @property {MercanciaTabla[]} mercancia - Arreglo que contiene información de las mercancías.
   * @command Este arreglo se utiliza para almacenar y gestionar los datos relacionados con las mercancías en el componente.
   */
  public mercancia: SeleccionadasTabla[] = [];

  /**
   * @property {boolean} ocultarFax
   * Indica si el campo de fax debe estar oculto o visible en la interfaz de usuario.
    * @default true
  */
  public ocultarFax: boolean = false;

  /**
   * @property esTipoDeSeleccionado
   * @type {boolean}
   * @description Indica si el tipo seleccionado es válido o está activo.
   */
  public esTipoDeSeleccionado: boolean = true;

   /**
   * @property {Catalogo[]} optionsTipoFactura
   * @description Arreglo que contiene las opciones disponibles para el tipo de factura.
   * @command Este arreglo se utiliza para poblar un componente de selección en la interfaz de usuario.
   */
  public optionsTipoFactura: Catalogo[] = [];

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false;

  /** Indica si el formulario es válido. */
  public isFormValid: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite110214Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110214Query} tramiteQuery - Query para obtener el estado del trámite.
  */
  constructor(
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private certificadoDeService: ValidarInicialmenteCertificadoService,
    private consultaQuery: ConsultaioQuery
  ) {
    //
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.tramiteQuery.formulario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();

    this.tramiteQuery.datosProductorFormulario$.pipe(
      takeUntil(this.destroyNotifier$), map((seccionState) => {
        this.agregarDatosProductor = seccionState;
      })
    ).subscribe();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    this.cargarProductorPorExportador();
    this.cargarMercancia();
    if (this.solicitudState.optionsTipoFactura.length === 0) {
      this.facturaOpcion();
    } else {
      this.optionsTipoFactura = this.solicitudState.optionsTipoFactura;
    }
  }

  /**
   * Establece valores en el estado del store para un formulario histórico.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   * 
   * @returns void
   */
  setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormHistorico({ [CAMPO]: VALOR });
  }

  /**
   * Establece valores en el store para agregar datos del formulario del productor.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   * 
   * @returns void
   * 
   * @command Actualiza el estado del store con los valores proporcionados.
   */
  setValoresStoreAgregarForm(event: { formGroupName: string, campo: string, valor: string | number | boolean | null, storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setAgregarFormDatosProductor({ [CAMPO]: VALOR });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.certificadoDeService.obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.productoresExportador = respuesta.datos;
      });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarMercancia(): void {
    this.certificadoDeService
    .obtenerMercanciasSeleccionadas()
    .pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe(respuesta => {
      this.mercancia = respuesta;
    });
  }

  /**
   * @descripcion
   * Obtiene la lista de países disponibles.
   */
  facturaOpcion(): void {
    this.certificadoDeService.getTipoFactura()
      .pipe(
        takeUntil(this.destroyNotifier$),
      )
      .subscribe((data) => {
        this.optionsTipoFactura = data.datos as Catalogo[];
        this.store.setTipoFacturaOpciones(this.optionsTipoFactura);
      });
  }

  /** Actualiza el estado de validez del formulario según el valor recibido. */
  public formaValida(event: boolean): void {
    this.isFormValid = event;
  }

  /**
   * Valida el formulario del componente.
   * 
   * @returns {boolean} `true` si el formulario es válido, de lo contrario `false`.
   */
  public validarFormulario(): boolean {
    return this.isFormValid;
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
