import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AltaPlantaComponent } from '../../components/alta-planta/alta-planta.component';
import { BitacoraComponent } from '../../components/bitacora/bitacora.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosModificacionesComponent } from '../../components/datos-modificaciones/datos-modificaciones.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Tramite80308Store } from '../../estados/tramite80308.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    BitacoraComponent,
    AltaPlantaComponent,
    DatosModificacionesComponent,
  ],
  host: {},
})
export class PasoUnoComponent {
  /**
   * Representa el tipo de persona (por ejemplo, persona moral o física).
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Arreglo que contiene los datos dinámicos relacionados con el domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice que controla la selección de las pestañas en la interfaz.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Cambia el índice de la pestaña seleccionada.
   * Se utiliza para cambiar la pestaña activa en la interfaz.
   *
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Estado actual de la consulta para el componente.
   * 
   * Esta propiedad almacena la información relacionada con el estado de la consulta
   * en el flujo del trámite. Utiliza el tipo `ConsultaioState` para definir la estructura
   * de los datos gestionados.
  */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUno.
   * 
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param serviciosPermisoSanitarioService Servicio para gestionar los permisos sanitarios.
   * 
   * Al inicializar, se suscribe al observable del estado de la consulta y actualiza la propiedad `consultaState`.
   * Si el estado indica que se debe actualizar (`update`), guarda los datos del formulario.
   * En caso contrario, establece la bandera `esDatosRespuesta` en verdadero.
   */
  constructor(private consultaQuery: ConsultaioQuery, public modificionService: ModificacionSolicitudeService, private store: Tramite80308Store,) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }



  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.modificionService
      .obtenerTramiteDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.store.update(resp);
        }
      });
  }
}
