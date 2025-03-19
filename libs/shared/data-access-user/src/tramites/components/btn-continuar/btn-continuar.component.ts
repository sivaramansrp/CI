import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { DatosPasos, DatosPasosCancelar } from '../../../core/models/shared/components.model';
import { WizardService } from '../../../core/services/shared/wizard/wizard.service';
import { SeccionLibQuery } from '../../../core/queries/seccion.query';
import { SeccionLibState } from '../../../core/estados/seccion.store';
import { map, Subject, takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'btn-continuar',
  standalone: true,
  imports: [],
  templateUrl: './btn-continuar.component.html',
  styleUrl: './btn-continuar.component.scss',
  host: {},
})
export class BtnContinuarComponent {
  @Input({ required: true }) datos!: DatosPasos;
  @Input() btnGuardar: boolean = false;
  @Input() btnCancelar: DatosPasosCancelar | null = null;

  @Output() continuarEvento = new EventEmitter<AccionBoton>();
  @Output() btnGuardarClicked = new EventEmitter<void>();
  @Output() cancelarEvento = new EventEmitter<AccionBoton>();

  wizardService = inject(WizardService);
  public seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();
  public habilitarBoton: boolean = false;

  constructor(private seccionQuery: SeccionLibQuery) { }

  ngOnInit() {
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

  get btnAntVisible() {
    return this.datos.indice === 1 ? 'hidden' : 'visible';
  }

  get btnContVisible() {
    return this.datos.indice === this.datos.nroPasos ? false : true;
  }
  
  get btnConVisible() {
    return this.btnCancelar ? this.datos?.indice >= this.btnCancelar?.iniciar && this.datos?.indice <= this.btnCancelar?.fin ? true : false : false;
  }

  continuar(): void {
    const condicion =
      this.datos.indice > 0 && this.datos.indice < this.datos.nroPasos;
    if (condicion) {
      this.wizardService.cambio_indice(this.datos.indice);
      const datosContinuar: AccionBoton = {
        accion: 'cont',
        valor: (this.datos.indice += 1),
      };
      this.continuarEvento.emit(datosContinuar);
    }
  }

  anterior(): void {
    const condicion =
      this.datos.indice > 1 && this.datos.indice < this.datos.nroPasos + 1;
    if (condicion) {
      const datosAnterior: AccionBoton = {
        accion: 'ant',
        valor: (this.datos.indice -= 1),
      };

      this.continuarEvento.emit(datosAnterior);
    }
  }
  guardar() {
    this.btnGuardarClicked.emit();
  }

  cancelar() {
    const datosContinuar: AccionBoton = {
      accion: 'cont',
      valor: this.datos.indice,
    };
    this.cancelarEvento.emit(datosContinuar);
  }
}
