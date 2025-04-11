import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaatNaviroMetaInfo, CapturarService } from '../../services/capturar.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CATALOGOS_40301_ID } from '../../enum/caat-naviero.enum';
import { LayaoutCapturaTipoAgenteComponent } from '../layaoutCapturaTipoAgente/layaoutCapturaTipoAgente.component';
import { LayoutDirectorGeneralComponent } from '../layoutDirectorGeneral/layoutDirectorGeneral.component';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Solicitud40301Store } from '../../estados/tramite40301.store';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.component.html',
  styleUrls: ['./capturar.component.scss']
})
export class CapturarComponent implements OnInit, OnDestroy {
  /**
   * A FormGroup instance used to manage the state and validation of the form
   * in the Capturar component. This form is likely associated with capturing
   * data for a specific "solicitud" (request or application) process.
   */
  solicitudForm!: FormGroup;
  /**
   * Represents the title of the component.
   * This property is expected to be initialized later and holds a string value.
   */
  titulo!: string;

  /**
   * Represents the label for the type of agent.
   * This property is used to store a descriptive label
   * associated with the agent type in the application.
   */
  tipoAgenteLabel!: string;

  /**
   * Represents the unique identifier for the current trámite (procedure or process).
   * This property is expected to be assigned a string value that uniquely identifies
   * a specific trámite within the application.
   */
  idTramite!: string;
  /**
   * An array of strings representing the roles assigned to the user.
   * This can be used to determine the user's permissions or access levels
   * within the application.
   */
  rolesUsuario: string[] = [];
  /**
   * Represents a catalog of agents.
   * This array holds a list of `Catalogo` objects, which can be used
   * to store and manage agent-related data within the component.
   */
  agentCatalog: Catalogo[] = [];

  @ViewChild(LayaoutCapturaTipoAgenteComponent) tipoAgentsComponent!: LayaoutCapturaTipoAgenteComponent
  @ViewChild(LayoutDirectorGeneralComponent) layoutDirectorGeneral!: LayoutDirectorGeneralComponent

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private capturarService: CapturarService,
    private solicitud40301Store: Solicitud40301Store,
  ) {
    this.establecerSolicitudForm();
  }

  ngOnInit(): void {

    this.capturarService.setInitialValues();
    this.readMetaInfo();
    this.suscribirseAlEstado();

  }

  /**
   * ## establecerSolicitudForm
   * 
   * Establece la estructura del formulario reactivo para los datos del trámite.
   * 
   * ### Funcionalidad
   * Crea un grupo de formularios con validaciones para los campos requeridos.
   */
  public establecerSolicitudForm(): void {
    // Inicializar el formulario reactivo
    this.solicitudForm = this.fb.group({
      cveFolioCaat: [{ value: '', disabled: true }],
      rol: [{ value: '', disabled: true }],
      tipoAgente: ['', Validators.required],
      directorGeneralNombre: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', [Validators.maxLength(200)]],
    });
  }

  /**
   * Reads and initializes metadata information required for the component.
   * 
   * This method performs the following actions:
   * 1. Retrieves metadata information such as the title and agent type label
   *    from the `capturarService` and assigns them to the respective component properties.
   * 2. Fetches the roles of the current user and stores them in the `rolesUsuario` property.
   * 3. Retrieves the agent catalog and assigns it to the `agentCatalog` property.
   * 
   * All subscriptions are automatically unsubscribed when the component is destroyed
   * using the `destruirNotificador$` notifier.
   */
  public readMetaInfo(): void {
    // Obtener el título desde el servicio
    this.capturarService.obtenerMetaInfo(CATALOGOS_40301_ID.OBTENER_META_INFO)
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((info: CaatNaviroMetaInfo) => {
          this.titulo = info.tutilo;
          this.tipoAgenteLabel = info.tipoAgenteLabel;
        })
      )
      .subscribe();


    // Obtener roles del usuario
    this.capturarService.obtenerRolesUsuario()
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((roles: string[]) => {
          this.rolesUsuario = roles;
        })
      )
      .subscribe();

    this.capturarService
      .getCatalogo(CATALOGOS_40301_ID.AGENT_CATALOG)
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((agentCatalog: Catalogo[]) => {
          this.agentCatalog = agentCatalog;
        })
      )
      .subscribe();
  }

  /**
   * ## suscribirseAlEstado
   * 
   * Suscribe al estado de la solicitud para actualizar el formulario automáticamente.
   * 
   * ### Funcionalidad
   * Utiliza el servicio para obtener el estado actual de la solicitud y parchea los valores en el formulario.
   */
  public suscribirseAlEstado(): void {
    this.capturarService
      .getSolicitudState()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (state) => {
          this.solicitudForm.patchValue(state);
        },
      });
  }

  /**
   * @method isFormValid
   * @description
   * Verifica si el formulario dentro del componente `CancelarSolicitudComponent` es válido.
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  isFormValid(): boolean {
    return this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitudForm.valid;
  }

  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  limpiarAgente(): void {
    this.solicitudForm.reset();
  }

  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  conTipoAgenteData(control: string): void {
    // Obtener el valor del control tipoAgente desde el formulario
    const AGENT = this.solicitudForm.get(control)?.value;
    //TODO: need to save the state of this drop down.
    // this.

    // return this.agentCatalog.map((item) => {
    //   return {
    //     id: item.id,
    //     clave: item.clave,
    //     descripcion: item.descripcion,
    //   };
    // });
  }



  /**
 * Actualiza el nombre del Director General en el store.
 *
 * Este método obtiene el valor actual del campo `directorGeneralNombre` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarDirectorGeneralNombre(control: string): void {
    const DIRECTOR_GENERAL_NOMBRE = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setDirectorGeneralNombre(DIRECTOR_GENERAL_NOMBRE);
  }

  /**
 * Actualiza el primer apellido en el store.
 *
 * Este método obtiene el valor actual del campo `primerApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarPrimerApellido(control: string): void {
    const PRIMER_APELLIDO = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setPrimerApellido(PRIMER_APELLIDO);
  }

  /**
 * Actualiza el segundo apellido en el store.
 *
 * Este método obtiene el valor actual del campo `segundoApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarApellidoMaterno(control: string): void {
    const SEGUNDO_APELLIDO = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setSegundoApellido(SEGUNDO_APELLIDO);
  }


  onSubmit(): void {
    if (this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitudForm.valid) {

    }
  }

  ngOnDestroy(): void {

    // Destruir el notificador para evitar fugas de memoria
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}