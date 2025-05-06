import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ToastrService } from 'ngx-toastr';

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
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga la lista de estados.
   */
  ngOnInit(): void {}

  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
