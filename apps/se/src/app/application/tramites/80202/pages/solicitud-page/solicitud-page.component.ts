import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  RegistroSolicitudService,
  Usuario,
  esValidObject,
  getValidDatos,
} from '@ng-mf/data-access-user';
import {
  MENSAJE_DE_EXITO_ETAPA_UNO,
  PASOS,
  USUARIO_INFO,
} from '../../constants/immex-ampliacion-sensibles.enums';
import { Subject, takeUntil } from 'rxjs';
import { GuardarService } from '../../services/guardar.service';
import { ImmexAmpliacionSensiblesQuery } from '../../estados/immex-ampliacion-sensibles.query';
import { ImmexAmpliacionSensiblesService } from '../../services/immex-ampliacion-sensibles.service';
import { ImmexAmpliacionSensiblesStore } from '../../estados/immex-ampliacion-sensibles.store';
import { ImmexRegistroState } from '../../estados/immex-ampliacion-sensibles.store';
import { ListaPasosWizard } from '../../models/immex-ampliacion-sensibles.model';
import { PermisoImmexDatosService } from '../../services/permiso-immex-datos.service';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';
import { buildGuardarPayload } from '../../mappers/guardar.mapper';

/**
 * Interfaz para la acción de los botones
 */
interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Componente principal para el formulario de solicitud IMMEX modalidad ampliación sensibles.
 */

@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
  providers: [ToastrService],
})
export class SolicitudPageComponent implements OnInit {
  datosUsuario: Usuario = USUARIO_INFO;
  cargarArchivosEvento = new EventEmitter<void>();
  activarBotonCargaArchivos: boolean = false;
  seccionCargarDocumentos: boolean = true;
  cargaEnProgreso: boolean = true;

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string | null =
    'Registro de solicitud IMMEX modalidad ampliación sensibles';

  /**
   * URL de la página actual.
   */
  public solicitudState!: ImmexRegistroState;

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito - Mensaje que se muestra si el primer paso se completa con éxito.
   *
   */
  mensajeDeTextoDeExito: string = MENSAJE_DE_EXITO_ETAPA_UNO;

  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   *
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso.
   * @property {number} indice - Índice del paso actual en el que se encuentra el usuario.
   *
   */
  indice: number = 1;

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   *
   */

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * @private
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para manejar la desuscripción de observables y evitar memory leaks.
   * Se emite cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  private immexRegistroState!: ImmexRegistroState;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos - Configuración para los botones "Anterior" y "Siguiente".
   *
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Estado del tramite Folio
   */
  public folioTemporal: number = 0;

  constructor(
    private immexRegistroStore: ImmexAmpliacionSensiblesStore,
    private Query: ImmexAmpliacionSensiblesQuery,
    private registroService: PermisoImmexDatosService,
    public registroSolicitudService: RegistroSolicitudService,
    private immexAmpliacionSensiblesService: ImmexAmpliacionSensiblesService,
    private guardarService: GuardarService,
    private toastrService: ToastrService
  ) {}

  /**
   * Mantiene la suscripción al estado de CambioModalidadQuery para tener siempre el estado actualizado.
   */
  ngOnInit(): void {
    this.Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state: ImmexRegistroState) => {
        this.solicitudState = state;
      });
  }

  /**
   * Updates the `indice` and `tituloMensaje` properties based on the value of the provided `AccionBoton` object.
   * If the `valor` property of `AccionBoton` is between 1 and 4 (inclusive), it sets the `indice` to `e.valor`
   * and updates the `tituloMensaje` using the `obtenerNombreDelTítulo` method.
   * Depending on the `accion` property of `AccionBoton`, it either moves the wizard component forward or backward.
   *
   * @param {AccionBoton} e - The action button object containing the `valor` and `accion` properties.
   */
  getValorIndice(e: AccionBoton): void {

    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = SolicitudPageComponent.obtenerNombreDelTítulo(
        e.valor
      );

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  /**
   * Obtiene el nombre del título basado en el valor proporcionado.
   *
   * @param {number} valor - El valor numérico que determina el título a retornar.
   * @returns {string} El nombre del título correspondiente al valor proporcionado.
   *
   *
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Cargar archivos';
      case 4:
        return 'Firmar';
      default:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
    }
  }

  /**
   * Cambia el título del mensaje según la pestaña seleccionada.
   * @method enTabChange
   * @param {number} selectedTab - El índice de la pestaña seleccionada.
   *
   * */
  enTabChange(selectedTab: number): void {
    switch (selectedTab) {
      case 1:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 2:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      case 3:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 4:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 5:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      default:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
    }
  }

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(e: AccionBoton): void {
    const PAYLOAD = buildGuardarPayload(this.solicitudState);
    let shouldNavigate = false;
    this.registroSolicitudService
      .postGuardarDatos('80202', PAYLOAD)
      .subscribe((response) => {
        shouldNavigate = response.codigo === '00';
        if (shouldNavigate) {
          if (esValidObject(response) && esValidObject(response.datos)) {
            const DATOS = response.datos as { id_solicitud?: number };
            if (getValidDatos(DATOS.id_solicitud)) {
              this.immexRegistroStore.setIdSolicitud(DATOS.id_solicitud ?? 0);
            } else {
              this.immexRegistroStore.setIdSolicitud(0);
            }
            if (e.valor > 0 && e.valor < 5) {
              this.indice = e.valor;
              this.tituloMensaje =
                SolicitudPageComponent.obtenerNombreDelTítulo(e.valor);

                if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = SolicitudPageComponent.obtenerNombreDelTítulo(
        e.valor
      );

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
            }
          }
          this.toastrService.success(response.mensaje);
        } else {
          this.toastrService.error(response.mensaje);
        }
      });
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

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
}
