import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../estados/models/plantas-consulta.model';
import { AnexosComponent } from '../../../../shared/components/anexos/anexos.component';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [AnexosComponent],
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

  /**
   * Constructor de la clase DatosAnexosComponent.
   * 
   * @param solicitudService Servicio para gestionar las solicitudes.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   */
  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService 
  ) {
   
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a `obteneComplimentaria()` para cargar los anexos complementarios al iniciar el componente.
   */
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
