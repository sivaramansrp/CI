
import { Component, OnDestroy,OnInit} from '@angular/core';

import { ActivatedRoute,Router} from '@angular/router';

import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent,ConfiguracionColumna,TablaDinamicaComponent,TablaSeleccion,TituloComponent } from '@ng-mf/data-access-user';

import { DESTINATARIO_ENCABEZADO_DE_TABLA,Destinatario,FABRICANTE_ENCABEZADO_DE_TABLA,Fabricante,MENSAJE_TABLA_OBLIGATORIA } from '../../models/terceros-relacionados-destino.model';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';


/**
 * @module TercerosRelacionadosDestinoComponent
 * @description
 * Este componente es parte del módulo de trámites y está diseñado para gestionar
 * la relación de terceros relacionados con el destino final en un trámite específico.
 * 
 * Proporciona funcionalidades para manejar tablas dinámicas de fabricantes y destinatarios finales,
 * así como para realizar operaciones como selección, eliminación y modificación de elementos.
 * 
 * @selector app-terceros-relacionados-destino
 * @standalone true
 * @imports
 * - AlertComponent: Componente para mostrar alertas visuales.
 * - CommonModule: Módulo común de Angular.
 * - TablaDinamicaComponent: Componente para manejar tablas dinámicas.
 * - TituloComponent: Componente para mostrar títulos en la interfaz.
 * 
 * @templateUrl ./terceros-relacionados-destino.component.html
 * @styleUrl ./terceros-relacionados-destino.component.scss
 * 
 * @implements OnInit, OnDestroy
 * 
 * @remarks
 * Este componente utiliza servicios como `Router`, `ActivatedRoute`, `Tramite260104Query` y `Tramite260104Store`
 * para manejar la navegación, las rutas activas y la gestión del estado del trámite.
 * 
 * También utiliza un servicio compartido `TercerosRelacionadosDestinoService` para intercambiar datos
 * entre componentes relacionados.
 */
@Component({
  selector: 'app-terceros-relacionados-destino',
  standalone: true,
  imports: [
    AlertComponent,
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent
   ],
  templateUrl: './terceros-relacionados-destino.component.html',
  styleUrl: './terceros-relacionados-destino.component.scss'
})
export class TercerosRelacionadosDestinoComponent implements OnInit,OnDestroy{
 
  
  /**
   * @property {string} infoAlert
   * Tipo de alerta visual mostrada en la interfaz.
   */
  public infoAlert = 'alert-info';

 
  /**
   * @var {string} MENSAJE_TABLA_OBLIGATORIA
   * @description Mensaje utilizado para indicar que la tabla es obligatoria.
   * @access Público
   */
  public MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * @var {ConfiguracionColumna<Fabricante>[]} configuracionTablaFabricante
   * 
   * @description
   * Configuración de las columnas para la tabla de fabricantes. 
   * Utiliza una constante predefinida `FABRICANTE_ENCABEZADO_DE_TABLA` 
   * que contiene los encabezados y configuraciones necesarias para 
   * mostrar los datos de los fabricantes en la tabla.
   * 
   * @see FABRICANTE_ENCABEZADO_DE_TABLA
   */
  public configuracionTablaFabricante: ConfiguracionColumna<Fabricante>[] =
    FABRICANTE_ENCABEZADO_DE_TABLA;

 
  /**
   * @descripcion Configuración de la tabla para mostrar los destinatarios finales.
   * Esta propiedad utiliza un arreglo de configuraciones de columnas específicas
   * para el tipo de datos `Destinatario`, basado en la constante `DESTINATARIO_ENCABEZADO_DE_TABLA`.
   * 
   * @tipo ConfiguracionColumna<Destinatario>[]
   */
  public configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;

  
  /**
   * @var tipoSeleccionTabla
   * @type {TablaSeleccion}
   * @description Define el tipo de selección que se utilizará en la tabla.
   * En este caso, se utiliza un tipo de selección basado en casillas de verificación (CHECKBOX).
   * 
   * @see TablaSeleccion
   */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  
    /**
   * Lista de elementos requeridos en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben ser obligatorios en el formulario.
   */
    public elementosRequeridos: string[] = [];


    /**
     * Indica si el elemento relacionado está oculto o visible.
     * 
     * @type {boolean}
     * @default false - Por defecto, el elemento no está oculto.
     */
    public estaOcultoDes:boolean = false;


    /**
     * Indica si el botón flotante de acción (FAB) está oculto o visible.
     * 
     * @type {boolean}
     * - `true`: El FAB está oculto.
     * - `false`: El FAB está visible.
     */
    public estaOcultoFab:boolean = false;


    /**
     * Lista de destinatarios seleccionados.
     * 
     * Esta propiedad almacena un arreglo de objetos de tipo `Destinatario` que 
     * representan los destinatarios seleccionados en el componente.
     */
    public selectedDestinario:Destinatario[] = [];


    /**
     * Lista de fabricantes seleccionados.
     * 
     * @type {Fabricante[]}
     * @remarks
     * Este arreglo almacena los fabricantes seleccionados en el componente.
     * Puede ser utilizado para realizar operaciones relacionadas con los fabricantes
     * seleccionados en el contexto del trámite.
     */
    public selectedFabricante:Fabricante[] = []


    /**
     * Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
     * Se emite un valor `void` cuando el componente se destruye, lo que permite completar
     * las suscripciones asociadas.
     */
    private destroy$ = new Subject<void>();


  /**
   * @constructor
   * Inyecta los servicios de router, rutas activas y store del trámite.
   *
   * @param router - Servicio de enrutamiento de Angular.
   * @param activatedRoute - Ruta activa actual.
   * @param tramiteStore - Store que administra los datos del trámite.
   * @param tramiteQuery - Servicio para consultar los datos del trámite.
   */
  constructor(
    private tercerosDataService: TercerosRelacionadosDestinoService,
    private router: Router,
    public activatedRoute: ActivatedRoute,private tramiteQuery:Tramite260104Query, private tramiteStore:Tramite260104Store)
     {}

  /**
   * @property {Fabricante[]} fabricanteTablaDatos
   * Datos de la tabla de fabricantes.
   */
   fabricanteTablaDatos: Fabricante[] = [];


  /**
   * Arreglo que almacena los datos de los destinatarios finales.
   * 
   * @type {Destinatario[]}
   */
   destinatarioFinalTablaDatos: Destinatario[] = [];

   /**
   * @method irAAcciones
   * @description Navega a la ruta relativa proporcionada desde el contexto actual.
   *
   * @param {string} accionesPath - Ruta relativa hacia la que se desea navegar.
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
    
  }
  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Crea el formulario, activa la escucha de cambios y sincroniza el estado con el input.
   */
  ngOnInit(): void {
    this.validarElementos();
        this.tramiteQuery.getFabricanteTablaDatos$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.fabricanteTablaDatos = data;
          });
    
        this.tramiteQuery.getDestinatarioFinalTablaDatos$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.destinatarioFinalTablaDatos = data as Destinatario[];
          });
    
      
    
        }

   /**
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
   validarElementos(): void {
       this.elementosRequeridos = [
          'fabricante',
          'destinoFinal'
        ];
  }

  /**
    * Verifica si un campo es requerido según la configuración de campos requeridos.
    *
    * @param {string} campo - Nombre del campo a verificar.
    * @returns {boolean} Retorna `true` si el campo es requerido, `false` en caso contrario.
    */
  esCampoRequerido(campo: string): boolean {
    return this.elementosRequeridos?.includes(campo) ?? false;
  }
  

  /**
   * Maneja el evento para obtener los datos del destinatario y actualiza el estado correspondiente.
   * 
   * @param evento - Arreglo de objetos de tipo `Destinatario` que contiene la información del destinatario seleccionada.
   * 
   * - Si la tabla de datos de destinatarios finales (`destinatarioFinalTablaDatos`) contiene elementos,
   *   se actualiza la selección de destinatarios (`selectedDestinario`) con el evento recibido.
   * - Cambia el estado de visibilidad de `estaOcultoDes` a verdadero.
   * - Envía los datos del destinatario seleccionado al servicio compartido `tercerosDataService`.
   */
  getDestinatarioDatos(evento: Destinatario[]): void {
    if (this.destinatarioFinalTablaDatos?.length > 0) {
      this.selectedDestinario = evento;
      this.estaOcultoDes = true;
      this.tercerosDataService.setDestinatario(this.selectedDestinario); // Pass data to the shared service
    }
  }

  /**
   * Maneja el evento para obtener los datos del fabricante seleccionados.
   * 
   * @param evento - Arreglo de objetos de tipo `Fabricante` que contiene los datos seleccionados.
   * 
   * @remarks
   * - Si la tabla de datos de fabricantes (`fabricanteTablaDatos`) contiene elementos, 
   *   se actualiza la selección de fabricantes (`selectedFabricante`) con los datos recibidos.
   * - Cambia el estado de visibilidad de `estaOcultoDes` a `true`.
   * - Envía los datos seleccionados al servicio compartido `tercerosDataService` mediante el método `setFabricante`.
   */
  getFabricanteDatos(evento: Fabricante[]): void {
    if (this.fabricanteTablaDatos?.length > 0) {
      this.selectedFabricante = evento;
      this.estaOcultoDes = true;
      this.tercerosDataService.setFabricante(this.selectedFabricante); // Pass data to the shared service
    }
  }

  /**
   * Navega a la ruta de modificación de destinatarios finales si hay destinatarios seleccionados.
   * Si no hay destinatarios seleccionados, muestra una advertencia en la consola.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  modifySelectedDestinatarios(): void {
    if (this.selectedDestinario.length > 0) {
      this.router.navigate(['../modificar-destinatario-final'], {
        relativeTo: this.activatedRoute,
      });
    } else {
      console.warn('No destinatarios selected for modification.');
    }
  }

  /**
   * Elimina el destinatario seleccionado de la lista de destinatarios.
   * 
   * Si hay al menos un destinatario seleccionado en `selectedDestinario`, 
   * se elimina el primer destinatario de la lista utilizando el método 
   * `eliminarDestino` del store `tramiteStore`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  eliminarSelectedDestinatario():void{
    if (this.selectedDestinario.length > 0) {
      this.tramiteStore.eliminarDestino(this.selectedDestinario[0]);
    }
  }

  /**
   * Elimina el fabricante seleccionado de la lista de fabricantes relacionados.
   * 
   * @remarks
   * Este método verifica si hay elementos seleccionados en `selectedDestinario`.
   * Si existe al menos un elemento seleccionado, se elimina el primer fabricante
   * de la lista `selectedFabricante` utilizando el método `eliminarFabricante` del store `tramiteStore`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  eliminarSelectedFabricante():void{
    if (this.selectedDestinario.length > 0) {
      this.tramiteStore.eliminarFabricante(this.selectedFabricante[0]);
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroy$` para notificar a los suscriptores que deben limpiar recursos
   * y luego completa el observable para liberar memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
