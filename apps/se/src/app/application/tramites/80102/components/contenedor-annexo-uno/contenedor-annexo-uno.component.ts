import { ANEXO_IMPORTACION_SERVICIO,ANEXO_I_SERVICIO} from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AnexoImportacionEncabezado, AnexoUnoEncabezado, RutaNombre } from '../../../../shared/models/nuevo-programa-industrial.model';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80102Store } from '../../estados/tramite80102.store';

@Component({
  selector: 'app-contenedor-annexo-uno',
  standalone: true,
  imports: [CommonModule,AnexoUnoComponent],
  templateUrl: './contenedor-annexo-uno.component.html',
  styleUrl: './contenedor-annexo-uno.component.scss',
})
export class ContenedorAnnexoUnoComponent {
  public anexoUnoConfig = {
    anexoUnoTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoUnoEncabezadoDeTabla: ANEXO_I_SERVICIO,
  }
  public anexoImportacionConfig = {
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_IMPORTACION_SERVICIO,
  }

  /**
   * Lista de encabezados del anexo Uno.
   * @type {AnexoEncabezado[]}
   */
  public anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
    * Lista de encabezados del anexo dos.
    * @type {AnexoEncabezado[]}
    */
  public anexoDosTablaLista: AnexoImportacionEncabezado[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private store:Tramite80102Store
  ){
    // do nothing
  }

  /**
   * Método para obtener la devolución de llamada del anexo Uno.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Uno.
   * @returns {void}
   */
  public obtenerAnexoUnoDevolverLaLlamada(event: AnexoUnoEncabezado[]): void {
    this.anexoUnoTablaLista = event ? event : [];
    this.store.setImportarDatosTabla(this.anexoUnoTablaLista);
    
  }
   /**
   * Método para obtener la devolución de llamada del anexo Dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Dos.
   * @returns {void}
   */
   public obtenerAnexoDosDevolverLaLlamada(event: AnexoImportacionEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
    this.store.setExportarDatosTabla(this.anexoDosTablaLista);
  }

  public rutaLaFraccionDeComplemento(event: RutaNombre): void{
    if(event && event.catagoria){
      this.router.navigate([`../${event.catagoria}`], { relativeTo: this.activatedRoute });
    }
  }

  public navegacionDetectada(event: AnexoImportacionEncabezado[] | AnexoUnoEncabezado[]): void{
    if(event){
      this.store.setDatosParaNavegar(event);
    }
  }
}
