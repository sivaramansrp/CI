import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente `AltaPlantaComponent` utilizado para gestionar la funcionalidad de alta de plantas.
 * Este componente es independiente (standalone) y utiliza varios módulos y servicios.
 */
@Component({
  selector: 'app-alta-planta',
  templateUrl: './alta-planta.component.html',
  styleUrls: ['./alta-planta.component.scss'],
  standalone: true,
  imports: [
    ComplementariaImmexComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ToastrService],
})
export class AltaPlantaComponent implements OnInit, OnDestroy {

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * Este `Subject` se utiliza para notificar a los observables suscritos que deben completarse
   * cuando el componente se destruye.
   * 
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Método que se ejecuta al inicializar el componente.
   * Este método es parte del ciclo de vida de Angular y se utiliza para realizar
   * configuraciones iniciales, como cargar datos o inicializar variables.
   */
  ngOnInit(): void {}

  /**
   * Método que se ejecuta al destruir el componente.
   * Este método es parte del ciclo de vida de Angular y se utiliza para limpiar recursos,
   * como cancelar suscripciones a observables, para evitar fugas de memoria.
   * 
   * En este caso, se utiliza el `Subject` `destroyNotifier$` para notificar a todos los
   * observables suscritos que deben completarse.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
