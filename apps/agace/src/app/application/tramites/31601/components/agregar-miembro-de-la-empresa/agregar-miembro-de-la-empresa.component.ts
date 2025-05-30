import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Solicitud31601State, Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";

import { TableBodyData } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import enSuCaracterDe from '@libs/shared/theme/assets/json/31601/enSuCaracterDe.json';
import miembrodelaempresaTable from '@libs/shared/theme/assets/json/31601/miembroDeLaEmpresa .json';
import nacionalidad from '@libs/shared/theme/assets/json/31601/nacionalidad.json';
import preOperativo from '@libs/shared/theme/assets/json/31601/preOperativo.json';

/**
 * @component
 * @name AgregarMiembroDeLaEmpresaComponent
 * @description
 * Componente que gestiona la adición de miembros de la empresa mediante un formulario reactivo, una tabla paginada y un modal de Bootstrap.
 * Utiliza catálogos cargados desde archivos JSON y mantiene estado usando un store personalizado.
 *
 * @usage
 * ```html
 * <app-agregar-miembro-de-la-empresa></app-agregar-miembro-de-la-empresa>
 * ```
 *
 * @dependencies
 * - FormBuilder
 * - Tramite31601Store
 * - Tramite31601Query
 * - ConsultaioQuery
 * - Modal de Bootstrap
 */
@Component({
  selector: 'app-agregar-miembro-de-la-empresa',
  templateUrl: './agregar-miembro-de-la-empresa.component.html',
  styleUrls: ['./agregar-miembro-de-la-empresa.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    TablePaginationComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
})
export class AgregarMiembroDeLaEmpresaComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /**
   * Notificador para completar observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario principal del componente para agregar miembros.
   */
  agregarMiembroDeLaEmpresaFrom!: FormGroup;

  /**
   * Formulario para checkbox adicionales.
   */
  checkBoxesForm!: FormGroup;

  /**
   * Referencia al modal de Bootstrap para agregar miembros.
   */
  @ViewChild('Agregar', { static: false }) AgregarMOdel!: ElementRef;

  /**
   * Instancia del modal de Bootstrap.
   */
  AgregarModelInstance!: Modal;

  /**
   * Total de elementos en la tabla.
   */
  totalItems: number = 0;

  /**
   * Página actual en la tabla paginada.
   */
  currentPage: number = 1;

  /**
   * Elementos por página mostrados en la tabla.
   */
  itemsPerPage: number = 5;

  /**
   * Opciones para el input radio de "preoperativo".
   */
  radioOptions = preOperativo;

  /**
   * Opciones del catálogo "En su carácter de".
   */
  enSuCaracterDeOptions: Catalogo[] = enSuCaracterDe;

  /**
   * Opciones del catálogo de nacionalidades.
   */
  nacionalidadOptions: Catalogo[] = nacionalidad;

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Encabezados de la tabla de miembros.
   */
  public miembroDeLaEmpresaHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla de miembros.
   */
  public miembroDeLaEmpresaBodyData: unknown[] = [];

  /**
   * Datos de tabla obtenidos del archivo JSON correspondiente.
   */
  public getEstablecimientoTableData = miembrodelaempresaTable;

  /**
   * Constructor que inyecta los servicios necesarios.
   * @param fb Constructor de formularios
   * @param tramite31601Store Store de estado
   * @param tramite31601Query Query del store
   * @param consultaioQuery Consulta para estado de solo lectura
   */
  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Ciclo de vida de Angular: Inicializa el componente.
   */
  ngOnInit(): void {
    this.getEstablecimiento();
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa los formularios y carga el estado desde el store.
   */
  inicializarEstadoFormulario(): void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.agregarMiembroDeLaEmpresaFrom = this.fb.group({
      ensucaracterde: [
        this.solicitudState?.ensucaracterde ?? 1,
        Validators.required,
      ],
      rfc: [
        this.solicitudState?.rfc ?? 'HEJE780514BVA',
        [Validators.required],
      ],
      obligadoaTributarenMéxico: [
        this.solicitudState?.obligadoaTributarenMéxico ?? true,
        Validators.required,
      ],
      nacionalidad: [
        this.solicitudState?.nacionalidad ?? 1,
        Validators.required,
      ],
      registroFederaldeContribuyentes: [
        { value: 'HEJE780514BVA', disabled: true },
        Validators.required,
      ],
      nombreCompleto: [
        { value: 'ERNESTO HERNÁNDEZ URI', disabled: true },
        Validators.required,
      ],
    });

    this.checkBoxesForm = this.fb.group({
      squemaIntegral: [
        this.solicitudState?.squemaIntegral,
        Validators.required,
      ],
      sidoModificadas: [
        this.solicitudState?.sidoModificadas,
        Validators.required,
      ],
    });

    // Modo solo lectura
    if (this.esFormularioSoloLectura) {
      Object.keys(this.checkBoxesForm.controls).forEach((key) =>
        this.checkBoxesForm.get(key)?.disable()
      );
    } else {
      Object.keys(this.checkBoxesForm.controls).forEach((key) =>
        this.checkBoxesForm.get(key)?.enable()
      );
    }

    if (this.esFormularioSoloLectura && this.agregarMiembroDeLaEmpresaFrom) {
      this.agregarMiembroDeLaEmpresaFrom.disable();
    } else {
      this.agregarMiembroDeLaEmpresaFrom.enable();
    }
  }

  /**
   * Obtiene los datos y encabezados para la tabla.
   */
  public getEstablecimiento(): void {
    this.miembroDeLaEmpresaHeaderData =
      this.getEstablecimientoTableData.tableHeader;
    this.miembroDeLaEmpresaBodyData =
      this.getEstablecimientoTableData.tableBody;
  }

  /**
   * Actualiza la paginación de la tabla.
   */
  updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }

  /**
   * Cambia la página seleccionada en la tabla.
   * @param page Número de la nueva página
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Cambia la cantidad de elementos por página en la tabla.
   * @param itemsPerPage Nueva cantidad de elementos por página
   */
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Ciclo de vida de Angular: Inicializa el modal Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.AgregarMOdel?.nativeElement) {
      this.AgregarModelInstance = new Modal(this.AgregarMOdel.nativeElement);
    }
  }

  /**
   * Muestra el modal de agregar miembro.
   */
  openAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.show();
    }
  }

  /**
   * Cierra el modal de agregar miembro.
   */
  closeAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.hide();
    }
  }

  /**
   * Establece valores en el store.
   * @param form FormGroup de origen
   * @param campo Campo cuyo valor se establece
   * @param metodoNombre Método del store para actualizar el campo
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31601Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Ciclo de vida de Angular: Limpia suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
