import { CONFIGURACION_ANEXOS_IMPORTACION, CONFIGURACION_ANEXOS_TABLA } from '../../constantes/modificacion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../estados/models/plantas-consulta.model';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent],
  providers: [ImmerModificacionService, ToastrService],
})
export class DatosAnexosComponent implements OnDestroy, OnInit {
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
   * Datos de los anexos obtenidos desde el servicio.
   * @type {Anexo[]}
   */
  datosAnexo: Anexo[] = [];

  /**
   * Datos de los anexos de importación obtenidos desde el servicio.
   * @type {Anexo[]}
   */
  datosImportacion: Anexo[] = [];

  constructor(
    public solicitudService: ImmerModificacionService,
    private toastr: ToastrService 
  ) {}

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
