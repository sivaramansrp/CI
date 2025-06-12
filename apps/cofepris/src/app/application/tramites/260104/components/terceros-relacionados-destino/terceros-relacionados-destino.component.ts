
import { Component, OnDestroy,OnInit} from '@angular/core';

import { ActivatedRoute,Router} from '@angular/router';

import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent,ConfiguracionColumna,TablaDinamicaComponent,TablaSeleccion,TituloComponent } from '@ng-mf/data-access-user';

import { DESTINATARIO_ENCABEZADO_DE_TABLA,Destinatario,FABRICANTE_ENCABEZADO_DE_TABLA,Fabricante,MENSAJE_TABLA_OBLIGATORIA } from '../../models/terceros-relacionados-destino.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';


/**
 * Componente que gestiona la relación de terceros relacionados con el destino.
 * 
 * Este componente permite la visualización, selección y manipulación de datos
 * relacionados con fabricantes y destinatarios finales en el contexto de un trámite.
 * 
 * @remarks
 * - Utiliza servicios para manejar datos compartidos y realizar operaciones relacionadas.
 * - Implementa los ciclos de vida `OnInit` y `OnDestroy` de Angular.
 * 
 * @example
 * ```html
 * <app-terceros-relacionados-destino></app-terceros-relacionados-destino>
 * ```
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
   * Propiedad que define el tipo de alerta a mostrar.
   * En este caso, se utiliza para indicar que la alerta es de tipo informativo.
   * 
   * Valor predeterminado: 'alert-info'.
   */
   public infoAlert = 'alert-info';


  /**
   * Constante que representa el mensaje obligatorio para la tabla.
   * Se utiliza para mostrar un mensaje de validación o advertencia
   * cuando la tabla requiere datos obligatorios.
   */
  public MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

    /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
    public esFormularioSoloLectura: boolean = false;

 
  /**
   * Configuración de la tabla para los fabricantes.
   * 
   * Este arreglo define las columnas que se mostrarán en la tabla de fabricantes,
   * utilizando la configuración especificada en `FABRICANTE_ENCABEZADO_DE_TABLA`.
   * 
   * @type {ConfiguracionColumna<Fabricante>[]} 
   */
  public configuracionTablaFabricante: ConfiguracionColumna<Fabricante>[] =
    FABRICANTE_ENCABEZADO_DE_TABLA;

 
  /**
   * Configuración de la tabla para mostrar los destinatarios finales.
   * 
   * Esta propiedad define las columnas y su configuración para la tabla
   * que muestra los datos de los destinatarios finales en el componente.
   * 
   * @type {ConfiguracionColumna<Destinatario>[]} 
   * Arreglo que contiene la configuración de las columnas de la tabla.
   */
  public configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;

  
 
  /**
   * Define el tipo de selección que se utilizará en la tabla.
   * En este caso, se establece como un checkbox para permitir
   * la selección múltiple de filas.
   */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  
   
    /**
     * Lista de elementos requeridos para el componente.
     * 
     * Esta propiedad almacena un arreglo de cadenas que representan
     * los elementos necesarios para el correcto funcionamiento del componente.
     */
    public elementosRequeridos: string[] = [];

    /**
     * Indica si el elemento relacionado con el destino está oculto.
     * 
     * @type {boolean}
     * @default false
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
     * @type {Destinatario[]}
     */
    public selectedDestinario:Destinatario[] = [];


    
     /**
     * Lista de fabricantes seleccionados.
     * 
     * @type {Fabricante[]}
     * @remarks
     * Este arreglo almacena los fabricantes seleccionados en el componente.
     * Puede ser utilizado para realizar operaciones relacionadas con los fabricantes
     * seleccionados en el flujo del trámite.
     */
    public selectedFabricante:Fabricante[] = []


   
    /**
     * Un `Subject` que se utiliza para manejar la destrucción del componente.
     * Se emite un valor `void` cuando el componente se destruye, permitiendo
     * la limpieza de suscripciones y otros recursos para evitar fugas de memoria.
     */
    private destroy$ = new Subject<void>();

    /**
     * Arreglo que almacena los datos de los fabricantes relacionados.
     * 
     * @type {Fabricante[]}
     */
    public fabricanteTablaDatos: Fabricante[] = [];


  /**
   * Arreglo que almacena los datos de los destinatarios finales.
   * 
   * Cada elemento del arreglo es una instancia de la interfaz `Destinatario`,
   * que representa la información relacionada con un destinatario final.
   */
   public destinatarioFinalTablaDatos: Destinatario[] = [];


  
  /**
   * Constructor de la clase TercerosRelacionadosDestinoComponent.
   * 
   * @param tercerosDataService Servicio para manejar la lógica relacionada con terceros relacionados al destino.
   * @param router Servicio de Angular Router para la navegación entre rutas.
   * @param activatedRoute Servicio de Angular ActivatedRoute para acceder a información sobre la ruta activa.
   * @param tramiteQuery Consulta para obtener datos relacionados con el trámite 260104.
   * @param tramiteStore Almacén para gestionar el estado del trámite 260104.
   * @param consultaioQuery - Servicio para consultar el estado de la sección de IO.
   */
  constructor(
    private tercerosDataService: TercerosRelacionadosDestinoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,private tramiteQuery:Tramite260104Query, private tramiteStore:Tramite260104Store,
    private consultaioQuery: ConsultaioQuery,)
     {
      this.consultaioQuery.selectConsultaioState$
            .pipe(
              takeUntil(this.destroy$),
              map((seccionState) => {
                this.esFormularioSoloLectura = seccionState.readonly;
              })
            )
            .subscribe();
     }

  
    /**
     * Navega a una ruta específica basada en el path proporcionado.
     *
     * @param accionesPath - La ruta relativa a la que se desea navegar.
     * 
     * Este método utiliza el servicio de enrutamiento de Angular para realizar
     * la navegación hacia la ruta especificada, manteniendo el contexto de la
     * ruta activada actual.
     */
     irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
    
  }
  
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Llama al método `validarElementos` para realizar validaciones iniciales.
   * - Se suscribe a los observables `getFabricanteTablaDatos$` y `getDestinatarioFinalTablaDatos$` 
   *   del servicio `tramiteQuery` para obtener datos de fabricantes y destinatarios finales, 
   *   respectivamente, y los asigna a las propiedades correspondientes del componente.
   * - Utiliza el operador `takeUntil` para gestionar la suscripción y evitar fugas de memoria 
   *   al destruir el componente.
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
   * Método para validar los elementos requeridos en el componente.
   * Este método inicializa la lista de elementos requeridos que deben estar presentes
   * para cumplir con las condiciones necesarias.
   *
   * Elementos requeridos:
   * - 'fabricante': Representa el fabricante relacionado.
   * - 'destinoFinal': Representa el destino final relacionado.
   *
   * @returns {void} No retorna ningún valor.
   */
  validarElementos(): void {
       this.elementosRequeridos = [
          'fabricante',
          'destinoFinal'
        ];
  }

 
  /**
   * Verifica si un campo específico es requerido.
   *
   * @param campo - El nombre del campo a verificar.
   * @returns `true` si el campo está incluido en la lista de elementos requeridos, de lo contrario `false`.
   */
  esCampoRequerido(campo: string): boolean {
    return this.elementosRequeridos?.includes(campo) ?? false;
  }
  

  /**
   * Maneja el evento para obtener los datos del destinatario.
   * 
   * @param evento - Un arreglo de objetos de tipo `Destinatario` que contiene la información del destinatario seleccionado.
   * 
   * @remarks
   * Si la tabla de datos de destinatarios finales (`destinatarioFinalTablaDatos`) contiene elementos, 
   * este método actualiza el destinatario seleccionado (`selectedDestinario`), 
   * oculta el componente relacionado (`estaOcultoDes`) y pasa los datos del destinatario 
   * seleccionado al servicio compartido (`tercerosDataService`).
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
   *   se actualiza la selección de fabricantes (`selectedFabricante`) con los datos proporcionados en el evento.
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
   * @remarks
   * Este método verifica si hay al menos un destinatario seleccionado en la lista 
   * (`selectedDestinario`). Si existe, llama al método `eliminarDestino` del 
   * `tramiteStore` para eliminar el primer destinatario seleccionado.
   * 
   * @throws
   * No lanza excepciones directamente, pero depende de la implementación de 
   * `eliminarDestino` en `tramiteStore`.
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
   * Este método verifica si hay elementos seleccionados en `selectedDestinario` 
   * y, si es así, elimina el primer elemento de la lista `selectedFabricante` 
   * utilizando el método `eliminarFabricante` del store `tramiteStore`.
   * 
   * @returns {void} No retorna ningún valor.
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
