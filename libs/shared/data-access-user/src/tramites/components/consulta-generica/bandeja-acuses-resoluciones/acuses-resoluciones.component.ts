import { BodyTablaAcuses, BodyTablaResolucion, HeaderTablaAcuses, HeaderTablaResolucion } from '../../../../core/models/shared/consulta-generica.model';
import { CONSULTA_ACUSES, CONSULTA_RESOLUCIONES } from '../../../../core/enums/consulta-generica.enum';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AcusesService } from '../../../../core/services/consultagenerica/acuses-service';
import { CommonModule } from '@angular/common';
import { ResolucionesService } from '../../../../core/services/consultagenerica/resoluciones-service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-acuses-resoluciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acuses-resoluciones.component.html',
  styleUrl: './acuses-resoluciones.component.scss',
})
export class AcusesResolucionesComponent implements OnChanges, OnInit, OnDestroy {
  constructor(private router: Router, private acusesService: AcusesService, private resolucionesService:ResolucionesService) {}
    
    ngOnInit(): void {
      /**
       * Llamar al método para obtener los acuses al inicializar el componente
       */
      this.getAcuses(); 
      /**
       * Llamar al método para obtener las resoluciones al inicializar el componente
       */
      this.getResoluciones(); 
    }
    public unsubscribe$ = new Subject<void>();
       /**
       * Subject para notificar la destrucción del componente.
       */
       public destroyNotifier$: Subject<void> = new Subject();
       
  @Input() titulo!: string;
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;  
  @Input() url!: string;   

  /**
   * Implementación para la tabla de documentos de acuses.
   *
   */  
  readonly encabezadoTablaAcuse : HeaderTablaAcuses[] = CONSULTA_ACUSES.encabezadoTablaAcuse; 
  /**
       * Variable para almacenar los acuses
       */
  datosTablaAcuse: BodyTablaAcuses[] = []; 
  /**
   * Implementación para la tabla de documentos de resolucion.
   *
   */
  readonly encabezadoTablaResolucion : HeaderTablaResolucion[] = CONSULTA_RESOLUCIONES.encabezadoTablaResolucion;  
  /**
   * Variable para almacenar las resoluciones
   */
  datosTablaResolucion: BodyTablaResolucion[] = []; 

  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   *
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta'].currentValue) {
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }
  }
  /**
     * Método para obtener los documentos desde el servicio.
     * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
     * suscribe - Se suscribe al observable del servicio para obtener los datos.
     */
  getAcuses(): void {
      this.acusesService.getAcuses()
      .pipe(takeUntil((this.unsubscribe$)))  
      .subscribe((data) => {
        this.datosTablaAcuse = data; 
      });
    }
  /**
     * Método para obtener los documentos desde el servicio.
     * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
     * suscribe - Se suscribe al observable del servicio para obtener los datos.
     */
    getResoluciones(): void {
      this.resolucionesService.getResoluciones()
      .pipe(takeUntil((this.unsubscribe$)))  
      .subscribe((data) => {
        this.datosTablaResolucion = data; 
      });
    }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfAcuse(url: string): void {
    window.open(url, '_blank');
  }
  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfResolucion(url: string): void {
    window.open(url, '_blank');
  }
  verDetalleResolucion(id:number): void {
    /** 
     * Lógica para abrir el detalle de la resolución
     * @param id Número de identificación de la resolución
     * Modificar la ruta según tu configuración de rutas
     */
    this.router.navigate(['/lib-detalle-resolucion', id]); 
  }
  verDetalleAcuse(id: number): void {
    /**
     * Lógica para abrir el detalle del acuse
     * @param id Número de identificación del acuse
     * Modificar la ruta según tu configuración de rutas
     */
    this.router.navigate(['/lib-detalle-acuse', id]); 
  }
  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof AcusesResolucionesComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete()
  }
}
