import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, EventEmitter, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, DatosPasos, ERROR_FORMA_ALERT, ListaPasosWizard, PASOS4, SeccionLibStore, Usuario, WizardComponent, WizardService, esValidObject, formatearFechaYyyyMmDd, getValidDatos } from '@ng-mf/data-access-user';
import { Observable, Subject, finalize, map, switchMap, take, tap } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { USUARIO_INFO } from '../../constantes/nuevo-programa.enum';
import basePlantasTerciarizadoras from '@libs/shared/theme/assets/json/80105/basePlantasTerciarizadoras.json';
import complimentos from '@libs/shared/theme/assets/json/shared/complimentos.json';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import notarios from '@libs/shared/theme/assets/json/shared/notarios.json';
import planta from '@libs/shared/theme/assets/json/shared/planta.json';
import plantasSubmanufactureras from '@libs/shared/theme/assets/json/shared/plantas-submanufactureras.json';
import sociosAccionistas from '@libs/shared/theme/assets/json/shared/socios-accionistas.json';
import { takeUntil } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
  providers: [ToastrService],
})
export class PasoCapturarSolicitudComponent implements OnDestroy, OnInit {

  /**
   * Indica si el componente padre es BtnContinuarComponent.
   */
  padreBtn: boolean = true;
  /**
   * Almacena los pasos del wizard definidos en PASOS4.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS4;
  /**
   * Almacena el índice actual del paso en el wizard.
   * @type {number}
   */
  indice: number = 1;
  /**
   * Almacena el mensaje de aviso para el wizard.
   * @type {AVISO}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Referencia al componente `WizardComponent` dentro de la plantilla.
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una instancia del componente
   * `WizardComponent` que se encuentra en la plantilla del componente actual.
   * 
   * Uso:
   * - Se utiliza para acceder a los métodos y propiedades del componente `WizardComponent`.
   * - Por ejemplo, se llama a los métodos `siguiente()` y `atras()` para navegar entre los pasos
   *   del asistente (wizard).
   * 
   * Nota:
   * - Esta propiedad se inicializa después de que Angular haya renderizado la vista.
   * - Asegúrese de que el componente `WizardComponent` esté presente en la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  
  /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);
  
  /** Indica si hay una carga en progreso. */
  cargaEnProgreso: boolean = true;

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

  /**
   * Información del usuario actual.
   * Este objeto contiene los datos relevantes del usuario que está interactuando con el sistema.
   */
  datosUsuario: Usuario = USUARIO_INFO;

  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   * carga de archivos.
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Indica si el botón para cargar archivos está habilitado.
  */
  activarBotonCargaArchivos: boolean = false;

  /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

  /** Indica si el botón Guardar está habilitado o visible. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se utiliza para rastrear la solicitud en curso.
   */
  idSolicitud: number = 0;

  /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private complimentosBase = complimentos;

  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;

  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;

  /**
  * Objeto base inmutable que representa la estructura inicial de un sociosAccionistas.
  */
  private sociosAccionistas = sociosAccionistas;

  private basePlantasTerciarizadoras: unknown[] = Array.isArray(basePlantasTerciarizadoras) ? basePlantasTerciarizadoras : [];

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantas.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasBase: any[] = planta;

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantasSubmanufactureras.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasSubmanufacturerasBase: any[] = plantasSubmanufactureras;

  /**
   * Objeto base inmutable que representa la estructura inicial de un notarios.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private notariosBase: any[] = notarios;

  /**
  * URL de la página actual.
  */
  public solicitudState!: Tramite80101State;

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

      /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * @type {string}
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

   /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;

  /**
   * Constructor del componente `PasoCapturarSolicitudComponent`.
   * Inicializa el componente y establece la validez del formulario en el store.
   * 
   * @param {Tramite80101Query} tramiteQuery - Servicio para gestionar el estado del trámite.
   * @param {SeccionLibStore} seccion - Servicio para gestionar el estado de la sección.
   */
  constructor(
    private tramiteQuery: Tramite80101Query,
    private seccion: SeccionLibStore,
    private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService,
    private tramite80105Store: Tramite80101Store,
    private tramite80105Query: Tramite80101Query,
    private toastrService: ToastrService,
    private consultaQuery: ConsultaioQuery,
    private servicioDeFormularioService: ServicioDeFormularioService,
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }


  /**
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
    * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
    * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
    * evitando fugas de memoria.
    */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      ).subscribe();

    this.tramite80105Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

    /**
 * @method verificarLaValidezDelFormulario
 * @description
 * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
 * @returns {boolean} - Indica si todos los formularios son válidos.
 */
  verificarLaValidezDelFormulario(): boolean {
    return (
      (this.servicioDeFormularioService.isFormValid('datosGeneralisForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('formaModificacionesForm') ??
      false) &&
      (this.servicioDeFormularioService.isFormValid('obligacionesFiscalesForm') ??
      false) &&
      (this.servicioDeFormularioService.isFormValid('federatariosCatalogoForm') ??
      false) && 
      ((this.servicioDeFormularioService.isArrayFilled('datosSocioAccionistas') ??
      false) ||
      (this.servicioDeFormularioService.isArrayFilled('datosSocioAccionistasExtrenjeros') ??
      false)) &&
      this.isAllArraysFilledIn80101(['anexoUnoTabla1', 'anexoUnoTabla2', 'federatariosDatos', 'plantasImmexDatos', 'datosTablaSubfabricantesSeleccionadas', 'anexoTresTablaLista'])
    );
  }

  
  /** Verifica que todos los arreglos indicados estén llenos en el formulario del trámite 80101. */
  isAllArraysFilledIn80101(array: string[]): boolean {
    return array.every(item => this.servicioDeFormularioService.isArrayFilled(item));
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pasos.length) {
      const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
      if (!this.consultaState.readonly && e.accion === 'cont') {
        if (!this.consultaState.update) {
          this.esFormaValido = this.verificarLaValidezDelFormulario();
          if (!this.esFormaValido) {
            this.indice = e.valor;
            this.datosPasos.indice = e.valor;
            this.servicioDeFormularioService.markFormAsTouched('datosGeneralisForm');
            this.servicioDeFormularioService.markFormAsTouched('formaModificacionesForm');
            this.servicioDeFormularioService.markFormAsTouched('obligacionesFiscalesForm');
            this.servicioDeFormularioService.markFormAsTouched('federatariosCatalogoForm');
            return;
          }
        }
        this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
      } else if (e.accion === 'cont') {
        this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
      } else {
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
    return this.nuevoProgramaIndustrialService.getAllState().pipe(
      take(1),
      switchMap(data => this.guardar(data)),
      map(response => {
        const OK = response.codigo === '00';
        if (OK) {
          this.toastrService.success(response.mensaje);
        } else {
          this.padreBtn = true;
          this.toastrService.error(response.mensaje);
        }
        return OK;
      })
    );
  }


  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.nuevoProgramaIndustrialService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }

 
/**
   * Construye un arreglo de objetos de plantas basado en una estructura base común.
   *
   * @param arr Arreglo de datos de entrada para cada planta.
   * @param base Objeto base que se combina con los datos específicos de cada planta.
   * @returns Un nuevo arreglo de objetos con la información estructurada de cada planta.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildPlantas(array: any[] = [], base: unknown[], data: any): unknown[] {

    // eslint-disable-next-line complexity
    const mapCapacidadInstalada = (item: any) => ({
      idPlantaCa: item.PLANTA ?? "",
      fraccion: item.FRACCION_ARANCELARIA_PRODUCTO_TERMINADO_CATLOGO ?? "",
      umt: item.UMT ?? "",
      descripcion: item.DESCRIPCION_COMERCIAL_PRODUCTO_TERMINADO ?? "",
      capacidadEfectiva: item.CAPACIDAD_EFECTIVAMENTE_UTILIZADA ?? "",
      calculo: item.CALCULO_CAPACIDAD_INSTALADA ?? "",
      turnos: (item.TURNOS ?? "").toString(),
      horasTurno: (item.HORAS_POR_TURNO ?? "").toString(),
      cantidadEmpleados: (item.CANTIDAD_EMPLEADOS ?? "").toString(),
      cantidadMaquinaria: (item.CANTIDAD_MAQUINARIA ?? "").toString(),
      descripcionMaquinaria: item.DESCRIPCION_MAQUINARIA ?? "",
      capacidadMensual: (item.CAPACIDAD_INSTALADA_MENSUAL ?? "").toString(),
      capacidadAnual: item.CAPACIDAD_INSTALADA_ANUAL ?? "",
      testado: "1",
      claveServicio: item.CLAVE_SERVICIO ?? "",
      cveTipoServicio: item.CVE_TIPO_SERVICIO ?? "",
      descripcionServicio: item.DESCRIPCION_SERVICIO ?? "",
      descTestado: item.DESC_TESTADO ?? "",
      fraccionVista: item.FRACCION_ARANCELARIA_PRODUCTO_TERMINADO ?? "",
      idCapacidad: item.ID_CAPACIDAD ?? "",
      tipoServicio: item.TIPO_SERVICIO ?? "",
    });

  const MAP_COMPLEMENTAR = (item:any) => ({
      idPlantaC: item.PLANTA ?? '' ,
      amparoPrograma: item.PERMANECERA_MERCANCIA_PROGRAMA ?? '',
      tipoDocumento: item.TIPO_DOCUMENTO ?? '',
      fechaFirma: formatearFechaYyyyMmDd(item.FECHA_DE_FIRMA ?? ''),
      fechaVigencia: formatearFechaYyyyMmDd(item.FECHA_DE_FIN_DE_VIGENCIA ?? ''),
      documentoRespaldo: item.DOCUMENTO_RESPALDO ?? '',
      fechaFirmaRespaldo: item.FECHA_DE_FIRMA_DOCUMENTO ?? '',
      fechaVigenciaRespaldo: item.FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO ?? ''
  })

  const MAP_FIRMANTES = (item:any) => ({
      tipoFirmante: item.tipoFirmante ?? '',
  })
  
  const MAP_MONTOS_INVERSION = (item:any) => ({
      idPlantaM: item.PLANTA ?? "",
      tipo: item.TIPO ?? "",
      cantidad: item.CANTIDAD ?? "",
      descripcion: item.DESCRIPCION ?? "",
      monto: item.MONTO ?? "",
  })

  const MAP_EMPLEADOS = (item:any) => ({
      idPlantaE: item.PLANTA ?? '',
      totalEmpleados: item.TOTAL ?? '',
      directos: item.DIRECTOS ?? '',
      cedula: item.CEDULA_DE_CUOTAS ?? '',
      fechaCedula: formatearFechaYyyyMmDd(item.FECHA_DE_CEDULA ?? ''),
      indirectos: item.INDIRECTOS ?? '',
      contrato: item.CONTRATO ?? '',
      objetoContrato: item.OBJETO_DEL_CONTRATO_DEL_SERVICIO ?? '',
      fechaFirma: formatearFechaYyyyMmDd(item.FECHA_FIRMA ?? ''),
      fechaFinVigencia: formatearFechaYyyyMmDd(item.FECHA_FIN_VIGENCIA ?? ''),
      rfcEmpresa: item.RFC ?? '',
      razonEmpresa: item.RAZON_SOCIAL ?? '',
  })

  const listaCapacidad = (data.tablaDatosCapacidadInstalada || []).map(mapCapacidadInstalada);
  const datosComplementarios = (data.complementarPlantaDatos || []).map(MAP_COMPLEMENTAR);
  const firmantes = (data.firmantesDatos || []).map(MAP_FIRMANTES); 
  const montos = (data.montosInversionDatos || []).map(MAP_MONTOS_INVERSION);
  const datosEmpleados = (data.empleadosDatos || []).map(MAP_EMPLEADOS);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let RESULT: any[] = [];
    array.forEach(arr => {
      // eslint-disable-next-line complexity
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
          idPlanta: arr.planta ?? '',
          calle: arr.calle ?? '',
          numeroExterior: arr.numeroExterior ?? '',
          numeroInterior: arr.numeroInterior ?? '',
          codigoPostal: arr.codigoPostal ?? '',
          localidad: arr.localidad ?? '',
          colonia: arr.colonia ?? '',
          delegacionMunicipio: arr.delegacionMunicipio ?? '',
          entidadFederativa: arr.entidadFederativa ?? '',
          pais: arr.pais ?? '',
          rfc: arr.registroFederalDeContribuyentes ?? '',
          domicilioFiscal: arr.domicilioDelSolicitante ?? '',
          razonSocial: arr.razonSocial ?? '',
        });
      });
    });
    const RESULT_DATA = { ...RESULT[0], listaCapacidad, montos, datosEmpleados, datosComplementarios, firmantes };
    return RESULT_DATA;
  }

/**
 * Genera un arreglo de objetos con los datos de fedatarios a partir de un arreglo de entrada.
 *
 * @param arr Arreglo de objetos con datos de entrada (opcional).
 * @param base Objeto base que se fusiona con los datos específicos de cada fedatario.
 * @returns Un arreglo de objetos estructurados con la información de los fedatarios.
 */
// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
 buildDatosFederatarios(array: any[] = [], base: unknown[]): unknown[] {
    const RESULT: any[] = [];
    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
      nombreNotario: arr.nombre ?? '',
      apellidoMaterno: arr.segundoApellido ?? '',
      apellidoPaterno: arr.primerApellido ?? '',
      numeroActa: arr.numeroDeActa ?? '',
      fechaActa: formatearFechaYyyyMmDd(arr.fechaDelActa ?? ''),
      numeroNotaria: arr.numeroDeNotaria ?? '',
      entidadFederativa: arr.estado ?? '',
      delegacionMunicipio: arr.estadoOptions ?? '',
        });
      });
    });
    return RESULT;
  }

  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardar(data: any): Promise<any> {
   
    const SOLICITUD = this.buildComplimentos(data, this.complimentosBase);
    const DECLARACION_SOLICUTUD_ENTRIES = PasoCapturarSolicitudComponent.buildDeclaracionSolicitudEntries(data);
    const PLANTAS_TERCIARIZADORAS = PasoCapturarSolicitudComponent.buildPlantasTerciarizadoras(data.empresasSeleccionadas, this.basePlantasTerciarizadoras);
    const PLANTAS = this.buildPlantas(data.plantasImmexTablaLista, this.plantasBase, data);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase);
    const NOTARIOS = this.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);
    const SOCIOS_ACCIONISTAS = this.buildSociosAccionistas(data.tablaDatosComplimentos, data.tablaDatosComplimentosExtranjera, this.sociosAccionistas);

    const PAYLOAD = {
      "esDeGuardar": true,
      "tipoDeSolicitud": "guardar",
      "idSolicitud": 0,
      "idTipoTramite": 80105,
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
      "discriminator_value": "80105",
      "discriminatorValue": "80105",
      "domicilio": {
      },
      "solicitante": {

      },
      "planta": Array.isArray(PLANTAS) ? [...PLANTAS] : [PLANTAS],
      "notarios": [...NOTARIOS],
      "anexoII": [...ANEXO_ALL.anexo.ANEXOII],
      "anexoIII": [...ANEXO_ALL.anexo.ANEXOIII],
      "mercanciaImportacion": [
        {
          "listaProveedores": [
            ...ANEXO_ALL.anexo.proveedorCliente
          ],
          "complemento": {
            ...ANEXO_ALL.anexo.datosParaNavegar
          },
          "anexoI": [...ANEXO_ALL.anexo.tableDos]
        }
      ],
      "fraccionArancelaria": [
        {
          "listaProveedores": [...ANEXO_ALL.anexo.proveedorClienteDos]
        }
      ],
      "productoExportacionDtoList": [
        {
          "proyectosImmex": [...ANEXO_ALL.anexo.proyectoimex]
        }
      ],
      "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
      "solicitud": SOLICITUD,
      "declaracionSolicitudEntities": DECLARACION_SOLICUTUD_ENTRIES,
      "sociosAccionistas": [...SOCIOS_ACCIONISTAS],
      "plantasTerciarizadoras": PLANTAS_TERCIARIZADORAS
    };

    return new Promise((resolve, reject) => {
      this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
        if(esValidObject(response) && esValidObject(response.datos)) {
          if(getValidDatos(response.datos.id_solicitud)) {
            this.tramite80105Store.setIdSolicitud(response.datos.id_solicitud);
          } else {
            this.tramite80105Store.setIdSolicitud(0);
          }
        }
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  /**
 * Construye un arreglo de socios/accionistas a partir de dos listas de entrada,
 * utilizando un objeto base como plantilla y datos complementarios para completar
 * los campos faltantes.
 *
 * @param data Primer arreglo de socios/accionistas.
 * @param base Objeto base que sirve de plantilla para cada elemento del resultado.
 *
 * @returns Un nuevo arreglo que contiene los objetos combinados y mapeados
 *          con la información de los dos arreglos de entrada.
 *
 * @example
 * const socios = buildSociosAccionistas(listaA, listaB, BASE, datos);
 */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildComplimentos(data: Record<string, any>, base: Record<string, any>): any {
    return {
      ...base,
      notario: {
        ...base['notario'],
        rfc: data['datosComplimentos'].formaModificaciones.rfc,
        numeroActa: data['datosComplimentos'].formaModificaciones.nombreDeActa,
        numeroNotario: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
        entidadFederativa: data['datosComplimentos'].formaModificaciones.estado,
        fechaActa: formatearFechaYyyyMmDd(data['datosComplimentos'].formaModificaciones.fechaDeActa)
      },
      modalidad: data['datosComplimentos'].modalidad,
      booleanGenerico: data['datosComplimentos'].programaPreOperativo ? true : false,
      descripcionSistemasMedicion: data['datosComplimentos'].datosGeneralis.paginaWWeb,
      descripcionLugarEmbarque: data['datosComplimentos'].datosGeneralis.localizacion,
      capacidadAlmacenaje: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
      numeroPermiso: data['datosComplimentos'].obligacionesFiscales.opinionPositiva === 1 ? 'SI' : '',
      fechaOperacion: formatearFechaYyyyMmDd(data['datosComplimentos'].obligacionesFiscales.fechaExpedicion), 
      nomOficialAutorizado: data['datosComplimentos'].formaModificaciones.nombreDelFederatario,

    };
  }

  /**
 * Construye un arreglo de socios/accionistas a partir de dos listas de entrada,
 * utilizando un objeto base como plantilla y datos complementarios para completar
 * los campos faltantes.
 *
 * @param arr1 Primer arreglo de socios/accionistas.
 * @param arr2 Segundo arreglo de socios/accionistas.
 * @param base Objeto base que sirve de plantilla para cada elemento del resultado.
 * @param data Objeto con datos complementarios necesarios para completar el payload.
 *
 * @returns Un nuevo arreglo que contiene los objetos combinados y mapeados
 *          con la información de los dos arreglos de entrada.
 *
 * @example
 * const socios = buildSociosAccionistas(listaA, listaB, BASE, datos);
 */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildSociosAccionistas(arr1: any[] = [], arr2: any[] = [], base: Record<string, any>): any[] {
    const BASE_OBJECT = base[0];
    const CLONED_BASE = structuredClone ? structuredClone(BASE_OBJECT) : JSON.parse(JSON.stringify(BASE_OBJECT));
    const MAP_TO_PAYLOAD = (item: Record<string, unknown>): Record<string, unknown> => ({
      ...CLONED_BASE,
      nombre: item['nombre'] ?? '',
      apellidoPaterno: item['apellidoPaterno'] ?? '',
      apellidoMaterno: item['apellidoMaterno'] ?? '',
      rfc: item['rfc'] ?? '',
      correoElectronico: item['correoElectronico'] ?? '',
      razonSocial: item['razonSocial'] ?? '',
      estadoEvaluacionEntidad: item['estado'] ?? '',
      estadoEntidad: item['estado'] ?? '',
      cvePaisOrigen: item['pais'] ?? '',
      rfcExtranjero: item['taxId'] ?? '',
      domicilio: {
        codigoPostal: item['codigoPostal'] ?? '',
      }
    });

    return [...arr1.map(MAP_TO_PAYLOAD), ...arr2.map(MAP_TO_PAYLOAD)];
  }


  /** Construye el arreglo de declaraciones de solicitud a partir de los datos proporcionados. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildDeclaracionSolicitudEntries(data: Record<string, any>): unknown[] {
    const RESULT = [
      {
        "acepto": data['datosComplimentos'].obligacionesFiscales.aceptarObligacionFiscal ? 1 : 0,
        "idTipoTramite": 80105,
        "cveDeclaracion": "123"
      }
    ];
    return RESULT;
  }

  /**
 * Build plantasControladoras by taking the base array
 * and appending the length of each key in empresasSeleccionadas
 * to every planta item.
 *
 * @param array  Object with keys whose values are arrays
 * @param base            Existing plantasControladoras array
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildComplementosTablaPayload(array: any[], base: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];

    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
          rfc: arr.rfc || arr.taxId,
          correoElectronico: arr.correoElectronico,
          razonSocial: arr.razonSocial,
          nombre: arr.nombre,
          apellidoPaterno: arr.apellidoPaterno,
          apellidoMaterno: arr.apellidoMaterno,
          domicilioSolicitud: {
            codigoPostal: arr.codigoPostal || arr.cp,
            informacionExtra: arr.estado
          }
        });
      });
    });
    return RESULT;
  }

/**
 * Construye un arreglo de objetos con los datos de plantas submanufactureras a partir de un arreglo de entrada.
 *
 * @param arr Arreglo de objetos con datos de entrada (opcional).
 * @param base Objeto base que se fusiona con los datos específicos de cada planta.
 * @returns Un arreglo con los objetos estructurados de plantas submanufactureras.
 */
// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildPlantasSubmanufactureras(array: any[] = [], base: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
      empresaCalle: arr.calle ?? '',
      empresaNumeroInterior: arr.numInterior ?? '',
      empresaNumeroExterior: arr.numExterior ?? '',
      empresaCodigoPostal: arr.codigoPostal ?? '',
      localidad: arr.colonia ?? '',
      empresaDelegacionMunicipio: arr.delegacionMunicipio ?? '',
      empresaEntidadFederativa: arr.entidadFederativa ?? '',
      empresaPais: arr.pais ?? '',
      rfc: arr.rfc ?? '',
      domicilioFiscal: arr.domicilioFiscalSolicitante ?? '',
      razonSocial: arr.razonSocial ?? '',
       datosComplementarios: Array.isArray((ITEM as any)?.datosComplementarios)
          ? (ITEM as any).datosComplementarios.map((dc:any) => ({
              idPlantaC: dc.idPlantaC ?? '',
              idDato: dc.idDato ?? '',
              amparoPrograma: dc.amparoPrograma ?? '',              
            }))
          : []
        });
      });
    });
    return RESULT;
  }

  /**
 * Build plantasControladoras by taking the base array
 * and appending the length of each key in empresasSeleccionadas
 * to every planta item.
 *
 * @param empresasSeleccionadas  Object with keys whose values are arrays
 * @param basePlantas            Existing plantasControladoras array
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildPlantasTerciarizadoras(empresasSeleccionadas: any[], basePlantas: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];

    empresasSeleccionadas.forEach(emp => {
      basePlantas.forEach(planta => {
        const PLANTA = (planta && typeof planta === 'object') ? planta : {};
        RESULT.push({
          ...PLANTA,
          calle: emp.calle ?? '',
          numeroExterior: emp.numeroExterior ?? '',
          numeroInterior: emp.numeroInterior ?? '',
          codigoPostal: emp.codigoPostal ?? '',
          colonia: emp.colonia ?? '',
          delegacionMunicipio: emp.municipioDelegacion ?? '',
          entidadFederativa: emp.entidadFederativa ?? '',
          pais: emp.pais ?? '',
          rfc: emp.registroFederalContribuyentes ?? '',
          razonSocial: emp.razonSocial ?? '',
          domicilioFiscal: emp.domicilioFiscalSolicitante ?? ''
        });
      });
    });
    return RESULT;
  }




  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-function-return-type
 /**
   * Construye el objeto `anexo` a partir de los datos proporcionados.
   *
   * @param data - Objeto de entrada que contiene la información necesaria para construir los anexos y sus tablas asociadas.
   * @returns Un objeto con la estructura de los anexos, incluyendo ANEXOII, ANEXOIII, proveedorCliente y datosParaNavegar.
   *
   * - `ANEXOII` y `ANEXOIII`: Listas construidas a partir de los elementos de `anexoDosTablaLista` y `anexoTresTablaLista` respectivamente.
   * - `proveedorCliente`: Lista de proveedores y clientes obtenida de `proveedorClienteDatosTabla`.
   * - `datosParaNavegar`: Información adicional para navegación, construida desde `datosParaNavegar`.
   *
   * Cada subestructura se construye utilizando funciones auxiliares para mapear y transformar los datos de entrada.
   */
  buildAnexo(data: any) {
    const buildAnexoItem = (item: Anexo1) => ({
      descripcion: item.encabezadoFraccion,
      idTipoBien: 0,
      idBienComercial: 0,
      testado: true,
      contadorGrid: null,
      descripcionTestado: item.encabezadoDescripcion,
    });
 
    const buildProveedorCliente = (item: ProveedorClienteDatosTabla) => ({
      idProveedor: item.idProveedor,
      paisOrigen: item.paisOrigen,
      rfcProveedor: item.rfcProveedor,
      razonProveedor: item.razonProveedor,
      paisDestino: item.paisDestino,
      rfcCliente: item.rfcClinte,
      razonCliente: item.razonSocial,
      domicilio: item.domicilio,
      testado: item.testado,
      idProductoP: item.idProductoP,
      descTestado: item.descTestado,
    });
 
    const buildDatosParaNavegar = (datos: any) => ({
      anexoII: datos?.encabezadoAnexoII,
      tipo: datos?.encabezadoTipo,
      unidadMedida: datos?.encabezadoAnexoII,
      categoria: datos?.encabezadoCategoria,
      descripcion: datos?.encabezadoDescripcionComercial,
      valorMensual: datos?.encabezadoVolumenMensual,
      valorAnual: datos?.encabezadoVolumenAnual,
      volumenMensual: datos?.encabezadoValorEnMonedaMensual,
      volumenAnual: datos?.encabezadoValorEnMonedaAnual,
      testado: true,
      fecFinVigencia: null,
      volumenAnualSolicitado: null,
    });
 
    const buildAnexoDos = (item: any) => ({
      fraccionExportacion: item.encabezadoFraccionExportacion,
      fraccionImportacion: item.encabezadoFraccionImportacion,
      descFraccionImpo: item.encabezadoDescripcionComercial,
      claveFraccionAnexo: item.encabezadoAnexoII,
      idProducto: item.encabezadoIdProducto,
      fraccionDescripcionAnexo: item.encabezadoFraccionDescripcionAnexo,
      fraccionValorMonedaAI: item.encabezadoValorEnMonedaAnual,
      fraccionValorProdMI: item.encabezadoValorEnMonedaMensual,
      fraccionVolumenMensual: item?.encabezadoValorEnMonedaMensual,
      fraccionVolumenAnual: item?.encabezadoVolumenAnual,
      categoriaFraccion: item.encabezadoCategoria,
      tipoFraccion: item.encabezadoTipo,
      umt: item.encabezadoUmt,
    });
 
    const proyectoImmexDatos = (item: any) => ({
      tipoDocumento: item.encabezadoTipoDocument,
      descripcion: item.encabezadoDescripcionOtro,
      fechaFirma: item.encabezadoFechaFirma,
      fechaVigencia: item.encabezadoFechaVigencia,
      rfcFirmante: item.encabezadoRfc,
      razonFirmante: item.encabezadoRazonFirmante,
      testado: true,
      fecFinVigencia: item.encabezadoFechaVigencia,
    });
 
    /**
     * Construye un objeto con los datos del proveedor y cliente a partir de un elemento de tipo `ProveedorClienteDatosTabla`.
     *
     * @param item - Objeto que contiene la información del proveedor y cliente.
     * @returns Un objeto con las propiedades: paisOrigen, rfcProveedor, razonProveedor, paisDestino, rfcCliente, razonCliente, domicilio y descTestado.
     */
    const buildProveedorClienteDos = (item: ProveedorClienteDatosTabla) => ({
      paisOrigen: item.paisOrigen,
      rfcProveedor: item.rfcProveedor,
      razonProveedor: item.razonProveedor,
      paisDestino: item.paisDestino,
      rfcCliente: item.rfcClinte,
      razonCliente: item.razonSocial,
      domicilio: item.domicilio,
      descTestado: item.descTestado,
    });
 
    return {
      anexo: {
        ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
        ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
        proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
        datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.importarDatosTabla[0] || {}),
        tableDos: (data.annexoUno?.exportarDatosTabla || []).map(buildAnexoDos),
        proyectoimex: (data.proyectoImmexTablaLista || []).map(proyectoImmexDatos),
        proveedorClienteDos: (data.annexoUno?.proveedorClienteDatosTablaDos || []).map(buildProveedorClienteDos),
      },
    };
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

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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

  /** Actualiza el estado de carga en progreso.
   * @param carga - Indica si hay una carga en progreso.
   */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
}
