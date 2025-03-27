import { AlertComponent, Catalogo, CatalogoSelectComponent, REQUISITOS_OPCIONALES, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud260303State, Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import simulacroDeJSON from '@libs/shared/theme/assets/json/260303/documento-datos.json';

/**
 * RequisitosNecesariosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-requisitos-necesarios',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './requisitos-necesarios.component.html',
  styleUrl: './requisitos-necesarios.component.scss',
})
export class RequisitosNecesariosComponent implements OnInit,OnDestroy {

  /**
   * Una propiedad pública que contiene los requisitos opcionales para el componente.
   * La propiedad `TEXTOS` se inicializa con la constante `REQUISITOS_OPCIONALES`,
   * que probablemente contiene una colección de requisitos opcionales o datos relacionados
   * para el contexto actual.
   */
  public TEXTOS = REQUISITOS_OPCIONALES;
  /**
   * Representa el catálogo de tipos de documentos requeridos para el proceso de solicitud.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`.
   */
  public tipoDocumentoCatalogo!: Catalogo[];
  /**
   * Un grupo de formularios reactivos utilizado para gestionar y validar los campos relacionados
   * con la sección "Tipo de Documento". Este grupo de formularios se inicializa y configura con
   * controles de formulario específicos y validadores para garantizar un manejo adecuado de la entrada del usuario.
   */
  public tipoDeDocumentoForm!: FormGroup;
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Representa el estado del proceso de Solicitud260303.
   * Esta propiedad se utiliza para gestionar y rastrear el estado actual
   * de la solicitud dentro del componente.
   */
  public solicitudState!: Solicitud260303State;

  public documentoDatos = JSON.parse(JSON.stringify(simulacroDeJSON));

  /**
   * Constructor del componente RequisitosNecesariosComponent.
   * 
   * @param certificadosLicenciasSvc - Servicio para manejar operaciones relacionadas con certificados, licencias y permisos.
   * @param fb - Servicio FormBuilder de Angular para crear y gestionar formularios reactivos.
   * @param tramite260303Store - Store para gestionar el estado del proceso Tramite 260303.
   * @param tramite260303Query - Servicio de consulta para recuperar datos relacionados con el proceso Tramite 260303.
   */
  constructor(
      private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
      private fb: FormBuilder,
      private tramite260303Store: Tramite260303Store,
      private tramite260303Query: Tramite260303Query
  ) {
    //
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * 
   * Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectSolicitud$` de `tramite260303Query` para actualizar la propiedad `solicitudState`
   *   con el valor emitido. La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor.
   * - Llama a `getTipoDeDocumentoCatalog` para obtener el catálogo de tipos de documentos.
   * - Llama a `cerrarTipoDeDocumentoForm` para inicializar o restablecer el formulario de tipo de documento.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.tramite260303Query.selectSolicitud$.pipe(
    takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.getTipoDeDocumentoCatalog();
    this.cerrarTipoDeDocumentoForm();
  }

  /**
   * Obtiene el catálogo de tipos de documentos desde el servicio y lo asigna a la propiedad `tipoDocumentoCatalogo`.
   * 
   * Este método llama al método `getTipoDeDocumentoDatos` del servicio `certificadosLicenciasSvc`,
   * se suscribe a la respuesta y procesa los datos para extraer el catálogo de tipos de documentos.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getTipoDeDocumentoCatalog(): void {
    this.certificadosLicenciasSvc.getTipoDeDocumentoDatos().subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.tipoDocumentoCatalogo = API_DATOS.data;
    });
  }

  /**
   * Restablece el grupo de formularios `tipoDeDocumentoForm` con el estado actual de `tipoDocumento`.
   * Este método inicializa el formulario con un único control, `tipoDocumento`,
   * y establece su valor en la propiedad `tipoDocumento` del `solicitudState`.
   *
   * @returns {void} Este método no retorna un valor.
   */
  public cerrarTipoDeDocumentoForm(): void {
    this.tipoDeDocumentoForm = this.fb.group({
      tipoDocumento: [this.solicitudState.tipoDocumento],
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite260303Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
