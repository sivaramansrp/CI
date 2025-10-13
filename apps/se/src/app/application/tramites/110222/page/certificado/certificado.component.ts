/**
 * @component CertificadoComponent
 * @descripcion
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
import { AccionBoton, ListaPasoWizard } from '../../models/peru-certificado.module';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ERROR_FORMA_ALERT, WizardComponent } from '@libs/shared/data-access-user/src'
import { PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, take, takeUntil} from 'rxjs';
import { PASOS } from '../../constantes/peru-certificado.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { Tramite110222State, Tramite110222Store } from '../../estados/tramite110222.store';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
/**
 * @component CertificadoComponent
 * @description
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss',
})
export class CertificadoComponent {

  /**
   * Array de pasos del wizard.
   * @type {Array<ListaPasoWizard>}
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * Propiedad pública que almacena los textos relacionados con el pago de derechos.
   * @type {any}
   */
  public TEXTOS = PAGO_DE_DERECHOS;

  /**
   * El título del mensaje mostrado en la vista.
   * @type {string | null}
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * El índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de los pasos del wizard, incluyendo textos de botones y número de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  solicitudState!: Tramite110222State;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario del paso actual es válido.
   * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
   */
  esFormaValido: boolean = false;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Inyecta los servicios necesarios y suscribe a la validación de la forma para actualizar el estado de la sección.
   * @param seccionStore Servicio para manejar el estado de la sección.
   * @param tramiteQuery Query para consultar el estado del trámite.
   */
  constructor(private seccionStore: SeccionLibStore, private tramiteQuery: Tramite110222Query,
     private ValidarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    private tramite110222Store: Tramite110222Store) {
    this.tramiteQuery.selectTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });

  }

   obtenerDatosDelStore(): void {
      this.ValidarInicialmenteCertificadoService.getAllState()
        .pipe(take(1))
        .subscribe(data => {
          this.guardar(data);
          
        });
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
    if (e.accion === 'cont') {
      if (this.pasoUnoComponent && !this.pasoUnoComponent.validateAllForms()) {
        return;
      }
    }

    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        this.indice = 1;
        this.datosPasos.indice = 1;
      } else {
        this.indice = 2;
        this.datosPasos.indice = 2;
      }
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
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
    const ES_FORMULARIO_VALIDO_TOCADO = this.pasoUnoComponent.validarTodo();
    if (!ES_FORMULARIO_VALIDO_TOCADO) {
      return false;
    }
    return true;
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
  cantidad: item.cantidad,
  unidad_medida: item.unidadMedida,
  valor_mercancia: item.valorMercancia,
  nombreTecnico: item.nombreTecnico,
  nombre_comercial: item.nombreComercial,
  registro_producto: item.numeroRegistroProducto,
  fechaExpedicion: item.fechaExpedicion,
  fechaVencimiento: item.fechaVencimiento,
  tipo_factura: item.tipoFactura,
  num_factura: item.numFactura,
  complemento_descripcion: item.complementoDescripcion,
  fecha_factura: item.fechaFactura,
  umc:item.umc,
}));

}
  guardar(item: any): void {
    const MERCANCIA_SELECCIONADAS = this.buildMercanciaSeleccionadas(item.mercanciaSeleccionadasTablaData);
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
        tratado_acuerdo: item.tratado || '',
        pais_bloque: item.pais,
        fraccion_arancelaria: item.fraccionArancelaria,
        registro_producto: item.registroProducto,
        nombre_comercial: item.nombreComercial,
        fecha_inicio: item.fechaFinal,
        fecha_fin: item.fechaInicial,
        mercancias_seleccionadas: MERCANCIA_SELECCIONADAS
      },
 
      destinatario: {
        nombre: item.nombre,
        primer_apellido: item.apellidoPrimer,
        segundo_apellido: item.apellidoSegundo,
        numero_registro_fiscal: item.numeroFiscal,
        razon_social: item.razonSocial,
        domicilio: {
          ciudad_poblacion_estado_provincia: item.ciudad,
          calle: item.calle,
          numero_letra: item.numeroLetra,
          lada: item.lada,
          telefono: item.telefono,
          fax: item.fax,
          correo_electronico: item.correoElectronico,
          pais_destino: item.nacion
        },
        medio_transporte: item.transporte
      },
 
      datos_del_certificado: {
        observaciones: item.observaciones,
        precisa: item.presica,
        presenta: item.presenta,
        idioma: item.idioma,
        representacion_federal: {
          entidad_federativa: item.entidad,
          representacion_federal: item.representacion
        },
        desea_obtener_certificado: item.casillaVerificacion,
        justificacion: item.justificacion
      }
    };
 
    this.ValidarInicialmenteCertificadoService.guardarDatosPost(PAYLOAD).subscribe({
      next: (response) => {
        if (response?.codigo === '00' && response?.datos?.id_solicitud) {
          this.tramite110222Store.setIdSolicitud(response.datos.id_solicitud || 0);
          this.pasoNavegarPor({ accion: 'cont', valor: 2 });
        }
      },
    });
  }
}