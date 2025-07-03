import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';


/**
 * Componente contenedor para la tabla SCIAN del trámite 260301.
 * 
 * Este componente actúa como un wrapper que contiene la tabla de códigos SCIAN
 * (Sistema de Clasificación Industrial de América del Norte) y maneja la
 * comunicación entre la tabla y el store del trámite.
 * 
 * @selector app-scian-tabla-contenedora
 * @standalone true
 * @imports CommonModule, ScianTablaComponent
 */
@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  
  /**
   * Constructor del componente.
   * 
   * Inyecta el servicio de store del trámite 260301 para permitir la gestión
   * del estado de la aplicación relacionado con este trámite específico.
   * 
   * @param tramite260301Store - Servicio de store que maneja el estado del trámite 260301
   */
  constructor(private tramite260301Store: Tramite260301Store){
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * Propiedad que almacena la configuración SCIAN seleccionada actualmente.
   * 
   * Esta propiedad contiene los datos del código SCIAN que ha sido seleccionado
   * por el usuario en la tabla. El signo de exclamación (!) indica que esta
   * propiedad será inicializada definitivamente antes de su uso, aunque no
   * se asigne un valor inicial explícito.
   * 
   * @type {TablaScianConfig}
   * @public
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * Este método se ejecuta cuando el usuario selecciona un elemento de la tabla SCIAN.
   * Recibe los datos del elemento seleccionado y los almacena en el store del trámite,
   * actualizando el estado global de la aplicación con la nueva configuración SCIAN.
   * 
   * La actualización se realiza manteniendo el estado existente y agregando o
   * actualizando únicamente la propiedad 'scianConfigDatos' con el nuevo valor
   * seleccionado en formato de array.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla
   * @returns {void} - No retorna ningún valor
   * @public
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260301Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
