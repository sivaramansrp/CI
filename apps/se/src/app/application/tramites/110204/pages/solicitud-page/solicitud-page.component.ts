import {
  AVISO_CONTRNIDO,
  DatosPasos,
  ListaPasosWizard,
  SeccionLibStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, PASOS } from '../../constantes/modificacion.enum';
import { Subject, take, takeUntil } from 'rxjs';
import {
  Tramite110204Store,
  TramiteState,
} from '../../estados/tramite110204.store';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110204Query } from '../../estados/tramite110204.query';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 * Este componente gestiona los pasos de un asistente de solicitud (wizard).
 */
export class SolicitudPageComponent implements OnDestroy {
  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;
  /**
   * Estado actual de la solicitud.
   * @property {TramiteState} solicitudState - Almacena el estado de la solicitud.
   */
  public solicitudState!: TramiteState;

  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice del paso actual.
   * Este valor se utiliza para determinar qué paso está activo en el wizard.
   * Inicialmente se establece en 1, que corresponde al primer paso.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    private tramiteQuery: Tramite110204Query,
    private tramiteStore: Tramite110204Store,
    private certificadoService: CertificadosOrigenGridService
  ) {
    this.tramiteQuery.selectState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar a siguiente paso, ir al anterior, etc.).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario del paso actual es válido.
   * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
   */
  esFormaValido: boolean = false;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice del paso actual
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * Clase CSS utilizada para mostrar alertas informativas.
   * Esta clase se aplica a los mensajes de información que se muestran en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Contiene el texto del aviso de privacidad simplificado.
   *
   * @constant {string} avisoContrnido
   * Se inicializa con la propiedad `aviso` del objeto `AVISO_CONTRNIDO`.
   *
   * Uso:
   * - Mostrar el aviso de privacidad en la interfaz de usuario.
   * - Reutilizar el contenido del aviso en distintos componentes.
   */
  avisoContrnido = AVISO_CONTRNIDO.aviso;

  /**
   * Selecciona una pestaña del asistente (wizard).
   * Este método actualiza el índice del paso seleccionado y, por lo tanto, cambia el paso que se está mostrando.
   *
   * @param i Índice de la pestaña a seleccionar (paso).
   */
  seleccionaTab(i: number): void {
    // Actualiza el índice del paso seleccionado
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   *
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   *
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return;
      }
      this.obtenerDatosDelStore()
    }
    else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
  * Obtiene los datos del store y los guarda utilizando el servicio.
  */
  obtenerDatosDelStore(): void {
    this.certificadoService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
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
      valor_mercancia: item.valorMercancia
    }));

  }

  /**
* Guarda los datos proporcionados en el parámetro `item` construyendo un objeto payload y enviándolo al servicio backend.
* El payload incluye información del solicitante, certificado, destinatario y detalles del certificado.
*
* @param item - Objeto que contiene todos los datos necesarios para el payload, incluyendo información del certificado, destinatario y detalles adicionales.
*
* @remarks
* Este método muestra el payload construido en la consola y está diseñado para enviarlo al backend mediante `certificadoService.guardarDatosPost`.
* La llamada al servicio actualmente está comentada.
*/
  guardar(item: any): void {
    console.log('item',item)
    const MERCANCIA_SELECCIONADAS = this.buildMercanciaSeleccionadas(item.mercanciaTabla);
    const PAYLOAD = {
      rfc_solicitante: 'AAL0409235E6',
      idSolicitud: this.solicitudState.idSolicitud || 0,
      solicitante: {
        rfc: "AAL0409235E6",
        nombre: "ACEROS ALVARADO S.A. DE C.V.",
        actividad_economica: "Fabricación de productos de hierro y acero",
        correo_electronico: "contacto@acerosalvarado.com",
        domicilio: {
          pais: "México",
          codigo_postal: "06700",
          estado: "Ciudad de México",
          municipio_alcaldia: "Cuauhtémoc",
          localidad: "Centro",
          colonia: "Roma Norte",
          calle: "Av. Insurgentes Sur",
          numero_exterior: "123",
          numero_interior: "Piso 5, Oficina A",
          lada: "",
          telefono: "123456"
        }
      },
      certificado: {
        tratado_acuerdo: item.formCertificado.entidadFederativa,
        pais_bloque: item.formCertificado.paisBloque,
        fraccion_arancelaria: item.formCertificado.fraccionArancelaria,
        nombre_comercial: item.formCertificado.nombreComercial,
        fecha_inicio: item.formCertificado.fechaInicio,
        fecha_fin: item.formCertificado.fechaFin,
        realizo_tercer_operador: {
          tercer_operador: item.formCertificado.si,
          nombre: item.formCertificado.nombres,
          primer_apellido: item.formCertificado.primerApellido,
          segundo_apellido: item.formCertificado.segundoApellido,
          numero_registro_fiscal: item.formCertificado.numeroDeRegistroFiscal,
          razon_social: item.formCertificado.razonSocial
        },
        domicilio_tercer_operador: {
          pais: item.formCertificado.pais,
          ciudad: item.formCertificado.ciudad,
          calle: item.formCertificado.calle,
          numero_letra: item.formCertificado.numeroLetra,
          lada: item.formCertificado.lada,
          telefono: item.formCertificado.telefono,
          fax: item.formCertificado.fax,
          correo_electronico: item.formCertificado.correo
        },
        mercancias_seleccionadas: MERCANCIA_SELECCIONADAS
      },
      datos_del_certificado: {
        observaciones: item.formDatosCertificado.observacionesDates,
        idioma: item.formDatosCertificado.idiomaDates,
        representacion_federal: {
          entidad_federativa: item.formDatosCertificado.EntidadFederativaDates,
          representacion_federal: item.formDatosCertificado.representacionFederalDates
        }
      }
    };

    console.log(PAYLOAD,'PAYLOAD');
    

    // this.certificadoService.guardarDatosPost(PAYLOAD).subscribe({
    //   next: (response) => {
    //     if (response?.codigo === '00' && response?.datos?.id_solicitud) {
    //       this.tramiteStore.setIdSolicitud(response.datos.id_solicitud || 0);
    //       this.pasoNavegarPor({ accion: 'cont', valor: 2 });
    //     }
    //   },
    // });
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
   * Notificador para gestionar la destrucción de suscripciones RxJS.
   *
   * Es un `Subject<void>` que se utiliza en combinación con el operador `takeUntil`
   * para finalizar las suscripciones activas cuando el componente se destruye.
   *
   * @type {Subject<void>}
   * @private
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
