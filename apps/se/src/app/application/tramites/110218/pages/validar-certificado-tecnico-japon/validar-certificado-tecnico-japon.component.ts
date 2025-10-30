import { Component, ViewChild } from '@angular/core';
import {
  DatosPasos,
  JSONResponse,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
  doDeepCopy,
  esValidObject,
  getValidDatos,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud110218State,
  Tramite110218Store,
} from '../../estados/tramites/tramite110218.store';
import { Subject, take, takeUntil } from 'rxjs';
import { CertificadoTecnicoJaponService } from '../../service/certificadotecnicoJapon.service';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

/**
 * Interfaz para definir la estructura de una acción de botón dentro del asistente.
 */
interface AccionBoton {
  /**
   * Tipo de acción del botón (por ejemplo, 'cont' para continuar, 'ant' para anterior).
   */
  accion: string;

  /**
   * Valor asociado a la acción del botón (por ejemplo, el índice del paso).
   */
  valor: number;
}

/**
 * Componente para validar el certificado técnico de Japón.
 *
 * Este componente implementa un asistente (wizard) que guía al usuario paso a paso en el proceso
 * de validación del certificado técnico de Japón. Permite:
 * - Navegar entre diferentes pasos del trámite.
 * - Capturar y validar información relevante del solicitante y del certificado.
 * - Interactuar con formularios reactivos y servicios para enviar y recibir datos.
 * - Mostrar mensajes y notificaciones según el estado del proceso.
 *
 * Utiliza servicios y stores para mantener el estado sincronizado y facilitar la comunicación con el backend.
 */
@Component({
  selector: 'app-validar-certificado-tecnico-japon',
  templateUrl: './validar-certificado-tecnico-japon.component.html',
})
export class ValidarCertificadoTecnicoJaponComponent {
  /**
   * Referencia al componente de pestañas del solicitante.
   */
  @ViewChild('solicitanteTabs') solicitanteTabsComponent:
    | { validarCamposObligatorios: () => boolean }
    | undefined;

  /**
   * Lista de pasos del asistente para la validación del certificado.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña activa.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente del asistente (WizardComponent).
   * Permite la navegación entre los pasos del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Configuración de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  

  /**
   * Indica si se muestra el formulario de mercancía.
   */
  showMercanciaForm: boolean = true;

  /**
   * Captura el índice de la pestaña seleccionada.
   */
  capturarTapIndice: number = 1;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud 110218.
   *
   * Esta propiedad mantiene la información de la solicitud en curso y
   * se sincroniza de manera reactiva con el store correspondiente.
   * Contiene los datos necesarios para representar y manipular
   * la solicitud dentro del componente.
   *
   * @type {Solicitud110218State}
   * @public
   */
  solicitudState!: Solicitud110218State;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
 * Indica si el formulario actual es válido (`true`) o no (`false`).
 */
  esFormaValido: boolean = false;

  /**
   * Constructor del componente.
   *
   * Inyecta los servicios necesarios para gestionar y consultar el estado
   * de la solicitud **110218**.
   * Al inicializarse, se suscribe al observable `selectTramite110218State$`
   * expuesto por el `Tramite110218Query`, de manera que la propiedad
   * `solicitudState` se mantenga sincronizada con el estado del store.
   *
   * @param {Tramite110218Store} tramite110218Store - Servicio `Store` encargado
   *                                                  de gestionar el estado global
   *                                                  de la solicitud 110218.
   * @param {Tramite110218Query} tramite110218Query - Servicio `Query` que expone
   *                                                  observables y selectores para
   *                                                  consultar el estado reactivo.
   */
  constructor(
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private servicios: CertificadoTecnicoJaponService
  ) {
    this.tramite110218Query.selectTramite110218State$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente en el asistente.
   *
   */
  // getValorIndice(e: AccionBoton): void {
  //   if (e.accion === 'cont' && this.solicitanteTabsComponent) {
  //     if (!this.solicitanteTabsComponent.validarCamposObligatorios()) {
  //       return;
  //     }
  //   }
  //   if (e.valor > 0 && e.valor < 5) {
  //     this.indice = e.valor;
  //     if (e.accion === 'cont') {
  //       this.wizardComponent.siguiente();
  //     } else {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }

   /**
     * Actualiza la propiedad `indice` según el valor del objeto `AccionBoton` proporcionado.
     * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
     * Dependiendo de la propiedad `accion` de `AccionBoton`, mueve el componente del asistente hacia adelante o hacia atrás.
     *
     * @param {AccionBoton} e - El objeto del botón de acción que contiene las propiedades `valor` y `accion`.
     * @returns {void}
     */
      getValorIndice(e: AccionBoton): void {
      this.esFormaValido = false;
      // Validar formularios antes de continuar desde el paso uno
      if (this.indice === 1 && e.accion === 'cont') {
        const ISVALID = this.solicitanteTabsComponent?.validarCamposObligatorios();
        if (!ISVALID) {
          this.esFormaValido = true;
          return; // Detener ejecución si los formularios son inválidos
        }
        this.obtenerDatosDelStore();
      } else if (e.valor > 0 && e.valor <= this.pasosSolicitar.length) {
        this.pasoNavegarPor(e);
      }
    }

  /**
   * Controla la visibilidad del formulario de mercancía y almacena el índice de la pestaña activa.
   *
   */
  isModificar($event: boolean, tapIndex: number): void {
    this.showMercanciaForm = $event;
    this.capturarTapIndice = tapIndex;
  }


  
/**
 * Obtiene los datos almacenados en el estado (store) mediante el servicio correspondiente.
 * Realiza una única suscripción al observable usando 'take(1)'.
 * Al recibir los datos, los guarda mediante el método 'guardar'.
 */
  obtenerDatosDelStore(): void {
    this.servicios.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }

  /**
   * Construye y envía la información completa de la solicitud 110218 al servicio correspondiente.
   * Genera los objetos necesarios (tratados, destinatario, transporte, certificado y datos del certificado).
   * Envía el payload al backend mediante una petición POST y actualiza el ID de solicitud en el store.
   * Devuelve una promesa con la respuesta del servidor en formato JSONResponse.
   */
    guardar(data: Solicitud110218State): Promise<JSONResponse> {
      const TRATADOS = this.servicios.buildTratados(data);
      const DESTINATARIO = this.servicios.buildDestinatario(data);
      const TRANSPORTE = this.servicios.buildTransporte(data);
      const CERTIFICADO = this.servicios.buildCertificado(data);
      const DATOS_CERTIFICADO = this.servicios.buildDatosCertificado(data);
      // const PAYLOAD = {
      // "tipoDeSolicitud": "guardar",
      // "idSolicitud": 0,
      // "idTipoTramite": 110218,
      // "discriminatorValue": "110218",
      // "rfc_solicitante": "AAL0409235E6",
      // "rfcSolicitante": "AAL0409235E6",
      // "rfc": "AAL0409235E6",
      // "cve_unidad_administrativa": "0203",
      // "costoTotal": 10000.5,
      // "certificado_serial_number": "1234567890ABCDEF",
      // "numero_folio_tramite_original": "TRM-2023-00001",
      // "nombre": "Juan",
      // "apPaterno": "Pérez",
      // "apMaterno": "López",
      // "telefono": "5551234567",
      //  "solicitante": {
      //     "rfc": "AAL0409235E6",
      //     "nombre": "ACEROS ALVARADO S.A. DE C.V.",
      //     "actividad_economica": "Fabricación de productos de hierro y acero",
      //     "correo_electronico": "contacto@acerosalvarado.com",
      //     "domicilio": {
      //         "pais": "México",
      //         "codigo_postal": "06700",
      //         "estado": "Ciudad de México",
      //         "municipio_alcaldia": "Cuauhtémoc",
      //         "localidad": "Centro",
      //         "colonia": "Roma Norte",
      //         "calle": "Av. Insurgentes Sur",
      //         "numero_exterior": "123",
      //         "numero_interior": "Piso 5, Oficina A",
      //         "lada": "",
      //         "telefono": "123456"
      //     }
      // },
      //   "tratados": TRATADOS,
      //   "transporte": TRANSPORTE,
      //   "certificado": CERTIFICADO,
      //  "destinatario": DESTINATARIO,
      //  "datos_del_cerificado": DATOS_CERTIFICADO
      // }

      const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 0, 
    "idTipoTramite": 110218,
    "discriminatorValue": "110218",
    "rfc_solicitante": "AAL0409235E6",
    "rfc": "AAL0409235E6",
    "cve_unidad_administrativa": "0203",
    "costoTotal": 10000.5,
    "certificado_serial_number": "1234567890ABCDEF",
    "numero_folio_tramite_original": "TRM-2023-00001",
    "nombre": "Juan",
    "apPaterno": "Pérez",
    "apMaterno": "López",
    "telefono": "5551234567",
    "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "ACEROS ALVARADO S.A. DE C.V.",
        "actividad_economica": "Fabricación de productos de hierro y acero",
        "correo_electronico": "contacto@acerosalvarado.com",
        "domicilio": {
            "pais": "México",
            "codigo_postal": "06700",
            "estado": "Ciudad de México",
            "municipio_alcaldia": "Cuauhtémoc",
            "localidad": "Centro",
            "colonia": "Roma Norte",
            "calle": "Av. Insurgentes Sur",
            "numero_exterior": "123",
            "numero_interior": "Piso 5, Oficina A",
            "lada": "",
            "telefono": "123456"
        }
    },
    "tratados":{
        "tratadoAcuerdo":"",
        "paisBloque":"",
        "pais":"",
        "paisDestino":"",
        "fechaExpedicion":"",
        "fechaVencimiento":""
    },
    "transporte":{
        "medido_de_transporte":""
    }
    ,
    "certificado": {
        "solicitud": {
            "certificadoOrigen": {
                "idCertificado": 1001,
                "folio": "CO-2025-001",
                "fechaEmision": "2025-10-13",
                "paisDestino": "MX"
            },
            "destinatario": {
                "nombre": "Juan",
                "apellidoPaterno": "Pérez",
                "apellidoMaterno": "López",
                "rfc": "PEPJ800101XXX",
                "curp": "PEPJ800101HDFXXX01",
                "telefono": "5551234567",
                "correoElectronico": "juan.perez@example.com",
                "domicilio": {
                    "calle": "Insurgentes Sur",
                    "colonia": "Roma",
                    "ciudad": "CDMX",
                    "codigoPostal": "06700",
                    "numExterior": "123",
                    "numInterior": "B",
                    "cvePais": "MX"
                }
            },
            "representanteLegal": {
                "nombre": "Ana",
                "apellidoPaterno": "Ramírez",
                "apellidoMaterno": "Torres",
                "rfc": "RATA850202ABC",
                "telefono": "5556789012",
                "correoElectronico": "ana.ramirez@example.com"
            },
            "tercerOperador": {
                "nombre": "Operador Logístico SA de CV",
                "rfc": "OLS960101ZZZ",
                "telefono": "5559876543",
                "correoElectronico": "contacto@operadorlog.com"
            },
            "entidadFederativa": [
                {
                    "idEntidad": 1,
                    "claveEntidad": "CDMX",
                    "nombre": "Ciudad de México"
                },
                {
                    "idEntidad": 2,
                    "claveEntidad": "JAL",
                    "nombre": "Jalisco"
                }
            ],
            "blnTercerOperador": true,
            "clavePaisSeleccionado": "MX",
            "blnPeriodo": false,
            "blnAnexoJapon": true,
            "productoresAsociados": [
                {
                    "idProductor": 100,
                    "nombre": "Agro Exportaciones SA",
                    "rfc": "AEX991122H10"
                },
                {
                    "idProductor": 101,
                    "nombre": "Campos del Norte",
                    "rfc": "CDN000101L90"
                }
            ],
            "blnJustificacionCertificado": false,
            "idTratadoAcuerdoSeleccionado": 3,
            "discriminatorValue": "SOLICITUD",
            "personaSolicitud": {
                "nombre": "Exportadora XYZ SA",
                "rfc": "XYZ950505AB0",
                "telefono": "5552223344",
                "correoElectronico": "contacto@xyzexport.com"
            }
        },
        "precisa": "829282",
        "paisAsociado": {
            "cvePais": "63737"
        },
        "tratado_acuerdo": "Tratado de Libre Comercio México-Asociación Europea de Libre Comercio",
        "pais_bloque": "AUSTRIA (REPUBLICA DE)",
        "fraccion_arancelaria": "55555555",
        "nombre_comercial": "5555",
        "fecha_inicio": "14/09/2025",
        "fecha_fin": "12/09/2025",
        "mercancias_disponibles": [
            {
                "fraccionArancelaria": "55555555",
                "nombreTecnico": "",
                "nombreComercial": "5555",
                "numeroRegistroProductos": "555",
                "fechaExpedicion": "12/09/2025",
                "fechaVencimiento": "14/09/2025"
            }
        ],
        "mercancias_seleccionadas": [
            {
                "id": 0,
                "fraccionArancelaria": "55555555",
                "cantidad": 8555,
                "unidadMedida": "13",
                "valor_mercancia": 5555.00,
                "nombreTecnico": "",
                "nombreComercial": "5555",
                "numeroRegistroProductos": "",
                "fechaExpedicion": "",
                "fechaVencimiento": "",
                "tipoFactura": "TIPFAC.M",
                "numFactura": "rtyuiop",
                "complementoDescripcion": "5555",
                "fechaFactura": "06/09/2025"
            }
        ]
    },
    "destinatario": {
        "nombre": "558",
        "primer_apellido": "jh",
        "segundo_apellido": "jh",
        "numero_registro_fiscal": "ficción",
        "razon_social": "",
        "domicilio": {
            "ciudad_poblacion_estado_provincia": "Selecciona un valor",
            "calle": "jh",
            "numero_letra": "jh",
            "lada": "jh",
            "telefono": "545454",
            "fax": "1",
            "correo_electronico": "B@GMAIL.COM",
            "pais_destino": "SINGAPUR (REPUBLICA DE)"
        },
        "medio_transporte": "MEDTR.02"
    },
    "datos_del_certificado": {
        "observaciones": "asdfghjkl",
        "precisa": "ertyuio",
        "presenta": "aawertyuio",
        "mercanciasSeleccionadas":{
            "numero_de_orden":"",
            "fraccion_arancelaria":"",
            "nombre_tecnico":"",
            "nombre_comercial":"",
            "nombre_ingles":"",
            "numero_de_registro":""
        }
    }

}
        return new Promise((resolve, reject) => {
          this.servicios.guardarDatosPost(PAYLOAD).subscribe(
            (response) => {
              const API_RESPONSE = doDeepCopy(response);
              if (
                esValidObject(API_RESPONSE) &&
                esValidObject(API_RESPONSE.datos)
              ) {
                if (getValidDatos(API_RESPONSE.datos.id_solicitud)) {
                  this.tramite110218Store.setIdSolicitud(
                    API_RESPONSE.datos.id_solicitud
                  );
                  this.pasoNavegarPor({ accion: 'cont', valor: 2 });
                } else {
                  this.tramite110218Store.setIdSolicitud(0);
                }
              }
              resolve({
                id: API_RESPONSE['id'] ?? 0,
                descripcion: API_RESPONSE['descripcion'] ?? '',
                codigo: API_RESPONSE['codigo'] ?? '',
                data: API_RESPONSE['data'] ?? API_RESPONSE['datos'] ?? null,
                ...API_RESPONSE
              } as JSONResponse);
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
    if (e.valor > 0 && e.valor < 3) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

}



