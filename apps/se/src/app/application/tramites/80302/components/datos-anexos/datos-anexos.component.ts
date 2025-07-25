import { CONFIGURACION_ANEXOS_IMPORTACION, CONFIGURACION_ANEXOS_SENSIBLES, CONFIGURACION_ANEXOS_TABLA } from '../../constantes/modificacion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../estados/models/plantas-consulta.model';
import { SolicitudService } from '../../service/solicitud.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent],
})
export class DatosAnexosComponent implements OnInit, OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto evita fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla para los anexos.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaAnexo: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_TABLA;

  /**
   * Configuración de las columnas de la tabla para los anexos de importación.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaImportacion: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_IMPORTACION;

    /**
   * Configuración de las columnas de la tabla para los anexos de importación.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaSensibles: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_SENSIBLES;

  /**
   * Datos de los anexos obtenidos desde el servicio.
   * @type {Anexo[]}
   */
  datosAnexo: Anexo[] = [];

  /**
   * Lista de anexos relacionados con la importación.
   * 
   * Esta propiedad almacena un arreglo de objetos de tipo `Anexo` que contienen
   * la información relevante sobre los documentos o archivos anexados para el proceso de importación.
   */
  datosImportacion: Anexo[] = [];

  /**
   * Lista de anexos que contienen datos sensibles.
   * 
   * @remarks
   * Esta propiedad almacena los objetos de tipo `Anexo` que han sido identificados como sensibles.
   * Se utiliza para gestionar y mostrar información que requiere un tratamiento especial debido a su naturaleza confidencial.
   */
  datosSensibles: Anexo[] = []; 

  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService 
  ) {
   
  }

  ngOnInit(): void {
     this.obteneComplimentaria(); // Carga los anexos complementarios.
  }

  /**
   * Método que obtiene los anexos complementarios desde el servicio.
   * Asigna los datos a las variables `datosAnexo` y `datosImportacion`.
   */
  obteneComplimentaria(): void {
    this.solicitudService
      .obtenerAnexo() // Llama al servicio para obtener los anexos.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Anexo[]) => {
          this.datosAnexo = [...data]; // Almacena los datos de anexos complementarios.
          this.datosImportacion = [...data]; // Almacena los datos de anexos de importación.
          this.datosSensibles = [...data]; // Almacena los datos de anexos sensibles.
        },
        () => {
          this.toastr.error('Error al cargar los anexos'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.complete(); // Finaliza el Subject para evitar fugas de memoria.
  }
}
