import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/psicotropicos-poretorno.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260201Store } from '../../estados/tramite260201Store.store';
import { ScianDataService } from '../../../../shared/services/scian-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent implements OnInit{

  /**
   * @property {string} idProcedimiento
   * @description
   * Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
    
  constructor(private tramite260201Store: Tramite260201Store,
    private scianDataService: ScianDataService
  ){
    // Constructor vacío, se inyecta el store para su uso en el componente.
  }

  public scianSeleccionado!: TablaScianConfig[];

  private scianSubscription!: Subscription;

    ngOnInit(): void {
    this.scianSubscription = this.scianDataService.scianData$.subscribe(
      (data: TablaScianConfig[]) => {
        if (data && data.length > 0) {
          this.scianSeleccionado = data;
        }
      }
    );
  }

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig | TablaScianConfig[]): void {
    const DATOS = Array.isArray(event) ? event : [event];
     this.tramite260201Store.update((state) => ({
      ...state,
      scianConfigDatos: DATOS
    }))
  }
}
