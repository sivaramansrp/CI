import { AlertComponent, BtnContinuarComponent, ERROR_FORMA_ALERT, PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PasoFirmaComponent,WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite110202Store, TramiteState } from '../../estados/tramite110202.store';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { PASOS } from '../../constantes/modificacion.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110202Query } from '../../estados/tramite110202.query';
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
  selector: 'app-cartificado-validacion-page',
  standalone: true,
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoFirmaComponent,
    AlertComponent
  ],
  templateUrl: './cartificado-validacion-page.component.html',
  styleUrl: './cartificado-validacion-page.component.scss'
})
export class CartificadoValidacionPageComponent implements OnDestroy {
  /**
  * @property {PasoUnoComponent} pasoUnoComponent
  * @description
  * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
  * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
  */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   * Este valor se utiliza para determinar qué paso está activo en el wizard.
   * Inicialmente se establece en 1, que corresponde al primer paso.
   */
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
    * @property {string} formErrorAlert
    * @description
    * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
    */
  public formErrorAlert = ERROR_FORMA_ALERT;


  /** 
  * Índice del paso actual del wizard.
  * Representa la pestaña activa principal.
  */
  indice: number = 1;
  /**
   * Controla si se debe mostrar la alerta en pantalla.
   * Se activa cuando el subíndice del child componente es 3.
   */
  mostrarAlerta: boolean = false;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar a siguiente paso, ir al anterior, etc.).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  
  /**
   * URL de la página actual.
   */
  public solicitudState!: TramiteState;

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
   * Una constante que contiene el valor del objeto 'PAGO_DE_DERECHOS'.
   * Esta constante se usa para almacenar textos y valores relacionados con el pago de derechos.
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
  * @property {boolean} esFormaValido
  * @description
  * Indica si el formulario del paso actual es válido.
  * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
  */
  esFormaValido: boolean = false;
  constructor(private seccionStore: SeccionLibStore, private tramiteQuery: Tramite110202Query,
    private certificadoValidacionService: CertificadoValidacionService,
    private tramite110202Store:Tramite110202Store


  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([res]);
    });
        this.tramiteQuery.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState;
            })
          ).subscribe();
      
  }
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
   * Navega entre los pasos de un asistente (wizard) según la acción recibida.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene la acción a realizar y el valor del índice del paso.
   * 
   * - Actualiza el índice actual y el índice en `datosPasos` con el valor proporcionado.
   * - Si el valor está entre 1 y 4 (inclusive), navega al siguiente paso si la acción es 'cont', 
   *   o al paso anterior en caso contrario, utilizando los métodos del componente wizard.
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
 * Lógica de limpieza al destruir el componente.
 * Este método se ejecuta cuando el componente es destruido y se utiliza para limpiar recursos y evitar fugas de memoria.
 * Emite una señal para destruir los observables y completa el subject `destroyNotifier$`.
 * @returns {void}
 */
  ngOnDestroy(): void {
    // Emite una señal para destruir los observables y evitar fugas de memoria
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validateAll();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }

   /**
  * Obtiene los datos del store y los guarda utilizando el servicio.
  */
  obtenerDatosDelStore(): void {
    this.certificadoValidacionService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
        
      });
  }
  
/**
 * Transforma un array de objetos en un nuevo formato.
 * @param arr - array de objetos a transformar
 * @returns array de objetos transformados
 */
buildMercanciaSeleccionadas(arr: any[]): any[] {
return arr.map((item: any) => ({
  id: item.id,
  fraccion_arancelaria: item.fraccionArancelaria,
  cantidad: item.cantidad,
  unidad_medida: item.unidadMedida,
  valor_mercancia: item.valorMercancia,
  nombre_tecnico: item.nombreTecnico,
  nombre_comercial: item.nombreComercial,
  registro_producto: item.numeroRegistroProducto,
  fecha_expedicion: item.fechaExpedicion,
  fecha_vencimiento: item.fechaVencimiento,
  tipo_factura: item.tipoFactura,
  num_factura: item.numFactura,
  complemento_descripcion: item.complementoDescripcion,
  fecha_factura: item.fechaFactura,
  umc:item.umc,
}));

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
    const MERCANCIA_SELECCIONADAS = this.buildMercanciaSeleccionadas(item.mercanciaSeleccionadasTablaData);
    const PAYLOAD = {
      rfc_solicitante: 'AAL0409235E6',
      idSolicitud: this.solicitudState?.idSolicitud || 0,
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
        tratado_acuerdo: item.tratado || '',
        pais_bloque: item.pais,
        fraccion_arancelaria: item.fraccionArancelaria,
        registro_producto: item.registroProducto,
        nombre_comercial: item.nombreComercial,
        fecha_inicio: item.fechaFinal,
        fecha_fin: item.fechaInicial,
        numero_letra: item.numeroLetra1,
        calle:item.calle1,
        mercancias_seleccionadas: MERCANCIA_SELECCIONADAS
      },
 
      destinatario: {
        nombre: item.formDatosDelDestinatario.nombres,
        primer_apellido: item.formDatosDelDestinatario.primerApellido,
        segundo_apellido: item.formDatosDelDestinatario.segundoApellido,
        numero_registro_fiscal: item.formDatosDelDestinatario.numeroDeRegistroFiscal,
        razon_social: item.formDatosDelDestinatario.razonSocial,
        domicilio: {
          ciudad_poblacion_estado_provincia: item.formDestinatario.ciudad,
          calle: item.formDestinatario.calle,
          numero_letra: item.formDestinatario.numeroLetra,
          lada: item.formDestinatario.lada,
          telefono: item.formDestinatario.telefono,
          fax: item.formDestinatario.fax,
          correo_electronico: item.formDestinatario.correoElectronico,
          pais_destino: item.formDestinatario.paisDestin
        },
        medio_transporte: item.medioDeTransporteSeleccion.clave

      },
 
      datos_del_certificado: {
        observaciones: item.formDatosCertificado.observacionesDates,
        precisa: item.formDatosCertificado.precisaDates,
        presenta: item.formDatosCertificado.precisaDates,
        idioma: item.formDatosCertificado.idiomaDates,
        representacion_federal: {
          entidad_federativa: item.formDatosCertificado.EntidadFederativaDates,
          representacion_federal: item.formDatosCertificado.representacionFederalDates
        },
        desea_obtener_certificado: "true",
        justificacion: "nbhh"
      }
    };
 
    this.certificadoValidacionService.guardarDatosPost(PAYLOAD).subscribe({
      next: (response) => {
        if (response?.codigo === '00' && response?.datos?.id_solicitud) {
          this.tramite110202Store.setIdSolicitud(response.datos.id_solicitud || 0);
          this.pasoNavegarPor({ accion: 'cont', valor: 2 });
        }
      },
    });
  }

}
