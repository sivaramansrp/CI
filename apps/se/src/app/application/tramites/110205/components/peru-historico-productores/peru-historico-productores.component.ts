import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoricoColumnas, MercanciaTabla } from '../../models/peru-certificado.module';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../../estados/tramite110205.store';
import { FormBuilder } from '@angular/forms';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { Tramite110205Query } from '../../estados/tramite110205.query';

@Component({
  selector: 'app-peru-historico-productores',
  templateUrl: './peru-historico-productores.component.html',
  styleUrl: './peru-historico-productores.component.scss',
})

export class PeruHistoricoProductoresComponent implements OnInit, OnDestroy {

  /**
   * Lista de productores disponibles para el exportador.
   */
  productoresExportador: HistoricoColumnas[] = [];
  /**
   * @property {MercanciaTabla[]} mercancia - Arreglo que contiene información de las mercancías.
   * @command Este arreglo se utiliza para almacenar y gestionar los datos relacionados con las mercancías en el componente.
   */
  mercancia: MercanciaTabla[] = [];

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property tramiteState
   * @command
   * Este objeto se utiliza para almacenar y gestionar el estado actual del trámite.
   */
  public tramiteState!: {[key: string]: unknown};
  /**
   * @public
   * @property {Object} agregarDatosProductor - Objeto utilizado para agregar datos relacionados con un productor.
   * @description Este objeto puede contener claves con valores de diferentes tipos, incluyendo cadenas, números, booleanos, objetos o indefinidos.
   * @command Este objeto es utilizado para gestionar la información de los productores en el componente.
   */
  public agregarDatosProductor!: {[key: string]: unknown};

  /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   */
   esFormularioSoloLectura: boolean = false;

   /** Indica si el formulario es válido. */
    public isFormValid: boolean = false;
  
    public agregarProductoresExportador$!: Observable<HistoricoColumnas[]>;
  
    public mercanciaProductores$!: Observable<MercanciaTabla[]>;

    /**
    * @property {boolean} ocultarFax
    * Indica si el campo de fax debe estar oculto o visible en la interfaz de usuario.
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
   * Solicitud actual del trámite.
   */
  public solicitudState!: Tramite110205State;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {peruCertificadoService} peruCertificadoService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110216Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110216Query} tramiteQuery - Query para obtener el estado del trámite.
  */
  constructor(
    public fb: FormBuilder,
    private peruCertificadoService: PeruCertificadoService,
    public store: Tramite110205Store,
    public tramiteQuery: Tramite110205Query,
    private consultaQuery: ConsultaioQuery
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.agregarProductoresExportador$ = this.tramiteQuery.selectAgregarProductoresExportador$;
    this.mercanciaProductores$ = this.tramiteQuery.selectMercanciaProductores$;
    this.tramiteQuery.selectPeru$
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
    this.tramiteQuery.agregarDatosProductorFormulario$.pipe(
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

    if (this.solicitudState.optionsTipoFactura.length === 0) {
      this.facturaOpcion();
    } else {
      this.optionsTipoFactura = this.solicitudState.optionsTipoFactura;
    }
  }

  /**
   * @descripcion
   * Obtiene la lista de países disponibles.
   */
  facturaOpcion(): void {
    this.peruCertificadoService.getTipoFactura()
      .pipe(
        takeUntil(this.destroyNotifier$),
      )
      .subscribe((data) => {
        this.optionsTipoFactura = data.datos as Catalogo[];
        this.store.setTipoFacturaOpciones(this.optionsTipoFactura);
      });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.peruCertificadoService.obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.productoresExportador = respuesta.datos;
      });
  }


  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarMercancia(): void {
    this.peruCertificadoService.obtenerMercancia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercancia = respuesta.datos;
      });
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

    /** Actualiza el estado de validez del formulario según el valor recibido. */
  public formaValida(event: boolean): void {
    this.isFormValid = event;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
