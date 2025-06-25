/**
 * @component DomiciliosDePlantasComponent
 * @description Este componente es responsable de manejar los domicilios de plantas.
 * Incluye la lógica para obtener y gestionar los datos de las plantas, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { TEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { PLANTACOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConsultaioQuery, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaPlantas } from '../../models/prosec.module'
import { HttpErrorResponse } from '@angular/common/http';
import { ProsecService } from '../../services/prosec.service';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TEXTO } from '../../constantes/prosec.module';
import { TablaSeleccion } from '@ng-mf/data-access-user';

/**
 * @class DomiciliosDePlantasComponent
 * @description
 * Componente que permite la gestión de domicilios de plantas como parte del formulario PROSEC.
 * Maneja formularios, selección de catálogos y carga dinámica de información desde archivos JSON.
 */
@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrls: ['./domicilios-de-plantas.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, CommonModule, TablaDinamicaComponent, AlertComponent]
})
export class DomiciliosDePlantasComponent implements OnInit, OnDestroy {

    /**
   * @input
   * @property {boolean} formularioDeshabilitado
   * @description
   * Indica si el formulario debe estar deshabilitado (modo solo lectura).
   * Cuando es `true`, todos los controles del formulario estarán deshabilitados y no permitirán edición.
   * Este valor puede ser establecido desde el componente padre.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las plantas.
   */
  forma!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = TEXTO;

  /**
   * @property {Catalogo[]} estadoSeleccionar - Array de catálogos de estados.
   */
  estadoSeleccionar: Catalogo[] = [];

  /**
   * @property {Catalogo[]} RepresentacionFederal - Array de catálogos de representación federal.
   */
  RepresentacionFederal: Catalogo[] = [];

  /**
   * @property {Catalogo[]} ActividadProductiva - Array de catálogos de actividad productiva.
   */
  ActividadProductiva: Catalogo[] = [];

  /**
   * @descripcion
   * Arreglo que contiene los datos de las plantas obtenidos del servicio.
   */
  plantasDatos: FilaPlantas[] = [];

  /**
   * @descripcion
   * Referencia a la enumeración o clase utilizada para la selección en la tabla dinámica.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @descripcion
   * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * Se utiliza junto con el operador `takeUntil` para cancelar las suscripciones al destruir el componente.
   * @public
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de los domicilios, obtenido del store de Prosec.
   * @public
   */
  public domiciliosState!: ProsecState;

  /**
   * @descripcion
   * Estado actual de la sección, obtenido del store de la sección.
   * @public
   */
  public seccionState!: SeccionLibState;

  /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los controles del formulario estarán deshabilitados.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @descripcion
   * Configuración de las columnas que se mostrarán en la tabla de plantas.
   */
  plantaColumnsConfiguracion: ConfiguracionColumna<FilaPlantas>[] = [
    { encabezado: 'Calle', 
      clave: (fila) => fila.calle, 
      orden: 1 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioOAlcaldia,
      orden: 6,
    },
  ];

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para la construcción de formularios reactivos.
   * @param {ProsecService} ProsecService - Servicio para operaciones relacionadas con Prosec.
   * @param {AutorizacionProsecStore} AutorizacionProsecStore - Store para manejar el estado de autorización Prosec.
   * @param {AUtorizacionProsecQuery} AUtorizacionProsecQuery - Query para consultar el estado de autorización Prosec.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {ConsultaioQuery} consultaQuery - Query para operaciones de consulta adicionales.
   */
  constructor(
    public fb: FormBuilder, 
    public ProsecService: ProsecService, 
    public AutorizacionProsecStore: AutorizacionProsecStore,
    public AUtorizacionProsecQuery: AUtorizacionProsecQuery,
    public seccionStore: SeccionLibStore,
    public seccionQuery: SeccionLibQuery,
    public consultaQuery: ConsultaioQuery
  ) {
    // Constructor logic can be added here if needed
  }

  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe a los observables de estado de sección y de autorización PROSEC para mantener el estado local actualizado.
   * - Inicializa el formulario de acciones y obtiene la lista de domicilios.
   * - Establece el estado de validez de la sección en falso al inicio.
   * - Escucha los cambios de estado del formulario y, si es válido, actualiza el estado de validez en el store correspondiente.
   * - Si el formulario está deshabilitado, inicializa su estado.
   * - Si la forma es válida (con descripción 'AllValida'), actualiza el estado de la sección y su validez; en caso contrario, la marca como no válida.
   *
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.AUtorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.domiciliosState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.obtenerLista();

    this.seccionStore.establecerFormaValida([false]);

    this.forma.statusChanges
          .pipe(
            takeUntil(this.destroyNotifier$),
            delay(10),
            tap((_value) => {
              if (this.forma.valid) {
                this.AutorizacionProsecStore.setDomiciliosFormaValida(true);
                this.ProsecService.formValida()
              }
            })
          )
          .subscribe();

    if(this.formularioDeshabilitado){
      this.inicializarEstadoFormulario();
    }
  }

  /**
   * @method setValoresStore
   * @description
   * Actualiza un valor en el store de AutorizacionProsec utilizando el método especificado.
   * 
   * @param form El formulario reactivo (`FormGroup`) del cual se obtiene el valor.
   * @param campo El nombre del campo dentro del formulario cuyo valor se va a extraer.
   * @param metodoNombre El nombre del método del store (`AutorizacionProsecStore`) que se va a invocar para actualizar el valor.
   * 
   * @returns {void}
   * 
   * @memberof DomiciliosDePlantasComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof AutorizacionProsecStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.AutorizacionProsecStore[metodoNombre] as (value: unknown) => void)(
      VALOR
    );
  }

  /**
   * @method inicializarEstadoFormulario
   * @description
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, lo deshabilita; de lo contrario, lo habilita.
   *
   * @memberof DomiciliosDePlantasComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.forma.disable();
    }
    else {
      this.forma.enable();
    } 
  }

  /**
   * @method initActionFormBuild
   * @description
   * Inicializa el formulario reactivo para capturar los datos de las plantas.
   * Define los controles y sus validaciones, utilizando los valores actuales del estado.
   *
   * @memberof DomiciliosDePlantasComponent
   */
  initActionFormBuild(): void {
    this.forma = this.fb.group({
      modalidad: [
        this.domiciliosState.modalidad,
      ],
      Estado: [
        this.domiciliosState.Estado,
        Validators.required
      ],
      RepresentacionFederal: [
        this.domiciliosState.RepresentacionFederal,
        Validators.required
      ],
      ActividadProductiva: [
        this.domiciliosState.ActividadProductiva,
        Validators.required
      ]
    })
  }

    /**
   * @method obtenerListaEstado
   * @description
   * Obtiene la lista de estados desde el servicio llamando al archivo `estado.json`.
   * Si la petición es exitosa, asigna los datos recibidos a la propiedad `estadoSeleccionar`.
   * En caso de error, muestra el error en consola y asigna un arreglo vacío.
   * 
   * @returns {void}
   */
  obtenerListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('estado.json').subscribe({
      next: (data) => {
        this.estadoSeleccionar = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.estadoSeleccionar = [];
      }
    });
  }

  /**
   * @method obtenerListaFederal
   * @description
   * Obtiene la lista de representación federal desde el servicio llamando al archivo `federal.json`.
   * Si la petición es exitosa, asigna los datos recibidos a la propiedad `RepresentacionFederal`.
   * En caso de error, muestra el error en consola y asigna un arreglo vacío.
   * 
   * @returns {void}
   */
  obtenerListaFederal(): void {
    this.ProsecService.obtenerMenuDesplegable('federal.json').subscribe({
      next: (data) => {
        this.RepresentacionFederal = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.RepresentacionFederal = [];
      }
    });
  }

    /**
   * @method obtenerListaActividad
   * @description
   * Obtiene la lista de actividades productivas desde el servicio llamando al archivo `actividad_productiva.json`.
   * Si la petición es exitosa, asigna los datos recibidos a la propiedad `ActividadProductiva`.
   * En caso de error, muestra el error en consola y asigna un arreglo vacío.
   * 
   * @returns {void}
   */
  obtenerListaActividad(): void {
    this.ProsecService.obtenerMenuDesplegable('actividad_productiva.json').subscribe({
      next: (data) => {
        this.ActividadProductiva = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.ActividadProductiva = [];
      }
    });
  }

  /**
   * @method obtenerLista
   * @description
   * Obtiene todas las listas necesarias para el formulario de domicilios de plantas.
   * Llama a los métodos para obtener la lista de estados, representación federal, actividad productiva y los datos de plantas.
   * Este método centraliza la carga de catálogos y datos requeridos para el correcto funcionamiento del formulario.
   * 
   * @returns {void}
   */
  obtenerLista(): void {
    this.obtenerListaEstado();
    this.obtenerListaFederal();
    this.obtenerListaActividad();
    this.recuperarDatos();
  }

  /**
   * @method estadoSeleccion
   * @description
   * Método que selecciona un estado del catálogo y lo establece en el store de autorización PROSEC.
   * 
   * @param {Catalogo} Estado - Objeto que representa el estado seleccionado del catálogo.
   * 
   * @memberof DomiciliosDePlantasComponent
   */
  estadoSeleccion(Estado: Catalogo): void {
    this.AutorizacionProsecStore.setEstado([Estado]);
  }

  /**
   * @method fedralSeleccion
   * @description
   * Selecciona una representación federal y la establece en el store de autorización PROSEC.
   *
   * @param {Catalogo} RepresentacionFederal - Objeto que representa la representación federal seleccionada.
   *
   * @returns {void}
   *
   * @memberof DomiciliosDePlantasComponent
   */
  fedralSeleccion(RepresentacionFederal: Catalogo): void {
    this.AutorizacionProsecStore.setRepresentacionFederal([RepresentacionFederal]);
  }

  /**
   * @method productivaSeleccion
   * @description
   * Selecciona una actividad productiva y la establece en el store de autorización PROSEC.
   *
   * @param {Catalogo} ActividadProductiva - Objeto que representa la actividad productiva seleccionada.
   *
   * @memberof DomiciliosDePlantasComponent
   */
  productivaSeleccion(ActividadProductiva: Catalogo): void {
    this.AutorizacionProsecStore.setActividadProductiva([ActividadProductiva]);
  }

  /**
   * @method recuperarDatos
   * @description Recupera los datos de las plantas desde un archivo JSON utilizando el servicio ProsecService.
   * Llama al método `obtenerTablaDatos` con el nombre del archivo y suscribe a la respuesta.
   * Si la respuesta es un arreglo, asigna los datos a la propiedad `plantasDatos`.
   *
   * @memberof DomiciliosDePlantasComponent
   * @returns {void}
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('plantasDatos.json').subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.plantasDatos = response as FilaPlantas[];
        } 
      }
    );
  }

  /**
   * @method ngOnDestroy
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Se encarga de emitir y completar el notificador destroyNotifier$ para cancelar todas las suscripciones activas y evitar fugas de memoria.
   *
   * @memberof DomiciliosDePlantasComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}