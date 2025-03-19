import { Catalogo, ComplimentarFraccion, ComplimentarFraccionResoponse } from '../../../../shared/models/nuevo-programa-industrial.model';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementarFraccionComponent } from '../../../../shared/components/complementar-fraccion/complementar-fraccion.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';

@Component({
  selector: 'app-complementar-fraccion-vista',
  standalone: true,
  imports: [CommonModule, ComplementarFraccionComponent],
  templateUrl: './complementar-fraccion-vista.component.html',
  styleUrl: './complementar-fraccion-vista.component.scss',
})
export class ComplementarFraccionVistaComponent implements OnInit, OnDestroy {
   /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
   private destroyNotifier$: Subject<void> = new Subject();

  public complimentarDatos!: ComplimentarFraccionResoponse;

  public catagoriaSeleccionDatos: Catalogo[] = [{
    id: 0,
    descripcion: ''
  }];
  public complimentarFraccionDatos: ComplimentarFraccion = {
    fraccionArancelaria: '',
    anexoDos: '',
    tipo: '',
    umt: '',
    catagoria: '',
    descripcion: '',
    monedaNacionalMensual: 0,
    monedaNacionalDeDosPeriodos: 0,
    volumenMensual: 0,
    twoPeriodVolume: 0
  }

  constructor( private query: Tramite80102Query ) {
    //constructor vacío
  }

  ngOnInit():void{
    this.query.selectDatosParaNavegar$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datosParaNavegar) => {
         this.complimentarFraccionDatos.descripcion=datosParaNavegar.encabezadoDescripcionComercial;
        });
}

  getDatos(event: ComplimentarFraccionResoponse): void {
    this.complimentarDatos = event;
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
