import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaioQuery, ConsultaioState, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { PLANTAS } from '../../constantes/complementaria.enum';
import { PlantasTabla } from '../../models/complementaria.model';
import { ReplaySubject, takeUntil, map } from 'rxjs';

/**
 * Componente que representa la sección de "Plantas".
 * Este componente utiliza una tabla dinámica para mostrar información relacionada con plantas.
 */
@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss',
})
export class PlantasComponent {
  /**
   * Enumeración que define las opciones de selección para la tabla.
   * Se utiliza para configurar el comportamiento de la tabla dinámica.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Constante que contiene los datos de configuración para la tabla de plantas.
   * Esta constante se importa desde el archivo de constantes.
   */
  public plantasTabla = PLANTAS;

  /**
   * Arreglo que almacena los datos de la tabla de plantas.
   * Este arreglo se utiliza para mostrar la información dinámica en la tabla.
   */
  @Input() plantasTablaDatos: PlantasTabla[] = [];

  /**
     * Subject para destruir notificador.
     */
    consultaDatos!: ConsultaioState;
     /**
     * Indica si el formulario está en modo solo lectura.
     * Cuando es `true`, los campos del formulario no se pueden editar.
     */
    soloLectura: boolean = false;
    
  /** Sujeto para manejar la destrucción del componente. */
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
     /**
     * Constructor del componente.
     * @param certificadoService Servicio para gestionar certificados.
     * @param fb Constructor de formularios.
     * @param validacionesService Servicio para validar formularios.
     * @param store Almacén de datos del trámite.
     * @param query Consulta de datos del trámite.
     */
    constructor(private consultaioQuery: ConsultaioQuery) {
      // El constructor se utiliza para la inyección de dependencias.
       this.consultaioQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.consultaDatos = seccionState;
            this.soloLectura = this.consultaDatos.readonly;
          })
        )
        .subscribe()
    }
}