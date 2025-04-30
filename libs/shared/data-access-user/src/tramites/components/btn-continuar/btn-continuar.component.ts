import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosPasos } from '../../../core/models/shared/components.model';
import { SeccionLibQuery } from '../../../core/queries/seccion.query';
import { SeccionLibState } from '../../../core/estados/seccion.store';
import { WizardService } from '../../../core/services/shared/wizard/wizard.service';

import { PopUpView } from '../../../core/models/301/servicios-pantallas.model';

import { Notificacion, NotificacionesComponent } from '../notificaciones/notificaciones.component';
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'btn-continuar',
  standalone: true,
  imports: [NotificacionesComponent],
  templateUrl: './btn-continuar.component.html',
  styleUrl: './btn-continuar.component.scss',
  host: {},
})
export class BtnContinuarComponent implements OnInit {
  @Input({ required: true }) datos!: DatosPasos;
  @Input() btnGuardar: boolean = false;

  @Output() continuarEvento = new EventEmitter<AccionBoton>();
  @Output() btnGuardarClicked = new EventEmitter<void>();
  @Input() popView:PopUpView={
    open:false,
    index:1
    };
    @Input() notification!:Notificacion;
  wizardService = inject(WizardService);
  popUpModule:boolean=false;
  public seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();
  public habilitarBoton: boolean = false;

  constructor(private seccionQuery: SeccionLibQuery) {
    // Lógica de inicialización si es necesario
   }

  ngOnInit():void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
          this.habilitarBoton =
            JSON.stringify(this.seccion.formaValida) ===
            JSON.stringify(this.seccion.seccion);
        })
      )
      .subscribe();
  }

  /**
   * Determina la visibilidad del botón "Anterior".
   * @returns {string} 'hidden' si el índice es 1, de lo contrario 'visible'.
   */
  get btnAntVisible(): string {
    return this.datos.indice === 1 ? 'hidden' : 'visible';
  }

  /**
   * Determina si el botón "Continuar" debe ser visible.
   *
   * @returns {boolean} `true` si el índice actual no es igual al número de pasos, de lo contrario `false`.
   */
  get btnContVisible(): boolean {
    return this.datos.indice === this.datos.nroPasos ? false : true;
  }

  /**
   * Avanza al siguiente paso del asistente si la condición se cumple.
   * 
   * @returns {void} No retorna ningún valor.
   */
  continuar(): void {
    if(this.popView.open && this.datos.indice===this.popView.index){
      this.popUpModule=true;
    }
    else{
    const CONDICION =
      this.datos.indice > 0 && this.datos.indice < this.datos.nroPasos;
    if (CONDICION) {
      this.wizardService.cambio_indice(this.datos.indice);
      const DATOS_CONTINUAR: AccionBoton = {
        accion: 'cont',
        valor: (this.datos.indice += 1),
      };
      this.continuarEvento.emit(DATOS_CONTINUAR);
    }
  }
  }
  /**
   * Retrocede al paso anterior si el índice actual está dentro del rango permitido.
   * 
   * @returns {void} No retorna ningún valor.
   */
  anterior(): void {
    const CONDICION =
      this.datos.indice > 1 && this.datos.indice < this.datos.nroPasos + 1;
    if (CONDICION) {
      const DATOS_ANTERIOR: AccionBoton = {
        accion: 'ant',
        valor: (this.datos.indice -= 1),
      };

      this.continuarEvento.emit(DATOS_ANTERIOR);
    }
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['notification']) {
     
  //     // React to changes here
  //   }
  // }
  eliminarPedimento(borrar: boolean): void {
    this.popUpModule=false;
    if(borrar){
      const CONDICION =
      this.datos.indice > 0 && this.datos.indice < this.datos.nroPasos;
    if (CONDICION) {
      this.wizardService.cambio_indice(this.datos.indice);
      const DATOS_CONTINUAR: AccionBoton = {
        accion: 'cont',
        valor: (this.datos.indice += 1),
      };
      this.continuarEvento.emit(DATOS_CONTINUAR);
    }
    this.popUpModule=false;
    }
    

  }

  /**
   * Emite un evento al hacer clic en el botón guardar.
   * @returns {void} No retorna ningún valor.
   */
  guardar(): void {
    this.btnGuardarClicked.emit();
  }
}
