import { CROSLISTA_DE_PAISES, PAIS_PROCEDENCIA, PAIS_PROCEDENCIA_TODOS } from '../../constantes/datos-de-la-solicitud.enum';
import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CrossListLable, CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionesAgropecuariasState, ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service'

/**
 * @component PaisProcedenciaComponent
 * @description
 * Componente principal para gestionar los datos del país de procedencia en el flujo del trámite 130107.
 * Este componente incluye la lógica para manejar formularios dinámicos y listas cruzadas de países.
 * 
 * @selector app-pais-procedencia
 * @templateUrl ./Pais-procedencia.component.html
 * @styleUrl ./Pais-procedencia.component.scss
 */
@Component({
  selector: 'app-pais-procedencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, CrosslistComponent],
  templateUrl: './procedencia.component.html',
  styleUrl: './procedencia.component.scss',
})

export class PaisProcedenciaComponent implements OnInit, OnDestroy {
  /**
  *
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
  /**
   * @property destroy$
   * @description
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   */
  private destroy$ = new Subject<void>();

  /**
   * @property forma
   * @description
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos del país de procedencia.
   * 
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * @property ninoFormGroup
   * @description
   * Getter para acceder al grupo de formularios del país de procedencia.
   * Retorna el grupo de formularios correspondiente.
   * 
   * @type {FormGroup}
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @property paisProcedencia
   * @description
   * Datos dinámicos del formulario relacionados con el país de procedencia.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public paisProcedencia = PAIS_PROCEDENCIA;

  /**
   * @property paisProcedenciaTodos
   * @description
   * Lista de todos los países disponibles para selección.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public paisProcedenciaTodos = PAIS_PROCEDENCIA_TODOS;

  /**
   * @property crossList
   * @description
   * Referencia a los componentes de listas cruzadas para manejar la selección de países.
   * 
   * @type {QueryList<CrosslistComponent>}
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * @property crosListaDePaises
   * @description
   * Lista cruzada de países para selección.
   * 
   * @type {string[]}
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * @property seleccionarOrigenDelPais
   * @description
   * Lista de países seleccionados como origen.
   * 
   * @type {string[]}
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * @property paisDeProcedenciaLabel
   * @description
   * Etiquetas para las listas cruzadas de países.
   * 
   * @type {CrossListLable}
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País disponible',
    derecha: 'País seleccionados',
  };

  /**
   * @property paisDeProcedenciaBotones
   * @description
   * Configuración de los botones para manejar las listas cruzadas de países.
   * 
   */
  readonly paisDeProcedenciaBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * @property solicitudDeRegistroState
   * @description
   * Estado actual de la solicitud de registro.
   * 
   * @type {ImportacionesAgropecuariasState}
   */
  public solicitudDeRegistroState!: ImportacionesAgropecuariasState;

  /**
   * @constructor
   * @description
   * Constructor del componente que inyecta los servicios necesarios para manejar los datos y formularios.
   * 
   * @param importacionesAgropecuariasService Servicio para obtener datos de la solicitud.
   * @param importacionesAgropecuariasStore Store para manejar el estado de la solicitud.
   * @param importacionesAgropecuariasQuery Query para obtener datos del estado de la solicitud.
   * @param servicioDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    private importacionesAgropecuariasService: ImportacionesAgropecuariasService,
    private importacionesAgropecuariasStore: ImportacionesAgropecuariasStore,
    private importacionesAgropecuariasQuery: ImportacionesAgropecuariasQuery,
    private servicioDeFormularioService: ServicioDeFormularioService
  ) { }

  /**
   * @method ngOnInit
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.importacionesAgropecuariasQuery.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();

    this.datosBloque();
  }

  /**
   * @method establecerCambioDeValor
   * @description
   * Método que establece un cambio de valor en el formulario dinámico.
   * Actualiza el valor en el store y en el servicio de formularios.
   * 
   * @param event Objeto que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      const VALID_VALUE = typeof event.valor === 'object' ? JSON.stringify(event.valor) : event.valor;
      this.importacionesAgropecuariasStore.setDynamicFieldValue(event.campo, VALID_VALUE);
      this.servicioDeFormularioService.setFormValue('procedenciaForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * @method datosBloque
   * @description
   * Método que obtiene los datos del bloque desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosBloque(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.entidad)
      )
      .subscribe((datosBloque: Catalogo[]) => {
        const BLOQUE_FIELD = this.paisProcedencia.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'bloque'
        ) as ModeloDeFormaDinamica;
        if (BLOQUE_FIELD && !BLOQUE_FIELD.opciones) {
          if (Array.isArray(datosBloque)) {
            BLOQUE_FIELD.opciones = datosBloque.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
