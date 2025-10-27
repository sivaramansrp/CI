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
import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, JSONResponse, doDeepCopy, esValidObject, getValidDatos } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, PASOS } from '../../constantes/cam-certificado.module';
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
    public camCertificadoService : CamCertificadoService
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
        rfc_solicitante: 'AAL0409235E6',
        solicitante: {
          rfc: 'AAL0409235E6',
          nombre: 'ACEROS ALVARADO S.A. DE C.V.',
          actividad_economica: 'Fabricación de productos de hierro y acero',
          correo_electronico: 'contacto@acerosalvarado.com',
          domicilio: {
            pais: item.formCertificado['pais'],
            codigo_postal: '06700',
            estado: 'Ciudad de México',
            municipio_alcaldia: 'Cuauhtémoc',
            localidad: 'Centro',
            colonia: 'Roma Norte',
            calle: 'Av. Insurgentes Sur',
            numero_exterior: '123',
            numero_interior: 'Piso 5, Oficina A',
            lada: '',
            telefono: '123456',
          },
        },
        certificado: {
          tratado_acuerdo: item.formCertificado['entidadFederativa'],
          pais_bloque: item.formCertificado['bloque'],
          fraccion_arancelaria: item.formCertificado['fraccionArancelariaForm'],
          nombre_comercial: item.formCertificado['nombreComercialForm'],
          fecha_inicio: item.formCertificado['fechaInicioInput'],
          fecha_fin: item.formCertificado['fechaFinalInput'],
          mercancias_seleccionadas: MERCANCIA_SELECCIONADAS,
        },
        destinatario: {
          nombre: item.formDatosDelDestinatario['nombres'],
          primer_apellido: item.formDatosDelDestinatario['primerApellido'],
          segundo_apellido: item.formDatosDelDestinatario['segundoApellido'],
          numero_registro_fiscal:
            item.formDatosDelDestinatario['numeroDeRegistroFiscal'],
          razon_social: item.formDatosDelDestinatario['razonSocial'],
          domicilio: {
            ciudad_poblacion_estado_provincia: item.formDestinatario['ciudad'],
            calle: item.formDestinatario['calle'],
            numero_letra: item.formDestinatario['numeroLetra'],
            lada: item.formDestinatario['lada'],
            telefono: item.formDestinatario['telefono'],
            fax: item.formDestinatario['fax'],
            correo_electronico: item.formDestinatario['correoElectronico'],
            pais_destino: item.formDestinatario['paisDestin'],
          },
          medio_transporte: '',
        },
        datos_del_certificado: {
          observaciones: item.formDatosCertificado['observacionesDates'],
          precisa: item.formDatosCertificado['precisaDates'],
          presenta: item.formDatosCertificado['precisaDates'],
          idioma: item.formDatosCertificado['idiomaDates'],
          representacion_federal: {
            entidad_federativa:
              item.formDatosCertificado['EntidadFederativaDates'],
            representacion_federal:
              item.formDatosCertificado['representacionFederalDates'],
          },
          desea_obtener_certificado: true,
          justificacion: 'qwertyui',
        },
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
                this.store.setIdSolicitud(
                  API_RESPONSE.datos.id_solicitud
                );
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
