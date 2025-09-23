import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import socioAccionistas from '@libs/shared/theme/assets/json/shared/socio-accionistas.json';
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
export class PasoCapturarSolicitudComponent implements OnInit {
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
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

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
     * Evento que se emite para cargar archivos.
     * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
     */
    cargarArchivosEvento = new EventEmitter<void>();
  
    /**
     * Evento que se emite para regresar a la sección de carga de documentos.
     * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
     */
    regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();
  
    /**
   * Indica si el botón para cargar archivos está habilitado.
   */
    activarBotonCargaArchivos: boolean = false;
  
    /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
    seccionCargarDocumentos: boolean = true;

    cargaEnProgreso: boolean = true;
    
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
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase: any[] = socioAccionistas;

        private plantasBase: Readonly<Record<string, any>> = {
    "idPlanta": "123",
            "calle": "Main St",
            "numeroInterior": "A",
            "numeroExterior": "10",
            "codigoPostal": "12345",
            "colonia": "Centro",
            "delegacionMunicipio": "MunicipioX",
            "entidadFederativa": "EntidadY",
            "pais": "Mexico",
            "rfc": "RFC123456",
            "domicilioFiscal": "Fiscal Address",
            "razonSocial": "Empresa S.A.",
            "claveEntidadFederativa": "EF01",
            "clavePlantaEmpresa": "PLT01",
            "clavePais": "MX",
            "claveDelegacionMunicipio": "DM01",
            "estatus": true,
            "desEstatus": "Activo",
            "localidad": "Localidad1",
            "telefono": "5551234567",
            "fax": "5557654321",
            "idDireccion": "DIR123",
            "testadoP": 1,
            "empresaCalle": "Empresa St",
            "empresaNumeroInterior": "B",
            "empresaNumeroExterior": "20",
            "empresaCodigoPostal": "54321",
            "empresaColonia": "EmpColonia",
            "empresaDelegacionMunicipio": "EmpMunicipio",
            "empresaEntidadFederativa": "EmpEntidad",
            "empresaPais": "Mexico",
            "empresaClaveEntidadFederativa": "EF02",
            "empresaClavePlantaEmpresa": "PLT02",
            "empresaClavePais": "MX",
            "empresaClaveDelegacionMunicipio": "DM02",
            "empresaCorreoElectronico": "empresa@email.com",
            "empresaTipo": "Tipo1",
            "permaneceMercancia": "Si",
            "rfcActivo": "RFC654321",
            "domiciliosInscritos": "2",
            "personaMoralISR": "Si",
            "opinionSAT": "Positiva",
            "fecha32D": "2024-06-01",
            "firmantes": [
                {
                    "idPlantaF": "FIRM01",
                    "tipoFirmante": "Representante Legal",
                    "descTipoFirmante": "Legal Representative"
                }
            ],
            "datosComplementarios": [
                {
                    "idPlantaC": "C01",
                    "idDato": "D01",
                    "amparoPrograma": "ProgramaX",
                    "tipoDocumento": "DocType1",
                    "descDocumento": "Documento de respaldo",
                    "descripcionOtro": "Otro documento",
                    "documentoRespaldo": "Respaldo.pdf",
                    "descDocRespaldo": "Descripción respaldo",
                    "respaldoOtro": "Otro respaldo",
                    "fechaFirma": "2024-01-01",
                    "fechaVigencia": "2025-01-01",
                    "fechaFirmaRespaldo": "2024-01-02",
                    "fechaVigenciaRespaldo": "2025-01-02"
                }
            ],
            "montos": [
                {
                    "idPlantaM": "M01",
                    "idMonto": "MON01",
                    "tipo": "Inversión",
                    "descTipo": "Inversión inicial",
                    "cantidad": "1000",
                    "descripcion": "Monto de inversión",
                    "monto": "500000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "listaCapacidad": [
                {
                    "idPlantaCa": "CA01",
                    "idCapacidad": "CAP01",
                    "claveServicio": "1",
                    "descripcionServicio": "Servicio de producción",
                    "cveTipoServicio": "TS01",
                    "tipoServicio": "Producción",
                    "fraccion": "FR01",
                    "fraccionVista": "Fracción Vista",
                    "umt": "UMT01",
                    "descripcion": "Capacidad instalada",
                    "capacidadEfectiva": "10000",
                    "calculo": "Manual",
                    "turnos": "3",
                    "horasTurno": "8",
                    "cantidadEmpleados": "50",
                    "cantidadMaquinaria": "10",
                    "descripcionMaquinaria": "Maquinaria industrial",
                    "capacidadMensual": "300000",
                    "capacidadAnual": "3600000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "datosEmpleados": [
                {
                    "idPlantaE": "E01",
                    "idEmpleados": "EMP01",
                    "totalEmpleados": "100",
                    "directos": "80",
                    "cedula": "CED123",
                    "fechaCedula": "2024-01-10",
                    "indirectos": "20",
                    "contrato": "ContratoX",
                    "objetoContrato": "Objeto del contrato",
                    "fechaFirma": "2024-01-15",
                    "fechaFinVigencia": "2025-01-15",
                    "rfcEmpresa": "RFCEMP123",
                    "razonEmpresa": "Empresa Empleadora",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ]
  }

  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;
  
  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;
  /**
   * Objeto base inmutable que representa la estructura inicial de un plantasSubmanufactureras.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasSubmanufacturerasBase: Readonly<Record<string, any>> = {
            "idPlanta": "123",
            "calle": "Main St",
            "numeroInterior": "A",
            "numeroExterior": "10",
            "codigoPostal": "12345",
            "colonia": "Centro",
            "delegacionMunicipio": "MunicipioX",
            "entidadFederativa": "EntidadY",
            "pais": "Mexico",
            "rfc": "RFC123456",
            "domicilioFiscal": "Fiscal Address",
            "razonSocial": "Empresa S.A.",
            "claveEntidadFederativa": "EF01",
            "clavePlantaEmpresa": "PLT01",
            "clavePais": "MX",
            "claveDelegacionMunicipio": "DM01",
            "estatus": true,
            "desEstatus": "Activo",
            "localidad": "Localidad1",
            "telefono": "5551234567",
            "fax": "5557654321",
            "idDireccion": "DIR123",
            "testadoP": 1,
            "empresaCalle": "Empresa St",
            "empresaNumeroInterior": "B",
            "empresaNumeroExterior": "20",
            "empresaCodigoPostal": "54321",
            "empresaColonia": "EmpColonia",
            "empresaDelegacionMunicipio": "EmpMunicipio",
            "empresaEntidadFederativa": "EmpEntidad",
            "empresaPais": "Mexico",
            "empresaClaveEntidadFederativa": "EF02",
            "empresaClavePlantaEmpresa": "PLT02",
            "empresaClavePais": "MX",
            "empresaClaveDelegacionMunicipio": "DM02",
            "empresaCorreoElectronico": "empresa@email.com",
            "empresaTipo": "Tipo1",
            "permaneceMercancia": "Si",
            "rfcActivo": "RFC654321",
            "domiciliosInscritos": "2",
            "personaMoralISR": "Si",
            "opinionSAT": "Positiva",
            "fecha32D": "2024-06-01",
            "firmantes": [
                {
                    "idPlantaF": "FIRM01",
                    "tipoFirmante": "Representante Legal",
                    "descTipoFirmante": "Legal Representative"
                }
            ],
            "datosComplementarios": [
                {
                    "idPlantaC": "C01",
                    "idDato": "D01",
                    "amparoPrograma": "ProgramaX",
                    "tipoDocumento": "DocType1",
                    "descDocumento": "Documento de respaldo",
                    "descripcionOtro": "Otro documento",
                    "documentoRespaldo": "Respaldo.pdf",
                    "descDocRespaldo": "Descripción respaldo",
                    "respaldoOtro": "Otro respaldo",
                    "fechaFirma": "2024-01-01",
                    "fechaVigencia": "2025-01-01",
                    "fechaFirmaRespaldo": "2024-01-02",
                    "fechaVigenciaRespaldo": "2025-01-02"
                }
            ],
            "montos": [
                {
                    "idPlantaM": "M01",
                    "idMonto": "MON01",
                    "tipo": "Inversión",
                    "descTipo": "Inversión inicial",
                    "cantidad": "1000",
                    "descripcion": "Monto de inversión",
                    "monto": "500000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "listaCapacidad": [
                {
                    "idPlantaCa": "CA01",
                    "idCapacidad": "CAP01",
                    "claveServicio": "1",
                    "descripcionServicio": "Servicio de producción",
                    "cveTipoServicio": "TS01",
                    "tipoServicio": "Producción",
                    "fraccion": "FR01",
                    "fraccionVista": "Fracción Vista",
                    "umt": "UMT01",
                    "descripcion": "Capacidad instalada",
                    "capacidadEfectiva": "10000",
                    "calculo": "Manual",
                    "turnos": "3",
                    "horasTurno": "8",
                    "cantidadEmpleados": "50",
                    "cantidadMaquinaria": "10",
                    "descripcionMaquinaria": "Maquinaria industrial",
                    "capacidadMensual": "300000",
                    "capacidadAnual": "3600000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "datosEmpleados": [
                {
                    "idPlantaE": "E01",
                    "idEmpleados": "EMP01",
                    "totalEmpleados": "100",
                    "directos": "80",
                    "cedula": "CED123",
                    "fechaCedula": "2024-01-10",
                    "indirectos": "20",
                    "contrato": "ContratoX",
                    "objetoContrato": "Objeto del contrato",
                    "fechaFirma": "2024-01-15",
                    "fechaFinVigencia": "2025-01-15",
                    "rfcEmpresa": "RFCEMP123",
                    "razonEmpresa": "Empresa Empleadora",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ]
        }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
private notariosBase: Readonly<Record<string, any>> = {

            "nombreNotario": "JORGE",
            "apellidoMaterno": "NAVARRO",
            "apellidoPaterno": "NEAVES",
            "rfc": "AAL0409235E6",
            "numeroActa": "26117",
            "numeroNotaria": "22",
            "numeroNotario": null,
            "delegacionMunicipio": "08046",
            "entidadFederativa": "CHIH",
            "fechaActa": "2025-09-05",
            "numeroRegistro": "251473"
}


  /**
  * URL de la página actual.
  */
  public solicitudState!: Tramite80101State;
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
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService, private tramite80101Store: Tramite80101Store, private tramite80101Query: Tramite80101Query) {
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
    this.tramite80101Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.obtenerDatosDelStore();
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
    this.nuevoProgramaIndustrialService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
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
  buildSociosAccionistas(data: Record<string, any>, base: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
          paginaWeb: data['datosComplimentos'].datosGeneralis.paginaWWeb,
          numeroRegistro: data['datosComplimentos'].formaModificaciones.nombreDeActa,
          capacidadAlmacenaje: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
          rfc:  data['datosComplimentos'].formaModificaciones.rfc ?? ''
        });
      });
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
          nombre: arr.taxId,
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

        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantas(arr: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const MAP_TO_PAYLOAD = (item: any): any => ({
  ...base,
  idPlanta: item.planta ?? '',
  calle: item.calle ?? '',
  numeroExterior: item.numeroExterior ?? '',
  numeroInterior: item.numeroInterior ?? '',
  codigoPostal: item.codigoPostal ?? '',
  localidad: item.localidad ?? '',
  colonia: item.colonia ?? '',
  delegacionMunicipio: item.delegacionMunicipio ?? '',
  entidadFederativa: item.entidadFederativa ?? '',
  pais: item.pais ?? '',
  rfc: item.registroFederalDeContribuyentes ?? '',
  domicilioFiscal: item.domicilioDelSolicitante ?? '',
  razonSocial: item.razonSocial ?? '',
});
      

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildDatosFederatarios(arr: any[] = [], base: Record<string, any>): any[] {
  const RESULT: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const MAP_TO_PAYLOAD = (item: any): any => ({
  ...base,
  nombreNotario: item.nombre ?? '',
  apellidoMaterno: item.segundoApellido ?? '',
  apellidoPaterno: item.primerApellido ?? '',
  numeroActa: item.numeroDeActa ?? '',
  fechaActa: item.fechaInicioInput ?? '',
  numeroNotaria: item.numeroDeNotaria ?? '',
  entidadFederativa: item.estado ?? '',
  delegacionMunicipio: item.estadoOptions ?? '',
});

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

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

    const anexoDos: any = [];

    (data.annexoUno?.exportarDatosTabla || []).forEach((item: any) => {
      anexoDos.push({
        fraccionExportacion: item.encabezadoFraccionExportacion,
        fraccionImportacion: item.encabezadoFraccionImportacion,
        descFraccionImpo: item.encabezadoDescripcionComercial,
        claveFraccionAnexo: item.encabezadoAnexoII,
        idProducto: item.encabezadoIdProducto,
        fraccionDescripcionAnexo: item.encabezadoFraccionDescripcionAnexo,
        fraccionValorMonedaAI: item.encabezadoValorEnMonedaAnual,
        fraccionValorProdMI: item.encabezadoValorEnMonedaMensual,
        categoriaFraccion: item.encabezadoCategoria,
      });
    });

    return {
      anexo: {
        ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
        ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
        proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
        datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.datosParaNavegar || {}),
        tableDos: anexoDos
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantasSubmanufactureras(arr: any[] = [], base: Record<string, any>): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MAP_TO_PAYLOAD = (item: any): any => ({
      ...base,
      empresaCalle: item.calle ?? '',
      empresaNumeroInterior: item.numInterior ?? '',
      empresaNumeroExterior: item.numExterior ?? '',
      empresaCodigoPostal: item.codigoPostal ?? '',
      localidad: item.colonia ?? '',
      empresaDelegacionMunicipio: item.delegacionMunicipio ?? '',
      empresaEntidadFederativa: item.entidadFederativa ?? '',
      empresaPais: item.pais ?? '',
      rfc: item.rfc ?? '',
      domicilioFiscal: item.domicilioFiscalSolicitante ?? '',
      razonSocial: item.razonSocial ?? '',
    });

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardar(data: any): void {
    const PLANTAS = this.buildPlantas(data.plantasImmexTablaLista, this.plantasBase, data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase);
    const SOCIO_ACCIONISTAS = this.buildSociosAccionistas(data, this.socioAccionistaBase);
    const EMPRESAS_NACIONALES = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentos, this.empresasNacionales);
    const EMPRESAS_EXTRANJERAS = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentosExtranjera, this.empresasExtranjeras);
    const NOTARIOS = this.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);
    const ANEXO_ALL = this.buildAnexo(data);
   
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
    "discriminator_value": "80101",
    "discriminatorValue": "80101",
     "domicilio": {
    },
    "solicitante": {
        
    },
      "planta": [...PLANTAS],
      "notario":[...NOTARIOS],
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
        }
      ],
      "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
      "sociosAccionistas": SOCIO_ACCIONISTAS,
      "empresasNacionales": EMPRESAS_NACIONALES,
      "empresasExtranjeras": EMPRESAS_EXTRANJERAS,
      "solicitud": {
        "anexoI": [...ANEXO_ALL.anexo.tableDos]
      }
    }
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80101Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
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
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }

}
