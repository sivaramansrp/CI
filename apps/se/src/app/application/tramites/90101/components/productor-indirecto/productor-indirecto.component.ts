/**
 * @component ProductorIndirectoComponent
 * @description Este componente es responsable de manejar los datos del productor indirecto.
 * Incluye la lógica para obtener y gestionar los datos del productor, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup } from '@angular/forms';
 * @import { PRODUCTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
 * @import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
 */

import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CommonModule } from '@angular/common';
import { FilaProductos } from '../../models/prosec.module';
import { ProsecService } from '../../services/prosec.service';
import { TablaSeleccion } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-productor-indirecto',
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductorIndirectoComponent implements OnInit, OnDestroy {

  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} productorIndirecto - El grupo de formularios para capturar los datos del productor indirecto.
   */
  productorIndirecto!: FormGroup;

  /**
   * @descripcion
   * Referencia a la enumeración o clase utilizada para la selección en la tabla dinámica.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @descripcion
   * Arreglo que contiene los datos de los productores indirectos obtenidos del servicio.
   */
  productorDato: FilaProductos[] = [];

  /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los controles del formulario estarán deshabilitados.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @descripcion
   * Configuración de las columnas que se mostrarán en la tabla de productores indirectos.
   */
  productorColumnsConfiguracion : ConfiguracionColumna<FilaProductos>[] = [
    { encabezado: 'Registro federal de contribuyentes', 
      clave: (fila) => fila.contribuyentes, 
      orden: 1 },
    {
      encabezado: 'Denominación o razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Correo',
      clave: (fila) => fila.Correo,
      orden: 3,
    },
  ];

  /**
   * @descripcion
   * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * Se utiliza junto con el operador `takeUntil` para cancelar las suscripciones al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual del productor, obtenido del store de Prosec.
   * @private
   */
  private productorState!: ProsecState

  /**
   * @constructor
   * @param fb - Instancia de FormBuilder para crear y gestionar formularios reactivos.
   * @param ProsecService - Servicio para operaciones relacionadas con PROSEC.
   * @param AutorizacionProsecStore - Store para manejar el estado de autorizaciones PROSEC.
   * @param AUtorizacionProsecQuery - Query para consultar el estado de autorizaciones PROSEC.
   * @param consultaQuery - Query para consultar información adicional relacionada.
   * 
   * @description
   * Constructor del componente ProductorIndirecto. Inicializa el formulario reactivo y
   * gestiona las dependencias necesarias para la funcionalidad del componente.
   * 
   */
  constructor(
    private readonly fb: FormBuilder, 
    private ProsecService: ProsecService,
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
     private consultaQuery: ConsultaioQuery
  ) {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de Prosec, inicializa el formulario y recupera los datos necesarios.
   */
  ngOnInit(): void {
    this.AUtorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.productorState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.recuperarDatos();

    if(this.formularioDeshabilitado) {
      this.inicializarEstadoFormulario();
    }
  }

  /**
   * @method inicializarEstadoFormulario
   * @description
   * Inicializa el estado del formulario según la propiedad esFormularioSoloLectura.
   * Si es verdadero, deshabilita el formulario; de lo contrario, lo habilita.
   * 
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.productorIndirecto.disable();
    }
    else {
      this.productorIndirecto.enable();
    } 
  }

  /**
   * @method initActionFormBuild
   * @description
   * Inicializa el formulario del productor indirecto con los valores actuales del estado.
   * Este método se encarga de construir el formulario reactivo utilizando los datos almacenados en el estado de Prosec.
   * 
   */
  initActionFormBuild(): void {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [
        this.productorState.contribuyentes
      ]
    })
  }

  /**
   * @method setValoresStore
   * @description
   * Actualiza el store de autorizaciones PROSEC con el valor de un campo específico del formulario.
   * Utiliza el nombre del método proporcionado para actualizar el valor correspondiente en el store.
   * 
   * @param form - El formulario reactivo del cual se obtiene el valor.
   * @param campo - El nombre del campo cuyo valor se va a actualizar en el store.
   * @param metodoNombre - El nombre del método del store que se debe invocar para actualizar el valor.
   * 
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof AutorizacionProsecStore
  ): void {
    const VALOR = form.get(campo)?.value as unknown;
    (this.AutorizacionProsecStore[metodoNombre] as (value: unknown) => void)(
      VALOR
    );
  }

  /**
   * @method recuperarDatos
   * @description
   * Recupera los datos de los productores indirectos desde el servicio ProsecService.
   * Realiza una petición para obtener los datos de la tabla 'productor.json' y los asigna al arreglo productorDato.
   * Si la respuesta es un arreglo, se castea como FilaProductos[].
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('productor.json').subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.productorDato = response as FilaProductos[];
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}