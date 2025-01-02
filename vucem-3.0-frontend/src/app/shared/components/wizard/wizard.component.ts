import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ListaPasosWizard } from '../../../core/models/5701/servicios-extraordinarios.model';
import { CommonModule } from '@angular/common';
import { WizardService } from '../../../core/services/shared/wizard/wizard.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  @Input() lista_pasos: Array<ListaPasosWizard> = [];
  @Output() indice = new EventEmitter<any>();

  i_actual: number = 0;
  edo_inicial: boolean = false;
  lista: Array<ListaPasosWizard> = [];
  maximo: number = 0;

  wizardService = inject(WizardService);

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['lista_pasos'].currentValue !== undefined &&
      changes['lista_pasos'].currentValue !== null
    ) {
      this.lista_pasos = changes['lista_pasos'].currentValue;

      this.lista_pasos.forEach((element, index) => {
        this.edo_inicial = index == 0 ? true : false;
        this.lista.push({
          indice: index,
          titulo: element.titulo,
          activo: element.activo,
          completado: element.completado,
        });
      });

      console.log(this.lista_pasos);
      console.log(this.lista);
    }
  }

  siguiente(activo: boolean = true) {
    // this.wizardService.actual_indice.subscribe((indice) => {
    //   console.log(indice);
    //   this.i_actual = indice;
    // });

    console.log(this.i_actual);

    // this.i_actual = this.i_actual === this.maximo ? this.i_actual : this.i_actual + 1 ;
    this.lista[this.i_actual - 1].activo = activo;
  }

  atras() {}
}
