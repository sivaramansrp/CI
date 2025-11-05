import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DatosModificacion, EmpresaSubmanufacturera } from '../../../../shared/models/modificacion.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EliminacionModificacionComponent } from '../../../../shared/components/modificacion/modificacion.component';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

/**
 * Decorador que define un componente en Angular.
 *
 * Este decorador configura las propiedades esenciales del componente, como su selector,
 * las dependencias importadas, y las rutas de los archivos de plantilla y estilos.
 *
 * Propiedades:
 * - `selector`: Define el nombre del selector que se utilizará para instanciar este componente en el HTML.
 * - `standalone`: Indica si el componente es independiente y no requiere ser declarado en un módulo.
 * - `imports`: Lista de módulos y componentes que se importan para ser utilizados dentro de este componente.
 * - `templateUrl`: Ruta del archivo HTML que contiene la plantilla del componente.
 * - `styleUrl`: Ruta del archivo SCSS que contiene los estilos del componente.
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule, EliminacionModificacionComponent],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Arreglo que almacena datos de empresas submanufactureras.
   *
   * Este arreglo se utiliza para gestionar y mostrar información
   * relacionada con las empresas submanufactureras en la tabla de datos.
   */
  submanufacturerasTablaDatos: EmpresaSubmanufacturera[] = [];

  /**
   * @property {DatosModificacion} datosModificacion
   * @description Datos relacionados con la modificación del trámite.
   */
  datosModificacion!: DatosModificacion;

  /**
   * Constructor del componente ModificacionComponent.
   *
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   *
   * @param modificacionProgramaImmexBajaSubmanufactureraService - Servicio encargado de manejar la lógica relacionada con la modificación del programa IMMEX en el contexto de baja submanufacturera.
   * @param tramite80303Querry - Servicio que proporciona acceso a las consultas relacionadas con el trámite 80303.
   */
  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query,
    private cd: ChangeDetectorRef
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * En este método se realizan las siguientes acciones:
   * - Se invoca el método `crearFormaulario` para inicializar el formulario del componente.
   * - Se utiliza el servicio `modificacionProgramaImmexBajaSubmanufactureraService` para obtener datos
   *   desde una URL específica y se pasa el identificador `submanufacturerasTablaDatos` junto con la ruta
   *   `/80303/subManufacturerasTablaDatos.json`.
   * - Se suscribe al estado del trámite utilizando `tramite80303Querry.selectTramiteState$` y se actualiza
   *   la propiedad `submanufacturerasTablaDatos` con los datos obtenidos del estado.
   * - La suscripción está gestionada con `takeUntil(this.destroyNotifier$)` para evitar fugas de memoria
   *   al destruir el componente.
   */
  ngOnInit(): void {
    this.obtenerModificacionFormDatos();

    this.fetchConfiguracionEmpresasSubmanufacturerasTabla();

    this.tramite80303Querry.selectTramiteState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.submanufacturerasTablaDatos = state.submanufacturerasTablaDatos;
      });
  }

  /**
   * Obtiene los datos del formulario de modificación.
   *
   * Este método utiliza el servicio `modificacionProgramaImmexBajaSubmanufactureraService`
   * para obtener los datos del formulario desde un archivo JSON local.
   * @returns {void}
   */
  obtenerModificacionFormDatos(): void {
    this.modificacionProgramaImmexBajaSubmanufactureraService
      .obtenerModificacionFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosModificacion = datos;
      });
  }

  /**
   * Alterna el valor de la columna "Estatus" de una empresa submanufacturera.
   *
   * @param event - El evento que contiene la fila y la columna a modificar.
   */
  alternarValorSubmanufactureras(event: {
    row: unknown;
    column: string;
  }): void {
    const ROW = event.row as EmpresaSubmanufacturera; // Obtiene el registro de la fila.
    const INDEX = this.submanufacturerasTablaDatos.findIndex(
      (x) => x.rfc === ROW.rfc
    ); // Busca el índice del registro en la tabla.
    // Alterna el estado entre 'Baja' y 'Activada'.
    this.submanufacturerasTablaDatos[INDEX].desEstatus =
      this.submanufacturerasTablaDatos[INDEX].desEstatus === 'Baja'
        ? 'Activada'
        : 'Baja';
    this.cd.detectChanges();
  }
/**
 * Fetches data for `configuracionEmpresasSubmanufacturerasTabla` using the API.
 */
fetchConfiguracionEmpresasSubmanufacturerasTabla(): void {
  const body = {
    rfc: "AAL0409235E6",
    tipoPrograma: "TICPSE.IMMEX",
    folioPrograma: "5",
    discriminator: "80303"
  };

  this.modificacionProgramaImmexBajaSubmanufactureraService
    .buscarEmpresas(body)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.datosModificacion = response.datos; // Assign the `datos` array to the table data
          console.log('Empresas Submanufactureras Tabla Datos:', this.datosModificacion);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Empresas Submanufactureras Tabla Datos:', error);
      }
    );
}
  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
