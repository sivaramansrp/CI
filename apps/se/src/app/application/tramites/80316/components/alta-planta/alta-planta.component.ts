import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_DOMICILIOS } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
// import { ConfiguracionColumna } from '../../';
// import { DomicilioInfo } from '../../models/plantas-consulta.model';
// import { ModificacionSolicitudeService } from '../../services/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80316Query } from '../../../80316/estados/tramite80316.query';
import { Tramite80316Store } from '../../../80316/estados/tramite80316.store';
import { ModificacionSolicitudeService } from '../../../80308/services/modificacion-solicitude.service';
import { DomicilioInfo } from '../../../80308/models/plantas-consulta.model';
import { ConfiguracionColumna } from '../../../80308/models/configuracio-columna.model';

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
  providers: [ModificacionSolicitudeService, ToastrService],
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
