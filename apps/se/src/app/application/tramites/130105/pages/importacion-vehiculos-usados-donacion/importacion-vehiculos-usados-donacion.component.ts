import { Component, EventEmitter, ViewChild } from '@angular/core';
import { DatosPasos, doDeepCopy, esValidObject, getValidDatos, JSONResponse, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/importacion-vehiculos-usados-donacion-pasos.enum';

import { AccionBoton } from '../../enums/accionbotton.enum';
import { take } from 'rxjs';
import { ImportacionVehiculosUsadosDonacionService } from '../../services/importacion-vehiculos-usados-donacion.service';
import { Tramite130105State, Tramite130105Store } from '../../../../estados/tramites/tramites130105.store';
import { Tramite130105Query } from '../../../../estados/queries/tramite130105.query';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Componente para la importación de vehículos usados.
 * Este componente gestiona el flujo de pasos en un asistente (wizard) para la importación de vehículos usados.
 */
@Component({
  selector: 'app-importacion-vehiculos-usados-donacion',
  templateUrl: './importacion-vehiculos-usados-donacion.component.html'
})
export class ImportacionVehiculosUsadosDonacionComponent {
  /**
   * Lista de pasos del asistente (wizard) para solicitar la importación.
   * Los pasos se obtienen de la constante `PASOS_EXPORTACION`.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   * Representa el paso en el que se encuentra el usuario.
   * Valor inicial: 1.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña activa.
   * Representa la pestaña seleccionada en el asistente.
   * Valor inicial: 1.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente `WizardComponent` del asistente.
   * Se utiliza para navegar entre los pasos del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  @ViewChild(PasoUnoComponent, { static: false}) pasoUnoComponent!: PasoUnoComponent;
  
  /**
* Indica si el botón para cargar archivos está habilitado.
*/
  activarBotonCargaArchivos: boolean = false;

  /**
   * Datos relacionados con los pasos del asistente.
   * Incluye el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length, // Número total de pasos
    indice: this.indice, // Índice del paso actual
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario del paso actual es válido.
   * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
   */
  esFormaValido: boolean = false;

  /**
   * @property {Tramite130105State} solicitudState
   * @description
   * Estado actual de la solicitud del trámite 130105.
   */
  solicitudState!: Tramite130105State;

  /**
    * Evento que se emite para cargar archivos.
    * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
    */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
* Indica si la sección de carga de documentos está activa.
* Se inicializa en true para mostrar la sección de carga de documentos al inicio.
*/
  seccionCargarDocumentos: boolean = true;
  /**
   * Indica si la carga de documentos está en progreso.
   * Se inicializa en true para indicar que la carga está en progreso al inicio.
   */
  cargaEnProgreso: boolean = true;

  /**
   * @description
   * Constructor de la clase.
   * @param importacionVehiculosUsadosDonacionService
   * @param tramite130105Store
   */
  constructor(private importacionVehiculosUsadosDonacionService: ImportacionVehiculosUsadosDonacionService, private tramite130105Store: Tramite130105Store, private tramite130105Query: Tramite130105Query) {
    this.tramite130105Query.selectSolicitud$.pipe(take(1)).subscribe((solicitudState) => {
      this.solicitudState = solicitudState;
    });
  }

  /**
   * Método para actualizar el índice del paso actual en el asistente.
   * También navega al siguiente o al paso anterior según la acción especificada.
   *
   * Objeto de tipo `AccionBoton` que contiene:
   *  - `valor`: El nuevo índice del paso.
   *  - `accion`: La acción a realizar ('cont' para continuar o 'ant' para retroceder).
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
    const ISVALID = this.pasoUnoComponent?.solicitudComponent?.validarFormulario();
    if (!ISVALID) {
      this.esFormaValido = true;
      return;
    }
    this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasosSolicitar.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
    * Obtiene los datos del store y los guarda utilizando el servicio.
    */
  obtenerDatosDelStore(): void {
    this.importacionVehiculosUsadosDonacionService.getAllState()
      .pipe(take(1))
      .subscribe((data) => {
        this.guardar(data);
      });
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
  guardar(item: Tramite130105State): Promise<JSONResponse> {
    console.log('Payload a enviar al backend:', item);
    const PAYLOAD = {
      "tipoDeSolicitud": "guardar",
      "mercancia": {
        "cantidadComercial": Number(item.cantidadPartidasDeLaMercancia),
        "cantidadTarifaria": Number(item.cantidad),
        "valorFacturaUSD": Number(item.valorFacturaUSD),
        "condicionMercancia": item.producto,
        "descripcion": item.descripcion,
        "usoEspecifico": item.usoEspecifico,
        "justificacionImportacionExportacion": item.justificacionImportacionExportacion,
        "observaciones": item.observaciones,
        "unidadMedidaTarifaria": {
          "clave": item.unidadMedida
        },
        "fraccionArancelaria": {
          "cveFraccion": 87012101
        },
        "partidasMercancia": [
          {
            "unidadesSolicitadas": Number(item.filaSeleccionada[0].cantidad),
            "unidadesAutorizadas": Number(item.cantidad),
            "descripcionSolicitada": item.filaSeleccionada[0].descripcion,
            "descripcionAutorizada": item.descripcion,
            "importeUnitarioUSD": Number(item.filaSeleccionada[0].precioUnitarioUSD),
            "importeTotalUSD": Number(item.filaSeleccionada[0].totalUSD),
            "autorizada": true,
            "importeUnitarioUSDAutorizado": Number(item.valorPartidaUSD),
            "importeTotalUSDAutorizado": Number(item.filaSeleccionada[0].totalUSD),
            "fraccionArancelariaClave": item.filaSeleccionada[0].fraccionFrancelaria,
            "unidadMedidaClave": item.filaSeleccionada[0].unidadDeMedida
          }
        ]
      },
      "id_solcitud": item.mostrarPartidas.length > 0 ? Number(item.mostrarPartidas?.[0].idSolicitud) : 0,
      "cve_regimen": item.regimen,
      "cve_clasificacion_regimen": item.clasificacion,
      "productor": {
        "tipo_persona": true,
        "nombre": "Juan",
        "apellido_materno": "López",
        "apellido_paterno": "Norte",
        "razon_social": "Aceros Norte",
        "descripcion_ubicacion": "Calle Acero, No. 123, Col. Centro",
        "rfc": "AAL0409235E6",
        "pais": "SIN"
      },
      "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "Juan Pérez",
        "es_persona_moral": true,
        "certificado_serial_number": "string"
      },
      "representacion_federal": {
        "cve_entidad_federativa": item.entidad,
        "cve_unidad_administrativa": item.representacion
      },
      "entidades_federativas": {
        "cveEntidad": "SIN"
      },
      "lista_paises": [
        "USA",
        "CAN"
      ]
    };
    return new Promise((resolve, reject) => {
      this.importacionVehiculosUsadosDonacionService.guardarDatosPost(PAYLOAD).subscribe(
        (response) => {
          const API_RESPONSE = doDeepCopy(response);
          if (
            esValidObject(API_RESPONSE) &&
            esValidObject(API_RESPONSE.datos)
          ) {
            if (getValidDatos(API_RESPONSE.datos.id_solicitud)) {
              this.tramite130105Store.setIdSolicitud(
                API_RESPONSE.datos.id_solicitud
              );
              this.pasoNavegarPor({ accion: 'cont', valor: 2 });
            } else {
              this.tramite130105Store.setIdSolicitud(0);
            }
          }
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
* Obtiene el valor del índice de la acción del botón.
* @param e Acción del botón.
*/
  pasoNavegarPor(e: AccionBoton): void {
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
  * Emite un evento para cargar archivos.
  * {void} No retorna ningún valor.
  */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
 * Método para manejar el evento de carga de documentos.
 * Actualiza el estado del botón de carga de archivos.
 *  carga - Indica si la carga de documentos está activa o no.
 * {void} No retorna ningún valor.
 */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado de la sección de carga de documentos.
  *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
  * {void} No retorna ningún valor.
  */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
}