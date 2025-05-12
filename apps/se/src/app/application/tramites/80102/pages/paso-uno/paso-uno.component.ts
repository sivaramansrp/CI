import { Component, OnDestroy ,OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AggregarComplimentosComponent } from '../../components/aggregar-complimentos/aggregar-complimentos.component';
import { CommonModule } from '@angular/common';
import { ContenedorAnnexoDosTresComponent } from '../../components/contenedor-annexo-dos-tres/contenedor-annexo-dos-tres.component';
import { ContenedorAnnexoUnoComponent } from '../../components/contenedor-annexo-uno/contenedor-annexo-uno.component';
import { EmpresasSubfabricanteComponent } from '../../components/empresas-subfabricante/empresas-subfabricante.component';
import { FederatariosYPlantasVistaComponent } from '../../components/federatarios-y-plantas-vista/federatarios-y-plantas-vista.component';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiciosComponent } from "../../components/servicios/servicios.component";
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    ServiciosComponent,
    AggregarComplimentosComponent,
    EmpresasSubfabricanteComponent,
    ContenedorAnnexoDosTresComponent,
    ContenedorAnnexoUnoComponent,
    FederatariosYPlantasVistaComponent
],
  host: { hostID: crypto.randomUUID().toString() },
})
export class PasoUnoComponent implements OnInit, OnDestroy {
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
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice que controla la selección de las pestañas en la interfaz.
   * @type {number}
   */
  indice: number = 1;

  constructor(private query:Tramite80102Query,private store:Tramite80102Store) {
    //constructor vacío
  }

  ngOnInit():void{
    
    this.query.indicePrevioRuta$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((indice: number) => {
     if(indice){
      this.indice = indice;
     }
      });
  }

  /**
   * Cambia el índice de la pestaña seleccionada.
   * Se utiliza para cambiar la pestaña activa en la interfaz.
   *
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setindicePrevioRuta(i);
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
