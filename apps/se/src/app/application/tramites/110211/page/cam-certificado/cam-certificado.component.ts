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
    const MERCANCIA_SELECCIONADAS = this.camCertificadoService.buildMercanciaSeleccionadas(item.mercanciaTabla);
    const PAYLOAD = {
      solicitud: {
        idSolicitud: 0,
        fechaCreacion: '2025-10-23T12:16:44.757Z',
        fechaInicioTramite: '2025-10-23T12:16:44.757Z',
        fechaEstatus: '2025-10-23T12:16:44.757Z',
        fechaActualizacion: '2025-10-23T12:16:44.757Z',
        costo: 0,
        estadoSolicitud: 'string',
        cveRolCapturista: 'string',
        cveUsuarioCapturista: 'string',
        idPersonaSolicitante: 0,
        idPeticionWs: 0,
        blnDepuracionDocProcesada: true,
        certificadoSerialNumber: 'string',
        idTipoTramite: 0,
        cveUnidadAdministrativa: 'string',
        numeroFolioTramiteOriginal: 'string',
        solicitante: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.757Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            coloniaEntity: {
              clave: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              cveDelegMun: 'string',
              cveLocalidad: 'string',
              cp: 'string',
              fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
              fechaFinVigencia: '2025-10-23T12:16:44.757Z',
              satColonyCd: 'string',
              blnActivo: true,
            },
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            delegacionMunicipio: {
              cveDelegMun: 'string',
              cveEntidad: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
              fechaFinVigencia: '2025-10-23T12:16:44.757Z',
              satMunicopality: 'string',
              blnActivo: true,
              entidadFederativa: {
                cveEntidad: 'string',
                nombre: 'string',
                codEntidadIdc: 'string',
                cvePais: 'string',
                fechaCaptura: '2025-10-23T12:16:44.757Z',
                fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
                fechaFinVigencia: '2025-10-23T12:16:44.757Z',
                activo: true,
              },
              colonias: [
                {
                  clave: 'string',
                  nombre: 'string',
                  fechaCaptura: '2025-10-23T12:16:44.757Z',
                  cveDelegMun: 'string',
                  cveLocalidad: 'string',
                  cp: 'string',
                  fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
                  fechaFinVigencia: '2025-10-23T12:16:44.757Z',
                  satColonyCd: 'string',
                  blnActivo: true,
                },
              ],
            },
            cveEntidad: 'string',
            entidadFederativa: {
              cveEntidad: 'string',
              nombre: 'string',
              codEntidadIdc: 'string',
              cvePais: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
              fechaFinVigencia: '2025-10-23T12:16:44.757Z',
              activo: true,
              pais: {
                cvePais: 'string',
                nombre: 'string',
                fechaCaptura: '2025-10-23T12:16:44.757Z',
                cvePaisWco: 'string',
                nombreAlterno: 'string',
                vigencia: {
                  fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
                  fechaFinVigencia: '2025-10-23T12:16:44.757Z',
                  blnActivo: true,
                },
              },
            },
            cvePais: 'string',
            pais: {
              cvePais: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              cvePaisWco: 'string',
              nombreAlterno: 'string',
              vigencia: {
                fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
                fechaFinVigencia: '2025-10-23T12:16:44.757Z',
                blnActivo: true,
              },
            },
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              fecIniVigencia: '2025-10-23T12:16:44.757Z',
              fecFinVigencia: '2025-10-23T12:16:44.757Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
        unidadAdministrativaRepresentacionFederal: {
          clave: 'string',
          idDependencia: 0,
          claveEntidad: 'string',
          claveUnidadAdminR: 'string',
          ideTipoUnidadAdministrativa: 'string',
          nivel: 0,
          acronimo: 'string',
          nombre: 'string',
          descripcion: 'string',
          fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
          fechaFinVigencia: '2025-10-23T12:16:44.757Z',
          activo: true,
          idDireccion: 0,
          fronteriza: true,
        },
        representanteLegalCapturistaGubernamental: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.757Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.757Z',
              fecIniVigencia: '2025-10-23T12:16:44.757Z',
              fecFinVigencia: '2025-10-23T12:16:44.757Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
        certificadoOrigen: {
          idSolicitud: 0,
          numeroCertificado: 'string',
          medioTransporte: 'string',
          observaciones: 'string',
          lugar: 'string',
          fechaExpedicion: '2025-10-23T12:16:44.757Z',
          fechaVencimiento: '2025-10-23T12:16:44.757Z',
          fechaCancelacion: '2025-10-23T12:16:44.757Z',
          precisa: 'string',
          presenta: 'string',
          justificacionRequerimiento: 'string',
          estadoCertificadoOrigen: 'string',
          rutaCompleta: 'string',
          puertoEmbarque: 'string',
          puertoDesembarque: 'string',
          puertoTransito: 'string',
          nombreEmbarcacion: 'string',
          numeroVuelo: 'string',
          valorMercancias: 0,
          timer: true,
          fecEmbarque: '2025-10-23T12:16:44.757Z',
          cvePaisFabricacion: 'string',
          descLugarEmbarque: 'string',
          fecImpresion: '2025-10-23T12:16:44.757Z',
          lugarRegistro: 'string',
          motivoCancelacion: 'string',
          anexoJapon: true,
          datosConfidencialesProductor: true,
          productorMismoExportador: true,
          idSolicitudR: 0,
          observacionesCupo: 'string',
          requiereJustificacion: true,
          tratadoAsociado: {
            idTratadoAcuerdo: 0,
            ideTipoTratadoAcuerdo: 'string',
            cveTratadoAcuerdo: 'string',
            nombre: 'string',
            pexim: true,
            fechaCaptura: '2025-10-23T12:16:44.757Z',
            fechaFinVigencia: '2025-10-23T12:16:44.757Z',
            ideTipoCupoSaai: 'string',
            fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
            activo: true,
            evaluarIndividual: true,
          },
          paisAsociado: {
            cvePais: 'string',
            nombre: 'string',
            fechaCaptura: '2025-10-23T12:16:44.757Z',
            cvePaisWco: 'string',
            nombreAlterno: 'string',
            vigencia: {
              fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
              fechaFinVigencia: '2025-10-23T12:16:44.757Z',
              blnActivo: true,
            },
          },
          cupoAsociado: {
            cupoAsociadoPK: {
              idSolicitud: 0,
              idCupo: 0,
            },
            cupo: {
              idCupo: 0,
              fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
              fechaFinVigencia: '2025-10-23T12:16:44.757Z',
              fundamentos: 'string',
              regimen: 'string',
              unidadMedidaComercializacion: true,
              ideClasifSubproducto: 'string',
              descSubProductoOtro: 'string',
              ideTipoCupo: 'string',
              cveUsuario: 'string',
              cveProducto: 'string',
              idTratadoAcuerdo: 0,
              cveUnidadMedidaOficialCupo: 'string',
              idCupoR: 0,
            },
            montoAsignado: 0,
            fechaAsignacion: '2025-10-23T12:16:44.757Z',
            fechaCancelacion: '2025-10-23T12:16:44.757Z',
            autorizado: true,
          },
          lenguaje: {
            clave: 'string',
            nombre: 'string',
            fechaInicioVigencia: '2025-10-23T12:16:44.757Z',
            fechaFinVigencia: '2025-10-23T12:16:44.757Z',
            blnActivo: true,
          },
          bloque: {
            paraPEXIM: true,
            idTratadoAcuerdo: 0,
            cveTipoTratadoAcuerdo: 'string',
            clave: 'string',
            nombre: 'string',
            blnPexim: true,
            fechaCaptura: '2025-10-23T12:16:44.757Z',
            fechaFinVigencia: '2025-10-23T12:16:44.757Z',
            ideTipoCupoSaai: 'string',
            fechaInicioVigencia: '2025-10-23T12:16:44.758Z',
            blnActivo: true,
          },
          mercanciasCertificado: [
            {
              idMercanciaCertificado: 0,
              cantidadComercial: 0,
              masaBruta: 0,
              valorMercancia: 0,
              numeroFactura: 'string',
              complementoDescripcion: 'string',
              tipoFactura: 'string',
              tipoProducto: 'string',
              numeroOrden: 0,
              fechaFactura: '2025-10-23T12:16:44.758Z',
              pesoBruto: 0,
              pesoNeto: 0,
              descPesoLetra: 'string',
              artesania: true,
              clasificacionArancelaria: 'string',
              mercanciaAprobada: true,
              ensamble: true,
              otraUnidadMedida: 'string',
              valorContenidoRegional: 'string',
              marca: 'string',
              serie: 'string',
              nombreComercial: 'string',
              rfcProductor: 'string',
              idCupoAsociado: 0,
              acumulacion: true,
              materialesFungibles: true,
              materialesIntermedios: true,
              minimis: true,
              idMecanismoAsignacion: 0,
            },
          ],
        },
        destinatario: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.758Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.758Z',
              fecIniVigencia: '2025-10-23T12:16:44.758Z',
              fecFinVigencia: '2025-10-23T12:16:44.758Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
        representanteLegal: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.758Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.758Z',
              fecIniVigencia: '2025-10-23T12:16:44.758Z',
              fecFinVigencia: '2025-10-23T12:16:44.758Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
        tercerOperador: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.758Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.758Z',
              fecIniVigencia: '2025-10-23T12:16:44.758Z',
              fecFinVigencia: '2025-10-23T12:16:44.758Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
        entidadFederativa: [
          {
            entidadSolicitud: 0,
            idSolicitud: 0,
            cveEntidad: 'string',
            tipoEntidad: 'string',
            cveDelegMun: 'string',
            entidad: {
              cveEntidad: 'string',
              nombre: 'string',
              codEntidadIdc: 'string',
              cvePais: 'string',
              fechaCaptura: '2025-10-23T12:16:44.758Z',
              fechaInicioVigencia: '2025-10-23T12:16:44.758Z',
              fechaFinVigencia: '2025-10-23T12:16:44.758Z',
              activo: true,
              pais: {
                cvePais: 'string',
                nombre: 'string',
                fechaCaptura: '2025-10-23T12:16:44.758Z',
                cvePaisWco: 'string',
                nombreAlterno: 'string',
                vigencia: {
                  fechaInicioVigencia: '2025-10-23T12:16:44.758Z',
                  fechaFinVigencia: '2025-10-23T12:16:44.758Z',
                  blnActivo: true,
                },
              },
            },
            solicitud: {
              idSolicitud: 0,
              fechaCreacion: '2025-10-23T12:16:44.758Z',
              fechaInicioTramite: '2025-10-23T12:16:44.758Z',
              fechaEstatus: '2025-10-23T12:16:44.758Z',
              fechaActualizacion: '2025-10-23T12:16:44.758Z',
              costo: 0,
              estadoSolicitud: 'string',
              cveRolCapturista: 'string',
              cveUsuarioCapturista: 'string',
              idPersonaSolicitante: 0,
              idPeticionWs: 0,
              blnDepuracionDocProcesada: true,
              certificadoSerialNumber: 'string',
              idTipoTramite: 0,
              cveUnidadAdministrativa: 'string',
              numeroFolioTramiteOriginal: 'string',
              esNuevo: 'string',
              certSerialNumber: 'string',
              idPersonaSolicitud: 0,
              clave: 'string',
              numFolioTramite: 'string',
              discriminatorValue: 'string',
              documentosRequeridos: [
                {
                  nombre: 'string',
                  id: 'string',
                  idDocumentoSeleccionado: 'string',
                  idTipoDocumento: 'string',
                  hashDocumento: 'string',
                  selloDocumento: 'string',
                  cvePersona: 0,
                  documentosDisponibles: [
                    {
                      nombre: 'string',
                      id: 'string',
                      file: 'string',
                      ruta: 'string',
                      sello: 'string',
                      idTipoDocumento: 'string',
                      nombreDocumento: 'string',
                      idDoctoSol: 'string',
                      mensajesDigitalizacion: ['string'],
                      statusDigitalizacion: true,
                      mensajeGuardado: 'string',
                      dpiMinimo: 'string',
                      tamanioMaximo: 0,
                      mensajeTamanioMaximo: 'string',
                      edocument: 'string',
                    },
                  ],
                  reglaAnexado: true,
                  numeroAnexoDocumento: 'string',
                },
              ],
              listaDocumentos: [
                {
                  nombre: 'string',
                  id: 'string',
                  file: 'string',
                  ruta: 'string',
                  sello: 'string',
                  idTipoDocumento: 'string',
                  nombreDocumento: 'string',
                  idDoctoSol: 'string',
                  mensajesDigitalizacion: ['string'],
                  statusDigitalizacion: true,
                  mensajeGuardado: 'string',
                  dpiMinimo: 'string',
                  tamanioMaximo: 0,
                  mensajeTamanioMaximo: 'string',
                  edocument: 'string',
                },
              ],
            },
          },
        ],
        certificado: {
          certSerialNumber: 'string',
          certificado: null,
          fechaRevocacion: '2025-10-23T12:16:44.758Z',
          fechaIniVigencia: '2025-10-23T12:16:44.758Z',
          fechaFinVigencia: '2025-10-23T12:16:44.758Z',
        },
        blnTercerOperador: true,
        clavePaisSeleccionado: 'string',
        blnPeriodo: true,
        blnAnexoJapon: true,
        productoresAsociados: [
          {
            idPersonaSolicitud: 0,
            idPersonaPersonaSolicitudR: 0,
            idSolicitud: 0,
            nombre: 'string',
            apellidoMaterno: 'string',
            apellidoPaterno: 'string',
            razonSocial: 'string',
            rfc: 'string',
            curp: 'string',
            ideTipoPersonaSol: 'string',
            correoElectronico: 'string',
            cedulaProfesional: 'string',
            nss: 'string',
            telefono: 'string',
            descripcionGiro: 'string',
            cvePaisOrigen: 'string',
            idDireccionSol: 0,
            tipoPatenteAgente: 'string',
            recif: 'string',
            puesto: 'string',
            tipoAgente: 'string',
            numeroPatente: 'string',
            numeroIdentificacionFiscal: 'string',
            personaMoral: true,
            extranjero: true,
            organismoPublico: true,
            cveUsuario: 'string',
            paginaWeb: 'string',
            ideGenerica1: 'string',
            rfcExtranjero: 'string',
            codAutorizacion: 'string',
            actividadProductiva: 'string',
            estadoEvaluacionEntidad: 'string',
            estadoEntidad: 'string',
            original: true,
            modificado: true,
            numeroRegistro: 'string',
            concentimientoInstalacionRecuperacion: true,
            cveCatalogo: 'string',
            alquilado: true,
            volumenAlmacenaje: 0,
            capacidadAlmacenaje: 0,
            descripcionDetalladaActividadEconomica: 'string',
            activo: true,
            generico1: true,
            area: 'string',
            cveNacionalidad: 'string',
            clasificacionArancelaria: 'string',
            infoAdicional: true,
            montoImportacion: 0,
            montoExportacion: 0,
            pctParticAccionaria: 0,
            ampliacionModelos: true,
            ampliacionPaises: true,
            fecFallecimiento: '2025-10-23T12:16:44.758Z',
            domicilio: {
              idDomicilio: 0,
              calle: 'string',
              numExterior: 'string',
              numInterior: 'string',
              codigoPostal: 'string',
              informacionExtra: 'string',
              clave: 'string',
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              cveEntidad: 'string',
              cvePais: 'string',
              ciudad: 'string',
              telefono: 'string',
              fax: 'string',
              municipio: 'string',
              colonia: 'string',
              descUbicacion: 'string',
              cveCatalogo: 'string',
              telefonos: 'string',
              tipoDomicilio: 0,
              localidad: {
                cveLocalidad: 'string',
                cveDelegMun: 'string',
                nombre: 'string',
                fechaCaptura: '2025-10-23T12:16:44.758Z',
                fecIniVigencia: '2025-10-23T12:16:44.758Z',
                fecFinVigencia: '2025-10-23T12:16:44.758Z',
                codigoPostal: 'string',
                satTownCode: 'string',
                blnActivo: true,
              },
            },
            idDomicilio: 0,
            consecutivo: 0,
            nombreCompleto: 'string',
            direccionCompleta: 'string',
            productorNuevo: true,
            existe: true,
          },
        ],
        blnJustificacionCertificado: true,
        idTratadoAcuerdoSeleccionado: 0,
        discriminatorValue: 'string',
        personaSolicitud: {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.758Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.759Z',
              fecIniVigencia: '2025-10-23T12:16:44.759Z',
              fecFinVigencia: '2025-10-23T12:16:44.759Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
        },
      },
      productoresPorExportadorSeleccionados: [
        {
          idPersonaSolicitud: 0,
          idPersonaPersonaSolicitudR: 0,
          idSolicitud: 0,
          nombre: 'string',
          apellidoMaterno: 'string',
          apellidoPaterno: 'string',
          razonSocial: 'string',
          rfc: 'string',
          curp: 'string',
          ideTipoPersonaSol: 'string',
          correoElectronico: 'string',
          cedulaProfesional: 'string',
          nss: 'string',
          telefono: 'string',
          descripcionGiro: 'string',
          cvePaisOrigen: 'string',
          idDireccionSol: 0,
          tipoPatenteAgente: 'string',
          recif: 'string',
          puesto: 'string',
          tipoAgente: 'string',
          numeroPatente: 'string',
          numeroIdentificacionFiscal: 'string',
          personaMoral: true,
          extranjero: true,
          organismoPublico: true,
          cveUsuario: 'string',
          paginaWeb: 'string',
          ideGenerica1: 'string',
          rfcExtranjero: 'string',
          codAutorizacion: 'string',
          actividadProductiva: 'string',
          estadoEvaluacionEntidad: 'string',
          estadoEntidad: 'string',
          original: true,
          modificado: true,
          numeroRegistro: 'string',
          concentimientoInstalacionRecuperacion: true,
          cveCatalogo: 'string',
          alquilado: true,
          volumenAlmacenaje: 0,
          capacidadAlmacenaje: 0,
          descripcionDetalladaActividadEconomica: 'string',
          activo: true,
          generico1: true,
          area: 'string',
          cveNacionalidad: 'string',
          clasificacionArancelaria: 'string',
          infoAdicional: true,
          montoImportacion: 0,
          montoExportacion: 0,
          pctParticAccionaria: 0,
          ampliacionModelos: true,
          ampliacionPaises: true,
          fecFallecimiento: '2025-10-23T12:16:44.759Z',
          domicilio: {
            idDomicilio: 0,
            calle: 'string',
            numExterior: 'string',
            numInterior: 'string',
            codigoPostal: 'string',
            informacionExtra: 'string',
            clave: 'string',
            cveLocalidad: 'string',
            cveDelegMun: 'string',
            cveEntidad: 'string',
            cvePais: 'string',
            ciudad: 'string',
            telefono: 'string',
            fax: 'string',
            municipio: 'string',
            colonia: 'string',
            descUbicacion: 'string',
            cveCatalogo: 'string',
            telefonos: 'string',
            tipoDomicilio: 0,
            localidad: {
              cveLocalidad: 'string',
              cveDelegMun: 'string',
              nombre: 'string',
              fechaCaptura: '2025-10-23T12:16:44.759Z',
              fecIniVigencia: '2025-10-23T12:16:44.759Z',
              fecFinVigencia: '2025-10-23T12:16:44.759Z',
              codigoPostal: 'string',
              satTownCode: 'string',
              blnActivo: true,
            },
          },
          idDomicilio: 0,
          consecutivo: 0,
          nombreCompleto: 'string',
          direccionCompleta: 'string',
          productorNuevo: true,
          existe: true,
        },
      ],
      idPersona: 0,
      clavePaisSeleccionado: 'string',
      blnAnexoJapon: true,
      blnTercerOperador: true,
      listaMercanciasSeleccionadas: [
        {
          precioFrancoFabrica: 0,
          pesoAcumuladoTextil: 0,
          pesoInsumosNoOriginarios: 0,
          volumenInsumosNoOriginarios: 0,
          valorTransaccional: 0,
          valorTransaccionalFOB: 0,
          costoNetoAP: 0,
          descripcionJuego: 'string',
          pesoBrutoTabaco: 0,
          pesoNetoTabaco: 0,
          pesoNetoTabacoLetra: 'string',
          pesoNetoFreshMinneola: 0,
          pesoBrutoFreshMinneola: 0,
          pesoNetoNaranjas: 0,
          pesoBrutoNaranjas: 0,
          pesoNetoJugoNaranja: 0,
          pesoBrutoJugoNaranja: 0,
          masaBruta: 0,
          acumulacion: true,
          artesania: true,
          complementoDescripcion: 'string',
          materialesFungibles: true,
          materialesIntermedios: true,
          minimis: true,
          numeroSerie: 'string',
          idCupoAsociado: 0,
          ensamble: true,
          mercanciaAprobada: true,
          rfcProductor: 'string',
          idMecanismoAsignacion: 0,
          tipoFactura: 'string',
          otrasInstancias: 'string',
          numeroOrden: 0,
          anexoTejidosAlgodon: true,
          anexoTejidos: true,
          otraUnidadMedida: 'string',
          valorContenidoRegional: 'string',
          criterioOrigen: 'string',
          idMercanciaCertificado: 0,
          tipoRequisito: 0,
          idSolicitud: 0,
          cantidadComercial: 0,
          cantidadTarifaria: 0,
          umt: 'string',
          descGenerica3: 'string',
          unidadesAutorizadas: 0,
          importadorExportadorPrevio: true,
          capacidad: 0,
          anio: 0,
          modelo: 'string',
          marca: 'string',
          serie: 'string',
          lote: 'string',
          descripcion: 'string',
          usoEspecifico: 'string',
          estadoFisico: 'string',
          condicionMercancia: 'string',
          volumen: 0,
          peso: 0,
          nombreCientifico: 'string',
          nombreComercial: 'string',
          nombreComun: 'string',
          nombreIngles: 'string',
          nombreQuimico: 'string',
          nombreTecnico: 'string',
          costoUnitario: 0,
          costoNeto: 0,
          numeroUnidades: 0,
          precioUnitario: 0,
          valorAgregadoMex: 0,
          valorFacturaUSD: 0,
          numeroFactura: 'string',
          fechaFactura: '2025-10-23T12:16:44.759Z',
          observaciones: 'string',
          justificacionImportacionExportacion: 'string',
          descClobGenerica1: 'string',
          descClobGenerica2: 'string',
          fecPedimento: '2025-10-23T12:16:44.759Z',
          ideGenerica1: 'string',
          ideGenerica2: 'string',
          ideGenerica3: 'string',
          ideTipoMetodo: 'string',
          numeroCAS: 'string',
          numeroFolioPedimento: 'string',
          uso: 'string',
          blnDanioMuestra: true,
          idPeximOcupado: 'string',
          cveFraccion: 'string',
          cveSubdivision: 'string',
          descGenerica2: 'string',
          cvePaisOrigen: 'string',
          cvePaisDestino: 'string',
          fecSalida: '2025-10-23T12:16:44.759Z',
        },
      ],
      certificado: {
        certSerialNumber: 'string',
        certificado: null,
        fechaRevocacion: '2025-10-23T12:16:44.759Z',
        fechaIniVigencia: '2025-10-23T12:16:44.759Z',
        fechaFinVigencia: '2025-10-23T12:16:44.759Z',
      },
      idCupoAsociado: 0,
      idMecanismoAsignacion: 0,
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
