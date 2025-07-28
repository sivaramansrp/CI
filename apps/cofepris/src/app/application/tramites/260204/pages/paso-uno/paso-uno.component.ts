import { Component, OnDestroy } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PermisoSanitarioImportacionMedicamentosService } from '../../services/permiso-sanitario-importacion-medicamentos.service';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';

/**
 * Decorador de componente que define las propiedades y configuraciones del componente Angular `PasoUnoComponent`.
 *
 * Este decorador especifica el selector, las dependencias importadas, las rutas de los archivos de plantilla y estilos,
 * y otras configuraciones necesarias para el funcionamiento del componente.
 *
 * @decorator
 * @selector `app-paso-uno` - Selector utilizado para identificar este componente en las plantillas HTML.
 * @standalone `true` - Indica que este componente es independiente y no requiere un módulo Angular.
 * @imports {CommonModule} - Módulo común de Angular que proporciona directivas esenciales como `ngIf` y `ngFor`.
 * @imports {SolicitanteComponent} - Componente que gestiona la información del solicitante.
 * @imports {ContenedorDeDatosSolicitudComponent} - Componente que contiene los datos de la solicitud.
 * @imports {TercerosRelacionadosVistaComponent} - Componente que muestra la vista de terceros relacionados.
 * @imports {PagoDeDerechosContenedoraComponent} - Componente que gestiona el pago de derechos.
 * @templateUrl `./paso-uno.component.html` - Ruta del archivo HTML que define la estructura visual del componente.
 * @styleUrl `./paso-uno.component.scss` - Ruta del archivo SCSS que contiene los estilos del componente.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy {
  /**
   * Índice numérico utilizado como referencia o posición actual.
   * Comienza en 1 por defecto.
   *
   * @type {number}
   */
  indice: number = 1;

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente que inicializa el estado de la consulta
   * y determina si se deben guardar los datos del formulario o mostrar solo los datos de respuesta.
   *
   * @param {ConsultaioQuery} consultaQuery - Servicio para obtener el estado de la consulta.
   * @param {PermisoSanitarioImportacionMedicamentosService} permisoSanitarioImportacionMedicamentosService - Servicio para gestionar el permiso sanitario de importación de medicamentos.
   */
  constructor(
    public consultaQuery: ConsultaioQuery,
    public permisoSanitarioImportacionMedicamentosService: PermisoSanitarioImportacionMedicamentosService
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState && this.consultaState.procedureId === '260204' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

  }


  /**
   * Guarda los datos del formulario y actualiza el estado del formulario en base a la respuesta obtenida.
   * 
   * Este método utiliza el servicio `PermisoSanitarioImportacionMedicamentosService` para obtener los datos 
   * del trámite y actualiza el estado del formulario si se recibe una respuesta válida. Además, se asegura 
   * de que la suscripción se cancele correctamente utilizando el operador `takeUntil` con el observable 
   * `destroyNotifier$`.
   * 
   * @returns {void} No devuelve ningún valor.
   * 
   * @remarks
   * - Este método es parte del componente `PasoUnoComponent` y se utiliza para manejar la lógica de 
   *   actualización de datos del formulario.
   * - La propiedad `esDatosRespuesta` se establece en `true` si se recibe una respuesta válida.
   * 
   * @example
   * // Llamada al método para guardar los datos del formulario
   * this.guardarDatosFormulario();
   */
  guardarDatosFormulario(): void {
    this.permisoSanitarioImportacionMedicamentosService
      .getTramiteDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.permisoSanitarioImportacionMedicamentosService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña (tab) en función del índice proporcionado.
   *
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
