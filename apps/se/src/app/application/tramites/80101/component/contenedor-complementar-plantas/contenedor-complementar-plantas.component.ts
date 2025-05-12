import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy ,OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetallesPlantasComponent } from '../../../../shared/components/detalles-plantas/detalles-plantas.component';
import { PlantasSubfabricante } from '../../../../shared/models/empresas-subfabricanta.model';
import { Tramite80101Query} from '../../estados/tramite80101.query';
@Component({
  selector: 'app-contenedor-complementar-plantas',
  standalone: true,
  imports: [CommonModule, DetallesPlantasComponent],
  templateUrl: './contenedor-complementar-plantas.component.html',
  styleUrl: './contenedor-complementar-plantas.component.scss',
})
export class ContenedorComplementarPlantasComponent implements OnInit, OnDestroy {
    /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
    private destroyNotifier$: Subject<void> = new Subject();

    plantasSeleccionadas:PlantasSubfabricante[]=[]
    
  constructor(private query: Tramite80101Query,
    private router: Router,
    private activatedRoute: ActivatedRoute
  // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    this.query.plantasPorCompletar$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((plantasPorCompletar) => {
        if (plantasPorCompletar.length > 0) {
          this.plantasSeleccionadas =
            plantasPorCompletar;
        }
      });
  }

  /**
   * Navega a la ruta de la solicitud relativa al contexto actual.
   * Utiliza el enrutador para redirigir al usuario a la página de solicitud.
   */
  regressarPlantas():void{
    this.router.navigate(['../solicitud'], { relativeTo: this.activatedRoute }); 
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
