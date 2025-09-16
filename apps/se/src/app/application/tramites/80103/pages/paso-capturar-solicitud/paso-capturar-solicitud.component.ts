/**
 * compo doc
 * @component
 * @selector app-paso-capturar-solicitud
 * @description
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 * Permite navegar entre los diferentes pasos del proceso, controla el estado de avance y valida la información
 * de cada sección utilizando el estado centralizado proporcionado por SeccionLibStore y Tramite80101Query.
 *
 * Funcionalidades principales:
 * - Visualiza y administra los pasos del wizard definidos en PASOS4.
 * - Permite avanzar y retroceder entre los pasos mediante el componente WizardComponent.
 * - Sincroniza el estado de la sección y la validez del formulario con el store global.
 * - Aplica estilos de alerta informativa para mensajes relevantes en el proceso.
 *
 * Componentes importados:
 * - `WizardComponent`: Componente para la navegación tipo wizard.
 *
 * @templateUrl ./paso-capturar-solicitud.component.html
 */
import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, take } from 'rxjs';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { takeUntil } from 'rxjs';
/*
*  * Componente para gestionar el paso de captura de solicitud en el trámite 80103.
*  * Este componente utiliza el componente WizardComponent para permitir la navegación entre
*/

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
/**
 * Clase que representa el componente de captura de solicitud.
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 */
export class PasoCapturarSolicitudComponent implements OnDestroy {
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
 * 
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';

  idSolicitud: number=0;
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

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
   * Constructor del componente `PasoCapturarSolicitudComponent`.
   * Inicializa el componente y establece la validez del formulario en el store.
   * 
   * @param {Tramite80101Query} tramiteQuery - Servicio para gestionar el estado del trámite.
   * @param {SeccionLibStore} seccion - Servicio para gestionar el estado de la sección.
   */
  constructor(
    private tramiteQuery: Tramite80101Query,
    private seccion: SeccionLibStore,
    private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([res]);
    });
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
    const MAP_TO_PAYLOAD = (item: Record<string, unknown>): Record<string, unknown> => ({
      ...base,
      nombre: item['nombre'] ?? '',
      apellidoPaterno: item['apellidoPaterno'] ?? '',
      apellidoMaterno: item['apellidoMaterno'] ?? '',
      rfc: item['rfc'] ?? '',
      correoElectronico: item['correoElectronico'] ?? '',
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
    "plantasSubmanufactureras": [],
    "sociosAccionistas":[...SOCIO_ACCIONISTAS]
    };
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      return response;
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
