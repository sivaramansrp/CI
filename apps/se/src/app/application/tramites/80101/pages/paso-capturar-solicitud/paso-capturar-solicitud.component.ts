import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '../../models/nuevo-programa-industrial.model';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { Subject } from 'rxjs';


/**
 * Obtiene el valor del índice de la acción del botón y actualiza el estado del componente.
 * 
 * Este método se utiliza para manejar las acciones de los botones en el componente. 
 * Dependiendo del valor y la acción proporcionados, actualiza el índice actual y 
 * navega hacia adelante o hacia atrás en el componente Wizard.
 * 
 * @param e - Un objeto de tipo `AccionBoton` que contiene dos propiedades:
 *   - `valor`: Un número que representa el índice al que se desea navegar. Debe estar entre 1 y 4.
 *   - `accion`: Una cadena que indica la acción a realizar. Puede ser:
 *     - `'cont'`: Para avanzar al siguiente paso en el Wizard.
 *     - `'atras'`: Para retroceder al paso anterior en el Wizard.
 * 
 * @remarks
 * Si el valor proporcionado está fuera del rango permitido (menor que 1 o mayor que 4), 
 * el método no realiza ninguna acción.
 * 
 * @example
 * ```typescript
 * const accion: AccionBoton = { valor: 2, accion: 'cont' };
 * this.getValorIndice(accion); // Avanza al paso 2 en el Wizard.
 * ```
 */
@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
export class PasoCapturarSolicitudComponent {
  /**
   * Lista de pasos del wizard.
   * Esta propiedad almacena una lista de objetos que representan los pasos del wizard.
   * Cada objeto contiene información sobre el paso, como su título y descripción.
   */
  pasos: ListaPasosWizard[] = PASOS4;
  /**
   * Índice actual del paso en el wizard.
   * Este valor se utiliza para determinar qué paso se está mostrando actualmente.
   * El valor inicial es 1, lo que indica que el primer paso está activo al cargar el componente.
   */
  indice: number = 1;
  /**
   * Datos de los pasos del wizard.
   * Esta propiedad almacena información relacionada con el número de pasos, el índice actual,
   * y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Componente Wizard utilizado para la navegación entre pasos.
   * Este componente permite al usuario avanzar o retroceder entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
 * 
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Constructor de la clase PasoCapturarSolicitudComponent.
   * 
   * @param tramiteQuery - Servicio de consulta para Tramite80101 que proporciona acceso a observables y datos relacionados.
   * @param seccion - Servicio de gestión de estado para manejar la sección y la validez del formulario.
   * 
   * Este constructor inicializa el componente y configura una suscripción al observable `FormaValida$` del servicio `Tramite80101Query`.
   * Cuando se emite un valor desde el observable, se actualiza el estado de la sección y la validez del formulario
   * utilizando los métodos `establecerSeccion` y `establecerFormaValida` del servicio `SeccionLibStore`.
   * La suscripción se gestiona para que se complete automáticamente al destruir el componente mediante `takeUntil` y `destroyNotifier$`.
   */
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
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
    this.nuevoProgramaIndustrialService.getAllState().subscribe(data => {
      this.guardar(data);
    });
  }

  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  guardar(data: any): void {

const PLANTAS_SUBMANUFACTURERAS = data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar.map((item: any) => ({
        idDomicilio: 0,
        calle: item.calle,
        numeroExterior: item.numExterior,
        numeroInterior: item.numInterior,
        codigoPostal: item.codigoPostal,
        informacionExtra: item.informacionExtra ?? '',
        clave: item.clave ?? '',
        cveLocalidad: item.cveLocalidad ?? '',
        cveDelegMun: item.delegacionMunicipio ?? '',
        cveEntidad: item.entidadFederativa ?? '',
        cvePais: item.pais ?? '',
        ciudad: item.ciudad ?? '',
        telefono: item.telefono ?? '',
        fax: item.fax ?? '',
        municipio: item.municipio ?? '',
        colonia: item.colonia ?? '',
        descUbicacion: item.descUbicacion ?? '',
        cveCatalogo: item.cveCatalogo ?? '',
        telefonos: item.telefonos ?? '',
        tipoDomicilio: item.domicilioFiscalSolicitante ?? ''
}));

const PAYLOAD = {
      "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
    "idTipoTramite": 80101,
    "rfc": "AAL0409235E6",
    "cveUnidadAdministrativa": "8101",
    "costoTotal": 10000.5,
    "certificadoSerialNumber": "1234567890ABCDEF",
    "certificado": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A",
    "numeroFolioTramiteOriginal": "TRM-2023-00001",
    "nombre": "Juan",
    "apPaterno": "Pérez",
    "apMaterno": "López",
    "telefono": "5551234567",
    "planta": [],
    "anexoII": [
        {
            "descripcion": "tblerow0",
            "idTipoBien": 0,
            "idBienComercial": 0,
            "testado": true,
            "contadorGrid": null,
            "descripcionTestado": "tblerow1"
        }
    ],
    "anexoIII": [
        {
            "descripcion": "CONTROL DE ENERGIA",
            "idTipoBien": 0,
            "idBienComercial": 0,
            "testado": true,
            "contadorGrid": null,
            "descripcionTestado": null
        }
    ],
    "mercanciaImportacion": [
        {
            "fraccionArancelaria": {
                "fraccionPadre": "string",
                "descripcionFraccionPadre": "string",
                "tipoFraccion": "string",
                "exenta": true,
                "fraccionCompuesta": "string",
                "claveFraccionPadre": "string",
                "unidadMedida": "string",
                "fraccionConcatenada": "string",
                "descripcionTestado": "string",
                "testado": true,
                "tipoOperacion": "string",
                "valorMonedaMensual": "string",
                "valorMonedaAnual": "string",
                "valorProduccionMensual": "string",
                "valorProduccionAnual": "string",
                "valorProduccionAnualSolicitada": "string",
                "claveCategoria": "string",
                "descripcionCategoria": "string",
                "mensaje": "string",
                "descripcionUsuario": "string",
                "umt": "string",
                "idFraccion": "string",
                "idProducto": "string",
                "idProductoPadre": "string",
                "claveProductoExportacion": 0,
                "descripcionServicio": "string",
                "rowID": "string",
                "cveFraccion": "61032301",
                "capitulo": "string",
                "partida": "string",
                "subPartida": "string",
                "descripcion": "string",
                "fechaCaptura": "2025-09-07T12:43:35.647Z",
                "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                "cveUsuario": "string",
                "cveCapituloFraccion": "string",
                "cvePartidaFraccion": "string",
                "cveSubPartidaFraccion": "string",
                "activo": true,
                "activoAnexo28": true,
                "decretoImmex": true
            }
        }
    ],
    "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
    "sociosAccionistas": []
}
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
     return response;
    });
  }

}
