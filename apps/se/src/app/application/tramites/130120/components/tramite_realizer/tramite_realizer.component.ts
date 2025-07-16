import { Catalogo, CatalogoSelectComponent, CatalogosService, ConsultaioQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';

/**
 * @component
 * @name TramiteRealizerComponent
 * @description
 * Componente encargado de gestionar el formulario de selección de régimen y clasificación de régimen
 * para el trámite de permiso de importación 130120. Permite inicializar el formulario, obtener los catálogos
 * necesarios y actualizar el estado global mediante el store.
 *
 * @method ngOnInit
 * @description Inicializa el componente, suscribe al estado y configura los formularios y catálogos.
 *
 * @method initActionFormBuild
 * @description Inicializa el formulario reactivo con los valores actuales del estado.
 *
 * @method setValoresStore
 * @description Actualiza el store con el valor de un campo del formulario usando el método correspondiente.
 * @param {FormGroup} form - Formulario reactivo.
 * @param {string} campo - Nombre del campo en el formulario.
 * @param {keyof PermisoImportacionStore} metodoNombre - Método del store a invocar.
 *
 * @method obtenerRegimenSelectList
 * @description Obtiene las opciones del catálogo de régimen desde el servicio y las asigna al arreglo local.
 *
 * @method obtenerClassificionRegimenSelectList
 * @description Obtiene las opciones del catálogo de clasificación de régimen desde el servicio y las asigna al arreglo local.
 *
 * @method ngOnDestroy
 * @description Limpia las suscripciones activas cuando el componente es destruido.
 */
@Component({
  selector: 'app-tramite-realizer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent],
  templateUrl: './tramite_realizer.component.html',
  styleUrl: './tramite_realizer.component.css',
})
export class TramiteRealizerComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} datosRealizer
   * @description Formulario reactivo que captura los datos de régimen y clasificación de régimen.
   */
  datosRealizer!: FormGroup;

  /**
   * @property {Catalogo[]} regimenOpciones
   * @description Opciones disponibles para el campo de régimen.
   */
  regimenOpciones: Catalogo[] = [];

  /**
   * @property {Catalogo[]} classificationRegimenOpciones
   * @description Opciones disponibles para el campo de clasificación de régimen.
   */
  classificationRegimenOpciones: Catalogo[] = [];

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
   * @property {DatosGrupos} realizarState
   * @description Estado actual de los datos del trámite.
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {DatosGrupos} realizarState
   * @description Estado actual de los datos del trámite.
   */
  public realizarState!: DatosGrupos

  constructor(
    public readonly fb: FormBuilder, 
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public seccionStore: SeccionLibStore,
    public catalogosServicios: CatalogosService,
    public permisoImportacionService: PermisoImportacionService,
    public consultaQuery: ConsultaioQuery
  ) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente, suscribe al estado y configura los formularios y catálogos.
   */
  ngOnInit(): void {
    this.query.selectDatos$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.realizarState = state as DatosGrupos;
        })
      )
      .subscribe();

    this.initActionFormBuild();

    this.obtenerRegimenSelectList();
    this.obtenerClassificionRegimenSelectList();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.datosRealizer = this.fb.group({
      regimen: [this.realizarState.datosRealizer.regimen, Validators.required],
      classificion_regimen: [this.realizarState.datosRealizer.classificion_regimen, Validators.required],
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

  /**
   * @method obtenerRegimenSelectList
   * @description Obtiene las opciones del catálogo de régimen desde el servicio y las asigna al arreglo local.
   */
  obtenerRegimenSelectList(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('regimen.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.regimenOpciones = data as Catalogo[];
        },
      });
  }

  /**
   * @method obtenerClassificionRegimenSelectList
   * @description Obtiene las opciones del catálogo de clasificación de régimen desde el servicio y las asigna al arreglo local.
   */
  obtenerClassificionRegimenSelectList(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('classificion_regimen.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.classificationRegimenOpciones = data as Catalogo[];
        },
      });
  }

  /**
   * @method ngOnDestroy
   * @description Limpia las suscripciones activas cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}