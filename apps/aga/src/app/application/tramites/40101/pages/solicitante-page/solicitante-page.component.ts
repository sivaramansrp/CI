import { ApiResponseSolicitante, DatosDelChoferNacional } from '../../models/registro-muestras-mercancias.model';
import { Chofer40101Query } from '../../estado/chofer40101.query';
import { Chofer40101Service } from '../../estado/chofer40101.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, SECCIONES_TRAMITE_40101, WizardComponent } from '@ng-mf/data-access-user';
import { Subject, combineLatest } from 'rxjs';
import { Tramite40101State, Tramite40101Store } from '../../estado/tramite40101.store';
import { map, take, takeUntil } from 'rxjs/operators';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { modificarTerrestreService } from '../../components/services/modificacar-terrestre.service';
import { DirectorGeneralQuery } from '../../estado/director-general.query';

interface AccionBoton {
  accion: string;
  valor: number;
}

export interface IniciarResponse {
  codigo: string;
  mensaje: string;
  datos: {
    id_solicitud: number;
    cadena_original: string;
  };
}
export interface DriverNacional {
  rfc: string;
  curp: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDeGafete: string;
  vigenciaGafete: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  estado: string;
  municipioAlcaldia: string;
  localidad: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  correoElectronico: string;
  telefono: string;
  paisDeResidencia: string;
}

// 🟩 Extranjero driver coming from choferesState.driversExtranjero
export interface DriverExtranjero {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDeGafete: string;
  vigenciaGafete: string;
  numeroDelSeguroSocial: string;
  identificadorFiscal: string;
  nacionalidad: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  estado: string;
  municipioAlcaldia: string;
  localidad: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  correoElectronico: string;
  telefono: string;
  paisDeResidencia: string;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit, OnDestroy {

  /**
 * Lista de pasos del wizard que se mostrarán en la página.
 *
 * @type {Array<ListaPasosWizard>}
 */
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);

  /** Indica si el trámite es CAAT (Certificado de Autotransporte Aduanal Terrestre).
   * 
   * @type {boolean}
   * @default false
   */
  isCaat: boolean = false;
  catErrorMessage: string = ""
  /**
    * Clase CSS para mostrar una alerta de información.
    */
  public info = 'alert-info';

  // temp data needed from db to get  
  ALERTA = `<p style='text-align: center;'><b>¡Error de registro!</b> Faltan campos por capturar</p>`;
  private destroySolicitante$ = new Subject<void>();
  indice: number = 1;

  public seccion!: Tramite40101State;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente hijo `WizardComponent` dentro de la plantilla.
   * Permite acceder a las propiedades y métodos públicos del componente hijo.
   *
   * @type {WizardComponent}
   */

  isShowDirector: boolean = false

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Datos relacionados con los pasos del wizard, como el número de pasos, el índice actual,
 * y los textos de los botones de navegación.
 *
 * @type {DatosPasos}
 */

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
 * Constructor del componente. Inicializa las dependencias necesarias.
 *
 * @param {Chofer40101Query} chofer40101Query - Servicio para consultar el estado del store.
 * @param {Chofer40101Store} chofer40101Store - Servicio para manejar el estado del store.
 */

  constructor(
    private tramite40101Query: Tramite40101Query,
    private tramite40101Store: Tramite40101Store,
    private modificarTerrestreService: modificarTerrestreService,
    private chofer40101Query: Chofer40101Query,
    private directorQuery: DirectorGeneralQuery,
    private chofer40101Service: Chofer40101Service
  ) { }

  ngOnInit(): void {
    this.pasos = PASOS.slice(0, 2).map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });

    this.tramite40101Query.select()
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();

    this.tramite40101Query.solicitanteData$.pipe(takeUntil(this.destroySolicitante$)).subscribe((data: ApiResponseSolicitante['datos']) => {
      this.isCaat = data.caat_existe;
      this.catErrorMessage = data.mensaje
    });
    this.tramite40101Query.solicitanteData$.pipe(takeUntil(this.destroySolicitante$)).subscribe((data: ApiResponseSolicitante['datos']) => {
      this.isShowDirector = data.mostrar_director_general;
    })
  }

  /**
 * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Limpia los recursos y completa los observables.
 *
 * @returns {void}
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.destroySolicitante$.next();
    this.destroySolicitante$.complete();
  }

  /**
 * Cambia el índice actual del wizard al valor proporcionado.
 *
 * @param {number} i - Índice del paso seleccionado.
 * @returns {void}
 */
  seleccionadosTodos(i: number): void {
    this.indice = i;
  }

  /**
 * Cambia el índice actual del wizard basado en la acción del botón.
 * Navega hacia adelante o hacia atrás en el wizard.
 *
 * @param {AccionBoton} e - Objeto que contiene la acción y el valor del índice.
 * @returns {void}
 */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont' && e.valor === 2) {
      const CHOFERES$ = this.chofer40101Query.select();
      const TRAMITE$ = this.tramite40101Query.select();
      const DIRECTOR$ = this.directorQuery.select()

      combineLatest([CHOFERES$, TRAMITE$, DIRECTOR$]).pipe(
        take(1)
      ).subscribe(([choferesState, tramiteState, directorateState]) => {
        // mapChoferNacional
        const MAPCHOFERNACIONAL = (driver: DriverNacional) => ({
          chofer_datos: {
            rfc: driver.rfc,
            curp: driver.curp,
            nombre: driver.nombre,
            primer_apellido: driver.primerApellido,
            segundo_apellido: driver.segundoApellido,
            numero_de_gafete: driver.numeroDeGafete,
            vigencia_del_gafete: driver.vigenciaGafete,
          },
          domicilio_fiscal: {
            ciudad: driver.ciudad,
            pais: driver.pais,
            codigo_postal: driver.codigoPostal,
            estado: driver.estado,
            municipio: driver.municipioAlcaldia,
            localidad: driver.localidad,
            colonia: driver.colonia,
            calle: driver.calle,
            numero_exterior: driver.numeroExterior,
            numero_interior: driver.numeroInterior,
            correo_electronico: driver.correoElectronico,
            telefono: driver.telefono,
            pais_de_residencia: driver.paisDeResidencia,
          }
        });

        const MAPCHOFEREXTRANJERO = (driver: DriverExtranjero) => ({
          chofer_datos: {
            nombre: driver.nombre,
            primer_apellido: driver.primerApellido,
            segundo_apellido: driver.segundoApellido,
            numero_de_gafete: driver.numeroDeGafete,
            vigencia_del_gafete: driver.vigenciaGafete,
            num_del_seg_social: driver.numeroDelSeguroSocial,
            num_de_iden_fisc: driver.identificadorFiscal,
            nacionalidad: driver.nacionalidad,
          },
          domicilio_fiscal: {
            ciudad: driver.ciudad,
            pais: driver.pais,
            codigo_postal: driver.codigoPostal,
            estado: driver.estado,
            municipio: driver.municipioAlcaldia,
            localidad: driver.localidad,
            colonia: driver.colonia,
            calle: driver.calle,
            numero_exterior: driver.numeroExterior,
            numero_interior: driver.numeroInterior,
            correo_electronico: driver.correoElectronico,
            telefono: driver.telefono,
            pais_de_residencia: driver.paisDeResidencia,
          }
        });

        const PAYLOAD = {
          choferes_nacionales: (choferesState.driversNacional || []).filter(d => d.status !== 'deleted').map(d => MAPCHOFERNACIONAL(d.data as DriverNacional)),
          choferes_extranjeros: (choferesState.driversExtranjero || []).filter(d => d.status !== 'deleted').map(d => MAPCHOFEREXTRANJERO(d.data as DriverExtranjero)),
          director_general: this.isShowDirector
            ? {
              nombre: directorateState?.nombre,
              primer_apellido: directorateState?.primerApellido,
              segundo_apellido: directorateState?.segundoApellido,
            }
            : null,
          vehiculos: {
            parque_vehicular: tramiteState.parqueVehicular.map((data) => {
              return {
                numero_identificacion_vehicular: data.numero || "", // maps from "numero"
                tipo_vehiculo: data.tipoDeVehiculo || "", // maps from "tipoDeVehiculo"
                id_vehiculo: String(data.idDeVehiculo || ""), // convert to string as per schema
                numero_placas: data.numeroPlaca || "",
                pais_emisor: data.paisEmisor || "",
                estado_provincia: data.estado || "",
                color_vehiculo: Number(data.colorVehiculo) || 0, // backend expects number
                numero_economico: data.numuroEconomico || "", // typo in frontend key
                numero_2da_placa: data.numero2daPlaca || "",
                estado_emisor_2da_placa: data.estado2daPlaca || "",
                pais_emisor_2da_placa: data.paisEmisor2daPlaca || "",
                descripcion_vehiculo: data.descripcion || "",
                marca: data.marca || "",
                modelo: data.modelo || "",
                anio: data.ano || "", // schema uses “anio”
                transponder: data.transponder || "",
              };
            }) || [],
            unidades_arrastre: (tramiteState.unidadesArrastre || []).map((data) => {
              return {
                numero_identificacion_vehicular: data.vinVehiculo || "", // maps from "vinVehiculo"
                tipo_vehiculo: "", // not provided — leave blank or map if available
                id_vehiculo: String(data.idDeVehiculoUnidad || ""), // convert to string
                numero_placas: data.numeroPlaca || "",
                pais_emisor: data.paisEmisor || "",
                estado_provincia: data.estado || "",
                color_vehiculo: Number(data.colorVehiculo) || 0, // backend expects number
                numero_economico: data.numeroEconomico || "",
                numero_2da_placa: data.numero2daPlaca || "",
                estado_emisor_2da_placa: data.estado2daPlaca || "",
                pais_emisor_2da_placa: data.paisEmisor2daPlaca || "",
                descripcion_vehiculo: data.descripcion || "",
                tipo_vehiculo_arrastre: data.tipoDeUnidadArrastre || "", // maps directly
                id_vehiculo_arrastre: String(data.idDeVehiculoUnidad || ""), // same ID reused
                color_vehiculo_arrastre: Number(data.colorVehiculo) || 0, // same color reused
                descripcion_unidad_arrastre: data.descripcion || "", // same description reused
              };
            })
          }
        };

        this.modificarTerrestreService.guardarDatosTramite(PAYLOAD).subscribe((res: IniciarResponse) => {
          this.chofer40101Service.guardarDatosFirma(res.datos);
          if (e.valor > 0 && e.valor < 6) {
            this.indice = e.valor;
            this.wizardComponent.siguiente();
          }
        });
      });
    } else {
      if (e.valor > 0 && e.valor < 6) {
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
 * Método privado para asignar las secciones existentes al store.
 * Configura las secciones y las formas válidas en el estado del store.
 *
 * @returns {void}
 */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];

    for (const LLAVE_SECCION of Object.keys(
      SECCIONES_TRAMITE_40101.PASO_1
    ) as Array<keyof typeof SECCIONES_TRAMITE_40101.PASO_1>) {
      SECCIONES.push(SECCIONES_TRAMITE_40101.PASO_1[LLAVE_SECCION]);
      FORMA_VALIDA.push(false);
    }

    this.tramite40101Store.establecerSeccion(SECCIONES);
    this.tramite40101Store.establecerFormaValida(FORMA_VALIDA);
  }
}