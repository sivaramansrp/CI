import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, WizardComponent } from '@libs/shared/data-access-user/src';
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
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase: Readonly<Record<string, any>> = {
      "idPersonaPersonaSolicitudR": 0,
      "idSolicitud": 202734824,
      "nombre": "",
      "apellidoMaterno": "",
      "apellidoPaterno": "",
      "razonSocial": "AGRICOLA ALPE S DE RL DE CV",
      "rfc": "AAL0409235E6",
      "curp": "",
      "ideTipoPersonaSol": "TIPERS.SL",
      "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
      "cedulaProfesional": "",
      "nss": "",
      "telefono": "8154563",
      "descripcionGiro": "Siembra, cultivo y cosecha de papa",
      "cvePaisOrigen": "",
      "idDireccionSol": 260833725,
      "tipoPatenteAgente": "",
      "recif": "",
      "puesto": "",
      "tipoAgente": "",
      "numeroPatente": "",
      "numeroIdentificacionFiscal": "",
      "personaMoral": false,
      "extranjero": false,
      "organismoPublico": false,
      "cveUsuario": "AAL0409235E6",
      "paginaWeb": "",
      "ideGenerica1": "",
      "rfcExtranjero": "",
      "codAutorizacion": "",
      "actividadProductiva": "",
      "estadoEvaluacionEntidad": "AUTORIZADO",
      "estadoEntidad": "AUTORIZADO",
      "original": false,
      "modificado": false,
      "numeroRegistro": "",
      "concentimientoInstalacionRecuperacion": false,
      "cveCatalogo": "",
      "alquilado": false,
      "volumenAlmacenaje": 0,
      "capacidadAlmacenaje": 0,
      "descripcionDetalladaActividadEconomica": "",
      "activo": false,
      "generico1": false,
      "area": "",
      "cveNacionalidad": "",
      "clasificacionArancelaria": "",
      "infoAdicional": false,
      "montoImportacion": 0,
      "montoExportacion": 0,
      "pctParticAccionaria": 0,
      "ampliacionModelos": false,
      "ampliacionPaises": false,
      "fecFallecimiento": "2025-09-07"
  };

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
  buildSociosAccionistas(arr1: any[] = [], arr2: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MAP_TO_PAYLOAD = (item: any): any => ({
      ...base,
      nombre: item.nombre ?? '',
      apellidoPaterno: item.apellidoPaterno ?? '',
      apellidoMaterno: item.apellidoMaterno ?? '',
      rfc: item.rfc ?? '',
      correoElectronico: item.correoElectronico ?? '',
      razonSocial: data.datosComplimentos.formaSocioAccionistas.formaDatos.razonSocial,
      ideTipoPersonaSol: data.datosComplimentos.formaSocioAccionistas.tipoDePersona,
      paginaWeb: data.datosComplimentos.datosGeneralis.paginaWWeb,
      cveNacionalidad: data.datosComplimentos.formaSocioAccionistas.nationalidadMaxicana,
      fecFallecimiento: data.datosComplimentos.formaCertificacion.fechaVigencia
    });

    arr1.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));
    arr2.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

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

  return {
    anexo: {
      ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
      ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
      proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
      datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.datosParaNavegar || {}),
    },
  };
}


  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const SOCIO_ACCIONISTAS = this.buildSociosAccionistas(data.tablaDatosComplimentos, data.tablaDatosComplimentosExtranjera, this.socioAccionistaBase, data);
    const ANEXO_ALL = this.buildAnexo(data);
    const PAYLOAD = {
      "tipoDeSolicitud": "guardar",
      "planta": [],
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
    "sociosAccionistas":[...SOCIO_ACCIONISTAS]
    
}
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      return response;
    });
  }

}
