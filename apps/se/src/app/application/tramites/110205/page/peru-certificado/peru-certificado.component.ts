/**
 * @component PeruCertificadoComponent
 * @description
 * El componente `PeruCertificadoComponent` es responsable de manejar el flujo de pasos para el trámite zoosanitario de importación del Perú.
 * Utiliza un componente `WizardComponent` para gestionar la navegación entre pasos del trámite.
 * También maneja la actualización del estado de la sección y la validez del formulario observando el estado del trámite.
 * 
 * @example
 * <app-peru-certificado></app-peru-certificado>
 */

import { AccionBoton, ListaPasoWizard } from '../../models/peru-certificado.module';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ERROR_FORMA_ALERT, PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, take, takeUntil } from 'rxjs';
import {AVISO} from '@ng-mf/data-access-user'
import { PASOS } from '../../constantes/peru-certificado.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { Tramite110205State } from '../../estados/tramite110205.store';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-peru-certificado',
  templateUrl: './peru-certificado.component.html',
  styleUrl: './peru-certificado.component.scss',
})

export class PeruCertificadoComponent implements OnDestroy {
  @ViewChild(PasoUnoComponent) pasoUnoComponent?: PasoUnoComponent;

export class PeruCertificadoComponent implements OnInit, OnDestroy {
  /**
   * @property {ListaPasoWizard[]} pasos
   * @description
   * Lista de pasos que componen el flujo del trámite en el wizard.
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Título principal mostrado en el encabezado del trámite.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent`, utilizado para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description
   * Índice actual del paso activo dentro del wizard. Comienza en 1.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Objeto con metainformación sobre el flujo de pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property {any} TEXTOS
   * @description
   * Contiene los textos informativos para el pago de derechos.
   */
  public TEXTOS = AVISO.Aviso;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Notificador para gestionar la destrucción de suscripciones reactivas y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite110205State} solicitudState
   * @description
   * Estado actual de la solicitud del trámite.
   */
  solicitudState!: Tramite110205State;

   /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * URL de la página actual.
   */
  public solicitudState!: Tramite110205State;

  /**
   * Indica si existe un error en el campo de cambio de modalidad.
   * Se actualiza desde el estado del store para mostrar mensajes de error específicos.
   * @type {boolean}
   */
  cambioError: boolean = false;

  /**
   * Contiene el mensaje HTML de error para el campo de cambio de modalidad.
   * Se utiliza para mostrar alertas de validación al usuario.
   * @type {string}
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Indica si existe un error en el campo de servicios IMMX.
   * Se actualiza desde el estado del store para mostrar mensajes de error específicos.
   * @type {boolean}
   */
  serviciosImmxError: boolean = false;

  esFormaValido: boolean = true;

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @constructor
   * @description
   * Constructor del componente. Se encarga de suscribirse a `FormaValida$` del `Tramite110205Query`
   * para actualizar el estado de la sección y la validez del formulario en el store de sección.
   *
   * @param {SeccionLibStore} seccionStore - Store para actualizar el estado de la sección.
   * @param {Tramite110205Query} tramiteQuery - Query para observar el estado de validez del formulario.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    private tramiteQuery: Tramite110205Query,
    private peruCertificadoService: PeruCertificadoService
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    });

  }

  /**
   * Mantiene la suscripción al estado de CambioModalidadQuery para tener siempre el estado actualizado.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectCambioModalidad$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state: Tramite110205State) => {
        this.solicitudState = state;
        this.cambioError = state.cambioError ?? false;
        this.serviciosImmxError = state.serviciosImmxError ?? false;
      });
  }

  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return;
      }
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
   * Navega a través de los pasos del asistente según la acción del botón.
   * @param e Objeto que contiene la acción y el valor del índice al que se desea navegar.
   */
  pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.peruCertificadoService
      .getAllState()
      .pipe(take(1))
      .subscribe((data) => {
        this.guardar(data);
      });
  }

  /**
   * Construye un arreglo de mercancías seleccionadas a partir de los datos proporcionados.
   * @param arr Arreglo de objetos con los datos de las mercancías seleccionadas.
   * @returns Arreglo de objetos con la estructura requerida para las mercancías seleccionadas.
   * */
  buildMercanciaSeleccionadas(arr: any[]): any[] {
    return arr.map((item: any) => ({
      id: item.id,
      fraccion_arancelaria: item.fraccionArancelaria,
      fraccion_naladi: item.fraccionNaladi,
      fraccion_naladi_sa93: item.fraccionNaladiSa93,
      fraccion_naladi_sa96: item.fraccionNaladiSa96,
      fraccion_naladi_sa02: item.fraccionNaladiSa02,
      nombre_tecnico: item.nombreTecnico,
      nombre_comercial: item.nombreComercial,
      registro_producto: item.numeroDeRegistrodeProductos,
      fecha_expedicion: item.fechaExpedicion,
      fecha_vencimiento: item.fechaVencimiento,
      tipo_factura: item.tipoFactura,
      num_factura: item.numFactura,
      complemento_descripcion: item.complementoDescripcion,
      fecha_factura: item.fechaFactura,
      cantidad: item.cantidad,
      umc: item.umc,
      unidad_medida: item.unidadMedidaMasaBruta,
      valor_mercancia: item.valorMercancia,
    }));
  }

  /**
   * @method validarTodosFormulariosPasoUno
   * @description
   * Valida todos los formularios del componente `PasoUnoComponent`.
   * Si la referencia al componente no existe, retorna `true` (no hay formularios que validar).
   * Llama al método `validarFormularios()` del componente hijo y retorna `false` si algún formulario es inválido.
   * Retorna `true` si todos los formularios son válidos.
   *
   * @returns {boolean} Indica si todos los formularios del paso uno son válidos.
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }

  /**
   * Guarda los datos proporcionados en el parámetro `item` construyendo un objeto payload y enviándolo al servicio backend.
   * El payload incluye información del solicitante, certificado, destinatario y detalles del certificado.
   *
   * @param item - Objeto que contiene todos los datos necesarios para el payload, incluyendo información del certificado, destinatario y detalles adicionales.
   *
   * @remarks
   * Este método muestra el payload construido en la consola y está diseñado para enviarlo al backend mediante `registroService.guardarDatosPost`.
   * La llamada al servicio actualmente está comentada.
   */
  guardar(item: any): void {
    console.log('Payload a enviar:', item);
    const MERCANCIA_SELECCIONADAS = this.buildMercanciaSeleccionadas(
      item.mercanciaTabla
    );
    const PAYLOAD = {
      rfc_solicitante: 'AAL0409235E6',
      idSolicitud: this.solicitudState.idSolicitud || 0,
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'ACEROS ALVARADO S.A. DE C.V.',
        actividad_economica: 'Fabricación de productos de hierro y acero',
        correo_electronico: 'contacto@acerosalvarado.com',
        domicilio: {
          pais: 'México',
          codigo_postal: '06700',
          estado: 'Ciudad de México',
          municipio_alcaldia: 'Cuauhtémoc',
          localidad: 'Centro',
          colonia: 'Roma Norte',
          calle: 'Av. Insurgentes Sur',
          numero_exterior: '123',
          numero_interior: 'Piso 5, Oficina A',
          lada: '',
          telefono: '123456',
        },
      },
      certificado: {
        tratado_acuerdo: item.formCertificado.entidadFederativa,
        pais_bloque: item.formCertificado.paisBloque,
        fraccion_arancelaria: item.formCertificado.fraccionArancelariaForm,
        nombre_comercial: item.formCertificado.nombreComercialForm,
        registro_producto: item.formCertificado.numeroDeRegistroProductoForm,
        fecha_inicio: item.formCertificado.fechaInicioInput,
        fecha_fin: item.formCertificado.fechaFinalInput,
        realizo_tercer_operador: {
          tercer_operador: item.formCertificado.si,
          nombre: item.formCertificado.nombres,
          primer_apellido: item.formCertificado.primerApellido,
          segundo_apellido: item.formCertificado.segundoApellido,
          numero_registro_fiscal: item.formCertificado.numeroDeRegistroFiscal,
          razon_social: item.formCertificado.razonSocial,
        },
        domicilio_tercer_operador: {
          pais: item.formCertificado.pais,
          ciudad: item.formCertificado.ciudad,
          calle: item.formCertificado.calle,
          numero_letra: item.formCertificado.numeroLetra,
          telefono: item.formCertificado.telefono,
          correo_electronico: item.formCertificado.correo,
        },
        mercancias_seleccionadas: MERCANCIA_SELECCIONADAS,
      },
      datos_del_certificado: {
        observaciones: item.formDatosCertificado.observacionesDates,
        idioma: item.formDatosCertificado.idiomaDates,
        representacion_federal: {
          entidad_federativa: item.formDatosCertificado.EntidadFederativaDates,
          representacion_federal:
            item.formDatosCertificado.representacionFederalDates,
        },
      },
    };

    this.peruCertificadoService.guardarDatosPost(PAYLOAD).subscribe({
      next: (response) => {
        if (response?.codigo === '00' && response?.datos?.id_solicitud) {
          // this.tramite110201Store.setIdSolicitud(
          //   response.datos.id_solicitud || 0
          // );
          this.pasoNavegarPor({ accion: 'cont', valor: 2 });
        }
      },
    });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Se utiliza para cerrar y completar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
