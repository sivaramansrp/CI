import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../models/plantas-consulta.model';
import { AnexosComponent } from '../../../../shared/components/anexos/anexos.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [AnexosComponent],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class DatosAnexosComponent implements OnDestroy {
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
   * Datos de los anexos de importación obtenidos desde el servicio.
   * @type {Anexo[]}
   */
  datosImportacion: Anexo[] = [];

  /**
   * Constructor del componente DatosAnexosComponent.
   * @param modificionService Servicio para manejar las solicitudes de modificación.
   * @param toastr Servicio para mostrar notificaciones.
   */
  constructor(
    public modificionService: ModificacionSolicitudeService,
    private toastr: ToastrService 
  ) {
    this.obteneComplimentaria(); // Carga los anexos complementarios.
  }

  /**
   * Método que obtiene los anexos complementarios desde el servicio.
   * Asigna los datos a las variables `datosAnexo` y `datosImportacion`.
   */
  obteneComplimentaria(): void {
    this.modificionService
      .obtenerAnexo() // Llama al servicio para obtener los anexos.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Anexo[]) => {
          this.datosAnexo = [...data]; // Almacena los datos de anexos complementarios.
          this.datosImportacion = [...data]; // Almacena los datos de anexos de importación.
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
