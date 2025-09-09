import { Catalogo, CatalogoSelectComponent, CategoriaMensaje, Notificacion, SeccionLibState, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogosTramiteService } from '../../services/catalogosTramite.service';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user'
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';

/**
 * @component
 * @name RepresentacionFederalComponent
 * @description
 * Componente encargado de gestionar el formulario de selección de entidad federativa y representación federal
 * para el trámite de permiso de importación 130120. Permite inicializar el formulario, obtener los catálogos
 * necesarios y actualizar el estado global mediante el store.
 *
 * @property {FormGroup} datosFederal - Formulario reactivo para capturar los datos de entidad federativa y representación federal.
 * @property {Catalogo[]} entidadOpcion - Opciones disponibles para el campo de entidad federativa.
 * @property {Catalogo[]} representacionOpcion - Opciones disponibles para el campo de representación federal.
 * @property {boolean} esFormularioSoloLectura - Indica si el formulario está en modo solo lectura.
 * @property {Subject<void>} destroyNotifier$ - Subject para manejar la destrucción de suscripciones.
 * @property {DatosGrupos} datosState - Estado actual de los datos del trámite.
 *
 * @method ngOnInit
 * @description Inicializa el componente, suscribe al estado y configura los formularios y catálogos.
 *
 * @method initActionFormBuild
 * @description Inicializa el formulario reactivo con los valores actuales del estado.
 *
 * @method obtenerEntidadSelectList
 * @description Obtiene las opciones del catálogo de entidad federativa desde el servicio y las asigna al arreglo local.
 *
 * @method obtenerRepresentacionSelectList
 * @description Obtiene las opciones del catálogo de representación federal desde el servicio y las asigna al arreglo local.
 *
 * @method setValoresStore
 * @description Actualiza el store con el valor de un campo del formulario usando el método correspondiente.
 * @param {FormGroup} form - Formulario reactivo.
 * @param {string} campo - Nombre del campo en el formulario.
 * @param {keyof PermisoImportacionStore} metodoNombre - Método del store a invocar.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.css',
})
export class RepresentacionFederalComponent implements OnInit {

  /**
   * @property {FormGroup} datosFederal
   * @description Formulario reactivo que captura los datos de entidad federativa y representación federal
   */
  datosFederal!: FormGroup;

  /**
   * @property {Catalogo[]} entidadOpcion
   * @description Opciones disponibles para el campo de entidad federativa
   */
  entidadOpcion: Catalogo[] = []

  /**
   * @property {Catalogo[]} representacionOpcion
   * @description Opciones disponibles para el campo de representación federal
   */
  representacionOpcion: Catalogo[] = []

  /**
   * @property {seccionState} seccionState
   * @description Estado actual de la sección del trámite
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {boolean} esFormularioSoloLectura
   * @description Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para manejar la destrucción de suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {DatosGrupos} datosState
   * @description Estado actual de los datos del trámite.
   */
  private datosState!: DatosGrupos

  /**
    * Nueva notificación para mostrar mensajes de error o información al usuario.
    */
  nuevaNotificacion: Notificacion | null = null;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {PermisoImportacionStore} store - Store para manejar el estado global del trámite.
   * @param {Tramite130120Query} query - Query para seleccionar el estado de los datos del trámite.
   * @param {ConsultaioQuery} consultaQuery - Query para seleccionar el estado de consulta y modo de solo lectura.
   * @param {PermisoImportacionService} permisoImportacionService - Servicio para obtener los catálogos necesarios.
   */
  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    public permisoImportacionService: PermisoImportacionService,
    private catalogosService: CatalogosTramiteService
  ) {
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente, suscribe al estado y configura los formularios y catálogos.
   */
  async ngOnInit(): Promise<void> {
    this.query.selectDatos$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.datosState = state as DatosGrupos;
        })
      )
      .subscribe();
    await this.initActionFormBuild();
    this.obtenerEntidadSelectList();
    this.obtenerRepresentacionSelectList();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    if (this.esFormularioSoloLectura) {
      this.datosFederal.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.datosFederal = this.fb.group({
      entidad_federativa: [this.datosState.datosFederal.entidad_federativa, Validators.required],
      representacion_federal: [this.datosState.datosFederal.representacion_federal, Validators.required]
    });
  }

  /**
   * @method obtenerEntidadSelectList
   * @description Obtiene las opciones del catálogo de entidad federativa desde el servicio y las asigna al arreglo local.
   */
  obtenerEntidadSelectList(): void {
    this.catalogosService.getCatEntidades().subscribe({
      next: (resp) => {
        if (resp.codigo === CodigoRespuesta.EXITO) {
          this.entidadOpcion = resp.datos ?? [];
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: resp.error || 'Error al mostrar la firma.',
            mensaje:
              resp.causa ||
              resp.mensaje ||
              'Ocurrió un error al mostrar la firma.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (err) => {
        console.error('Error al cargar los regímenes', err);
      }
    });
  }

  /**
   * @method obtenerRepresentacionSelectList
   * @description Obtiene las opciones del catálogo de representación federal desde el servicio y las asigna al arreglo local.
   */
  obtenerRepresentacionSelectList(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'representacion_federal.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.representacionOpcion = data as Catalogo[];
        },
      });
  }

  /**
   * @method setValoresStore
   * @description Actualiza el store con el valor de un campo del formulario usando el método correspondiente.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo en el formulario.
   * @param {keyof PermisoImportacionStore} metodoNombre - Método del store a invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof PermisoImportacionStore,
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }
}