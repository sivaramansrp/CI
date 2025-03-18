import { ANEXO_IMPORTACION_SERVICIO,ANEXO_I_SERVICIO} from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AnexoImportacionEncabezado, AnexoUnoEncabezado, RutaNombre } from '../../../../shared/models/nuevo-programa-industrial.model';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { CommonModule } from '@angular/common';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

@Component({
  selector: 'app-contenedor-annexo-uno',
  standalone: true,
  imports: [CommonModule,AnexoUnoComponent],
  templateUrl: './contenedor-annexo-uno.component.html',
  styleUrl: './contenedor-annexo-uno.component.scss',
})
export class ContenedorAnnexoUnoComponent implements OnInit, OnDestroy {
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

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private store:Tramite80102Store,
    private query:Tramite80102Query) 
  {
    // do nothing
  }

  ngOnInit():void{
    this.query.selectImportarTablsDatos$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((importarTablsDatos)=>{
          if(importarTablsDatos.length>0){
            this.anexoUnoTablaLista = importarTablsDatos;
          }
        });

        this.query.selectExportarTablsDatos$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((exportarTablsDatos)=>{
          if(exportarTablsDatos.length>0){
            this.anexoDosTablaLista = exportarTablsDatos;
          }
        });    
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
    if(event && event.catagoria && event.id && event.datos){
      this.store.setAnnexoUnoSeccionActiva(event.id);
      this.store.setDatosParaNavegar(event.datos);
      this.router.navigate([`../${event.catagoria}`], { relativeTo: this.activatedRoute });
    }
  }

  /**
     * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
     * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
     * @method ngOnDestroy
     */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
