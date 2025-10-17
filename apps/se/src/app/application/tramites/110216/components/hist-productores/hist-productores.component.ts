import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HistoricoColumnas, MercanciaTabla } from '../../models/certificado-origen.model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite110216State, Tramite110216Store } from '../../../../estados/tramites/tramite110216.store';
import { CertificadosOrigenService } from '../../services/certificado-origen.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HistoricoProductoresComponent } from '../../../../shared/components/historico-productores/historico-productores.component';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';

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

  /** Referencia al componente 'HistoricoProductoresComponent' en la plantilla.
   * Permite gestionar sus métodos y propiedades.
   */
  @ViewChild('HistoricoProductoresComponent', { static: false }) historicoProductoresComponent!: HistoricoProductoresComponent;

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: { [key: string]: unknown };

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
   * @property {boolean} ocultarFax
   * Indica si el campo de fax debe estar oculto o visible en la interfaz de usuario.
    * @default true
  */
  public ocultarFax: boolean = true;

  /**
   * @property esTipoDeSeleccionado
   * @type {boolean}
   * @description Indica si el tipo seleccionado es válido o está activo.
   */
  public esTipoDeSeleccionado: boolean = true;

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false;

  /** Indica si el formulario es válido. */
  public isFormValid: boolean = false;

  /** Observable que expone la lista de productores exportador agregados al store. */
  public agregarProductoresExportador$!: Observable<HistoricoColumnas[]>;

  /**
   * Solicitud actual del trámite.
   */
  public solicitudState!: Tramite110216State;

  /**
   * @property {MercanciaTabla[]} mercancia - Arreglo que contiene información de las mercancías.
   * @command Este arreglo se utiliza para almacenar y gestionar los datos relacionados con las mercancías en el componente.
   */
  public mercancia: MercanciaTabla[] = [];

  /** Observable que expone la lista de mercancia al store. */
    public mercanciaProductores$!: Observable<MercanciaTabla[]>;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite110214Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110214Query} tramiteQuery - Query para obtener el estado del trámite.
  */
  constructor(
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query,
    private certificadoDeService: CertificadosOrigenService,
    private consultaQuery: ConsultaioQuery
  ) {
    //
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.agregarProductoresExportador$ = this.tramiteQuery.selectAgregarProductoresExportador$;
    this.mercanciaProductores$ = this.tramiteQuery.selectMercanciaProductores$;
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.productoresExportador = seccionState.productoresExportador || [];
        })
      )
      .subscribe();

    this.tramiteQuery.formulario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState as { [key: string]: unknown };
        })
      )
      .subscribe();

    this.tramiteQuery.datosProductorFormulario$.pipe(
      takeUntil(this.destroyNotifier$), map((seccionState) => {
        this.agregarDatosProductor = seccionState as { [key: string]: unknown };
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

  /** Actualiza el estado de validez del formulario según el valor recibido. */
  public formaValida(event: boolean): void {
    this.isFormValid = event;
  }

 /**
   * Valida el formulario del componente.
   * 
   * @returns {boolean} `true` si el formulario es válido, de lo contrario `false`.
   */
  public validarFormulario(): void {
    this.historicoProductoresComponent.validarFormulario();
  }

  /**
   * Agrega un productor exportador al estado del store a partir del evento recibido.
   * Si el evento contiene los datos completos del productor, los utiliza; de lo contrario, asigna valores por defecto.
   * Si ya existen productores agregados, carga la mercancía relacionada.
   * @param event Objeto con los datos del productor exportador o con el número de registro fiscal.
   */
    public emitAgregarExportador(event: { [key: string]: unknown } | HistoricoColumnas): void {
      let DATOS: HistoricoColumnas | null = null;
      if (event && typeof event === 'object' && 'nombreProductor' in event) {
        DATOS = {
            id: (event as HistoricoColumnas).id ?? 0,
            nombreProductor: (event as HistoricoColumnas).nombreProductor ?? '',
            numeroRegistroFiscal: String((event as HistoricoColumnas).numeroRegistroFiscal ?? ''),
            direccion: String((event as HistoricoColumnas).direccion ?? ''),
            correoElectronico: String((event as HistoricoColumnas).correoElectronico ?? ''),
            telefono: String((event as HistoricoColumnas).telefono ?? ''),
            fax: String((event as HistoricoColumnas).fax ?? '')
        };
      } else if (event && typeof event === 'object' && 'numeroRegistroFiscal' in event) {
        DATOS = {
            id: 0,
            nombreProductor: "LAURA CONTRERAS",
            numeroRegistroFiscal: String(event['numeroRegistroFiscal'] ?? ''),
            direccion: "SAN GABRIEL 144 DURANGO", 
            correoElectronico: "laura2992@hotmail.com",
            telefono: "044-6182999535",
            fax: String(event['fax'] ?? '') || '6182999535'
        };
      }
      if (DATOS) { 
        this.store.setAgregarProductoresExportador(DATOS);
      }
      if (this.solicitudState.agregarProductoresExportador.length) {
        this.cargarMercancia();
      }
    }

    /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarMercancia(): void {
    this.certificadoDeService
    .getMercanciasSeleccionadas()
    .pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe(respuesta => {
      this.mercancia = respuesta;
      this.store.setMercanciaProductores(respuesta);
    });
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
