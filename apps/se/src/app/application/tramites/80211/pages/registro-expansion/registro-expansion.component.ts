import { AVISO, DatosPasos, RegistroSolicitudService } from '@ng-mf/data-access-user';
import { Component, EventEmitter } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite80211Store, Tramites80211State } from '../../estados/tramites80211.store';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { Tramite80211Query } from '../../estados/tramites80211.query';
import { WizardComponent } from '@ng-mf/data-access-user';
import { registroSolicitudImmexService } from '../../services/registro-expansion.service';
import { PAYLOAD,PLANTASBUILD} from '../../enums/registro-expansion.enum';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente de registro-expansion.
 *
 * Este componente maneja el flujo de pasos para el proceso de registro-expansion.
 *
 * @selector 'app-registro-expansion'
 * @templateUrl './registro-expansion.component.html'
 * @styleUrl './registro-expansion.component.scss'
 */
@Component({
  selector: 'app-registro-expansion',
  templateUrl: './registro-expansion.component.html',
  styleUrl: './registro-expansion.component.scss',
})
export class RegistroExpansionComponent implements OnInit {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
 * Referencia al componente `WizardComponent` dentro de la plantilla.
 * 
 * @viewChild wizardComponent - Utiliza el decorador `@ViewChild` para acceder al componente `WizardComponent`.
 * Permite interactuar con sus propiedades y métodos en el código del componente principal.
 */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Constante que almacena el valor de la nota de privacidad.
 * 
 * @constant AVISO_PRIVACIDAD_ADJUNTAR - Almacena el valor definido en `NOTA.AVISO_PRIVACIDAD_ADJUNTAR`.
 * Se utiliza para adjuntar o gestionar el aviso de privacidad dentro del sistema.
 */
  AVISO_PRIVACIDAD_ADJUNTAR = AVISO.Aviso;

  /**
   * Datos relacionados con los pasos.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
   * URL de la página actual.
   */
  public solicitudState!: Tramites80211State;

   /**
   * Indica si se debe mostrar el botón de continuar (controla la visibilidad según el estado de carga de archivo).
   */
  cargarArchivo: boolean = true;
  /**
* Indica si la sección de carga de documentos está activa.
* Se inicializa en true para mostrar la sección de carga de documentos al inicio.
*/
  seccionCargarDocumentos: boolean = true;

  /**
   * Indica si hay un proceso de carga en progreso.
   * Se establece en `true` cuando se están cargando datos o recursos, y en `false` cuando la carga ha finalizado.
   */
  cargaEnProgreso: boolean = true;
  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Evento que se emite para regresar a la sección de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
   */
  regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

  /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;

  payload = PAYLOAD;
    constructor(
    private tramite80211Store: Tramite80211Store,
    private tramite80211Query: Tramite80211Query,
    private registroService: registroSolicitudImmexService,
    private registroSolicitudService: RegistroSolicitudService
  ) { }



    ngOnInit(): void {
    this.tramite80211Query.selectTramite80211$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

  /**
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    this.indice = evento.valor;
    this.obtenerDatosDelStore()
    this.wizardComponent[evento.accion === 'cont' ? 'siguiente' : 'atras']();
  }


buildPlantasTerciarizadoras(array: any[] = []): any[] {
  // eslint-disable-next-line complexity
  return array.map(flat => ({
    idPlanta: flat.idPlanta ?? '',
    calle: flat.calle ?? '',
    numeroInterior: flat.numeroInterio ?? '',
    numeroExterior: flat.numeroExterio ?? '',
    codigoPostal: flat.codiogoPostal ?? '',
    colonia: flat.colonia ?? '',
    delegacionMunicipio: flat.municipio ?? '',
    entidadFederativa: flat.entidadFederativa ?? '',
    pais: flat.pais ?? '',
    rfc: flat.registroFederal ?? '',
    domicilioFiscal: flat.domicilio ?? '',
    razonSocial: flat.razon ?? '',
    empresaCalle: flat.calle ?? '',
    empresaNumeroInterior: flat.numeroInterio ?? '',
    empresaNumeroExterior: flat.numeroExterio ?? '',
    empresaCodigoPostal: flat.codiogoPostal ?? '',
    empresaColonia: flat.colonia ?? '',
    empresaDelegacionMunicipio: flat.municipio ?? '',
    empresaEntidadFederativa: flat.entidadFederativa ?? '',
    empresaPais: flat.pais ?? '',
    datosComplementarios: flat.datosComplementarios ?? [],
    firmantes: flat.firmantes ?? [],
    montos: flat.montos ?? [],
    listaCapacidad: flat.listaCapacidad ?? [],
    datosEmpleados: flat.datosEmpleados ?? []
  }));
}

 /**
 * Obtiene los datos del store y los guarda utilizando el servicio.
 */
  obtenerDatosDelStore(): void {
    this.registroService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }
    guardar(item: any): void {
      this.payload = {
      ...this.payload,
      idSolicitud: item.idSolicitud,
    plantasTerciarizadoras: this.buildPlantasTerciarizadoras(item.plantasSeleccionadas),
    };

    this.registroService.guardarDatosPost(this.payload).subscribe(response => {
      this.tramite80211Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
  }

  /**
   * Actualiza el estado de carga de archivo, permitiendo mostrar u ocultar el botón de continuar.
   * Este método es llamado desde un componente hijo mediante un evento.
   * @param data Valor booleano que indica si se está cargando un archivo.
   */
  cargaArchivo(data: boolean): void {
    this.cargarArchivo = data;
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
}
