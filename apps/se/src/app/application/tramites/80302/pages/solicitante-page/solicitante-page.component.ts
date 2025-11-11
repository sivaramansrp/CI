import { Component, EventEmitter, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, DatosPasos,PASOS, WizardService, doDeepCopy, esValidObject } from '@ng-mf/data-access-user';
import { FraccionesExportacionGuardar, FraccionesImportacionGuardar, NotariosGuardar, PlantaGuardar, PlantaImmexGuardar, SociosGuardar } from '../../estados/models/plantas-consulta.model';
import { Observable, Subject, map, switchMap, take, takeUntil } from 'rxjs';
import { Solicitud80302State, Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80302Query } from '../../../../estados/queries/tramite80302.query';
import { WizardComponent } from '@ng-mf/data-access-user';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit,OnDestroy{
  /**
   * Lista de pasos del wizard.
   * 
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

    /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);
  
  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Estado de la solicitud actual.
   * 
   * Esta propiedad almacena el estado de la solicitud actual, incluyendo información relevante
   * para el proceso de firma electrónica.
   */
  public solicitudState!: Solicitud80302State;

    /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Índice del paso actual en el wizard.
   * 
   * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Referencia al componente del wizard.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `WizardComponent`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;
  /** Indica si la carga de archivos está en progreso.
 */
  cargaEnProgreso: boolean = true;

   /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

    /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  guardarIdSolicitud: number = 0;

    /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;
  /**   * Indica si el botón del componente padre está habilitado.
   * 
   * Esta propiedad controla la habilitación del botón en el componente padre.
   */
  padreBtn: boolean = true;
  

  /**
   * Datos de los pasos del wizard.
   * 
   * Esta propiedad contiene un objeto `DatosPasos` que almacena información sobre el número de pasos,
   * el índice actual, y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param tramite80302Query - Servicio para consultar el estado del trámite 80302.
   */
  constructor(private tramite80302Query: Tramite80302Query,
    private solicitudService: SolicitudService,
    private tramite80302Store: Tramite80302Store,
    private consultaQuery: ConsultaioQuery,
    private toastrService: ToastrService,
  ) {

    this.tramite80302Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();

  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura la suscripción al estado de la consulta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      ).subscribe();
  }
  /**
  * Método para seleccionar una pestaña específica en el wizard.
  * 
  * @param {number} i - El índice de la pestaña a seleccionar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método para obtener el valor del índice y actualizar el wizard.
   * 
   * @param {AccionBoton} e - El objeto que contiene la acción y el valor del índice.
   */
  // async getValorIndice(e: AccionBoton): Promise<void> {
  //   console.log('this.solicitudState', this.solicitudState);
  //   if (e.valor > 0 && e.valor < 6) {
  //     if (e.accion === 'cont') {
  //       await this.guardar();
  //       this.indice = e.valor;
  //       this.datosPasos.indice = this.indice;
  //     } else {
  //       this.wizardComponent.atras();
  //       this.indice = e.valor;
  //       this.datosPasos.indice = this.indice;
  //     }
  //   }
  // }

  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pasos.length) {
      const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
        if (!this.consultaState.readonly && e.accion === 'cont') {
          this.shouldNavigate$()
              .subscribe((shouldNavigate) => {
                if (shouldNavigate) {
                  this.indice = NEXT_INDEX;
                  this.datosPasos.indice = NEXT_INDEX;
                  this.wizardService.cambio_indice(NEXT_INDEX);
                  this.wizardComponent.siguiente();
                } else {
                  this.indice = e.valor;
                  this.datosPasos.indice = e.valor;
                }
              });
        }else if (e.accion === 'cont') {
        this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
              this.wizardComponent.siguiente();
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
      }else {
        this.indice = NEXT_INDEX;
        this.datosPasos.indice = NEXT_INDEX;
        this.wizardComponent.atras();
      }
    }
  }

    /**
 * Maneja la lógica para actualizar el índice del paso del wizard según el evento del botón de acción proporcionado.
 *
 * Este método obtiene el estado actual desde `nuevoProgramaIndustrialService`, lo guarda,
 * y muestra un mensaje de éxito o error dependiendo del código de respuesta. Si la respuesta es exitosa
 * y el valor del evento está dentro del rango válido (1 a 4), actualiza el índice del wizard y navega
 * hacia adelante o atrás según el tipo de acción.
 *
 * @param e - El evento del botón de acción que contiene el valor y el tipo de acción.
 */
  private shouldNavigate$(): Observable<boolean> {
    return this.solicitudService.getAllState().pipe(
      take(1),
      switchMap(data => this.guardar(data)),
      map(() => {
        return true;
      })
    );
  }

  /**
   * Método para guardar los datos de la solicitud.
   * @param data - Los datos de la solicitud a guardar.
   */
  public guardar(data:Solicitud80302State): Observable<unknown> {
    const PLANTA: PlantaGuardar[] = [];
    const SOCIOS_ACCIONISTAS: SociosGuardar[] = [];
    const NOTARIOS: NotariosGuardar[] = [];
    const PLANTA_IMMEX: PlantaImmexGuardar[] = [];
    const FRACCIONES_EXPORTACION: FraccionesExportacionGuardar[] = [];
    const FRACCIONES_IMPORTACION: FraccionesImportacionGuardar[] = [];
    data.modificacionDatos.forEach(element => {
      const PLANTA_OBJ: PlantaGuardar = {
            "idPlanta": element.idPlanta,
            "calle": element.calle,
            "numeroInterior": element.numeroInterior,
            "numeroExterior": element.numeroExterior,
            "codigoPostal": element.codigoPostal,
            "colonia": element.colonia,
            "delegacionMunicipio": element.delegacionMunicipio,
            "entidadFederativa": element.entidadFederativa,
            "pais": element.pais,
            "rfc": element.rfc,
            "estatus": element.estatus,
            "desEstatus": element.desEstatus,
            "localidad": element.localidad,
            "telefono": element.telefono,
            "fax": element.fax,
            "fecha32D": "2024-06-01"      
        }
        PLANTA.push(PLANTA_OBJ);
    })
    data.datosComplimentaria.forEach(element => {
      const SOCIOS_OBJ: SociosGuardar = {
            "idPersonaSolicitud": element.idSolicitud,
            "rfc": element.rfc,
            "nombre": element.nombre,
            "apellidoMaterno": element.apellidoMaterno,
            "apellidoPaterno": element.apellidoPaterno,
            "correoElectronico": element.correoElectronico,
        }
        SOCIOS_ACCIONISTAS.push(SOCIOS_OBJ);
    })
    data.datosFederetarios.forEach(element => {
      const NOTARIOS_OBJ: NotariosGuardar = {
            "nombreNotario": element.nombreNotario,
            "apellidoMaterno": element.apellidoMaterno,
            "apellidoPaterno": element.apellidoPaterno,
            "rfc": element.rfc,
            "numeroActa": element.numeroActa,
            "numeroNotaria": element.numeroNotaria,
            "numeroNotario": element.numeroNotario,
            "delegacionMunicipio": element.delegacionMunicipio,
            "entidadFederativa": element.entidadFederativa,
            "fechaActa": element.fechaActa
        }
        NOTARIOS.push(NOTARIOS_OBJ);
    })
    data.datosOperacions.forEach(element => {
      const PLANTA_IMMEX_OBJ: PlantaImmexGuardar = {
            "idPlanta": element.idPlanta,
            "calle": element.calle,
            "numeroInterior": element.numeroInterior,
            "numeroExterior": element.numeroExterior,
            "codigoPostal": element.codigoPostal,
            "colonia": element.colonia,
            "delegacionMunicipio": element.delegacionMunicipio,
            "entidadFederativa": element.entidadFederativa,
            "pais": element.pais,
            "rfc": element.rfc,
            "estatus": element.estatus,
            "desEstatus": "Baja",
            "localidad": element.localidad,
            "telefono": element.telefono,
            "fax": element.fax,
            "fecha32D": element.fecha32D,
            "claveEntidadFederativa": element.claveEntidadFederativa,
            "claveDelegacionMunicipio": element.claveDelegacionMunicipio,
            "idDireccion": element.idDireccion
        }
        PLANTA_IMMEX.push(PLANTA_IMMEX_OBJ);
    })
    data.datosAnexo.forEach(element => {
      const ANEXO_OBJ: FraccionesExportacionGuardar = {
            "tipoFraccion": element.tipoFraccion,
            "fraccionPadre": element.fraccionPadre,
            "idProductoExp": element.idProductoExp,
            "fraccionCompuesta": element.fraccionCompuesta,
            "idSectorProsecSol": element.idSectorProsecSol,
            "descripcionTestado": element.descripcionTestado,
            "fraccionArancelaria": {
                "fraccionPadre": element.fraccionPadre,
                "tipoFraccion": element.tipoFraccion,
                "fraccionCompuesta": element.fraccionCompuesta
            }
        }
        FRACCIONES_EXPORTACION.push(ANEXO_OBJ);
    })
    data.datosImportacion.forEach(element => {
      const IMPORTACION_OBJ: FraccionesImportacionGuardar = {
            "tipoFraccion": element.tipoFraccion,
            "fraccionPadre": element.fraccionPadre,
            "idProductoExp": element.idProducto,
            "fraccionCompuesta": element.fraccionCompuesta,
            "idSectorProsecSol": null,
            "descripcionTestado": element.descripcionTestado,
            "fraccionArancelaria": {
                "fraccionPadre": element.fraccionPadre,
                "descripcionFraccionPadre": element.descripcionFraccionPadre,
                "tipoFraccion": element.tipoFraccion,
                "fraccionCompuesta": element.fraccionCompuesta,
                "claveFraccionPadre": element.claveFraccionPadre,
                "idFraccion": element.idFraccion,
                "idProducto": element.idProducto
            }
        }
        FRACCIONES_IMPORTACION.push(IMPORTACION_OBJ);
    })
    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 0,
    "idTipoTramite": 80302,
    "rfc": "AAL0409235E6",
    "cveUnidadAdministrativa": "8302",
    "costoTotal": 10000.5,
    "discriminatorValue": "80302",
    "certificadoSerialNumber": "1234567890ABCDEF",
    "certificado": data.certificacionSAT,
    "planta": PLANTA,
    "sociosAccionistas": SOCIOS_ACCIONISTAS,
    "notarios": NOTARIOS,
    "plantasIMMEX": PLANTA_IMMEX,
    "fraccionesExportacion": FRACCIONES_EXPORTACION,
    "fraccionesImportacion": FRACCIONES_IMPORTACION,
    "unidadAdministrativaRepresentacionFederal": {
        "clave": "string"
    },
    "solicitante": {
        "rfc": "AAL0409235E6"
    },
    "datosCertificacion": "CERT-001",
    "montoImportaciones": 500000,
    "factorAmpliacion": 1.2,
    "certificacion_sat": "CERTIFICADO",
    "cveEntidad": "string",
    "idProgramaAutorizado": 0,
    "tipoPrograma": "string",
    "tipoModalidad": "string",
    "descripcionModalidad": "string"
}
    return this.solicitudService.guardar(PAYLOAD).pipe(
      takeUntil(this.destroyNotifier$),
      map((response) => {
        if(esValidObject(response)) {
          const RESPONSE = doDeepCopy(response);
          this.tramite80302Store.setIdSolicitud(RESPONSE?.datos?.id_solicitud ?? 0);
          this.guardarIdSolicitud = RESPONSE?.datos?.id_solicitud ?? 0;
          //this.wizardComponent.siguiente();
        }
        return response;
      })
    );
  }

  /**
   * Método para continuar al siguiente paso en el wizard.
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }

  
  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }
    /**
  * Método para manejar el evento de carga realizada.
  * Actualiza el estado del botón de carga de archivos.
  * @param carga - Indica si la carga de archivos está en progreso o no.
  */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }

  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
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
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.solicitudService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }

   /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

    /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
