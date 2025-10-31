/**
 * @component CamCertificadoComponent
 * @description
 * El componente `CamCertificadoComponent` es responsable de manejar el flujo de navegación
 * entre los distintos pasos del proceso CAM. Utiliza el componente `WizardComponent` para
 * controlar la transición entre pasos, y presenta un mensaje informativo asociado al proceso.
 */
import {
  AccionBoton,
  ListaPasoWizard,
} from '../../models/cam-certificado.module';
import {
  CamState,
  camCertificadoStore,
} from '../../estados/cam-certificado.store';
import { Component, ViewChild } from '@angular/core';
import {
  DatosPasos,
  JSONResponse,
  doDeepCopy,
  esValidObject,
  getValidDatos,
} from '@ng-mf/data-access-user';
import {
  ERROR_FORMA_ALERT,
  PASOS,
} from '../../constantes/cam-certificado.module';
import { Subject, take, takeUntil } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

@Component({
  selector: 'app-cam-certificado',
  templateUrl: './cam-certificado.component.html',
  styleUrl: './cam-certificado.component.scss',
})
export class CamCertificadoComponent {
  /**
   * @property {ListaPasoWizard[]} pasos
   * @description
   * Arreglo de pasos definidos para el flujo del wizard del trámite CAM.
   * Utilizado para determinar la cantidad de pasos y su contenido.
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Mensaje principal o título que se muestra en el encabezado del formulario.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent` que gestiona la lógica de navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   * const isValid = this.pasoUnoComponent.validateForms();
   * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Contiene el estado actual de la solicitud del trámite CAM.
   *
   * Esta propiedad almacena los datos provenientes del store o del servicio correspondiente,
   * y representa la información principal asociada al flujo del trámite.
   *
   * @type {CamState}
   * @public
   */
  public solicitudState!: CamState;

  /**
   * @property {number} indice
   * @description
   * Índice actual del paso activo en el wizard. Comienza en 1.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Contiene metainformación sobre el wizard, como el número de pasos,
   * el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esFormaValido: boolean = false;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Inicializa el componente inyectando las dependencias necesarias y suscribiéndose al estado del certificado CAM.
   *
   * En el constructor se inyectan las instancias del `camCertificadoStore` y del `camCertificadoQuery`,
   * que permiten gestionar y consultar el estado global del trámite CAM.
   *
   * Además, se realiza una suscripción al observable `selectCam$` del query para
   * mantener actualizada la propiedad `solicitudState` con los datos más recientes.
   *
   * La suscripción se administra mediante `takeUntil(this.destroyNotifier$)` para evitar fugas de memoria
   * al destruir el componente.
   *
   * @constructor
   * @param {camCertificadoStore} store - Servicio encargado de gestionar el estado (store) del certificado CAM.
   * @param {camCertificadoQuery} query - Servicio encargado de consultar y exponer el estado del certificado CAM.
   */
  constructor(
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    public camCertificadoService: CamCertificadoService
  ) {
    this.query.selectCam$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * @method getValorIndice
   * @description
   * Método encargado de actualizar el paso actual (`indice`) y de navegar
   * hacia adelante o atrás en el wizard, según la acción especificada.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso destino y la acción ('cont' para continuar, otro para retroceder).
   *
   * @example
   * ```ts
   * getValorIndice({ valor: 2, accion: 'cont' });
   * ```
   */
  // getValorIndice(e: AccionBoton): void {
  //   this.esFormaValido = false;

  //   // Validar formularios antes de continuar desde el paso uno
  //   if (this.indice === 1 && e.accion === 'cont') {
  //     const ISVALID = this.validarTodosFormulariosPasoUno();
  //     if (!ISVALID) {
  //       this.esFormaValido = true;
  //       return; // Detener ejecución si los formularios son inválidos
  //     }
  //   }
  //   // Calcular el nuevo índice basado en la acción
  //   let indiceActualizado = e.valor;
  //   if (e.accion === 'cont') {
  //     indiceActualizado = e.valor + 1;
  //   } else if (e.accion === 'ant') {
  //     indiceActualizado = e.valor - 1;
  //   }

  //   // Validar que el nuevo índice esté dentro de los límites permitidos
  //   if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
  //     // Actualizar el índice y datosPasos
  //     this.indice = indiceActualizado;
  //     this.datosPasos.indice = indiceActualizado;

  //     if (e.accion === 'cont') {
  //       this.wizardComponent.siguiente();
  //     } else if (e.accion === 'ant') {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }

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
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.camCertificadoService
      .getAllState()
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
  guardar(item: CamState): Promise<JSONResponse> {
    console.log(item)
    const MERCANCIA_SELECCIONADAS = this.camCertificadoService.buildMercanciaSeleccionadas(item.mercanciaSeleccionadasDatos);
    const PAYLOAD = {
      "rfcSolicitante": "AAL0409235E6",
      "idSolicitud": 0,
      "cve_unidad_administrativa": null,
      "costo_total": null,
      "certificado_serial_number": null,
      "numero_folio_tramite_original": null,
      "certificadoOrigen": {
        "observaciones": item.formDatosCertificado['observacionesDates'],
        "observacionesCupo": "",
        "lugarRegistro": item.grupoRepresentativo['lugar'],
        "lenguaje": {
          "clave": item.idiomaDatosSeleccion.clave
        }
      },
      "destinatario": {
        "nombre": item.formDatosDelDestinatario['nombres'],
        "razonSocial": item.formDatosDelDestinatario['razonSocial'],
        "rfcExtranjero": item.formDatosDelDestinatario['numeroDeRegistroFiscal'],
        "correoElectronico": item.formDestinatario['correoElectronico'],
        "apellidoPaterno": item.formDatosDelDestinatario['primerApellido'],
        "apellidoMaterno": item.formDatosDelDestinatario['segundoApellido'],
        "destinatarioDomicilio": {
          "calle": item.formDestinatario['calle'],
          "numExterior": item.formDestinatario['numeroLetra'],
          "ciudad": item.formDestinatario['ciudad'],
          "lada": item.formDestinatario['lada'],
          "telefono": item.formDestinatario['telefono'],
          "fax": item.formDestinatario['fax']
        }
      },
      "representanteLegal": {
        "nombre": item.grupoRepresentativo['nombreExportador'],
        "razonSocial": item.grupoRepresentativo['empresa'],
        "puesto": item.grupoRepresentativo['cargo'],
        "correoElectronico": item.grupoRepresentativo['correoElectronico'],
        "representanteLegalDomicilio": {
          "telefono": item.grupoRepresentativo['telefono'],
          "fax": item.grupoRepresentativo['fax'],
          "lada": item.grupoRepresentativo['lada']
        }
      },
      "blnTercerOperador": item.formCertificado['si'],
      "tercerOperador": {
        "razonSocial": item.formCertificado['razonSocial'],
        "rfcExtranjero": item.formCertificado['numeroDeRegistroFiscal'],
        "nombre": item.formCertificado['nombres'],
        "correoElectronico": item.formCertificado['correo'],
        "cvePaisOrigen": item.formCertificado['pais'],
        "tercerOperadorDomicilio": {
          "calle": item.formCertificado['calle'],
          "numExterior": item.formCertificado['numeroLetra'],
          "ciudad": item.formCertificado['ciudad'],
          "lada": item.formCertificado['lada'],
          "telefono": item.formCertificado['telefono'],
          "fax": item.formCertificado['fax']
        }
      },
      "entidadFederativa": [
        {
          "cveEntidad": item.entidadFederativaSeleccion.clave
        }
      ],
      "unidadAdministrativaRepresentacionFederal": {
        "cveEntidad": 'CHIS'
      },
      "clavePaisSeleccionado": item.paisBloques[0].clave,
      "solicitante": {
        "rfc": "AAL0409235E6",
        "cveUsuario": "AAL0409235E6",
        "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
        "descripcionGiro": "Siembra, cultivo y cosecha de otros cultivos",
        "correoElectronico": "vucem2021@gmail.com",
        "telefono": "55-98764532",
        "solicitanteDomicilio": {
          "codigoPostal": "81210",
          "calle": "CAMINO VIEJO",
          "numeroExterior": "1353",
          "numeroInterior": "",
          "solicitanteEntidadFederativa": {
            "cveEntidad": "SIN",
            "nombre": "SINALOA"
          },
          "solicitantePais": {
            "cvePais": "MEX",
            "nombre": "ESTADOS UNIDOS MEXICANOS"
          },
          "solicitanteDelegacionMunicipio": {
            "cveDelegMun": "25001",
            "nombre": "AHOME"
          },
          "solicitanteLocalidad": {
            "cveLocalidad": "00181210008",
            "nombre": "LOS MOCHIS"
          },
          "solicitanteColonia": {
            "cveColonia": "00181210001",
            "nombre": "MIGUEL HIDALGO"
          }
        }
      },
      "listaMercanciasSeleccionadas": [MERCANCIA_SELECCIONADAS],
      "tratadoAcuerdo": {
        "idTratadoAcuerdoSeleccionado": item.estado.clave
      },
      "blnAnexoJapon": false,
      "idCupoAsociado": 0,
      "idMecanismoAsignacion": 0,
      "productoresPorExportadorSeleccionados": [
        {
          "idPersonaSolicitud": 0,
          "idPersonaPersonaSolicitudR": 0,
          "idSolicitud": 0,
          "nombre": "string",
          "apellidoMaterno": "string",
          "apellidoPaterno": "string",
          "razonSocial": "string",
          "rfc": "string",
          "curp": "string",
          "ideTipoPersonaSol": "string",
          "correoElectronico": "string",
          "cedulaProfesional": "string",
          "nss": "string",
          "telefono": "string",
          "descripcionGiro": "string",
          "cvePaisOrigen": "string",
          "idDireccionSol": 0,
          "tipoPatenteAgente": "string",
          "recif": "string",
          "puesto": "string",
          "tipoAgente": "string",
          "numeroPatente": "string",
          "numeroIdentificacionFiscal": "string",
          "personaMoral": true,
          "extranjero": true,
          "organismoPublico": true,
          "cveUsuario": "string",
          "paginaWeb": "string",
          "ideGenerica1": "string",
          "rfcExtranjero": "string",
          "codAutorizacion": "string",
          "actividadProductiva": "string",
          "estadoEvaluacionEntidad": "string",
          "estadoEntidad": "string",
          "original": true,
          "modificado": true,
          "numeroRegistro": "string",
          "concentimientoInstalacionRecuperacion": true,
          "cveCatalogo": "string",
          "alquilado": true,
          "volumenAlmacenaje": 0,
          "capacidadAlmacenaje": 0,
          "descripcionDetalladaActividadEconomica": "string",
          "activo": true,
          "generico1": true,
          "area": "string",
          "cveNacionalidad": "str",
          "clasificacionArancelaria": "string",
          "infoAdicional": true,
          "montoImportacion": 0,
          "montoExportacion": 0,
          "pctParticAccionaria": 0,
          "ampliacionModelos": true,
          "ampliacionPaises": true,
          "fecFallecimiento": "2025-10-28T05:06:49.959Z",
          "domicilio": {
            "idDomicilio": 0,
            "calle": "string",
            "numExterior": "string",
            "numInterior": "string",
            "codigoPostal": "string",
            "informacionExtra": "string",
            "clave": "string",
            "cveLocalidad": "string",
            "cveDelegMun": "string",
            "cveEntidad": "string",
            "cvePais": "str",
            "ciudad": "string",
            "telefono": "string",
            "fax": "string",
            "municipio": "string",
            "colonia": "string",
            "descUbicacion": "string",
            "cveCatalogo": "string",
            "telefonos": "string",
            "tipoDomicilio": 0,
            "localidad": {
              "cveLocalidad": "string",
              "cveDelegMun": "string",
              "nombre": "string",
              "fechaCaptura": "2025-10-28T05:06:49.959Z",
              "fecIniVigencia": "2025-10-28T05:06:49.959Z",
              "fecFinVigencia": "2025-10-28T05:06:49.959Z",
              "codigoPostal": "string",
              "satTownCode": "string",
              "blnActivo": true
            }
          },
          "idDomicilio": 0,
          "consecutivo": 0,
          "nombreCompleto": "string",
          "direccionCompleta": "string",
          "productorNuevo": true,
          "existe": true
        }
      ],
      "datosMercancia": {
        "claveFraccionArancelaria": item.formCertificado['fraccionArancelariaForm'],
        "numeroRegistroProductos":item.formCertificado['registroProductoForm'],
        "nombreComercial": item.formCertificado['nombreComercialForm'],
        "fechInicio": item.formCertificado['fechaInicioInput'],
        "fechFin": item.formCertificado['fechaFinalInput']
      },
      "listaMercanciasDisponsibles": [
        {
          "fraccionArancelaria": "string",
          "nombreTecnico": "string",
          "nombreComercial": "string",
          "numeroRegistroProducto": "string",
          "fechaExpedicion": "2025-10-28T05:06:49.959Z",
          "fechaVencimiento": "2025-10-28T05:06:49.959Z"
        }
      ]
    };
    return new Promise((resolve, reject) => {
      this.camCertificadoService.guardarDatosPost(PAYLOAD).subscribe(
        (response) => {
          const API_RESPONSE = doDeepCopy(response);
          if (
            esValidObject(API_RESPONSE) &&
            esValidObject(API_RESPONSE.datos)
          ) {
            if (getValidDatos(API_RESPONSE.datos.id_solicitud)) {
              this.store.setIdSolicitud(API_RESPONSE.datos.id_solicitud);
              this.pasoNavegarPor({ accion: 'cont', valor: 2 });
            } else {
              this.store.setIdSolicitud(0);
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
   * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
   */
  public validarTodosFormulariosPasoUno(): boolean {
    if (this.pasoUnoComponent) {
      const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
      if (ISFORM_VALID_TOUCHED) {
        return true;
      }
      return false;
    }
    return false;
  }
}
